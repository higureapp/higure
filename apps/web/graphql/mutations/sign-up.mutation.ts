import { gql } from 'graphql-request'

export const SIGN_UP_MUTATION = gql`
    mutation SignUp($input: SignUpInput!) {
      signUp(signUpInput: $input) {
      	access_token,
        refresh_token
      }
    }
`
