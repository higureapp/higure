import { sdk } from '@/lib/graphql-client'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { SignUpInput } from '@/gql_generated/graphql'
import { setAuthToken } from './useAuthStore'

export function useSignUp() {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: async (variables: { input: SignUpInput }) => {
            return sdk.SignUp(variables)
        },
        onSuccess: (data) => {
            if (data.signUp.access_token) {
                setAuthToken(data.signUp.access_token)
                queryClient.invalidateQueries({ queryKey: ['me'] })
            }
        },
    })
}
