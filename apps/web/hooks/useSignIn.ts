import { sdk } from '@/lib/graphql-client'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { SignInInput } from '@/gql_generated/graphql'
import { setAuthToken } from './useAuthStore'

export function useSignIn() {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: async (variables: { input: SignInInput }) => {
            return sdk.SignIn(variables)
        },
        onSuccess: (data) => {
            if (data.signIn.access_token) {
                
                setAuthToken(data.signIn.access_token)
                queryClient.invalidateQueries({ queryKey: ['me'] })
            }
        },
    })
}
