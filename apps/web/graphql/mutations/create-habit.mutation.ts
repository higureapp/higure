import { gql } from 'graphql-request';

export const CREATE_HABIT_MUTATION = gql`
  mutation CreateHabit($input: CreateHabitInput!) {
    createHabit(input: $input) {
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
`;
