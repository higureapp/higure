import { gql } from "graphql-request";

export const GET_HABIT_STATS_QUERY = gql`
    query GetHabitStats($habitId: String!, $period: StatsPeriod!) {
        habitStats(input: { habitId: $habitId, period: $period }) {
            completionRate
            currentStreak
            longestStreak
            totalCompletions
            completionsByDay {
                date
                completed
            }
        }
    }
`;
