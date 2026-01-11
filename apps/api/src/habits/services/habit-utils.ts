import {
    isSameDay as _isSameDay,
    addDays as _addDays,
    subDays as _subDays,
    startOfWeek as _startOfWeek,
    endOfWeek as _endOfWeek,
    isWithinInterval as _isWithinInterval,
    addMonths as _addMonths,
    subMonths as _subMonths,
    startOfMonth as _startOfMonth,
    endOfMonth as _endOfMonth,
    addYears as _addYears,
    subYears as _subYears,
    startOfYear as _startOfYear,
    endOfYear as _endOfYear,
    getDay as _getDay,
    getDate as _getDate,
    isPast as _isPast,
} from 'date-fns';
import { FrequencyType, StatsPeriod } from '../models/enums';
import { Habit } from '../models';

export const isSameDay = (dateLeft: Date, dateRight: Date): boolean => {
    return _isSameDay(dateLeft, dateRight);
};

export const addDays = (date: Date, amount: number): Date => {
    return _addDays(date, amount);
};

export const subDays = (date: Date, amount: number): Date => {
    return _subDays(date, amount);
};

export const startOfWeek = (date: Date, options?: { weekStartsOn?: 0 | 1 | 2 | 3 | 4 | 5 | 6 }): Date => {
    return _startOfWeek(date, options);
};

export const endOfWeek = (date: Date, options?: { weekStartsOn?: 0 | 1 | 2 | 3 | 4 | 5 | 6 }): Date => {
    return _endOfWeek(date, options);
};

export const isWithinInterval = (date: Date, interval: { start: Date; end: Date; }): boolean => {
    return _isWithinInterval(date, interval);
};

export const addMonths = (date: Date, amount: number): Date => {
    return _addMonths(date, amount);
};

export const subMonths = (date: Date, amount: number): Date => {
    return _subMonths(date, amount);
};

export const startOfMonth = (date: Date): Date => {
    return _startOfMonth(date);
};

export const endOfMonth = (date: Date): Date => {
    return _endOfMonth(date);
};

export const addYears = (date: Date, amount: number): Date => {
    return _addYears(date, amount);
};

export const subYears = (date: Date, amount: number): Date => {
    return _subYears(date, amount);
};

export const startOfYear = (date: Date): Date => {
    return _startOfYear(date);
};

export const endOfYear = (date: Date): Date => {
    return _endOfYear(date);
};

export const getDay = (date: Date): number => {
    return _getDay(date);
};

export const getDate = (date: Date): number => {
    return _getDate(date);
};

export const isPast = (date: Date): boolean => {
    return _isPast(date);
};

export function getNextScheduledDate(habit: Habit, currentDate: Date = new Date()): Date {
    switch (habit.frequency) {
        case FrequencyType.DAILY:
            return addDays(currentDate, 1);

        case FrequencyType.SPECIFIC_DAYS_OF_WEEK: {
            const daysOfWeek = (habit.frequencyConfig as any).daysOfWeek as number[];
            let nextDay = addDays(currentDate, 1);
            while (true) {
                if (daysOfWeek.includes(getDay(nextDay))) {
                    return nextDay;
                }
                nextDay = addDays(nextDay, 1);
            }
        }

        case FrequencyType.SPECIFIC_DAYS_OF_MONTH: {
            const daysOfMonth = (habit.frequencyConfig as any).daysOfMonth as number[];
            let nextDay = addDays(currentDate, 1);
            while (true) {
                if (daysOfMonth.includes(getDate(nextDay))) {
                    return nextDay;
                }
                nextDay = addDays(nextDay, 1);
            }
        }

        case FrequencyType.EVERY_N_DAYS: {
            const { intervalDays, startDate } = habit.frequencyConfig as any;
            const diffDays = Math.floor((currentDate.getTime() - new Date(startDate).getTime()) / (1000 * 60 * 60 * 24));
            const remainder = diffDays % intervalDays;
            if (remainder === 0) {
                return currentDate; // should have been completed today
            } else {
                return addDays(currentDate, intervalDays - remainder);
            }
        }

        case FrequencyType.N_TIMES_PER_WEEK: {
            // This is more complex, might need a different approach for "next scheduled date"
            // For now, let's assume it's simply the next day.
            // The logic for N_TIMES_PER_WEEK is more about checking completion count within a week
            return addDays(currentDate, 1);
        }

        default:
            return addDays(currentDate, 1);
    }
}


export function calculateStreak(
    habit: Habit,
    completions: Date[],
    currentDate: Date = new Date(),
): number {
    let streak = 0;
    let tempCurrentDate = currentDate;

    while (true) {
        let expectedCompletionDate: Date | null = null;
        let wasCompleted = false;

        switch (habit.frequency) {
            case FrequencyType.DAILY:
                expectedCompletionDate = tempCurrentDate;
                wasCompleted = completions.some((c) => isSameDay(c, expectedCompletionDate!));
                break;

            case FrequencyType.SPECIFIC_DAYS_OF_WEEK: {
                const daysOfWeek = (habit.frequencyConfig as any).daysOfWeek as number[];
                if (!daysOfWeek.includes(getDay(tempCurrentDate))) {
                    // If today is not an expected day, the streak is not broken.
                    // We only check for completion on scheduled days.
                    tempCurrentDate = subDays(tempCurrentDate, 1);
                    continue;
                }
                expectedCompletionDate = tempCurrentDate;
                wasCompleted = completions.some((c) => isSameDay(c, expectedCompletionDate!));
                break;
            }

            case FrequencyType.SPECIFIC_DAYS_OF_MONTH: {
                const daysOfMonth = (habit.frequencyConfig as any).daysOfMonth as number[];
                if (!daysOfMonth.includes(getDate(tempCurrentDate))) {
                    tempCurrentDate = subDays(tempCurrentDate, 1);
                    continue;
                }
                expectedCompletionDate = tempCurrentDate;
                wasCompleted = completions.some((c) => isSameDay(c, expectedCompletionDate!));
                break;
            }

            case FrequencyType.EVERY_N_DAYS: {
                const { intervalDays, startDate } = habit.frequencyConfig as any;
                const habitStartDate = new Date(startDate);
                const diffDays = Math.floor((tempCurrentDate.getTime() - habitStartDate.getTime()) / (1000 * 60 * 60 * 24));

                if (diffDays < 0 || diffDays % intervalDays !== 0) {
                    tempCurrentDate = subDays(tempCurrentDate, 1);
                    continue;
                }

                expectedCompletionDate = tempCurrentDate;
                wasCompleted = completions.some((c) => isSameDay(c, expectedCompletionDate!));
                break;
            }

            case FrequencyType.N_TIMES_PER_WEEK: {
                const { timesPerWeek, weekStartsOn } = habit.frequencyConfig as any;
                const weekStart = startOfWeek(tempCurrentDate, { weekStartsOn });
                const weekEnd = endOfWeek(tempCurrentDate, { weekStartsOn });

                const completionsInWeek = completions.filter(c =>
                    isWithinInterval(c, { start: weekStart, end: weekEnd })
                ).length;

                if (completionsInWeek >= timesPerWeek) {
                    wasCompleted = true;
                } else {
                    // If we are checking for a past week, and it wasn't completed, streak is broken
                    if (isPast(weekEnd) && completionsInWeek < timesPerWeek) {
                        wasCompleted = false;
                    } else {
                        // If it's the current week and not enough completions, we continue checking previous days
                        tempCurrentDate = subDays(tempCurrentDate, 1);
                        continue;
                    }
                }
                break;
            }
        }

        if (wasCompleted) {
            streak++;
        } else {
            break;
        }

        tempCurrentDate = subDays(tempCurrentDate, 1);
    }

    return streak;
}