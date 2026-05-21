import { defineStore } from 'pinia'
import { ref } from 'vue'
import {
    useCreateAnalysisMutation,
    useCreateReflectionMutation,
    type AnalysisModel,
    type JournalAiAnalysis,
    type ReflectionType,
} from '../../gql_generated/graphql'

export const useAiStore = defineStore('ai', () => {
    const { mutate: createAnalysisMutation } = useCreateAnalysisMutation()
    const { mutate: createReflectionMutation } = useCreateReflectionMutation()

    const isShowed = ref<boolean>(false)
    const currentTab = ref<'insight' | 'analysis' | 'reflection'>('insight')
    const isAiLoading = ref<Record<string, boolean>>({})
    const analysisMap = ref<Record<string, any>>({})

    const reflectionMap = ref<Record<string, any>>({})
    const isReflectionLoading = ref<Record<string, boolean>>({})

    function showBar(tab: 'insight' | 'analysis' | 'reflection' = 'insight') {
        currentTab.value = tab
        isShowed.value = true
    }

    function hideBar() {
        isShowed.value = false
    }

    async function createAiAnalysis(journalId: string) {
        if (isAiLoading.value[journalId]) return

        isAiLoading.value[journalId] = true
        try {
            const result = await createAnalysisMutation({ journalId })
            if (result?.data?.createAnalysis) {
                analysisMap.value[journalId] = result.data.createAnalysis
            }
        } catch (error) {
            console.error('Error creating AI analysis:', error)
        } finally {
            isAiLoading.value[journalId] = false
        }
    }

    async function createReflection(journalId: string, type: ReflectionType) {
        const key = `${journalId}:${type}`
        if (isReflectionLoading.value[key]) return

        isReflectionLoading.value[key] = true
        try {
            const result = await createReflectionMutation({ journalId, type })
            if (result?.data?.createReflection) {
                reflectionMap.value[key] = result.data.createReflection
            }
        } catch (error) {
            console.error('Error creating reflection:', error)
        } finally {
            isReflectionLoading.value[key] = false
        }
    }

    function setAnalysis(journalId: string, data: any) {
        analysisMap.value[journalId] = data
    }

    return {
        isShowed,
        currentTab,
        showBar,
        hideBar,
        createAiAnalysis,
        createReflection,
        isAiLoading,
        analysisMap,
        reflectionMap,
        isReflectionLoading,
        setAnalysis,
    }
})
