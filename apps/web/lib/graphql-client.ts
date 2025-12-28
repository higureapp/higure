import { getSdk } from '@/gql_generated/graphql'
import { GraphQLClient } from 'graphql-request'

const client = new GraphQLClient(
    process.env.NEXT_PUBLIC_GRAPHQL_URL || 'http://localhost:3000/graphql',
    {
        headers: {
            'Content-Type': 'application/json',
        },
        credentials: 'include',
    },
)

export const graphqlClient = client
export const sdk = getSdk(client)
