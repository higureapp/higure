import { computed, ref } from 'vue'
import { defineStore } from 'pinia'
import {
    useCreateJournalPageMutation,
    useGetJournalPageQuery,
    useGetJournalPagesQuery,
    useSoftDeleteJournalPageMutation,
    useUpdateJournalPageMutation,
    type CreateJournalInput,
    type UpdateJournalInput,
} from '../../gql_generated/graphql'

export const useJournalStore = defineStore('journal', () => {
    const {
        result: getJournalPagesResult,
        loading: loadingPages,
        refetch: refetchPages,
    } = useGetJournalPagesQuery()
    const { mutate: updateJournalMutation } = useUpdateJournalPageMutation()
    const { mutate: createJournalMutation } = useCreateJournalPageMutation()
    const { mutate: softDeleteJournalMutation } =
        useSoftDeleteJournalPageMutation()

    const pages = computed(() => getJournalPagesResult.value ?? null)

    const activeJournalId = ref<string | null>(null)

    const {
        result: singleResult,
        loading: loadingSingle,
        error: singleError,
    } = useGetJournalPageQuery(
        () => ({ id: activeJournalId.value || 'placeholder' }),
        {
            enabled: computed(() => !!activeJournalId.value),
            fetchPolicy: 'cache-and-network',
        },
    )

    const currentJournal = computed(
        () => singleResult.value?.journalPage ?? null,
    )

    function setSelectedJournal(id: string | null) {
        activeJournalId.value = id
    }

    async function updateJournal(id: string, input: UpdateJournalInput) {
        try {
            await updateJournalMutation({
                id,
                input,
            })
            await refetchPages()
        } catch (e) {
            console.error('Update failed:', e)
            throw e
        }
    }

    async function createJournal(
        input: CreateJournalInput,
    ): Promise<ReturnType<typeof createJournalMutation>> {
        try {
            const j = await createJournalMutation({
                input,
            })
            await refetchPages()
            return j
        } catch (e) {
            console.error('Creation failed:', e)
            throw e
        }
    }

    async function deleteJournal(journalId: string) {
        try {
            await softDeleteJournalMutation({
                id: journalId,
            })
            await refetchPages()
        } catch (e) {
            console.error('Deletation failed:', e)
            throw e
        }
    }

    const isLoading = computed(() => {
        const loading = !!activeJournalId.value && loadingSingle.value
        return loading
    })

    return {
        pages,
        currentJournal,
        isLoading,
        loadingSingle,
        activeJournalId,
        setSelectedJournal,
        refetchPages,
        updateJournal,
        createJournal,
        deleteJournal,
    }
})
