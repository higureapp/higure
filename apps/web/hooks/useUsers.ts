import { graphqlClient, sdk } from '@/lib/graphql-client'
import { Query, useQuery } from '@tanstack/react-query'

export function useUsers() {
    return useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const data = await sdk.GetUsers()
            return data.users
        },
    })
}
