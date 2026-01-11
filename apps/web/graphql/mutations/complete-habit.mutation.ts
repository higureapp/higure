import { gql } from 'graphql-request'

export const COMPLETE_HABIT_MUTATION = gql`
    mutation CompleteHabit($input: CompleteHabitInput!) {
        completeHabit(input: $input) {
            id
            completedAt
            notes
            habit {
                id
                streakCount
            }
        }
    }
`
