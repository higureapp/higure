import { gql } from "graphql-request";

export const GetUsers = gql`
    query GetUsers {
        users {
            id,
            firstname,
            lastname,
            email
        }
    }
`