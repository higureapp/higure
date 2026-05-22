import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import {
    useSearchJournalsQuery,
    useSearchHistoryQuery,
    useDeleteSearchHistoryItemMutation,
    useClearSearchHistoryMutation,
    type SearchJournalsQuery,
} from '../../gql_generated/graphql'
import router from '@/router'

export const useSearchStore = defineStore('search', () => {
    const isModalOpen = ref<boolean>(false)
    const currentQuery = ref<string>('')
    const isSearching = ref<boolean>(false)
    const searchResults = ref<SearchJournalsQuery['searchJournals'] | null>(null)
    const cameFromSearch = ref<boolean>(false)

    const { mutate: deleteSearchHistoryItemMutation } = useDeleteSearchHistoryItemMutation()
    const { mutate: clearSearchHistoryMutation } = useClearSearchHistoryMutation()

    const { result: historyResult, loading: historyLoading, refetch: refetchHistory } = useSearchHistoryQuery()
    const searchHistory = computed(() => historyResult.value?.searchHistory ?? [])

    const searchTrigger = ref<number>(0)
    const { result: searchResult, loading: searchLoading, refetch: refetchSearch } = useSearchJournalsQuery(
        () => ({
            query: currentQuery.value,
            saveToHistory: true,
        }),
        {
            enabled: computed(() => searchTrigger.value > 0),
            fetchPolicy: 'network-only',
        },
    )

    function openModal() {
        isModalOpen.value = true
        void refetchHistory()
    }

    function closeModal() {
        isModalOpen.value = false
    }

    async function search(query: string) {
        if (!query.trim()) return

        currentQuery.value = query
        isSearching.value = true
        searchTrigger.value++

        try {
            const result = await refetchSearch()
            searchResults.value = result?.data?.searchJournals ?? null
            void refetchHistory()
        } catch (e) {
            console.error('Search failed:', e)
        } finally {
            isSearching.value = false
        }
    }

    function openJournal(journalId: string) {
        cameFromSearch.value = true
        closeModal()
        void router.push(`/journal/${journalId}`)
    }

    function backToSearch() {
        if (cameFromSearch.value) {
            void router.go(-1)
            setTimeout(() => {
                openModal()
            }, 100)
        }
        cameFromSearch.value = false
    }

    async function deleteHistoryItem(id: string) {
        try {
            await deleteSearchHistoryItemMutation({ id })
            void refetchHistory()
        } catch (e) {
            console.error('Failed to delete search history:', e)
        }
    }

    async function clearAllHistory() {
        try {
            await clearSearchHistoryMutation()
            void refetchHistory()
        } catch (e) {
            console.error('Failed to clear search history:', e)
        }
    }

    function executeHistoryItem(query: string) {
        void search(query)
    }

    return {
        isModalOpen,
        currentQuery,
        isSearching,
        searchResults,
        searchHistory,
        cameFromSearch,
        searchLoading,
        historyLoading,
        openModal,
        closeModal,
        search,
        openJournal,
        backToSearch,
        deleteHistoryItem,
        clearAllHistory,
        executeHistoryItem,
    }
})
