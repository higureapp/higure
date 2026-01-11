import { GraphQLClient, RequestOptions } from 'graphql-request';
import gql from 'graphql-tag';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
type GraphQLClientRequestHeaders = RequestOptions['requestHeaders'];
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  /** A date-time string at UTC, such as 2019-12-03T09:54:33Z, compliant with the date-time format. */
  DateTime: { input: any; output: any; }
  /** The `JSONObject` scalar type represents JSON objects as specified by [ECMA-404](http://www.ecma-international.org/publications/files/ECMA-ST/ECMA-404.pdf). */
  JSONObject: { input: any; output: any; }
};

export type AuthResponse = {
  __typename?: 'AuthResponse';
  access_token: Scalars['String']['output'];
  refresh_token: Scalars['String']['output'];
};

export type CompleteHabitInput = {
  habitId: Scalars['String']['input'];
  notes?: InputMaybe<Scalars['String']['input']>;
};

export type CompletionByDay = {
  __typename?: 'CompletionByDay';
  completed: Scalars['Boolean']['output'];
  date: Scalars['DateTime']['output'];
};

export type CreateHabitInput = {
  categoryId?: InputMaybe<Scalars['String']['input']>;
  dailyRepetitions?: Scalars['Int']['input'];
  description?: InputMaybe<Scalars['String']['input']>;
  difficulty?: DifficultyLevel;
  dueDate?: InputMaybe<Scalars['DateTime']['input']>;
  frequency: FrequencyType;
  frequencyConfig: Scalars['JSONObject']['input'];
  reminderTime?: InputMaybe<Scalars['DateTime']['input']>;
  scheduledTime?: InputMaybe<Scalars['DateTime']['input']>;
  title: Scalars['String']['input'];
};

/** The difficulty level of a habit. */
export enum DifficultyLevel {
  Challenging = 'CHALLENGING',
  Demanding = 'DEMANDING',
  Easy = 'EASY',
  Hard = 'HARD',
  Normal = 'NORMAL'
}

/** The frequency type of a habit. */
export enum FrequencyType {
  Daily = 'DAILY',
  EveryNDays = 'EVERY_N_DAYS',
  NTimesPerWeek = 'N_TIMES_PER_WEEK',
  SpecificDaysOfMonth = 'SPECIFIC_DAYS_OF_MONTH',
  SpecificDaysOfWeek = 'SPECIFIC_DAYS_OF_WEEK'
}

export type GetHabitStatsInput = {
  habitId: Scalars['String']['input'];
  period: StatsPeriod;
};

export type Habit = {
  __typename?: 'Habit';
  category?: Maybe<HabitCategory>;
  completions?: Maybe<Array<Maybe<HabitCompletion>>>;
  createdAt: Scalars['DateTime']['output'];
  dailyRepetitions: Scalars['Int']['output'];
  description?: Maybe<Scalars['String']['output']>;
  difficulty: DifficultyLevel;
  dueDate?: Maybe<Scalars['DateTime']['output']>;
  frequency: FrequencyType;
  frequencyConfig: Scalars['JSONObject']['output'];
  id: Scalars['ID']['output'];
  isActive: Scalars['Boolean']['output'];
  reminderTime?: Maybe<Scalars['DateTime']['output']>;
  scheduledTime?: Maybe<Scalars['DateTime']['output']>;
  streakCount: Scalars['Int']['output'];
  title: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
};

export type HabitCategory = {
  __typename?: 'HabitCategory';
  color?: Maybe<Scalars['String']['output']>;
  habits?: Maybe<Array<Maybe<Habit>>>;
  icon?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
};

export type HabitCompletion = {
  __typename?: 'HabitCompletion';
  completedAt: Scalars['DateTime']['output'];
  habit: Habit;
  id: Scalars['ID']['output'];
  notes?: Maybe<Scalars['String']['output']>;
};

export type HabitFilters = {
  isActive?: InputMaybe<Scalars['Boolean']['input']>;
};

export type HabitStatsResponse = {
  __typename?: 'HabitStatsResponse';
  completionRate: Scalars['Float']['output'];
  completionsByDay: Array<CompletionByDay>;
  currentStreak: Scalars['Int']['output'];
  longestStreak: Scalars['Int']['output'];
  totalCompletions: Scalars['Int']['output'];
};

export type Mutation = {
  __typename?: 'Mutation';
  completeHabit: HabitCompletion;
  createHabit: Habit;
  deleteAccount: Scalars['String']['output'];
  logout: Scalars['String']['output'];
  logoutAllDevices: Scalars['String']['output'];
  refreshToken: AuthResponse;
  signIn: AuthResponse;
  signUp: SignUpResponse;
};


export type MutationCompleteHabitArgs = {
  input: CompleteHabitInput;
};


export type MutationCreateHabitArgs = {
  input: CreateHabitInput;
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
  habitStats: HabitStatsResponse;
  habits: Array<Habit>;
  me: User;
};


export type QueryHabitStatsArgs = {
  input: GetHabitStatsInput;
};


export type QueryHabitsArgs = {
  filters?: InputMaybe<HabitFilters>;
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

export enum StatsPeriod {
  Month = 'MONTH',
  Week = 'WEEK',
  Year = 'YEAR'
}

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

export type CompleteHabitMutationVariables = Exact<{
  input: CompleteHabitInput;
}>;


export type CompleteHabitMutation = { __typename?: 'Mutation', completeHabit: { __typename?: 'HabitCompletion', id: string, completedAt: any, notes?: string | null, habit: { __typename?: 'Habit', id: string, streakCount: number } } };

export type CreateHabitMutationVariables = Exact<{
  input: CreateHabitInput;
}>;


export type CreateHabitMutation = { __typename?: 'Mutation', createHabit: { __typename?: 'Habit', id: string, title: string, description?: string | null, frequency: FrequencyType, frequencyConfig: any, dailyRepetitions: number, scheduledTime?: any | null, reminderTime?: any | null, difficulty: DifficultyLevel, dueDate?: any | null, isActive: boolean, streakCount: number, createdAt: any, updatedAt: any } };

export type SignInMutationVariables = Exact<{
  input: SignInInput;
}>;


export type SignInMutation = { __typename?: 'Mutation', signIn: { __typename?: 'AuthResponse', access_token: string } };

export type SignUpMutationVariables = Exact<{
  input: SignUpInput;
}>;


export type SignUpMutation = { __typename?: 'Mutation', signUp: { __typename?: 'SignUpResponse', access_token: string, refresh_token: string } };

export type GetHabitStatsQueryVariables = Exact<{
  habitId: Scalars['String']['input'];
  period: StatsPeriod;
}>;


export type GetHabitStatsQuery = { __typename?: 'Query', habitStats: { __typename?: 'HabitStatsResponse', completionRate: number, currentStreak: number, longestStreak: number, totalCompletions: number, completionsByDay: Array<{ __typename?: 'CompletionByDay', date: any, completed: boolean }> } };

export type GetHabitsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetHabitsQuery = { __typename?: 'Query', habits: Array<{ __typename?: 'Habit', id: string, title: string, description?: string | null, frequency: FrequencyType, frequencyConfig: any, dailyRepetitions: number, scheduledTime?: any | null, reminderTime?: any | null, difficulty: DifficultyLevel, dueDate?: any | null, isActive: boolean, streakCount: number, createdAt: any, updatedAt: any }> };

export type GetMeQueryVariables = Exact<{ [key: string]: never; }>;


export type GetMeQuery = { __typename?: 'Query', me: { __typename?: 'User', id: string, firstname: string, lastname: string, email: string, phone?: string | null, timezone: string, locale: string, emailVerified: boolean, phoneVerified: boolean, lastLoginAt?: any | null, createdAt: any, updatedAt: any, avatarUrl?: string | null } };


export const CompleteHabitDocument = gql`
    mutation CompleteHabit($input: CompleteHabitInput!) {
  completeHabit(input: $input) {
    id
    completedAt
    notes
    habit {
      id
      streakCount
    }
  }
}
    `;
export const CreateHabitDocument = gql`
    mutation CreateHabit($input: CreateHabitInput!) {
  createHabit(input: $input) {
    id
    title
    description
    frequency
    frequencyConfig
    dailyRepetitions
    scheduledTime
    reminderTime
    difficulty
    dueDate
    isActive
    streakCount
    createdAt
    updatedAt
  }
}
    `;
export const SignInDocument = gql`
    mutation SignIn($input: SignInInput!) {
  signIn(signInInput: $input) {
    access_token
  }
}
    `;
export const SignUpDocument = gql`
    mutation SignUp($input: SignUpInput!) {
  signUp(signUpInput: $input) {
    access_token
    refresh_token
  }
}
    `;
export const GetHabitStatsDocument = gql`
    query GetHabitStats($habitId: String!, $period: StatsPeriod!) {
  habitStats(input: {habitId: $habitId, period: $period}) {
    completionRate
    currentStreak
    longestStreak
    totalCompletions
    completionsByDay {
      date
      completed
    }
  }
}
    `;
export const GetHabitsDocument = gql`
    query GetHabits {
  habits {
    id
    title
    description
    frequency
    frequencyConfig
    dailyRepetitions
    scheduledTime
    reminderTime
    difficulty
    dueDate
    isActive
    streakCount
    createdAt
    updatedAt
  }
}
    `;
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

export type SdkFunctionWrapper = <T>(action: (requestHeaders?:Record<string, string>) => Promise<T>, operationName: string, operationType?: string, variables?: any) => Promise<T>;


const defaultWrapper: SdkFunctionWrapper = (action, _operationName, _operationType, _variables) => action();

export function getSdk(client: GraphQLClient, withWrapper: SdkFunctionWrapper = defaultWrapper) {
  return {
    CompleteHabit(variables: CompleteHabitMutationVariables, requestHeaders?: GraphQLClientRequestHeaders, signal?: RequestInit['signal']): Promise<CompleteHabitMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<CompleteHabitMutation>({ document: CompleteHabitDocument, variables, requestHeaders: { ...requestHeaders, ...wrappedRequestHeaders }, signal }), 'CompleteHabit', 'mutation', variables);
    },
    CreateHabit(variables: CreateHabitMutationVariables, requestHeaders?: GraphQLClientRequestHeaders, signal?: RequestInit['signal']): Promise<CreateHabitMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<CreateHabitMutation>({ document: CreateHabitDocument, variables, requestHeaders: { ...requestHeaders, ...wrappedRequestHeaders }, signal }), 'CreateHabit', 'mutation', variables);
    },
    SignIn(variables: SignInMutationVariables, requestHeaders?: GraphQLClientRequestHeaders, signal?: RequestInit['signal']): Promise<SignInMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<SignInMutation>({ document: SignInDocument, variables, requestHeaders: { ...requestHeaders, ...wrappedRequestHeaders }, signal }), 'SignIn', 'mutation', variables);
    },
    SignUp(variables: SignUpMutationVariables, requestHeaders?: GraphQLClientRequestHeaders, signal?: RequestInit['signal']): Promise<SignUpMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<SignUpMutation>({ document: SignUpDocument, variables, requestHeaders: { ...requestHeaders, ...wrappedRequestHeaders }, signal }), 'SignUp', 'mutation', variables);
    },
    GetHabitStats(variables: GetHabitStatsQueryVariables, requestHeaders?: GraphQLClientRequestHeaders, signal?: RequestInit['signal']): Promise<GetHabitStatsQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetHabitStatsQuery>({ document: GetHabitStatsDocument, variables, requestHeaders: { ...requestHeaders, ...wrappedRequestHeaders }, signal }), 'GetHabitStats', 'query', variables);
    },
    GetHabits(variables?: GetHabitsQueryVariables, requestHeaders?: GraphQLClientRequestHeaders, signal?: RequestInit['signal']): Promise<GetHabitsQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetHabitsQuery>({ document: GetHabitsDocument, variables, requestHeaders: { ...requestHeaders, ...wrappedRequestHeaders }, signal }), 'GetHabits', 'query', variables);
    },
    GetMe(variables?: GetMeQueryVariables, requestHeaders?: GraphQLClientRequestHeaders, signal?: RequestInit['signal']): Promise<GetMeQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetMeQuery>({ document: GetMeDocument, variables, requestHeaders: { ...requestHeaders, ...wrappedRequestHeaders }, signal }), 'GetMe', 'query', variables);
    }
  };
}
export type Sdk = ReturnType<typeof getSdk>;