import { getSdk } from '@/gql_generated/graphql'
import { GraphQLClient } from 'graphql-request'
import { getAccessToken } from './auth-store'

const client = new GraphQLClient(
    process.env.NEXT_PUBLIC_GRAPHQL_URL || 'http://localhost:3000/graphql',
    {
        headers: {
            'Content-Type': 'application/json',
        },
        credentials: 'include',
        requestMiddleware: (req) => {
            const token = getAccessToken();

            if (token) {
                req.headers = {
                    'Content-Type': 'application/json', 
                    ...req.headers,
                    ...(token && { 'Authorization': `Bearer ${token}` })
                }
            }

            return req;
        }
    },
)

export const graphqlClient = client
export const sdk = getSdk(client)
