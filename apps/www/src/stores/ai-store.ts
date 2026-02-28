import { defineStore } from 'pinia'
import { ref } from 'vue'
import { useCreateAnalysisMutation, type AnalysisModel, type JournalAiAnalysis } from '../../gql_generated/graphql'

export const useAiStore = defineStore('ai', () => {
    const isShowed = ref<boolean>(false)
    const currentTab = ref<'insight' | 'analysis'>('insight')
    const isAiLoading = ref<Record<string, boolean>>({});
    // Store as any or union to handle both JournalAiAnalysis and AnalysisModel if needed,
    // though ideally they should be compatible enough for the UI.
    const analysisMap = ref<Record<string, any>>({});

    function showBar(tab: 'insight' | 'analysis' = 'insight') {
        currentTab.value = tab
        isShowed.value = true
    }

    function hideBar() {
        isShowed.value = false
    }


    async function createAiAnalysis(journalId: string) {
        if (isAiLoading.value[journalId]) return;

        const { mutate: createAiAnalysisMutation } = useCreateAnalysisMutation();

        isAiLoading.value[journalId] = true;
        try {
            const result = await createAiAnalysisMutation({ journalId });
            if (result?.data?.createAnalysis) {
                analysisMap.value[journalId] = result.data.createAnalysis;
            }
        } catch (error) {
            console.error('Error creating AI analysis:', error);
        } finally {
            isAiLoading.value[journalId] = false;
        }
    }

    function setAnalysis(journalId: string, data: any) {
        analysisMap.value[journalId] = data;
    }

    return {
        isShowed,
        currentTab,
        showBar,
        hideBar,
        createAiAnalysis,
        isAiLoading,
        analysisMap,
        setAnalysis
    }

})
