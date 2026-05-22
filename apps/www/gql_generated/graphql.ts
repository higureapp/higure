import gql from 'graphql-tag'
import * as VueApolloComposable from '@vue/apollo-composable'
import * as VueCompositionApi from 'vue'
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
export type ReactiveFunction<TParam> = () => TParam
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

export type AnalysisModel = {
    __typename?: 'AnalysisModel'
    criticalAnalysis: Scalars['String']['output']
    generatedAt: Scalars['DateTime']['output']
    id: Scalars['String']['output']
    journalPageId: Scalars['String']['output']
    metrics?: Maybe<JournalMetrics>
    modelVersion: Scalars['String']['output']
    quote?: Maybe<Scalars['String']['output']>
    quoteAuthor?: Maybe<Scalars['String']['output']>
    suggestedSongs: Array<SongsModel>
}

export type AuthResponse = {
    __typename?: 'AuthResponse'
    access_token: Scalars['String']['output']
    refresh_token: Scalars['String']['output']
}

export type CreateJournalInput = {
    content: Scalars['String']['input']
    date: Scalars['DateTime']['input']
    location?: InputMaybe<Scalars['String']['input']>
    mood?: Scalars['Int']['input']
    tagIds?: InputMaybe<Array<Scalars['String']['input']>>
    time?: InputMaybe<Scalars['DateTime']['input']>
}

export type GetJournalPagesOutput = {
    __typename?: 'GetJournalPagesOutput'
    currentPage: Scalars['Int']['output']
    hasMore: Scalars['Boolean']['output']
    pages: Array<Journal>
    totalCount: Scalars['Int']['output']
    totalPages: Scalars['Int']['output']
}

export type Journal = {
    __typename?: 'Journal'
    aiAnalysis?: Maybe<JournalAiAnalysis>
    content: Scalars['String']['output']
    createdAt: Scalars['DateTime']['output']
    date: Scalars['DateTime']['output']
    id: Scalars['ID']['output']
    isActive: Scalars['Boolean']['output']
    lastModified: Scalars['DateTime']['output']
    location?: Maybe<Scalars['String']['output']>
    metrics?: Maybe<JournalMetrics>
    mood: Scalars['Int']['output']
    tags: Array<JournalTag>
    time?: Maybe<Scalars['DateTime']['output']>
    updatedAt: Scalars['DateTime']['output']
}

export type JournalAiAnalysis = {
    __typename?: 'JournalAIAnalysis'
    criticalAnalysis: Scalars['String']['output']
    generatedAt: Scalars['DateTime']['output']
    modelVersion: Scalars['String']['output']
    quote?: Maybe<Scalars['String']['output']>
    quoteAuthor?: Maybe<Scalars['String']['output']>
    suggestedSongs: Array<SuggestedSong>
}

export type JournalMetrics = {
    __typename?: 'JournalMetrics'
    averageSentenceLength: Scalars['Float']['output']
    causeEffectCount: Scalars['Int']['output']
    charactersCount: Scalars['Int']['output']
    emotionalIntensity: Scalars['Float']['output']
    emotionalValence: Scalars['Float']['output']
    emotionalVariability: Scalars['Float']['output']
    emotionalWordsCount: Scalars['Int']['output']
    estimatedWritingTime: Scalars['Int']['output']
    eventsCount: Scalars['Int']['output']
    firstPersonUsage: Scalars['Float']['output']
    formality: Scalars['Float']['output']
    introspectionIndex: Scalars['Float']['output']
    keyRepetitionsCount: Scalars['Int']['output']
    lexicalRichness: Scalars['Float']['output']
    metaphorsCount: Scalars['Int']['output']
    narrativeSequentiality: Scalars['Float']['output']
    paragraphCount: Scalars['Int']['output']
    questionsCount: Scalars['Int']['output']
    sentenceCount: Scalars['Int']['output']
    temporalFocus: Scalars['Float']['output']
    temporalReferencesCount: Scalars['Int']['output']
    textDensity: Scalars['Float']['output']
    wordCount: Scalars['Int']['output']
}

export type JournalPageFilters = {
    dateFrom?: InputMaybe<Scalars['DateTime']['input']>
    dateTo?: InputMaybe<Scalars['DateTime']['input']>
    isActive?: InputMaybe<Scalars['Boolean']['input']>
    location?: InputMaybe<Scalars['String']['input']>
    moodMax?: InputMaybe<Scalars['Int']['input']>
    moodMin?: InputMaybe<Scalars['Int']['input']>
    searchTerm?: InputMaybe<Scalars['String']['input']>
    tags?: InputMaybe<Array<Scalars['String']['input']>>
}

export type JournalPaginationInput = {
    limit?: InputMaybe<Scalars['Int']['input']>
    page?: InputMaybe<Scalars['Int']['input']>
}

export type JournalTag = {
    __typename?: 'JournalTag'
    color?: Maybe<Scalars['String']['output']>
    id: Scalars['ID']['output']
    name: Scalars['String']['output']
}

export type Mutation = {
    __typename?: 'Mutation'
    clearSearchHistory: Scalars['Float']['output']
    createAnalysis: AnalysisModel
    /** Create a new journal page */
    createJournalPage: Journal
    createReflection: ReflectionModel
    deleteAccount: Scalars['String']['output']
    deleteAnalysis?: Maybe<AnalysisModel>
    /** Permanently delete a journal page */
    deleteJournalPage: Scalars['Boolean']['output']
    deleteReflection?: Maybe<ReflectionModel>
    deleteSearchHistoryItem?: Maybe<SearchHistoryItemModel>
    logout: Scalars['String']['output']
    logoutAllDevices: Scalars['String']['output']
    refreshToken: AuthResponse
    regenerateAnalysis: AnalysisModel
    /** Restore a soft-deleted journal page */
    restoreJournalPage: Journal
    signIn: AuthResponse
    signUp: SignUpResponse
    /** Soft delete a journal page (set isActive to false) */
    softDeleteJournalPage: Journal
    /** Update an existing journal page */
    updateJournalPage: Journal
}

export type MutationCreateAnalysisArgs = {
    journalId: Scalars['ID']['input']
}

export type MutationCreateJournalPageArgs = {
    input: CreateJournalInput
}

export type MutationCreateReflectionArgs = {
    journalId: Scalars['ID']['input']
    type: ReflectionType
}

export type MutationDeleteAnalysisArgs = {
    id: Scalars['ID']['input']
}

export type MutationDeleteJournalPageArgs = {
    id: Scalars['ID']['input']
}

export type MutationDeleteReflectionArgs = {
    id: Scalars['ID']['input']
}

export type MutationDeleteSearchHistoryItemArgs = {
    id: Scalars['ID']['input']
}

export type MutationLogoutArgs = {
    refreshToken?: InputMaybe<Scalars['String']['input']>
}

export type MutationRefreshTokenArgs = {
    refreshTokenInput: RefreshTokenInput
}

export type MutationRegenerateAnalysisArgs = {
    analysisId: Scalars['ID']['input']
}

export type MutationRestoreJournalPageArgs = {
    id: Scalars['ID']['input']
}

export type MutationSignInArgs = {
    signInInput: SignInInput
}

export type MutationSignUpArgs = {
    signUpInput: SignUpInput
}

export type MutationSoftDeleteJournalPageArgs = {
    id: Scalars['ID']['input']
}

export type MutationUpdateJournalPageArgs = {
    id: Scalars['ID']['input']
    input: UpdateJournalInput
}

export type Query = {
    __typename?: 'Query'
    availableReflectionTypes: Array<ReflectionTypeInfo>
    getAllReflections: Array<ReflectionModel>
    getAnalysisByJournalPage?: Maybe<AnalysisModel>
    getReflection?: Maybe<ReflectionModel>
    /** Get a single journal page by ID */
    journalPage: Journal
    /** Get journal pages with filters and pagination */
    journalPages: GetJournalPagesOutput
    me: User
    searchHistory: Array<SearchHistoryItemModel>
    searchJournals: SearchResponseModel
}

export type QueryGetAllReflectionsArgs = {
    journalPageId: Scalars['ID']['input']
}

export type QueryGetAnalysisByJournalPageArgs = {
    journalPageId: Scalars['ID']['input']
}

export type QueryGetReflectionArgs = {
    journalPageId: Scalars['ID']['input']
    type: ReflectionType
}

export type QueryJournalPageArgs = {
    id: Scalars['ID']['input']
}

export type QueryJournalPagesArgs = {
    filters?: InputMaybe<JournalPageFilters>
    pagination?: InputMaybe<JournalPaginationInput>
}

export type QuerySearchJournalsArgs = {
    query: Scalars['String']['input']
    saveToHistory?: InputMaybe<Scalars['Boolean']['input']>
}

export type ReflectionModel = {
    __typename?: 'ReflectionModel'
    content: Scalars['String']['output']
    generatedAt: Scalars['DateTime']['output']
    id: Scalars['String']['output']
    journalPageId: Scalars['String']['output']
    keyInsights: Array<Scalars['String']['output']>
    modelVersion: Scalars['String']['output']
    suggestedQuestion: Scalars['String']['output']
    type: ReflectionType
}

/** The type/style of reflection to generate */
export enum ReflectionType {
    AmbitionFocused = 'AMBITION_FOCUSED',
    ContentmentFocused = 'CONTENTMENT_FOCUSED',
    Critical = 'CRITICAL',
    Cynical = 'CYNICAL',
    Empathetic = 'EMPATHETIC',
    Existential = 'EXISTENTIAL',
    FutureOriented = 'FUTURE_ORIENTED',
    IntegrationFocused = 'INTEGRATION_FOCUSED',
    Mindful = 'MINDFUL',
    Narrative = 'NARRATIVE',
    PastOriented = 'PAST_ORIENTED',
    Philosophical = 'PHILOSOPHICAL',
    Playful = 'PLAYFUL',
    Pragmatic = 'PRAGMATIC',
    Psychological = 'PSYCHOLOGICAL',
    Romantic = 'ROMANTIC',
    ShadowFocused = 'SHADOW_FOCUSED',
    Social = 'SOCIAL',
    Spiritual = 'SPIRITUAL',
    Stoic = 'STOIC',
}

export type ReflectionTypeInfo = {
    __typename?: 'ReflectionTypeInfo'
    description: Scalars['String']['output']
    icon: Scalars['String']['output']
    label: Scalars['String']['output']
    type: ReflectionType
}

export type RefreshTokenInput = {
    /** The refresh token to use for re-authentication */
    refreshToken: Scalars['String']['input']
}

export type SearchConceptModel = {
    __typename?: 'SearchConceptModel'
    concept: Scalars['String']['output']
    synonyms: Array<Scalars['String']['output']>
}

export type SearchDateFilterModel = {
    __typename?: 'SearchDateFilterModel'
    fromDate?: Maybe<Scalars['String']['output']>
    relativeDescription?: Maybe<Scalars['String']['output']>
    toDate?: Maybe<Scalars['String']['output']>
}

export type SearchHighlightModel = {
    __typename?: 'SearchHighlightModel'
    endIndex: Scalars['Float']['output']
    matchedText: Scalars['String']['output']
    matchingConcept: Scalars['String']['output']
    startIndex: Scalars['Float']['output']
}

export type SearchHistoryItemModel = {
    __typename?: 'SearchHistoryItemModel'
    executedAt: Scalars['DateTime']['output']
    id: Scalars['String']['output']
    query: Scalars['String']['output']
    resultCount: Scalars['Float']['output']
}

export type SearchQueryAnalysisModel = {
    __typename?: 'SearchQueryAnalysisModel'
    concepts: Array<SearchConceptModel>
    dateFilter: SearchDateFilterModel
    explicitKeywords: Array<Scalars['String']['output']>
    language: Scalars['String']['output']
    originalQuery: Scalars['String']['output']
    requiresSemanticSearch: Scalars['Boolean']['output']
}

export type SearchResponseModel = {
    __typename?: 'SearchResponseModel'
    queryAnalysis: SearchQueryAnalysisModel
    results: Array<SearchResultModel>
    searchDurationMs?: Maybe<Scalars['Float']['output']>
    totalMatches: Scalars['Float']['output']
}

export type SearchResultModel = {
    __typename?: 'SearchResultModel'
    contentPreview?: Maybe<Scalars['String']['output']>
    date: Scalars['String']['output']
    highlights: Array<SearchHighlightModel>
    journalPageId: Scalars['String']['output']
    location?: Maybe<Scalars['String']['output']>
    mood?: Maybe<Scalars['Float']['output']>
    relevanceScore: Scalars['Float']['output']
    summary: Scalars['String']['output']
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

export type SongsModel = {
    __typename?: 'SongsModel'
    album: Scalars['String']['output']
    author: Scalars['String']['output']
    coverUrl?: Maybe<Scalars['String']['output']>
    minutes: Scalars['Float']['output']
    reason: Scalars['String']['output']
    spotifyUrl: Scalars['String']['output']
    title: Scalars['String']['output']
}

export type SuggestedSong = {
    __typename?: 'SuggestedSong'
    artist: Scalars['String']['output']
    reason: Scalars['String']['output']
    title: Scalars['String']['output']
}

export type UpdateJournalInput = {
    content?: InputMaybe<Scalars['String']['input']>
    date?: InputMaybe<Scalars['DateTime']['input']>
    isActive?: InputMaybe<Scalars['Boolean']['input']>
    location?: InputMaybe<Scalars['String']['input']>
    mood?: InputMaybe<Scalars['Int']['input']>
    tagIds?: InputMaybe<Array<Scalars['String']['input']>>
    time?: InputMaybe<Scalars['DateTime']['input']>
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

export type AnalysisFieldsFragment = {
    __typename?: 'AnalysisModel'
    id: string
    journalPageId: string
    criticalAnalysis: string
    quote?: string | null
    quoteAuthor?: string | null
    generatedAt: any
    modelVersion: string
    suggestedSongs: Array<{
        __typename?: 'SongsModel'
        spotifyUrl: string
        title: string
        album: string
        author: string
        minutes: number
        coverUrl?: string | null
    }>
    metrics?: {
        __typename?: 'JournalMetrics'
        wordCount: number
        sentenceCount: number
        averageSentenceLength: number
        paragraphCount: number
        textDensity: number
        estimatedWritingTime: number
        temporalReferencesCount: number
        temporalFocus: number
        emotionalValence: number
        emotionalIntensity: number
        emotionalVariability: number
        emotionalWordsCount: number
        introspectionIndex: number
        questionsCount: number
        causeEffectCount: number
        eventsCount: number
        charactersCount: number
        firstPersonUsage: number
        narrativeSequentiality: number
        lexicalRichness: number
        keyRepetitionsCount: number
        metaphorsCount: number
        formality: number
    } | null
}

export type ReflectionFieldsFragment = {
    __typename?: 'ReflectionModel'
    id: string
    journalPageId: string
    type: ReflectionType
    content: string
    keyInsights: Array<string>
    suggestedQuestion: string
    generatedAt: any
    modelVersion: string
}

export type ReflectionTypeInfoFieldsFragment = {
    __typename?: 'ReflectionTypeInfo'
    type: ReflectionType
    label: string
    description: string
    icon: string
}

export type SearchHighlightFieldsFragment = {
    __typename?: 'SearchHighlightModel'
    matchedText: string
    startIndex: number
    endIndex: number
    matchingConcept: string
}

export type SearchResultFieldsFragment = {
    __typename?: 'SearchResultModel'
    journalPageId: string
    date: string
    relevanceScore: number
    summary: string
    location?: string | null
    mood?: number | null
    contentPreview?: string | null
    highlights: Array<{
        __typename?: 'SearchHighlightModel'
        matchedText: string
        startIndex: number
        endIndex: number
        matchingConcept: string
    }>
}

export type SearchResponseFieldsFragment = {
    __typename?: 'SearchResponseModel'
    totalMatches: number
    searchDurationMs?: number | null
    results: Array<{
        __typename?: 'SearchResultModel'
        journalPageId: string
        date: string
        relevanceScore: number
        summary: string
        location?: string | null
        mood?: number | null
        contentPreview?: string | null
        highlights: Array<{
            __typename?: 'SearchHighlightModel'
            matchedText: string
            startIndex: number
            endIndex: number
            matchingConcept: string
        }>
    }>
}

export type SearchHistoryItemFieldsFragment = {
    __typename?: 'SearchHistoryItemModel'
    id: string
    query: string
    executedAt: any
    resultCount: number
}

export type ClearSearchHistoryMutationVariables = Exact<{
    [key: string]: never
}>

export type ClearSearchHistoryMutation = {
    __typename?: 'Mutation'
    clearSearchHistory: number
}

export type CreateAnalysisMutationVariables = Exact<{
    journalId: Scalars['ID']['input']
}>

export type CreateAnalysisMutation = {
    __typename?: 'Mutation'
    createAnalysis: {
        __typename?: 'AnalysisModel'
        id: string
        journalPageId: string
        criticalAnalysis: string
        quote?: string | null
        quoteAuthor?: string | null
        generatedAt: any
        modelVersion: string
        suggestedSongs: Array<{
            __typename?: 'SongsModel'
            spotifyUrl: string
            title: string
            album: string
            author: string
            minutes: number
            coverUrl?: string | null
        }>
        metrics?: {
            __typename?: 'JournalMetrics'
            wordCount: number
            sentenceCount: number
            averageSentenceLength: number
            paragraphCount: number
            textDensity: number
            estimatedWritingTime: number
            temporalReferencesCount: number
            temporalFocus: number
            emotionalValence: number
            emotionalIntensity: number
            emotionalVariability: number
            emotionalWordsCount: number
            introspectionIndex: number
            questionsCount: number
            causeEffectCount: number
            eventsCount: number
            charactersCount: number
            firstPersonUsage: number
            narrativeSequentiality: number
            lexicalRichness: number
            keyRepetitionsCount: number
            metaphorsCount: number
            formality: number
        } | null
    }
}

export type CreateJournalPageMutationVariables = Exact<{
    input: CreateJournalInput
}>

export type CreateJournalPageMutation = {
    __typename?: 'Mutation'
    createJournalPage: {
        __typename?: 'Journal'
        id: string
        date: any
        content: string
        mood: number
        tags: Array<{
            __typename?: 'JournalTag'
            id: string
            name: string
            color?: string | null
        }>
    }
}

export type CreateReflectionMutationVariables = Exact<{
    journalId: Scalars['ID']['input']
    type: ReflectionType
}>

export type CreateReflectionMutation = {
    __typename?: 'Mutation'
    createReflection: {
        __typename?: 'ReflectionModel'
        id: string
        journalPageId: string
        type: ReflectionType
        content: string
        keyInsights: Array<string>
        suggestedQuestion: string
        generatedAt: any
        modelVersion: string
    }
}

export type DeleteAnalysisMutationVariables = Exact<{
    id: Scalars['ID']['input']
}>

export type DeleteAnalysisMutation = {
    __typename?: 'Mutation'
    deleteAnalysis?: {
        __typename?: 'AnalysisModel'
        id: string
        journalPageId: string
        criticalAnalysis: string
        quote?: string | null
        quoteAuthor?: string | null
        generatedAt: any
        modelVersion: string
        suggestedSongs: Array<{
            __typename?: 'SongsModel'
            spotifyUrl: string
            title: string
            album: string
            author: string
            minutes: number
            coverUrl?: string | null
        }>
        metrics?: {
            __typename?: 'JournalMetrics'
            wordCount: number
            sentenceCount: number
            averageSentenceLength: number
            paragraphCount: number
            textDensity: number
            estimatedWritingTime: number
            temporalReferencesCount: number
            temporalFocus: number
            emotionalValence: number
            emotionalIntensity: number
            emotionalVariability: number
            emotionalWordsCount: number
            introspectionIndex: number
            questionsCount: number
            causeEffectCount: number
            eventsCount: number
            charactersCount: number
            firstPersonUsage: number
            narrativeSequentiality: number
            lexicalRichness: number
            keyRepetitionsCount: number
            metaphorsCount: number
            formality: number
        } | null
    } | null
}

export type DeleteSearchHistoryItemMutationVariables = Exact<{
    id: Scalars['ID']['input']
}>

export type DeleteSearchHistoryItemMutation = {
    __typename?: 'Mutation'
    deleteSearchHistoryItem?: {
        __typename?: 'SearchHistoryItemModel'
        id: string
        query: string
    } | null
}

export type DeleteJournalPageMutationVariables = Exact<{
    id: Scalars['ID']['input']
}>

export type DeleteJournalPageMutation = {
    __typename?: 'Mutation'
    deleteJournalPage: boolean
}

export type RegenerateAnalysisMutationVariables = Exact<{
    analysisId: Scalars['ID']['input']
}>

export type RegenerateAnalysisMutation = {
    __typename?: 'Mutation'
    regenerateAnalysis: {
        __typename?: 'AnalysisModel'
        id: string
        journalPageId: string
        criticalAnalysis: string
        quote?: string | null
        quoteAuthor?: string | null
        generatedAt: any
        modelVersion: string
        suggestedSongs: Array<{
            __typename?: 'SongsModel'
            spotifyUrl: string
            title: string
            album: string
            author: string
            minutes: number
            coverUrl?: string | null
        }>
        metrics?: {
            __typename?: 'JournalMetrics'
            wordCount: number
            sentenceCount: number
            averageSentenceLength: number
            paragraphCount: number
            textDensity: number
            estimatedWritingTime: number
            temporalReferencesCount: number
            temporalFocus: number
            emotionalValence: number
            emotionalIntensity: number
            emotionalVariability: number
            emotionalWordsCount: number
            introspectionIndex: number
            questionsCount: number
            causeEffectCount: number
            eventsCount: number
            charactersCount: number
            firstPersonUsage: number
            narrativeSequentiality: number
            lexicalRichness: number
            keyRepetitionsCount: number
            metaphorsCount: number
            formality: number
        } | null
    }
}

export type RestoreJournalPageMutationVariables = Exact<{
    id: Scalars['ID']['input']
}>

export type RestoreJournalPageMutation = {
    __typename?: 'Mutation'
    restoreJournalPage: {
        __typename?: 'Journal'
        id: string
        isActive: boolean
    }
}

export type SignInMutationVariables = Exact<{
    input: SignInInput
}>

export type SignInMutation = {
    __typename?: 'Mutation'
    signIn: { __typename?: 'AuthResponse'; access_token: string }
}

export type SignUpMutationVariables = Exact<{
    input: SignUpInput
}>

export type SignUpMutation = {
    __typename?: 'Mutation'
    signUp: {
        __typename?: 'SignUpResponse'
        access_token: string
        refresh_token: string
    }
}

export type SoftDeleteJournalPageMutationVariables = Exact<{
    id: Scalars['ID']['input']
}>

export type SoftDeleteJournalPageMutation = {
    __typename?: 'Mutation'
    softDeleteJournalPage: {
        __typename?: 'Journal'
        id: string
        isActive: boolean
    }
}

export type UpdateJournalPageMutationVariables = Exact<{
    id: Scalars['ID']['input']
    input: UpdateJournalInput
}>

export type UpdateJournalPageMutation = {
    __typename?: 'Mutation'
    updateJournalPage: {
        __typename?: 'Journal'
        id: string
        date: any
        content: string
        mood: number
        lastModified: any
        tags: Array<{
            __typename?: 'JournalTag'
            name: string
            color?: string | null
        }>
    }
}

export type AvailableReflectionTypesQueryVariables = Exact<{
    [key: string]: never
}>

export type AvailableReflectionTypesQuery = {
    __typename?: 'Query'
    availableReflectionTypes: Array<{
        __typename?: 'ReflectionTypeInfo'
        type: ReflectionType
        label: string
        description: string
        icon: string
    }>
}

export type GetAnalysisByJournalPageQueryVariables = Exact<{
    journalPageId: Scalars['ID']['input']
}>

export type GetAnalysisByJournalPageQuery = {
    __typename?: 'Query'
    getAnalysisByJournalPage?: {
        __typename?: 'AnalysisModel'
        id: string
        journalPageId: string
        criticalAnalysis: string
        quote?: string | null
        quoteAuthor?: string | null
        generatedAt: any
        modelVersion: string
        suggestedSongs: Array<{
            __typename?: 'SongsModel'
            spotifyUrl: string
            title: string
            album: string
            author: string
            minutes: number
            coverUrl?: string | null
        }>
        metrics?: {
            __typename?: 'JournalMetrics'
            wordCount: number
            sentenceCount: number
            averageSentenceLength: number
            paragraphCount: number
            textDensity: number
            estimatedWritingTime: number
            temporalReferencesCount: number
            temporalFocus: number
            emotionalValence: number
            emotionalIntensity: number
            emotionalVariability: number
            emotionalWordsCount: number
            introspectionIndex: number
            questionsCount: number
            causeEffectCount: number
            eventsCount: number
            charactersCount: number
            firstPersonUsage: number
            narrativeSequentiality: number
            lexicalRichness: number
            keyRepetitionsCount: number
            metaphorsCount: number
            formality: number
        } | null
    } | null
}

export type GetJournalPageQueryVariables = Exact<{
    id: Scalars['ID']['input']
}>

export type GetJournalPageQuery = {
    __typename?: 'Query'
    journalPage: {
        __typename?: 'Journal'
        id: string
        date: any
        time?: any | null
        location?: string | null
        content: string
        mood: number
        isActive: boolean
        tags: Array<{
            __typename?: 'JournalTag'
            id: string
            name: string
            color?: string | null
        }>
        metrics?: {
            __typename?: 'JournalMetrics'
            wordCount: number
            sentenceCount: number
            averageSentenceLength: number
            paragraphCount: number
            textDensity: number
            estimatedWritingTime: number
            temporalReferencesCount: number
            temporalFocus: number
            emotionalValence: number
            emotionalIntensity: number
            emotionalVariability: number
            emotionalWordsCount: number
            introspectionIndex: number
            questionsCount: number
            causeEffectCount: number
            eventsCount: number
            charactersCount: number
            firstPersonUsage: number
            narrativeSequentiality: number
            lexicalRichness: number
            keyRepetitionsCount: number
            metaphorsCount: number
            formality: number
        } | null
        aiAnalysis?: {
            __typename?: 'JournalAIAnalysis'
            criticalAnalysis: string
            quote?: string | null
            quoteAuthor?: string | null
            suggestedSongs: Array<{
                __typename?: 'SuggestedSong'
                title: string
                artist: string
                reason: string
            }>
        } | null
    }
}

export type GetJournalPagesQueryVariables = Exact<{
    filters?: InputMaybe<JournalPageFilters>
    pagination?: InputMaybe<JournalPaginationInput>
}>

export type GetJournalPagesQuery = {
    __typename?: 'Query'
    journalPages: {
        __typename?: 'GetJournalPagesOutput'
        totalCount: number
        hasMore: boolean
        currentPage: number
        totalPages: number
        pages: Array<{
            __typename?: 'Journal'
            id: string
            date: any
            location?: string | null
            mood: number
            content: string
            tags: Array<{
                __typename?: 'JournalTag'
                name: string
                color?: string | null
            }>
            metrics?: {
                __typename?: 'JournalMetrics'
                wordCount: number
                emotionalValence: number
            } | null
        }>
    }
}

export type GetMeQueryVariables = Exact<{ [key: string]: never }>

export type GetMeQuery = {
    __typename?: 'Query'
    me: {
        __typename?: 'User'
        id: string
        firstname: string
        lastname: string
        email: string
        phone?: string | null
        timezone: string
        locale: string
        emailVerified: boolean
        phoneVerified: boolean
        lastLoginAt?: any | null
        createdAt: any
        updatedAt: any
        avatarUrl?: string | null
    }
}

export type GetReflectionQueryVariables = Exact<{
    journalPageId: Scalars['ID']['input']
    type: ReflectionType
}>

export type GetReflectionQuery = {
    __typename?: 'Query'
    getReflection?: {
        __typename?: 'ReflectionModel'
        id: string
        journalPageId: string
        type: ReflectionType
        content: string
        keyInsights: Array<string>
        suggestedQuestion: string
        generatedAt: any
        modelVersion: string
    } | null
}

export type SearchHistoryQueryVariables = Exact<{ [key: string]: never }>

export type SearchHistoryQuery = {
    __typename?: 'Query'
    searchHistory: Array<{
        __typename?: 'SearchHistoryItemModel'
        id: string
        query: string
        executedAt: any
        resultCount: number
    }>
}

export type SearchJournalsQueryVariables = Exact<{
    query: Scalars['String']['input']
    saveToHistory?: InputMaybe<Scalars['Boolean']['input']>
}>

export type SearchJournalsQuery = {
    __typename?: 'Query'
    searchJournals: {
        __typename?: 'SearchResponseModel'
        totalMatches: number
        searchDurationMs?: number | null
        results: Array<{
            __typename?: 'SearchResultModel'
            journalPageId: string
            date: string
            relevanceScore: number
            summary: string
            location?: string | null
            mood?: number | null
            contentPreview?: string | null
            highlights: Array<{
                __typename?: 'SearchHighlightModel'
                matchedText: string
                startIndex: number
                endIndex: number
                matchingConcept: string
            }>
        }>
    }
}

export const AnalysisFieldsFragmentDoc = gql`
    fragment AnalysisFields on AnalysisModel {
        id
        journalPageId
        criticalAnalysis
        quote
        quoteAuthor
        generatedAt
        modelVersion
        suggestedSongs {
            spotifyUrl
            title
            album
            author
            minutes
            coverUrl
        }
        metrics {
            wordCount
            sentenceCount
            averageSentenceLength
            paragraphCount
            textDensity
            estimatedWritingTime
            temporalReferencesCount
            temporalFocus
            emotionalValence
            emotionalIntensity
            emotionalVariability
            emotionalWordsCount
            introspectionIndex
            questionsCount
            causeEffectCount
            eventsCount
            charactersCount
            firstPersonUsage
            narrativeSequentiality
            lexicalRichness
            keyRepetitionsCount
            metaphorsCount
            formality
        }
    }
`
export const ReflectionFieldsFragmentDoc = gql`
    fragment ReflectionFields on ReflectionModel {
        id
        journalPageId
        type
        content
        keyInsights
        suggestedQuestion
        generatedAt
        modelVersion
    }
`
export const ReflectionTypeInfoFieldsFragmentDoc = gql`
    fragment ReflectionTypeInfoFields on ReflectionTypeInfo {
        type
        label
        description
        icon
    }
`
export const SearchHighlightFieldsFragmentDoc = gql`
    fragment SearchHighlightFields on SearchHighlightModel {
        matchedText
        startIndex
        endIndex
        matchingConcept
    }
`
export const SearchResultFieldsFragmentDoc = gql`
    fragment SearchResultFields on SearchResultModel {
        journalPageId
        date
        relevanceScore
        highlights {
            ...SearchHighlightFields
        }
        summary
        location
        mood
        contentPreview
    }
    ${SearchHighlightFieldsFragmentDoc}
`
export const SearchResponseFieldsFragmentDoc = gql`
    fragment SearchResponseFields on SearchResponseModel {
        results {
            ...SearchResultFields
        }
        totalMatches
        searchDurationMs
    }
    ${SearchResultFieldsFragmentDoc}
`
export const SearchHistoryItemFieldsFragmentDoc = gql`
    fragment SearchHistoryItemFields on SearchHistoryItemModel {
        id
        query
        executedAt
        resultCount
    }
`
export const ClearSearchHistoryDocument = gql`
    mutation ClearSearchHistory {
        clearSearchHistory
    }
`

/**
 * __useClearSearchHistoryMutation__
 *
 * To run a mutation, you first call `useClearSearchHistoryMutation` within a Vue component and pass it any options that fit your needs.
 * When your component renders, `useClearSearchHistoryMutation` returns an object that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - Several other properties: https://v4.apollo.vuejs.org/api/use-mutation.html#return
 *
 * @param options that will be passed into the mutation, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/mutation.html#options;
 *
 * @example
 * const { mutate, loading, error, onDone } = useClearSearchHistoryMutation();
 */
export function useClearSearchHistoryMutation(
    options:
        | VueApolloComposable.UseMutationOptions<
              ClearSearchHistoryMutation,
              ClearSearchHistoryMutationVariables
          >
        | ReactiveFunction<
              VueApolloComposable.UseMutationOptions<
                  ClearSearchHistoryMutation,
                  ClearSearchHistoryMutationVariables
              >
          > = {},
) {
    return VueApolloComposable.useMutation<
        ClearSearchHistoryMutation,
        ClearSearchHistoryMutationVariables
    >(ClearSearchHistoryDocument, options)
}
export type ClearSearchHistoryMutationCompositionFunctionResult =
    VueApolloComposable.UseMutationReturn<
        ClearSearchHistoryMutation,
        ClearSearchHistoryMutationVariables
    >
export const CreateAnalysisDocument = gql`
    mutation CreateAnalysis($journalId: ID!) {
        createAnalysis(journalId: $journalId) {
            ...AnalysisFields
        }
    }
    ${AnalysisFieldsFragmentDoc}
`

/**
 * __useCreateAnalysisMutation__
 *
 * To run a mutation, you first call `useCreateAnalysisMutation` within a Vue component and pass it any options that fit your needs.
 * When your component renders, `useCreateAnalysisMutation` returns an object that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - Several other properties: https://v4.apollo.vuejs.org/api/use-mutation.html#return
 *
 * @param options that will be passed into the mutation, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/mutation.html#options;
 *
 * @example
 * const { mutate, loading, error, onDone } = useCreateAnalysisMutation({
 *   variables: {
 *     journalId: // value for 'journalId'
 *   },
 * });
 */
export function useCreateAnalysisMutation(
    options:
        | VueApolloComposable.UseMutationOptions<
              CreateAnalysisMutation,
              CreateAnalysisMutationVariables
          >
        | ReactiveFunction<
              VueApolloComposable.UseMutationOptions<
                  CreateAnalysisMutation,
                  CreateAnalysisMutationVariables
              >
          > = {},
) {
    return VueApolloComposable.useMutation<
        CreateAnalysisMutation,
        CreateAnalysisMutationVariables
    >(CreateAnalysisDocument, options)
}
export type CreateAnalysisMutationCompositionFunctionResult =
    VueApolloComposable.UseMutationReturn<
        CreateAnalysisMutation,
        CreateAnalysisMutationVariables
    >
export const CreateJournalPageDocument = gql`
    mutation CreateJournalPage($input: CreateJournalInput!) {
        createJournalPage(input: $input) {
            id
            date
            content
            mood
            tags {
                id
                name
                color
            }
        }
    }
`

/**
 * __useCreateJournalPageMutation__
 *
 * To run a mutation, you first call `useCreateJournalPageMutation` within a Vue component and pass it any options that fit your needs.
 * When your component renders, `useCreateJournalPageMutation` returns an object that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - Several other properties: https://v4.apollo.vuejs.org/api/use-mutation.html#return
 *
 * @param options that will be passed into the mutation, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/mutation.html#options;
 *
 * @example
 * const { mutate, loading, error, onDone } = useCreateJournalPageMutation({
 *   variables: {
 *     input: // value for 'input'
 *   },
 * });
 */
export function useCreateJournalPageMutation(
    options:
        | VueApolloComposable.UseMutationOptions<
              CreateJournalPageMutation,
              CreateJournalPageMutationVariables
          >
        | ReactiveFunction<
              VueApolloComposable.UseMutationOptions<
                  CreateJournalPageMutation,
                  CreateJournalPageMutationVariables
              >
          > = {},
) {
    return VueApolloComposable.useMutation<
        CreateJournalPageMutation,
        CreateJournalPageMutationVariables
    >(CreateJournalPageDocument, options)
}
export type CreateJournalPageMutationCompositionFunctionResult =
    VueApolloComposable.UseMutationReturn<
        CreateJournalPageMutation,
        CreateJournalPageMutationVariables
    >
export const CreateReflectionDocument = gql`
    mutation CreateReflection($journalId: ID!, $type: ReflectionType!) {
        createReflection(journalId: $journalId, type: $type) {
            ...ReflectionFields
        }
    }
    ${ReflectionFieldsFragmentDoc}
`

/**
 * __useCreateReflectionMutation__
 *
 * To run a mutation, you first call `useCreateReflectionMutation` within a Vue component and pass it any options that fit your needs.
 * When your component renders, `useCreateReflectionMutation` returns an object that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - Several other properties: https://v4.apollo.vuejs.org/api/use-mutation.html#return
 *
 * @param options that will be passed into the mutation, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/mutation.html#options;
 *
 * @example
 * const { mutate, loading, error, onDone } = useCreateReflectionMutation({
 *   variables: {
 *     journalId: // value for 'journalId'
 *     type: // value for 'type'
 *   },
 * });
 */
export function useCreateReflectionMutation(
    options:
        | VueApolloComposable.UseMutationOptions<
              CreateReflectionMutation,
              CreateReflectionMutationVariables
          >
        | ReactiveFunction<
              VueApolloComposable.UseMutationOptions<
                  CreateReflectionMutation,
                  CreateReflectionMutationVariables
              >
          > = {},
) {
    return VueApolloComposable.useMutation<
        CreateReflectionMutation,
        CreateReflectionMutationVariables
    >(CreateReflectionDocument, options)
}
export type CreateReflectionMutationCompositionFunctionResult =
    VueApolloComposable.UseMutationReturn<
        CreateReflectionMutation,
        CreateReflectionMutationVariables
    >
export const DeleteAnalysisDocument = gql`
    mutation DeleteAnalysis($id: ID!) {
        deleteAnalysis(id: $id) {
            ...AnalysisFields
        }
    }
    ${AnalysisFieldsFragmentDoc}
`

/**
 * __useDeleteAnalysisMutation__
 *
 * To run a mutation, you first call `useDeleteAnalysisMutation` within a Vue component and pass it any options that fit your needs.
 * When your component renders, `useDeleteAnalysisMutation` returns an object that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - Several other properties: https://v4.apollo.vuejs.org/api/use-mutation.html#return
 *
 * @param options that will be passed into the mutation, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/mutation.html#options;
 *
 * @example
 * const { mutate, loading, error, onDone } = useDeleteAnalysisMutation({
 *   variables: {
 *     id: // value for 'id'
 *   },
 * });
 */
export function useDeleteAnalysisMutation(
    options:
        | VueApolloComposable.UseMutationOptions<
              DeleteAnalysisMutation,
              DeleteAnalysisMutationVariables
          >
        | ReactiveFunction<
              VueApolloComposable.UseMutationOptions<
                  DeleteAnalysisMutation,
                  DeleteAnalysisMutationVariables
              >
          > = {},
) {
    return VueApolloComposable.useMutation<
        DeleteAnalysisMutation,
        DeleteAnalysisMutationVariables
    >(DeleteAnalysisDocument, options)
}
export type DeleteAnalysisMutationCompositionFunctionResult =
    VueApolloComposable.UseMutationReturn<
        DeleteAnalysisMutation,
        DeleteAnalysisMutationVariables
    >
export const DeleteSearchHistoryItemDocument = gql`
    mutation DeleteSearchHistoryItem($id: ID!) {
        deleteSearchHistoryItem(id: $id) {
            id
            query
        }
    }
`

/**
 * __useDeleteSearchHistoryItemMutation__
 *
 * To run a mutation, you first call `useDeleteSearchHistoryItemMutation` within a Vue component and pass it any options that fit your needs.
 * When your component renders, `useDeleteSearchHistoryItemMutation` returns an object that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - Several other properties: https://v4.apollo.vuejs.org/api/use-mutation.html#return
 *
 * @param options that will be passed into the mutation, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/mutation.html#options;
 *
 * @example
 * const { mutate, loading, error, onDone } = useDeleteSearchHistoryItemMutation({
 *   variables: {
 *     id: // value for 'id'
 *   },
 * });
 */
export function useDeleteSearchHistoryItemMutation(
    options:
        | VueApolloComposable.UseMutationOptions<
              DeleteSearchHistoryItemMutation,
              DeleteSearchHistoryItemMutationVariables
          >
        | ReactiveFunction<
              VueApolloComposable.UseMutationOptions<
                  DeleteSearchHistoryItemMutation,
                  DeleteSearchHistoryItemMutationVariables
              >
          > = {},
) {
    return VueApolloComposable.useMutation<
        DeleteSearchHistoryItemMutation,
        DeleteSearchHistoryItemMutationVariables
    >(DeleteSearchHistoryItemDocument, options)
}
export type DeleteSearchHistoryItemMutationCompositionFunctionResult =
    VueApolloComposable.UseMutationReturn<
        DeleteSearchHistoryItemMutation,
        DeleteSearchHistoryItemMutationVariables
    >
export const DeleteJournalPageDocument = gql`
    mutation DeleteJournalPage($id: ID!) {
        deleteJournalPage(id: $id)
    }
`

/**
 * __useDeleteJournalPageMutation__
 *
 * To run a mutation, you first call `useDeleteJournalPageMutation` within a Vue component and pass it any options that fit your needs.
 * When your component renders, `useDeleteJournalPageMutation` returns an object that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - Several other properties: https://v4.apollo.vuejs.org/api/use-mutation.html#return
 *
 * @param options that will be passed into the mutation, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/mutation.html#options;
 *
 * @example
 * const { mutate, loading, error, onDone } = useDeleteJournalPageMutation({
 *   variables: {
 *     id: // value for 'id'
 *   },
 * });
 */
export function useDeleteJournalPageMutation(
    options:
        | VueApolloComposable.UseMutationOptions<
              DeleteJournalPageMutation,
              DeleteJournalPageMutationVariables
          >
        | ReactiveFunction<
              VueApolloComposable.UseMutationOptions<
                  DeleteJournalPageMutation,
                  DeleteJournalPageMutationVariables
              >
          > = {},
) {
    return VueApolloComposable.useMutation<
        DeleteJournalPageMutation,
        DeleteJournalPageMutationVariables
    >(DeleteJournalPageDocument, options)
}
export type DeleteJournalPageMutationCompositionFunctionResult =
    VueApolloComposable.UseMutationReturn<
        DeleteJournalPageMutation,
        DeleteJournalPageMutationVariables
    >
export const RegenerateAnalysisDocument = gql`
    mutation RegenerateAnalysis($analysisId: ID!) {
        regenerateAnalysis(analysisId: $analysisId) {
            ...AnalysisFields
        }
    }
    ${AnalysisFieldsFragmentDoc}
`

/**
 * __useRegenerateAnalysisMutation__
 *
 * To run a mutation, you first call `useRegenerateAnalysisMutation` within a Vue component and pass it any options that fit your needs.
 * When your component renders, `useRegenerateAnalysisMutation` returns an object that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - Several other properties: https://v4.apollo.vuejs.org/api/use-mutation.html#return
 *
 * @param options that will be passed into the mutation, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/mutation.html#options;
 *
 * @example
 * const { mutate, loading, error, onDone } = useRegenerateAnalysisMutation({
 *   variables: {
 *     analysisId: // value for 'analysisId'
 *   },
 * });
 */
export function useRegenerateAnalysisMutation(
    options:
        | VueApolloComposable.UseMutationOptions<
              RegenerateAnalysisMutation,
              RegenerateAnalysisMutationVariables
          >
        | ReactiveFunction<
              VueApolloComposable.UseMutationOptions<
                  RegenerateAnalysisMutation,
                  RegenerateAnalysisMutationVariables
              >
          > = {},
) {
    return VueApolloComposable.useMutation<
        RegenerateAnalysisMutation,
        RegenerateAnalysisMutationVariables
    >(RegenerateAnalysisDocument, options)
}
export type RegenerateAnalysisMutationCompositionFunctionResult =
    VueApolloComposable.UseMutationReturn<
        RegenerateAnalysisMutation,
        RegenerateAnalysisMutationVariables
    >
export const RestoreJournalPageDocument = gql`
    mutation RestoreJournalPage($id: ID!) {
        restoreJournalPage(id: $id) {
            id
            isActive
        }
    }
`

/**
 * __useRestoreJournalPageMutation__
 *
 * To run a mutation, you first call `useRestoreJournalPageMutation` within a Vue component and pass it any options that fit your needs.
 * When your component renders, `useRestoreJournalPageMutation` returns an object that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - Several other properties: https://v4.apollo.vuejs.org/api/use-mutation.html#return
 *
 * @param options that will be passed into the mutation, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/mutation.html#options;
 *
 * @example
 * const { mutate, loading, error, onDone } = useRestoreJournalPageMutation({
 *   variables: {
 *     id: // value for 'id'
 *   },
 * });
 */
export function useRestoreJournalPageMutation(
    options:
        | VueApolloComposable.UseMutationOptions<
              RestoreJournalPageMutation,
              RestoreJournalPageMutationVariables
          >
        | ReactiveFunction<
              VueApolloComposable.UseMutationOptions<
                  RestoreJournalPageMutation,
                  RestoreJournalPageMutationVariables
              >
          > = {},
) {
    return VueApolloComposable.useMutation<
        RestoreJournalPageMutation,
        RestoreJournalPageMutationVariables
    >(RestoreJournalPageDocument, options)
}
export type RestoreJournalPageMutationCompositionFunctionResult =
    VueApolloComposable.UseMutationReturn<
        RestoreJournalPageMutation,
        RestoreJournalPageMutationVariables
    >
export const SignInDocument = gql`
    mutation SignIn($input: SignInInput!) {
        signIn(signInInput: $input) {
            access_token
        }
    }
`

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
export function useSignInMutation(
    options:
        | VueApolloComposable.UseMutationOptions<
              SignInMutation,
              SignInMutationVariables
          >
        | ReactiveFunction<
              VueApolloComposable.UseMutationOptions<
                  SignInMutation,
                  SignInMutationVariables
              >
          > = {},
) {
    return VueApolloComposable.useMutation<
        SignInMutation,
        SignInMutationVariables
    >(SignInDocument, options)
}
export type SignInMutationCompositionFunctionResult =
    VueApolloComposable.UseMutationReturn<
        SignInMutation,
        SignInMutationVariables
    >
export const SignUpDocument = gql`
    mutation SignUp($input: SignUpInput!) {
        signUp(signUpInput: $input) {
            access_token
            refresh_token
        }
    }
`

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
export function useSignUpMutation(
    options:
        | VueApolloComposable.UseMutationOptions<
              SignUpMutation,
              SignUpMutationVariables
          >
        | ReactiveFunction<
              VueApolloComposable.UseMutationOptions<
                  SignUpMutation,
                  SignUpMutationVariables
              >
          > = {},
) {
    return VueApolloComposable.useMutation<
        SignUpMutation,
        SignUpMutationVariables
    >(SignUpDocument, options)
}
export type SignUpMutationCompositionFunctionResult =
    VueApolloComposable.UseMutationReturn<
        SignUpMutation,
        SignUpMutationVariables
    >
export const SoftDeleteJournalPageDocument = gql`
    mutation SoftDeleteJournalPage($id: ID!) {
        softDeleteJournalPage(id: $id) {
            id
            isActive
        }
    }
`

/**
 * __useSoftDeleteJournalPageMutation__
 *
 * To run a mutation, you first call `useSoftDeleteJournalPageMutation` within a Vue component and pass it any options that fit your needs.
 * When your component renders, `useSoftDeleteJournalPageMutation` returns an object that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - Several other properties: https://v4.apollo.vuejs.org/api/use-mutation.html#return
 *
 * @param options that will be passed into the mutation, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/mutation.html#options;
 *
 * @example
 * const { mutate, loading, error, onDone } = useSoftDeleteJournalPageMutation({
 *   variables: {
 *     id: // value for 'id'
 *   },
 * });
 */
export function useSoftDeleteJournalPageMutation(
    options:
        | VueApolloComposable.UseMutationOptions<
              SoftDeleteJournalPageMutation,
              SoftDeleteJournalPageMutationVariables
          >
        | ReactiveFunction<
              VueApolloComposable.UseMutationOptions<
                  SoftDeleteJournalPageMutation,
                  SoftDeleteJournalPageMutationVariables
              >
          > = {},
) {
    return VueApolloComposable.useMutation<
        SoftDeleteJournalPageMutation,
        SoftDeleteJournalPageMutationVariables
    >(SoftDeleteJournalPageDocument, options)
}
export type SoftDeleteJournalPageMutationCompositionFunctionResult =
    VueApolloComposable.UseMutationReturn<
        SoftDeleteJournalPageMutation,
        SoftDeleteJournalPageMutationVariables
    >
export const UpdateJournalPageDocument = gql`
    mutation UpdateJournalPage($id: ID!, $input: UpdateJournalInput!) {
        updateJournalPage(id: $id, input: $input) {
            id
            date
            content
            mood
            lastModified
            tags {
                name
                color
            }
        }
    }
`

/**
 * __useUpdateJournalPageMutation__
 *
 * To run a mutation, you first call `useUpdateJournalPageMutation` within a Vue component and pass it any options that fit your needs.
 * When your component renders, `useUpdateJournalPageMutation` returns an object that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - Several other properties: https://v4.apollo.vuejs.org/api/use-mutation.html#return
 *
 * @param options that will be passed into the mutation, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/mutation.html#options;
 *
 * @example
 * const { mutate, loading, error, onDone } = useUpdateJournalPageMutation({
 *   variables: {
 *     id: // value for 'id'
 *     input: // value for 'input'
 *   },
 * });
 */
export function useUpdateJournalPageMutation(
    options:
        | VueApolloComposable.UseMutationOptions<
              UpdateJournalPageMutation,
              UpdateJournalPageMutationVariables
          >
        | ReactiveFunction<
              VueApolloComposable.UseMutationOptions<
                  UpdateJournalPageMutation,
                  UpdateJournalPageMutationVariables
              >
          > = {},
) {
    return VueApolloComposable.useMutation<
        UpdateJournalPageMutation,
        UpdateJournalPageMutationVariables
    >(UpdateJournalPageDocument, options)
}
export type UpdateJournalPageMutationCompositionFunctionResult =
    VueApolloComposable.UseMutationReturn<
        UpdateJournalPageMutation,
        UpdateJournalPageMutationVariables
    >
export const AvailableReflectionTypesDocument = gql`
    query AvailableReflectionTypes {
        availableReflectionTypes {
            ...ReflectionTypeInfoFields
        }
    }
    ${ReflectionTypeInfoFieldsFragmentDoc}
`

/**
 * __useAvailableReflectionTypesQuery__
 *
 * To run a query within a Vue component, call `useAvailableReflectionTypesQuery` and pass it any options that fit your needs.
 * When your component renders, `useAvailableReflectionTypesQuery` returns an object from Apollo Client that contains result, loading and error properties
 * you can use to render your UI.
 *
 * @param options that will be passed into the query, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/query.html#options;
 *
 * @example
 * const { result, loading, error } = useAvailableReflectionTypesQuery();
 */
export function useAvailableReflectionTypesQuery(
    options:
        | VueApolloComposable.UseQueryOptions<
              AvailableReflectionTypesQuery,
              AvailableReflectionTypesQueryVariables
          >
        | VueCompositionApi.Ref<
              VueApolloComposable.UseQueryOptions<
                  AvailableReflectionTypesQuery,
                  AvailableReflectionTypesQueryVariables
              >
          >
        | ReactiveFunction<
              VueApolloComposable.UseQueryOptions<
                  AvailableReflectionTypesQuery,
                  AvailableReflectionTypesQueryVariables
              >
          > = {},
) {
    return VueApolloComposable.useQuery<
        AvailableReflectionTypesQuery,
        AvailableReflectionTypesQueryVariables
    >(AvailableReflectionTypesDocument, {}, options)
}
export function useAvailableReflectionTypesLazyQuery(
    options:
        | VueApolloComposable.UseQueryOptions<
              AvailableReflectionTypesQuery,
              AvailableReflectionTypesQueryVariables
          >
        | VueCompositionApi.Ref<
              VueApolloComposable.UseQueryOptions<
                  AvailableReflectionTypesQuery,
                  AvailableReflectionTypesQueryVariables
              >
          >
        | ReactiveFunction<
              VueApolloComposable.UseQueryOptions<
                  AvailableReflectionTypesQuery,
                  AvailableReflectionTypesQueryVariables
              >
          > = {},
) {
    return VueApolloComposable.useLazyQuery<
        AvailableReflectionTypesQuery,
        AvailableReflectionTypesQueryVariables
    >(AvailableReflectionTypesDocument, {}, options)
}
export type AvailableReflectionTypesQueryCompositionFunctionResult =
    VueApolloComposable.UseQueryReturn<
        AvailableReflectionTypesQuery,
        AvailableReflectionTypesQueryVariables
    >
export const GetAnalysisByJournalPageDocument = gql`
    query GetAnalysisByJournalPage($journalPageId: ID!) {
        getAnalysisByJournalPage(journalPageId: $journalPageId) {
            ...AnalysisFields
        }
    }
    ${AnalysisFieldsFragmentDoc}
`

/**
 * __useGetAnalysisByJournalPageQuery__
 *
 * To run a query within a Vue component, call `useGetAnalysisByJournalPageQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAnalysisByJournalPageQuery` returns an object from Apollo Client that contains result, loading and error properties
 * you can use to render your UI.
 *
 * @param variables that will be passed into the query
 * @param options that will be passed into the query, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/query.html#options;
 *
 * @example
 * const { result, loading, error } = useGetAnalysisByJournalPageQuery({
 *   journalPageId: // value for 'journalPageId'
 * });
 */
export function useGetAnalysisByJournalPageQuery(
    variables:
        | GetAnalysisByJournalPageQueryVariables
        | VueCompositionApi.Ref<GetAnalysisByJournalPageQueryVariables>
        | ReactiveFunction<GetAnalysisByJournalPageQueryVariables>,
    options:
        | VueApolloComposable.UseQueryOptions<
              GetAnalysisByJournalPageQuery,
              GetAnalysisByJournalPageQueryVariables
          >
        | VueCompositionApi.Ref<
              VueApolloComposable.UseQueryOptions<
                  GetAnalysisByJournalPageQuery,
                  GetAnalysisByJournalPageQueryVariables
              >
          >
        | ReactiveFunction<
              VueApolloComposable.UseQueryOptions<
                  GetAnalysisByJournalPageQuery,
                  GetAnalysisByJournalPageQueryVariables
              >
          > = {},
) {
    return VueApolloComposable.useQuery<
        GetAnalysisByJournalPageQuery,
        GetAnalysisByJournalPageQueryVariables
    >(GetAnalysisByJournalPageDocument, variables, options)
}
export function useGetAnalysisByJournalPageLazyQuery(
    variables?:
        | GetAnalysisByJournalPageQueryVariables
        | VueCompositionApi.Ref<GetAnalysisByJournalPageQueryVariables>
        | ReactiveFunction<GetAnalysisByJournalPageQueryVariables>,
    options:
        | VueApolloComposable.UseQueryOptions<
              GetAnalysisByJournalPageQuery,
              GetAnalysisByJournalPageQueryVariables
          >
        | VueCompositionApi.Ref<
              VueApolloComposable.UseQueryOptions<
                  GetAnalysisByJournalPageQuery,
                  GetAnalysisByJournalPageQueryVariables
              >
          >
        | ReactiveFunction<
              VueApolloComposable.UseQueryOptions<
                  GetAnalysisByJournalPageQuery,
                  GetAnalysisByJournalPageQueryVariables
              >
          > = {},
) {
    return VueApolloComposable.useLazyQuery<
        GetAnalysisByJournalPageQuery,
        GetAnalysisByJournalPageQueryVariables
    >(GetAnalysisByJournalPageDocument, variables, options)
}
export type GetAnalysisByJournalPageQueryCompositionFunctionResult =
    VueApolloComposable.UseQueryReturn<
        GetAnalysisByJournalPageQuery,
        GetAnalysisByJournalPageQueryVariables
    >
export const GetJournalPageDocument = gql`
    query GetJournalPage($id: ID!) {
        journalPage(id: $id) {
            id
            date
            time
            location
            content
            mood
            isActive
            tags {
                id
                name
                color
            }
            metrics {
                wordCount
                sentenceCount
                averageSentenceLength
                paragraphCount
                textDensity
                estimatedWritingTime
                temporalReferencesCount
                temporalFocus
                emotionalValence
                emotionalIntensity
                emotionalVariability
                emotionalWordsCount
                introspectionIndex
                questionsCount
                causeEffectCount
                eventsCount
                charactersCount
                firstPersonUsage
                narrativeSequentiality
                lexicalRichness
                keyRepetitionsCount
                metaphorsCount
                formality
            }
            aiAnalysis {
                criticalAnalysis
                suggestedSongs {
                    title
                    artist
                    reason
                }
                quote
                quoteAuthor
            }
        }
    }
`

/**
 * __useGetJournalPageQuery__
 *
 * To run a query within a Vue component, call `useGetJournalPageQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetJournalPageQuery` returns an object from Apollo Client that contains result, loading and error properties
 * you can use to render your UI.
 *
 * @param variables that will be passed into the query
 * @param options that will be passed into the query, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/query.html#options;
 *
 * @example
 * const { result, loading, error } = useGetJournalPageQuery({
 *   id: // value for 'id'
 * });
 */
export function useGetJournalPageQuery(
    variables:
        | GetJournalPageQueryVariables
        | VueCompositionApi.Ref<GetJournalPageQueryVariables>
        | ReactiveFunction<GetJournalPageQueryVariables>,
    options:
        | VueApolloComposable.UseQueryOptions<
              GetJournalPageQuery,
              GetJournalPageQueryVariables
          >
        | VueCompositionApi.Ref<
              VueApolloComposable.UseQueryOptions<
                  GetJournalPageQuery,
                  GetJournalPageQueryVariables
              >
          >
        | ReactiveFunction<
              VueApolloComposable.UseQueryOptions<
                  GetJournalPageQuery,
                  GetJournalPageQueryVariables
              >
          > = {},
) {
    return VueApolloComposable.useQuery<
        GetJournalPageQuery,
        GetJournalPageQueryVariables
    >(GetJournalPageDocument, variables, options)
}
export function useGetJournalPageLazyQuery(
    variables?:
        | GetJournalPageQueryVariables
        | VueCompositionApi.Ref<GetJournalPageQueryVariables>
        | ReactiveFunction<GetJournalPageQueryVariables>,
    options:
        | VueApolloComposable.UseQueryOptions<
              GetJournalPageQuery,
              GetJournalPageQueryVariables
          >
        | VueCompositionApi.Ref<
              VueApolloComposable.UseQueryOptions<
                  GetJournalPageQuery,
                  GetJournalPageQueryVariables
              >
          >
        | ReactiveFunction<
              VueApolloComposable.UseQueryOptions<
                  GetJournalPageQuery,
                  GetJournalPageQueryVariables
              >
          > = {},
) {
    return VueApolloComposable.useLazyQuery<
        GetJournalPageQuery,
        GetJournalPageQueryVariables
    >(GetJournalPageDocument, variables, options)
}
export type GetJournalPageQueryCompositionFunctionResult =
    VueApolloComposable.UseQueryReturn<
        GetJournalPageQuery,
        GetJournalPageQueryVariables
    >
export const GetJournalPagesDocument = gql`
    query GetJournalPages(
        $filters: JournalPageFilters
        $pagination: JournalPaginationInput
    ) {
        journalPages(filters: $filters, pagination: $pagination) {
            pages {
                id
                date
                location
                mood
                content
                tags {
                    name
                    color
                }
                metrics {
                    wordCount
                    emotionalValence
                }
            }
            totalCount
            hasMore
            currentPage
            totalPages
        }
    }
`

/**
 * __useGetJournalPagesQuery__
 *
 * To run a query within a Vue component, call `useGetJournalPagesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetJournalPagesQuery` returns an object from Apollo Client that contains result, loading and error properties
 * you can use to render your UI.
 *
 * @param variables that will be passed into the query
 * @param options that will be passed into the query, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/query.html#options;
 *
 * @example
 * const { result, loading, error } = useGetJournalPagesQuery({
 *   filters: // value for 'filters'
 *   pagination: // value for 'pagination'
 * });
 */
export function useGetJournalPagesQuery(
    variables:
        | GetJournalPagesQueryVariables
        | VueCompositionApi.Ref<GetJournalPagesQueryVariables>
        | ReactiveFunction<GetJournalPagesQueryVariables> = {},
    options:
        | VueApolloComposable.UseQueryOptions<
              GetJournalPagesQuery,
              GetJournalPagesQueryVariables
          >
        | VueCompositionApi.Ref<
              VueApolloComposable.UseQueryOptions<
                  GetJournalPagesQuery,
                  GetJournalPagesQueryVariables
              >
          >
        | ReactiveFunction<
              VueApolloComposable.UseQueryOptions<
                  GetJournalPagesQuery,
                  GetJournalPagesQueryVariables
              >
          > = {},
) {
    return VueApolloComposable.useQuery<
        GetJournalPagesQuery,
        GetJournalPagesQueryVariables
    >(GetJournalPagesDocument, variables, options)
}
export function useGetJournalPagesLazyQuery(
    variables:
        | GetJournalPagesQueryVariables
        | VueCompositionApi.Ref<GetJournalPagesQueryVariables>
        | ReactiveFunction<GetJournalPagesQueryVariables> = {},
    options:
        | VueApolloComposable.UseQueryOptions<
              GetJournalPagesQuery,
              GetJournalPagesQueryVariables
          >
        | VueCompositionApi.Ref<
              VueApolloComposable.UseQueryOptions<
                  GetJournalPagesQuery,
                  GetJournalPagesQueryVariables
              >
          >
        | ReactiveFunction<
              VueApolloComposable.UseQueryOptions<
                  GetJournalPagesQuery,
                  GetJournalPagesQueryVariables
              >
          > = {},
) {
    return VueApolloComposable.useLazyQuery<
        GetJournalPagesQuery,
        GetJournalPagesQueryVariables
    >(GetJournalPagesDocument, variables, options)
}
export type GetJournalPagesQueryCompositionFunctionResult =
    VueApolloComposable.UseQueryReturn<
        GetJournalPagesQuery,
        GetJournalPagesQueryVariables
    >
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
`

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
export function useGetMeQuery(
    options:
        | VueApolloComposable.UseQueryOptions<GetMeQuery, GetMeQueryVariables>
        | VueCompositionApi.Ref<
              VueApolloComposable.UseQueryOptions<
                  GetMeQuery,
                  GetMeQueryVariables
              >
          >
        | ReactiveFunction<
              VueApolloComposable.UseQueryOptions<
                  GetMeQuery,
                  GetMeQueryVariables
              >
          > = {},
) {
    return VueApolloComposable.useQuery<GetMeQuery, GetMeQueryVariables>(
        GetMeDocument,
        {},
        options,
    )
}
export function useGetMeLazyQuery(
    options:
        | VueApolloComposable.UseQueryOptions<GetMeQuery, GetMeQueryVariables>
        | VueCompositionApi.Ref<
              VueApolloComposable.UseQueryOptions<
                  GetMeQuery,
                  GetMeQueryVariables
              >
          >
        | ReactiveFunction<
              VueApolloComposable.UseQueryOptions<
                  GetMeQuery,
                  GetMeQueryVariables
              >
          > = {},
) {
    return VueApolloComposable.useLazyQuery<GetMeQuery, GetMeQueryVariables>(
        GetMeDocument,
        {},
        options,
    )
}
export type GetMeQueryCompositionFunctionResult =
    VueApolloComposable.UseQueryReturn<GetMeQuery, GetMeQueryVariables>
export const GetReflectionDocument = gql`
    query GetReflection($journalPageId: ID!, $type: ReflectionType!) {
        getReflection(journalPageId: $journalPageId, type: $type) {
            ...ReflectionFields
        }
    }
    ${ReflectionFieldsFragmentDoc}
`

/**
 * __useGetReflectionQuery__
 *
 * To run a query within a Vue component, call `useGetReflectionQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetReflectionQuery` returns an object from Apollo Client that contains result, loading and error properties
 * you can use to render your UI.
 *
 * @param variables that will be passed into the query
 * @param options that will be passed into the query, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/query.html#options;
 *
 * @example
 * const { result, loading, error } = useGetReflectionQuery({
 *   journalPageId: // value for 'journalPageId'
 *   type: // value for 'type'
 * });
 */
export function useGetReflectionQuery(
    variables:
        | GetReflectionQueryVariables
        | VueCompositionApi.Ref<GetReflectionQueryVariables>
        | ReactiveFunction<GetReflectionQueryVariables>,
    options:
        | VueApolloComposable.UseQueryOptions<
              GetReflectionQuery,
              GetReflectionQueryVariables
          >
        | VueCompositionApi.Ref<
              VueApolloComposable.UseQueryOptions<
                  GetReflectionQuery,
                  GetReflectionQueryVariables
              >
          >
        | ReactiveFunction<
              VueApolloComposable.UseQueryOptions<
                  GetReflectionQuery,
                  GetReflectionQueryVariables
              >
          > = {},
) {
    return VueApolloComposable.useQuery<
        GetReflectionQuery,
        GetReflectionQueryVariables
    >(GetReflectionDocument, variables, options)
}
export function useGetReflectionLazyQuery(
    variables?:
        | GetReflectionQueryVariables
        | VueCompositionApi.Ref<GetReflectionQueryVariables>
        | ReactiveFunction<GetReflectionQueryVariables>,
    options:
        | VueApolloComposable.UseQueryOptions<
              GetReflectionQuery,
              GetReflectionQueryVariables
          >
        | VueCompositionApi.Ref<
              VueApolloComposable.UseQueryOptions<
                  GetReflectionQuery,
                  GetReflectionQueryVariables
              >
          >
        | ReactiveFunction<
              VueApolloComposable.UseQueryOptions<
                  GetReflectionQuery,
                  GetReflectionQueryVariables
              >
          > = {},
) {
    return VueApolloComposable.useLazyQuery<
        GetReflectionQuery,
        GetReflectionQueryVariables
    >(GetReflectionDocument, variables, options)
}
export type GetReflectionQueryCompositionFunctionResult =
    VueApolloComposable.UseQueryReturn<
        GetReflectionQuery,
        GetReflectionQueryVariables
    >
export const SearchHistoryDocument = gql`
    query SearchHistory {
        searchHistory {
            ...SearchHistoryItemFields
        }
    }
    ${SearchHistoryItemFieldsFragmentDoc}
`

/**
 * __useSearchHistoryQuery__
 *
 * To run a query within a Vue component, call `useSearchHistoryQuery` and pass it any options that fit your needs.
 * When your component renders, `useSearchHistoryQuery` returns an object from Apollo Client that contains result, loading and error properties
 * you can use to render your UI.
 *
 * @param options that will be passed into the query, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/query.html#options;
 *
 * @example
 * const { result, loading, error } = useSearchHistoryQuery();
 */
export function useSearchHistoryQuery(
    options:
        | VueApolloComposable.UseQueryOptions<
              SearchHistoryQuery,
              SearchHistoryQueryVariables
          >
        | VueCompositionApi.Ref<
              VueApolloComposable.UseQueryOptions<
                  SearchHistoryQuery,
                  SearchHistoryQueryVariables
              >
          >
        | ReactiveFunction<
              VueApolloComposable.UseQueryOptions<
                  SearchHistoryQuery,
                  SearchHistoryQueryVariables
              >
          > = {},
) {
    return VueApolloComposable.useQuery<
        SearchHistoryQuery,
        SearchHistoryQueryVariables
    >(SearchHistoryDocument, {}, options)
}
export function useSearchHistoryLazyQuery(
    options:
        | VueApolloComposable.UseQueryOptions<
              SearchHistoryQuery,
              SearchHistoryQueryVariables
          >
        | VueCompositionApi.Ref<
              VueApolloComposable.UseQueryOptions<
                  SearchHistoryQuery,
                  SearchHistoryQueryVariables
              >
          >
        | ReactiveFunction<
              VueApolloComposable.UseQueryOptions<
                  SearchHistoryQuery,
                  SearchHistoryQueryVariables
              >
          > = {},
) {
    return VueApolloComposable.useLazyQuery<
        SearchHistoryQuery,
        SearchHistoryQueryVariables
    >(SearchHistoryDocument, {}, options)
}
export type SearchHistoryQueryCompositionFunctionResult =
    VueApolloComposable.UseQueryReturn<
        SearchHistoryQuery,
        SearchHistoryQueryVariables
    >
export const SearchJournalsDocument = gql`
    query SearchJournals($query: String!, $saveToHistory: Boolean) {
        searchJournals(query: $query, saveToHistory: $saveToHistory) {
            ...SearchResponseFields
        }
    }
    ${SearchResponseFieldsFragmentDoc}
`

/**
 * __useSearchJournalsQuery__
 *
 * To run a query within a Vue component, call `useSearchJournalsQuery` and pass it any options that fit your needs.
 * When your component renders, `useSearchJournalsQuery` returns an object from Apollo Client that contains result, loading and error properties
 * you can use to render your UI.
 *
 * @param variables that will be passed into the query
 * @param options that will be passed into the query, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/query.html#options;
 *
 * @example
 * const { result, loading, error } = useSearchJournalsQuery({
 *   query: // value for 'query'
 *   saveToHistory: // value for 'saveToHistory'
 * });
 */
export function useSearchJournalsQuery(
    variables:
        | SearchJournalsQueryVariables
        | VueCompositionApi.Ref<SearchJournalsQueryVariables>
        | ReactiveFunction<SearchJournalsQueryVariables>,
    options:
        | VueApolloComposable.UseQueryOptions<
              SearchJournalsQuery,
              SearchJournalsQueryVariables
          >
        | VueCompositionApi.Ref<
              VueApolloComposable.UseQueryOptions<
                  SearchJournalsQuery,
                  SearchJournalsQueryVariables
              >
          >
        | ReactiveFunction<
              VueApolloComposable.UseQueryOptions<
                  SearchJournalsQuery,
                  SearchJournalsQueryVariables
              >
          > = {},
) {
    return VueApolloComposable.useQuery<
        SearchJournalsQuery,
        SearchJournalsQueryVariables
    >(SearchJournalsDocument, variables, options)
}
export function useSearchJournalsLazyQuery(
    variables?:
        | SearchJournalsQueryVariables
        | VueCompositionApi.Ref<SearchJournalsQueryVariables>
        | ReactiveFunction<SearchJournalsQueryVariables>,
    options:
        | VueApolloComposable.UseQueryOptions<
              SearchJournalsQuery,
              SearchJournalsQueryVariables
          >
        | VueCompositionApi.Ref<
              VueApolloComposable.UseQueryOptions<
                  SearchJournalsQuery,
                  SearchJournalsQueryVariables
              >
          >
        | ReactiveFunction<
              VueApolloComposable.UseQueryOptions<
                  SearchJournalsQuery,
                  SearchJournalsQueryVariables
              >
          > = {},
) {
    return VueApolloComposable.useLazyQuery<
        SearchJournalsQuery,
        SearchJournalsQueryVariables
    >(SearchJournalsDocument, variables, options)
}
export type SearchJournalsQueryCompositionFunctionResult =
    VueApolloComposable.UseQueryReturn<
        SearchJournalsQuery,
        SearchJournalsQueryVariables
    >
