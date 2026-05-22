import { computed, ref, watch } from 'vue'
import { defineStore } from 'pinia'
import {
    useCreateJournalPageMutation,
    useGetJournalPageQuery,
    useGetJournalPagesQuery,
    useSoftDeleteJournalPageMutation,
    useUpdateJournalPageMutation,
    type CreateJournalInput,
    type UpdateJournalInput,
    type GetJournalPagesQuery,
} from '../../gql_generated/graphql'

type JournalPageFromQuery = NonNullable<
    GetJournalPagesQuery['journalPages']['pages']
>[number]

const JOURNAL_PAGE_SIZE = 100

export const useJournalStore = defineStore('journal', () => {
    const { mutate: updateJournalMutation } = useUpdateJournalPageMutation()
    const { mutate: createJournalMutation } = useCreateJournalPageMutation()
    const { mutate: softDeleteJournalMutation } =
        useSoftDeleteJournalPageMutation()

    const allPages = ref<JournalPageFromQuery[]>([])
    const totalCount = ref<number>(0)
    const isLoadingAll = ref<boolean>(false)
    const hasMorePages = ref<boolean>(false)
    const fetchPage = ref<number>(0)

    const {
        result: pagesResult,
        loading: loadingPages,
        refetch: refetchPages,
    } = useGetJournalPagesQuery(
        () => ({
            filters: {},
            pagination: {
                page: fetchPage.value || 1,
                limit: JOURNAL_PAGE_SIZE,
            },
        }),
        {
            enabled: computed(() => fetchPage.value > 0),
            fetchPolicy: 'network-only',
        },
    )

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

    const pages = computed(() => ({
        journalPages: {
            pages: allPages.value,
            totalCount: totalCount.value,
            hasMore: hasMorePages.value,
            currentPage: 1,
            totalPages: Math.ceil(totalCount.value / JOURNAL_PAGE_SIZE),
        },
    }))

    watch(
        pagesResult,
        (newResult) => {
            if (newResult?.journalPages) {
                const data = newResult.journalPages
                const newPages = data.pages as JournalPageFromQuery[]

                if (fetchPage.value === 1) {
                    allPages.value = [...newPages]
                } else {
                    allPages.value = [...allPages.value, ...newPages]
                }
                totalCount.value = data.totalCount
                hasMorePages.value = data.hasMore

                if (data.hasMore) {
                    fetchPage.value++
                } else {
                    isLoadingAll.value = false
                }
            }
        },
        { deep: true },
    )

    async function loadAllPages(): Promise<void> {
        if (isLoadingAll.value) return

        isLoadingAll.value = true
        allPages.value = []
        totalCount.value = 0
        hasMorePages.value = false

        fetchPage.value = 1
    }

    function setSelectedJournal(id: string | null) {
        activeJournalId.value = id
    }

    async function updateJournal(id: string, input: UpdateJournalInput) {
        try {
            await updateJournalMutation({
                id,
                input,
            })
            await loadAllPages()
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
            await loadAllPages()
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
            await loadAllPages()
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
        allPages,
        totalCount,
        isLoadingAll,
        setSelectedJournal,
        loadAllPages,
        updateJournal,
        createJournal,
        deleteJournal,
    }
})
