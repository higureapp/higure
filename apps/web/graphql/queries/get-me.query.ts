import { gql } from 'graphql-request'

export const GET_ME_QUERY = gql`
    query GetMe {
        me {
            id
            firstname
            lastname
            email
            phone
            timezone
            locale
            emailVerified
            phoneVerified
            lastLoginAt
            createdAt
            updatedAt
            avatarUrl
        }
    }
`
