import { getSdk } from '@/gql_generated/graphql'
import { getAuthToken } from '@/hooks/useAuthStore'
import { GraphQLClient } from 'graphql-request'

const client = new GraphQLClient(
    process.env.NEXT_PUBLIC_GRAPHQL_URL || 'http://localhost:3000/graphql',
    {
        headers: {
            'Content-Type': 'application/json',
        },
        credentials: 'include',
        requestMiddleware: (req) => {
            const token = getAuthToken()

            if (token) {
                req.headers = {
                    'Content-Type': 'application/json',
                    ...req.headers,
                    ...(token && { Authorization: `Bearer ${token}` }),
                }
            }

            return req
        },
    },
)

export const graphqlClient = client
export const sdk = getSdk(client)
