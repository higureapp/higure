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

export type Query = {
    __typename?: 'Query'
    findUser: User
    users: Array<User>
}

export type QueryFindUserArgs = {
    id: Scalars['String']['input']
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

export type GetUsersQueryVariables = Exact<{ [key: string]: never }>

export type GetUsersQuery = {
    __typename?: 'Query'
    users: Array<{
        __typename?: 'User'
        id: string
        firstname: string
        lastname: string
        email: string
    }>
}

export const GetUsersDocument = gql`
    query GetUsers {
        users {
            id
            firstname
            lastname
            email
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
        GetUsers(
            variables?: GetUsersQueryVariables,
            requestHeaders?: GraphQLClientRequestHeaders,
            signal?: RequestInit['signal'],
        ): Promise<GetUsersQuery> {
            return withWrapper(
                (wrappedRequestHeaders) =>
                    client.request<GetUsersQuery>({
                        document: GetUsersDocument,
                        variables,
                        requestHeaders: {
                            ...requestHeaders,
                            ...wrappedRequestHeaders,
                        },
                        signal,
                    }),
                'GetUsers',
                'query',
                variables,
            )
        },
    }
}
export type Sdk = ReturnType<typeof getSdk>
