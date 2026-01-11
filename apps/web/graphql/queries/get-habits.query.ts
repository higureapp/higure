import { gql } from 'graphql-request'

export const GET_HABITS_QUERY = gql`
    query GetHabits {
        habits {
            id
            title
            description
            frequency
            frequencyConfig
            dailyRepetitions
            scheduledTime
            reminderTime
            difficulty
            dueDate
            isActive
            streakCount
            createdAt
            updatedAt
        }
    }
`
