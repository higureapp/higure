import { sdk } from '@/lib/graphql-client'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { SignInInput } from '@/gql_generated/graphql'
import useLocalStorage from './useLocalStorage'

export function useSignIn() {
    const queryClient = useQueryClient()
    const [, setToken] = useLocalStorage<string>('access_token', '')

    return useMutation({
        mutationFn: async (variables: { input: SignInInput }) => {
            return sdk.SignIn(variables)
        },
        onSuccess: (data) => {
            if (data.signIn.access_token) {
                setToken(data.signIn.access_token)

                queryClient.invalidateQueries({ queryKey: ['me'] })
            }
        },
    })
}
