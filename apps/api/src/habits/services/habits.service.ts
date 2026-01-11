import {
    Inject,
    Injectable,
    Logger,
    NotFoundException,
} from '@nestjs/common';
import { HabitsRepository } from '../habits.repository';
import { CreateHabitInput, HabitFilters, CompleteHabitInput, GetHabitStatsInput } from '../inputs';
import { HabitStatsResponse, HabitCompletion, CompletionByDay } from '../models';
import { Habit } from '../models';
import { CurrentUserType } from 'src/auth/decorators/current-user.decorator';
import { Prisma } from '../../generated/prisma/client';
import { calculateStreak, isSameDay, startOfWeek, endOfWeek, startOfMonth, endOfMonth, startOfYear, endOfYear, subDays } from './habit-utils';
import { StatsPeriod } from '../models/enums';
import { Cache, CACHE_MANAGER } from '@nestjs/cache-manager';
import { HabitCacheKeys } from '../cache.keys';

@Injectable()
export class HabitsService {
    private logger = new Logger('HabitsService');

    constructor(
        private readonly habitsRepository: HabitsRepository,
        @Inject(CACHE_MANAGER) private readonly cacheManager: Cache,
    ) {
        this.logger.log('HabitsService initialized');
    }

    async createHabit(input: CreateHabitInput, user: CurrentUserType): Promise<Habit> {
        const { title, description, categoryId, frequency, frequencyConfig, dailyRepetitions, scheduledTime, reminderTime, difficulty, dueDate } = input;

        const habit = await this.habitsRepository.createHabit({
            title,
            description,
            frequency,
            frequencyConfig,
            dailyRepetitions,
            scheduledTime,
            reminderTime,
            difficulty,
            dueDate,
            user: {
                connect: {
                    id: user.userId,
                },
            },
            category: categoryId ? {
                connect: {
                    id: categoryId,
                }
            } : undefined,
        });

        // Invalidate habits cache for this user
        await this.cacheManager.del(HabitCacheKeys.getHabits(user.userId, { isActive: true }));
        await this.cacheManager.del(HabitCacheKeys.getHabits(user.userId, { isActive: false }));
        await this.cacheManager.del(HabitCacheKeys.getHabits(user.userId, {}));


        return habit as Habit;
    }

    async getHabits(userId: string, filters: HabitFilters): Promise<Habit[]> {
        const cacheKey = HabitCacheKeys.getHabits(userId, filters);
        const cachedHabits = await this.cacheManager.get<Habit[]>(cacheKey);

        if (cachedHabits) {
            this.logger.debug(`Cache hit for habits: ${cacheKey}`);
            return cachedHabits;
        }

        this.logger.debug(`Cache miss for habits: ${cacheKey}`);
        const prismaFilters: Prisma.HabitWhereInput = {
            userId: userId,
        };

        if (filters.isActive !== undefined) {
            prismaFilters.isActive = filters.isActive;
        }

        const habits = await this.habitsRepository.findMany({ where: prismaFilters });

        await this.cacheManager.set(cacheKey, habits, 60 * 5); // Cache for 5 minutes

        return habits as Habit[];
    }

    async completeHabit(input: CompleteHabitInput, userId: string): Promise<HabitCompletion> {
        const { habitId, notes } = input;

        // Check if habit exists and belongs to the user
        const habit = await this.habitsRepository.findHabitById(habitId);
        if (!habit || habit.userId !== userId) {
            throw new NotFoundException(`Habit with ID ${habitId} not found or does not belong to the user.`);
        }

        const completion = await this.habitsRepository.createHabitCompletion({
            habit: {
                connect: { id: habitId },
            },
            user: {
                connect: { id: userId },
            },
            completedAt: new Date(),
            notes,
        });

        // Update habit streak count
        const completions = await this.habitsRepository.findHabitCompletionsByHabitId(habitId);
        const streak = calculateStreak(habit as Habit, completions.map(c => c.completedAt));
        await this.habitsRepository.updateHabit({
            where: { id: habitId },
            data: { streakCount: streak },
        });

        // Invalidate relevant caches
        await this.cacheManager.del(HabitCacheKeys.getHabitStats(habitId, userId, StatsPeriod.WEEK.toString()));
        await this.cacheManager.del(HabitCacheKeys.getHabitStats(habitId, userId, StatsPeriod.MONTH.toString()));
        await this.cacheManager.del(HabitCacheKeys.getHabitStats(habitId, userId, StatsPeriod.YEAR.toString()));
        await this.cacheManager.del(HabitCacheKeys.getHabits(userId, { isActive: true }));
        await this.cacheManager.del(HabitCacheKeys.getHabits(userId, { isActive: false }));
        await this.cacheManager.del(HabitCacheKeys.getHabits(userId, {}));

        return completion as any; // TODO: fix this mapping
    }

    async getHabitStats(input: GetHabitStatsInput, userId: string): Promise<HabitStatsResponse> {
        const { habitId, period } = input;
        const cacheKey = HabitCacheKeys.getHabitStats(habitId, userId, period.toString());
        const cachedStats = await this.cacheManager.get<HabitStatsResponse>(cacheKey);

        if (cachedStats) {
            this.logger.debug(`Cache hit for habit stats: ${cacheKey}`);
            return cachedStats;
        }

        this.logger.debug(`Cache miss for habit stats: ${cacheKey}`);
        const habit = await this.habitsRepository.findHabitById(habitId);
        if (!habit || habit.userId !== userId) {
            throw new NotFoundException(`Habit with ID ${habitId} not found or does not belong to the user.`);
        }

        const completions = (await this.habitsRepository.findHabitCompletionsByHabitId(habitId))
            .map(c => c.completedAt)
            .sort((a, b) => a.getTime() - b.getTime()); // Sort by date ascending

        const currentDate = new Date();
        const currentStreak = calculateStreak(habit as any, completions, currentDate);

        // Calculate longest streak (simplified for now)
        let longestStreak = currentStreak; // placeholder for now

        let startDate: Date;
        let endDate: Date;

        switch (period) {
            case StatsPeriod.WEEK:
                startDate = startOfWeek(currentDate);
                endDate = endOfWeek(currentDate);
                break;
            case StatsPeriod.MONTH:
                startDate = startOfMonth(currentDate);
                endDate = endOfMonth(currentDate);
                break;
            case StatsPeriod.YEAR:
                startDate = startOfYear(currentDate);
                endDate = endOfYear(currentDate);
                break;
            default:
                startDate = new Date(0); // Epoch
                endDate = currentDate;
                break;
        }

        const totalCompletions = completions.filter(c => c >= startDate && c <= endDate).length;
        const relevantCompletions = completions.filter(c => c >= startDate && c <= endDate);

        // Generate completionsByDay for the period
        const completionsByDay: CompletionByDay[] = [];
        let tempDate = startDate;
        while (tempDate <= endDate) {
            const completed = relevantCompletions.some(c => isSameDay(c, tempDate));
            completionsByDay.push({ date: new Date(tempDate), completed });
            tempDate = subDays(tempDate, -1); // add 1 day
        }

        const totalDaysInPeriod = Math.floor((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24)) + 1;
        const completionRate = totalDaysInPeriod > 0 ? (totalCompletions / totalDaysInPeriod) * 100 : 0;


        const habitStatsResponse = {
            completionRate,
            currentStreak,
            longestStreak,
            totalCompletions,
            completionsByDay,
        };

        await this.cacheManager.set(cacheKey, habitStatsResponse, 60 * 5); // Cache for 5 minutes

        return habitStatsResponse;
    }
}

