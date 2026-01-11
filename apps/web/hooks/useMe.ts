import { sdk } from '@/lib/graphql-client'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import useLocalStorage from './useLocalStorage'

export function useMe() {
    const queryClient = useQueryClient()
    const [token, setToken] = useLocalStorage<string>('access_token', '')

    const { data, isLoading, isError, error } = useQuery({
        queryKey: ['me'],
        queryFn: async () => {
            const result = await sdk.GetMe()
            return result.me
        },
        enabled: !!token,
    })

    const logout = () => {
        setToken('')
        queryClient.setQueryData(['me'], null)
    }

    return {
        user: data,
        isLoading,
        isError,
        error,
        isLoggedIn: !!data,
        logout,
    }
}
