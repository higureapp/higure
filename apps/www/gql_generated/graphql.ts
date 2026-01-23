import gql from 'graphql-tag';
import * as VueApolloComposable from '@vue/apollo-composable';
import * as VueCompositionApi from 'vue';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
export type ReactiveFunction<TParam> = () => TParam;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  /** A date-time string at UTC, such as 2019-12-03T09:54:33Z, compliant with the date-time format. */
  DateTime: { input: any; output: any; }
};

export type AuthResponse = {
  __typename?: 'AuthResponse';
  access_token: Scalars['String']['output'];
  refresh_token: Scalars['String']['output'];
};

export type Mutation = {
  __typename?: 'Mutation';
  deleteAccount: Scalars['String']['output'];
  logout: Scalars['String']['output'];
  logoutAllDevices: Scalars['String']['output'];
  refreshToken: AuthResponse;
  signIn: AuthResponse;
  signUp: SignUpResponse;
};


export type MutationLogoutArgs = {
  refreshToken?: InputMaybe<Scalars['String']['input']>;
};


export type MutationRefreshTokenArgs = {
  refreshTokenInput: RefreshTokenInput;
};


export type MutationSignInArgs = {
  signInInput: SignInInput;
};


export type MutationSignUpArgs = {
  signUpInput: SignUpInput;
};

export type Query = {
  __typename?: 'Query';
  me: User;
};

export type RefreshTokenInput = {
  /** The refresh token to use for re-authentication */
  refreshToken: Scalars['String']['input'];
};

export type SignInInput = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
};

export type SignUpInput = {
  email: Scalars['String']['input'];
  firstname: Scalars['String']['input'];
  lastname: Scalars['String']['input'];
  password: Scalars['String']['input'];
  phone?: InputMaybe<Scalars['String']['input']>;
};

export type SignUpResponse = {
  __typename?: 'SignUpResponse';
  access_token: Scalars['String']['output'];
  refresh_token: Scalars['String']['output'];
  user: User;
};

export type User = {
  __typename?: 'User';
  avatarUrl?: Maybe<Scalars['String']['output']>;
  createdAt: Scalars['DateTime']['output'];
  deletedAt?: Maybe<Scalars['DateTime']['output']>;
  email: Scalars['String']['output'];
  emailVerified: Scalars['Boolean']['output'];
  firstname: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  lastLoginAt?: Maybe<Scalars['DateTime']['output']>;
  lastname: Scalars['String']['output'];
  locale: Scalars['String']['output'];
  phone?: Maybe<Scalars['String']['output']>;
  phoneVerified: Scalars['Boolean']['output'];
  timezone: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
};

export type SignInMutationVariables = Exact<{
  input: SignInInput;
}>;


export type SignInMutation = { __typename?: 'Mutation', signIn: { __typename?: 'AuthResponse', access_token: string } };

export type SignUpMutationVariables = Exact<{
  input: SignUpInput;
}>;


export type SignUpMutation = { __typename?: 'Mutation', signUp: { __typename?: 'SignUpResponse', access_token: string, refresh_token: string } };

export type GetMeQueryVariables = Exact<{ [key: string]: never; }>;


export type GetMeQuery = { __typename?: 'Query', me: { __typename?: 'User', id: string, firstname: string, lastname: string, email: string, phone?: string | null, timezone: string, locale: string, emailVerified: boolean, phoneVerified: boolean, lastLoginAt?: any | null, createdAt: any, updatedAt: any, avatarUrl?: string | null } };


export const SignInDocument = gql`
    mutation SignIn($input: SignInInput!) {
  signIn(signInInput: $input) {
    access_token
  }
}
    `;

/**
 * __useSignInMutation__
 *
 * To run a mutation, you first call `useSignInMutation` within a Vue component and pass it any options that fit your needs.
 * When your component renders, `useSignInMutation` returns an object that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - Several other properties: https://v4.apollo.vuejs.org/api/use-mutation.html#return
 *
 * @param options that will be passed into the mutation, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/mutation.html#options;
 *
 * @example
 * const { mutate, loading, error, onDone } = useSignInMutation({
 *   variables: {
 *     input: // value for 'input'
 *   },
 * });
 */
export function useSignInMutation(options: VueApolloComposable.UseMutationOptions<SignInMutation, SignInMutationVariables> | ReactiveFunction<VueApolloComposable.UseMutationOptions<SignInMutation, SignInMutationVariables>> = {}) {
  return VueApolloComposable.useMutation<SignInMutation, SignInMutationVariables>(SignInDocument, options);
}
export type SignInMutationCompositionFunctionResult = VueApolloComposable.UseMutationReturn<SignInMutation, SignInMutationVariables>;
export const SignUpDocument = gql`
    mutation SignUp($input: SignUpInput!) {
  signUp(signUpInput: $input) {
    access_token
    refresh_token
  }
}
    `;

/**
 * __useSignUpMutation__
 *
 * To run a mutation, you first call `useSignUpMutation` within a Vue component and pass it any options that fit your needs.
 * When your component renders, `useSignUpMutation` returns an object that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - Several other properties: https://v4.apollo.vuejs.org/api/use-mutation.html#return
 *
 * @param options that will be passed into the mutation, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/mutation.html#options;
 *
 * @example
 * const { mutate, loading, error, onDone } = useSignUpMutation({
 *   variables: {
 *     input: // value for 'input'
 *   },
 * });
 */
export function useSignUpMutation(options: VueApolloComposable.UseMutationOptions<SignUpMutation, SignUpMutationVariables> | ReactiveFunction<VueApolloComposable.UseMutationOptions<SignUpMutation, SignUpMutationVariables>> = {}) {
  return VueApolloComposable.useMutation<SignUpMutation, SignUpMutationVariables>(SignUpDocument, options);
}
export type SignUpMutationCompositionFunctionResult = VueApolloComposable.UseMutationReturn<SignUpMutation, SignUpMutationVariables>;
export const GetMeDocument = gql`
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
    `;

/**
 * __useGetMeQuery__
 *
 * To run a query within a Vue component, call `useGetMeQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetMeQuery` returns an object from Apollo Client that contains result, loading and error properties
 * you can use to render your UI.
 *
 * @param options that will be passed into the query, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/query.html#options;
 *
 * @example
 * const { result, loading, error } = useGetMeQuery();
 */
export function useGetMeQuery(options: VueApolloComposable.UseQueryOptions<GetMeQuery, GetMeQueryVariables> | VueCompositionApi.Ref<VueApolloComposable.UseQueryOptions<GetMeQuery, GetMeQueryVariables>> | ReactiveFunction<VueApolloComposable.UseQueryOptions<GetMeQuery, GetMeQueryVariables>> = {}) {
  return VueApolloComposable.useQuery<GetMeQuery, GetMeQueryVariables>(GetMeDocument, {}, options);
}
export function useGetMeLazyQuery(options: VueApolloComposable.UseQueryOptions<GetMeQuery, GetMeQueryVariables> | VueCompositionApi.Ref<VueApolloComposable.UseQueryOptions<GetMeQuery, GetMeQueryVariables>> | ReactiveFunction<VueApolloComposable.UseQueryOptions<GetMeQuery, GetMeQueryVariables>> = {}) {
  return VueApolloComposable.useLazyQuery<GetMeQuery, GetMeQueryVariables>(GetMeDocument, {}, options);
}
export type GetMeQueryCompositionFunctionResult = VueApolloComposable.UseQueryReturn<GetMeQuery, GetMeQueryVariables>;