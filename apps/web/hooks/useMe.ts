import { sdk } from '@/lib/graphql-client'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { useAuthStore, useHasHydrated } from './useAuthStore'

export function useMe() {
    const queryClient = useQueryClient()
    const token = useAuthStore(state => state.token);
    const clearToken = useAuthStore(state => state.clearToken)
    const hasHydrated = useHasHydrated()
    console.log(token)

    const { data, isLoading, isError, error } = useQuery({
        queryKey: ['me'],
        queryFn: async () => {
            const result = await sdk.GetMe()
            console.log(token);
            return result.me
        },
        enabled: !!token && hasHydrated,
    })

    const logout = () => {
        clearToken();
        queryClient.setQueryData(['me'], null)
        queryClient.removeQueries({ queryKey: ['me'] })
    }

    return {
        user: data,
        isLoading: isLoading || !hasHydrated,
        isError,
        error,
        isLoggedIn: !!data,
        logout,
    }
}
