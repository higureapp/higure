<script setup lang="ts">
import { useAiStore } from '@/stores/ai-store';
import { X, Sparkles, Stars, Brain, WandSparkles } from 'lucide-vue-next';
import { onMounted, computed } from 'vue';
import { useJournalStore } from '@/stores/journal-store';
import { storeToRefs } from 'pinia';
import AiInsight from './AiInsight.vue';
import AiAnalysisView from './AiAnalysisView.vue';

const aiStore = useAiStore();
const journalStore = useJournalStore();
const { currentJournal } = storeToRefs(journalStore);

const props = defineProps<{
    journalId: string
}>();

const analysis = computed(() => aiStore.analysisMap[props.journalId]);
const isLoading = computed(() => aiStore.isAiLoading[props.journalId]);
const activeTab = computed(() => aiStore.currentTab);

onMounted(() => {
    // Check if we already have it in the store or in the journal object
    if (!analysis.value && currentJournal.value?.aiAnalysis) {
        aiStore.setAnalysis(props.journalId, {
            ...currentJournal.value.aiAnalysis,
            metrics: currentJournal.value.metrics
        });
    }
    
    // If we still don't have it, create it
    if (!analysis.value && !isLoading.value) {
        aiStore.createAiAnalysis(props.journalId);
    }
})

</script>

<template>
    <Transition name="slide">
        <div class="ai-bar" v-if="aiStore.isShowed">
            <header class="ai-header">
                <div class="header-main">
                    <div class="header-title">
                        <WandSparkles :size="20" class="icon-sparkle" />
                        <h2>AI Companion</h2>
                    </div>
                    <button class="close-button" @click="aiStore.hideBar()" aria-label="Close">
                        <X :size="20" />
                    </button>
                </div>
                
                <div class="tab-switcher">
                    <button 
                        class="tab-btn" 
                        :class="{ active: activeTab === 'insight' }"
                        @click="aiStore.currentTab = 'insight'"
                    >
                        <Stars :size="16" />
                        Insight
                    </button>
                    <button 
                        class="tab-btn" 
                        :class="{ active: activeTab === 'analysis' }"
                        @click="aiStore.currentTab = 'analysis'"
                    >
                        <Brain :size="16" />
                        Analysis
                    </button>
                </div>
            </header>

            <div class="ai-scroll-container">
                <div v-if="isLoading" class="loading-state">
                    <div class="shimmer-text"></div>
                    <div class="shimmer-text"></div>
                    <div class="shimmer-text short"></div>
                    <p class="loading-label">Brewing your {{ activeTab }}...</p>
                </div>

                <div v-else-if="analysis" class="analysis-wrapper">
                    <Transition name="fade" mode="out-in">
                        <AiInsight v-if="activeTab === 'insight'" :analysis="analysis" />
                        <AiAnalysisView v-else-if="activeTab === 'analysis' && analysis.metrics" :metrics="analysis.metrics" />
                        <div v-else class="empty-state">
                           <p>No metrics available for this entry.</p>
                        </div>
                    </Transition>
                </div>

                <div v-else class="empty-state">
                    <p>No analysis available for this entry.</p>
                    <button @click="aiStore.createAiAnalysis(props.journalId)" class="btn-retry">Generate Now</button>
                </div>
            </div>
        </div>
    </Transition>
</template>

<style scoped>
.ai-bar {
    position: relative;
    width: 100%;
    height: 100%;
    background: #EBD8DC;
    border-left: 1px solid rgba(0, 0, 0, 0.05);
    display: flex;
    flex-direction: column;
    box-shadow: -10px 0 30px rgba(0, 0, 0, 0.02);
    z-index: 100;
    font-family: "Figtree", sans-serif;
}

.ai-header {
    display: flex;
    flex-direction: column;
    padding: 1.25rem 1.25rem 0.75rem 1.25rem;
    border-bottom: 1px solid rgba(0, 0, 0, 0.03);
    background: #EBD8DC;
}

.header-main {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1rem;
}

.header-title {
    display: flex;
    align-items: center;
    gap: 0.75rem;
}

.header-title h2 {
    font-size: 1.1rem;
    font-weight: 700;
    color: #000000;
    margin: 0;
    letter-spacing: -0.02em;
    text-transform: uppercase;
}

.icon-sparkle {
    color: #000000;
}

.tab-switcher {
    display: flex;
    background: #cbcbcd;
    padding: 0.25rem;
    border-radius: 10px;
    gap: 0.25rem;
}

.tab-btn {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    padding: 0.5rem;
    border: none;
    background: transparent;
    border-radius: 8px;
    font-size: 0.85rem;
    font-weight: 600;
    color: #71717a;
    cursor: pointer;
    transition: all 0.2s ease;
}

.tab-btn.active {
    background: #EDEDED;
    color: #18181b;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.close-button {
    background: transparent;
    border: none;
    cursor: pointer;
    color: #666;
    padding: 0.5rem;
    border-radius: 50%;
    transition: all 0.2s ease;
    display: flex;
    align-items: center;
    justify-content: center;
}

.close-button:hover {
    background: rgba(0, 0, 0, 0.05);
    color: #000;
}

.ai-scroll-container {
    flex: 1;
    overflow-y: auto;
    padding: 1.5rem;
}

/* Transitions */
.slide-enter-active, .slide-leave-active {
    transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1);
}
.slide-enter-from, .slide-leave-to {
    transform: translateX(100%);
}

.fade-enter-active, .fade-leave-active {
    transition: opacity 0.2s ease;
}
.fade-enter-from, .fade-leave-to {
    opacity: 0;
}

/* Loading State */
.loading-state {
    display: flex;
    flex-direction: column;
    gap: 1rem;
}

.shimmer-card {
    height: 180px;
    background: linear-gradient(90deg, #f0f0f0 25%, #f8f8f8 50%, #f0f0f0 75%);
    background-size: 200% 100%;
    animation: shimmer 1.5s infinite;
    border-radius: 12px;
}

.shimmer-text {
    height: 12px;
    background: #8d8d8d;
    border-radius: 6px;
}

.shimmer-text.short { width: 60%; }

@keyframes shimmer {
    0% { background-position: 200% 0; }
    100% { background-position: -200% 0; }
}

.loading-label {
    text-align: center;
    color: #999;
    font-size: 0.9rem;
    margin-top: 1rem;
}

.btn-retry {
    background: #000;
    color: #fff;
    border: none;
    padding: 0.75rem 1.5rem;
    border-radius: 8px;
    font-weight: 600;
    cursor: pointer;
    margin-top: 1rem;
}

.empty-state {
    text-align: center;
    padding: 3rem 1rem;
    color: #999;
}
</style>