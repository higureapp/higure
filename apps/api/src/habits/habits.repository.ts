import { Injectable, Logger } from '@nestjs/common'
import { PrismaService } from '../database/prisma.service'
import {
    Habit,
    HabitCategory,
    HabitCompletion,
    Prisma,
} from '../generated/prisma/client'

@Injectable()
export class HabitsRepository {
    private logger = new Logger('HabitsRepository')

    constructor(private readonly prismaService: PrismaService) {
        this.logger.log('HabitsRepository initialized')
    }

    // Habit methods
    async createHabit(data: Prisma.HabitCreateInput): Promise<Habit> {
        return this.prismaService.habit.create({ data })
    }

    async findHabitById(id: string): Promise<Habit | null> {
        return this.prismaService.habit.findUnique({ where: { id } })
    }

    async findHabits(params: {
        skip?: number
        take?: number
        cursor?: Prisma.HabitWhereUniqueInput
        where?: Prisma.HabitWhereInput
        orderBy?: Prisma.HabitOrderByWithRelationInput
    }): Promise<Habit[]> {
        const { skip, take, cursor, where, orderBy } = params
        return this.prismaService.habit.findMany({
            skip,
            take,
            cursor,
            where,
            orderBy,
        })
    }

    async updateHabit(params: {
        where: Prisma.HabitWhereUniqueInput
        data: Prisma.HabitUpdateInput
    }): Promise<Habit> {
        const { where, data } = params
        return this.prismaService.habit.update({ where, data })
    }

    async deleteHabit(where: Prisma.HabitWhereUniqueInput): Promise<Habit> {
        return this.prismaService.habit.delete({ where })
    }

    // HabitCategory methods
    async createHabitCategory(
        data: Prisma.HabitCategoryCreateInput,
    ): Promise<HabitCategory> {
        return this.prismaService.habitCategory.create({ data })
    }

    // HabitCompletion methods
    async createHabitCompletion(
        data: Prisma.HabitCompletionCreateInput,
    ): Promise<HabitCompletion> {
        return this.prismaService.habitCompletion.create({ data })
    }

    async findHabitCompletionsByHabitId(
        habitId: string,
    ): Promise<HabitCompletion[]> {
        return this.prismaService.habitCompletion.findMany({
            where: { habitId },
        })
    }

    findMany(input: { where: Prisma.HabitWhereInput }) {
        return this.prismaService.habit.findMany(input)
    }
}
