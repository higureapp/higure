import { sdk } from '@/lib/graphql-client'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { CreateHabitInput } from '@/gql_generated/graphql'

export function useCreateHabitMutation() {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: async (variables: { input: CreateHabitInput }) => {
            return sdk.CreateHabit(variables)
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['habits'] })
        },
    })
}
