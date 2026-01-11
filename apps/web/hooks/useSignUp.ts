import { sdk } from '@/lib/graphql-client'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { SignUpInput } from '@/gql_generated/graphql'
import useLocalStorage from './useLocalStorage';

export function useSignUp() {
    const queryClient = useQueryClient()
    const [, setToken] = useLocalStorage<string>('access_token', '');

    return useMutation({
        mutationFn: async (variables: { input: SignUpInput }) => {
            return sdk.SignUp(variables)
        },
        onSuccess: (data) => {
            if (data.signUp.access_token) {
                setToken(data.signUp.access_token)
                queryClient.invalidateQueries({ queryKey: ['me'] })
            }
        },
    })
}
