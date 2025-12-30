import { GraphQLClient, RequestOptions } from 'graphql-request'
import gql from 'graphql-tag'
export type Maybe<T> = T | null
export type InputMaybe<T> = Maybe<T>
export type Exact<T extends { [key: string]: unknown }> = {
    [K in keyof T]: T[K]
}
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
    [SubKey in K]?: Maybe<T[SubKey]>
}
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
    [SubKey in K]: Maybe<T[SubKey]>
}
export type MakeEmpty<
    T extends { [key: string]: unknown },
    K extends keyof T,
> = { [_ in K]?: never }
export type Incremental<T> =
    | T
    | {
          [P in keyof T]?: P extends ' $fragmentName' | '__typename'
              ? T[P]
              : never
      }
type GraphQLClientRequestHeaders = RequestOptions['requestHeaders']
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
    ID: { input: string; output: string }
    String: { input: string; output: string }
    Boolean: { input: boolean; output: boolean }
    Int: { input: number; output: number }
    Float: { input: number; output: number }
    /** A date-time string at UTC, such as 2019-12-03T09:54:33Z, compliant with the date-time format. */
    DateTime: { input: any; output: any }
}

export type AuthResponse = {
    __typename?: 'AuthResponse'
    access_token: Scalars['String']['output']
    refresh_token: Scalars['String']['output']
}

export type Mutation = {
    __typename?: 'Mutation'
    deleteAccount: Scalars['String']['output']
    logout: Scalars['String']['output']
    logoutAllDevices: Scalars['String']['output']
    refreshToken: AuthResponse
    signIn: AuthResponse
    signUp: SignUpResponse
}

export type MutationLogoutArgs = {
    refreshToken?: InputMaybe<Scalars['String']['input']>
}

export type MutationRefreshTokenArgs = {
    refreshTokenInput: RefreshTokenInput
}

export type MutationSignInArgs = {
    signInInput: SignInInput
}

export type MutationSignUpArgs = {
    signUpInput: SignUpInput
}

export type Query = {
    __typename?: 'Query'
    me: User
}

export type RefreshTokenInput = {
    /** The refresh token to use for re-authentication */
    refreshToken: Scalars['String']['input']
}

export type SignInInput = {
    email: Scalars['String']['input']
    password: Scalars['String']['input']
}

export type SignUpInput = {
    email: Scalars['String']['input']
    firstname: Scalars['String']['input']
    lastname: Scalars['String']['input']
    password: Scalars['String']['input']
    phone?: InputMaybe<Scalars['String']['input']>
}

export type SignUpResponse = {
    __typename?: 'SignUpResponse'
    access_token: Scalars['String']['output']
    refresh_token: Scalars['String']['output']
    user: User
}

export type User = {
    __typename?: 'User'
    avatarUrl?: Maybe<Scalars['String']['output']>
    createdAt: Scalars['DateTime']['output']
    deletedAt?: Maybe<Scalars['DateTime']['output']>
    email: Scalars['String']['output']
    emailVerified: Scalars['Boolean']['output']
    firstname: Scalars['String']['output']
    id: Scalars['ID']['output']
    lastLoginAt?: Maybe<Scalars['DateTime']['output']>
    lastname: Scalars['String']['output']
    locale: Scalars['String']['output']
    phone?: Maybe<Scalars['String']['output']>
    phoneVerified: Scalars['Boolean']['output']
    timezone: Scalars['String']['output']
    updatedAt: Scalars['DateTime']['output']
}

export type SignUpMutationVariables = Exact<{ [key: string]: never }>

export type SignUpMutation = {
    __typename?: 'Mutation'
    signUp: {
        __typename?: 'SignUpResponse'
        access_token: string
        refresh_token: string
        user: {
            __typename?: 'User'
            id: string
            email: string
            firstname: string
            createdAt: any
        }
    }
}

export const SignUpDocument = gql`
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

export type SdkFunctionWrapper = <T>(
    action: (requestHeaders?: Record<string, string>) => Promise<T>,
    operationName: string,
    operationType?: string,
    variables?: any,
) => Promise<T>

const defaultWrapper: SdkFunctionWrapper = (
    action,
    _operationName,
    _operationType,
    _variables,
) => action()

export function getSdk(
    client: GraphQLClient,
    withWrapper: SdkFunctionWrapper = defaultWrapper,
) {
    return {
        SignUp(
            variables?: SignUpMutationVariables,
            requestHeaders?: GraphQLClientRequestHeaders,
            signal?: RequestInit['signal'],
        ): Promise<SignUpMutation> {
            return withWrapper(
                (wrappedRequestHeaders) =>
                    client.request<SignUpMutation>({
                        document: SignUpDocument,
                        variables,
                        requestHeaders: {
                            ...requestHeaders,
                            ...wrappedRequestHeaders,
                        },
                        signal,
                    }),
                'SignUp',
                'mutation',
                variables,
            )
        },
    }
}
export type Sdk = ReturnType<typeof getSdk>
