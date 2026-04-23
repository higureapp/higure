import gql from 'graphql-tag';
import * as VueApolloComposable from '@vue/apollo-composable';
export const AnalysisFieldsFragmentDoc = gql `
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
`;
export const CreateAnalysisDocument = gql `
    mutation CreateAnalysis($journalId: ID!) {
        createAnalysis(journalId: $journalId) {
            ...AnalysisFields
        }
    }
    ${AnalysisFieldsFragmentDoc}
`;
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
export function useCreateAnalysisMutation(options = {}) {
    return VueApolloComposable.useMutation(CreateAnalysisDocument, options);
}
export const CreateJournalPageDocument = gql `
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
`;
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
export function useCreateJournalPageMutation(options = {}) {
    return VueApolloComposable.useMutation(CreateJournalPageDocument, options);
}
export const DeleteAnalysisDocument = gql `
    mutation DeleteAnalysis($id: ID!) {
        deleteAnalysis(id: $id) {
            ...AnalysisFields
        }
    }
    ${AnalysisFieldsFragmentDoc}
`;
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
export function useDeleteAnalysisMutation(options = {}) {
    return VueApolloComposable.useMutation(DeleteAnalysisDocument, options);
}
export const DeleteJournalPageDocument = gql `
    mutation DeleteJournalPage($id: ID!) {
        deleteJournalPage(id: $id)
    }
`;
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
export function useDeleteJournalPageMutation(options = {}) {
    return VueApolloComposable.useMutation(DeleteJournalPageDocument, options);
}
export const RegenerateAnalysisDocument = gql `
    mutation RegenerateAnalysis($analysisId: ID!) {
        regenerateAnalysis(analysisId: $analysisId) {
            ...AnalysisFields
        }
    }
    ${AnalysisFieldsFragmentDoc}
`;
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
export function useRegenerateAnalysisMutation(options = {}) {
    return VueApolloComposable.useMutation(RegenerateAnalysisDocument, options);
}
export const RestoreJournalPageDocument = gql `
    mutation RestoreJournalPage($id: ID!) {
        restoreJournalPage(id: $id) {
            id
            isActive
        }
    }
`;
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
export function useRestoreJournalPageMutation(options = {}) {
    return VueApolloComposable.useMutation(RestoreJournalPageDocument, options);
}
export const SignInDocument = gql `
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
export function useSignInMutation(options = {}) {
    return VueApolloComposable.useMutation(SignInDocument, options);
}
export const SignUpDocument = gql `
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
export function useSignUpMutation(options = {}) {
    return VueApolloComposable.useMutation(SignUpDocument, options);
}
export const SoftDeleteJournalPageDocument = gql `
    mutation SoftDeleteJournalPage($id: ID!) {
        softDeleteJournalPage(id: $id) {
            id
            isActive
        }
    }
`;
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
export function useSoftDeleteJournalPageMutation(options = {}) {
    return VueApolloComposable.useMutation(SoftDeleteJournalPageDocument, options);
}
export const UpdateJournalPageDocument = gql `
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
`;
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
export function useUpdateJournalPageMutation(options = {}) {
    return VueApolloComposable.useMutation(UpdateJournalPageDocument, options);
}
export const GetAnalysisByJournalPageDocument = gql `
    query GetAnalysisByJournalPage($journalPageId: ID!) {
        getAnalysisByJournalPage(journalPageId: $journalPageId) {
            ...AnalysisFields
        }
    }
    ${AnalysisFieldsFragmentDoc}
`;
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
export function useGetAnalysisByJournalPageQuery(variables, options = {}) {
    return VueApolloComposable.useQuery(GetAnalysisByJournalPageDocument, variables, options);
}
export function useGetAnalysisByJournalPageLazyQuery(variables, options = {}) {
    return VueApolloComposable.useLazyQuery(GetAnalysisByJournalPageDocument, variables, options);
}
export const GetJournalPageDocument = gql `
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
`;
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
export function useGetJournalPageQuery(variables, options = {}) {
    return VueApolloComposable.useQuery(GetJournalPageDocument, variables, options);
}
export function useGetJournalPageLazyQuery(variables, options = {}) {
    return VueApolloComposable.useLazyQuery(GetJournalPageDocument, variables, options);
}
export const GetJournalPagesDocument = gql `
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
`;
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
export function useGetJournalPagesQuery(variables = {}, options = {}) {
    return VueApolloComposable.useQuery(GetJournalPagesDocument, variables, options);
}
export function useGetJournalPagesLazyQuery(variables = {}, options = {}) {
    return VueApolloComposable.useLazyQuery(GetJournalPagesDocument, variables, options);
}
export const GetMeDocument = gql `
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
export function useGetMeQuery(options = {}) {
    return VueApolloComposable.useQuery(GetMeDocument, {}, options);
}
export function useGetMeLazyQuery(options = {}) {
    return VueApolloComposable.useLazyQuery(GetMeDocument, {}, options);
}
