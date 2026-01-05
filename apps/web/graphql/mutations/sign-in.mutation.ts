import { gql } from 'graphql-request'

export const SIGN_IN_MUTATION = gql`
    mutation SignIn($input: SignInInput!) {
        signIn(signInInput: $input) {
            access_token
        }
    }
`
