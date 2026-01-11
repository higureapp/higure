import { sdk } from '@/lib/graphql-client'
import { useQuery } from '@tanstack/react-query'
import useLocalStorage from './useLocalStorage'

export function useGetHabitsQuery() {
    const [token] = useLocalStorage<string>('access_token', '')

    const { data, isLoading, isError, error } = useQuery({
        queryKey: ['habits'],
        queryFn: async () => {
            const result = await sdk.GetHabits()
            return result
        },
        enabled: !!token,
    })

    return {
        data,
        isLoading,
        isError,
        error,
        isLoggedIn: !!data,
    }
}
