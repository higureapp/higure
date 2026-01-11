import { sdk } from '@/lib/graphql-client'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { CompleteHabitInput } from '@/gql_generated/graphql'

export function useCompleteHabitMutation() {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: async (variables: { input: CompleteHabitInput }) => {
            return sdk.CompleteHabit(variables)
        },
        onSuccess: (data) => {
            queryClient.invalidateQueries({ queryKey: ['habits'] })
            queryClient.invalidateQueries({
                queryKey: [
                    'habitStats',
                    { habitId: data.completeHabit.habit.id },
                ],
            })
        },
    })
}
