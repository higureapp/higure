export class HabitCacheKeys {
    static getHabits(userId: string, filters: { isActive?: boolean }): string {
        return `user:${userId}:habits:isActive:${filters.isActive ?? 'all'}`;
    }

    static getHabitStats(habitId: string, userId: string, period: string): string {
        return `user:${userId}:habit:${habitId}:stats:period:${period}`;
    }
}