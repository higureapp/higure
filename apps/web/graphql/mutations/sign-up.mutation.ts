import { gql } from 'graphql-request'

export const SignUpMutation = gql`
    mutation SignUp {
        signUp(
            signUpInput: {
                email: "user@example.com"
                password: "Password123!"
                firstname: "John"
                lastname: "Doe"
            }
        ) {
            access_token
            refresh_token
            user {
                id
                email
                firstname
                createdAt
            }
        }
    }
`
