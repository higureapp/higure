<script setup lang="ts">
import { useAiStore } from '@/stores/ai-store';
import { X, Sparkles, Stars, Brain, WandSparkles, ChevronDown } from 'lucide-vue-next';
import { onMounted, computed, ref, watch } from 'vue';
import { useJournalStore } from '@/stores/journal-store';
import { storeToRefs } from 'pinia';
import AiInsight from './AiInsight.vue';
import AiAnalysisView from './AiAnalysisView.vue';
import AiReflection from './AiReflection.vue';
import {
    useAvailableReflectionTypesQuery,
    ReflectionType,
} from '../../../gql_generated/graphql';

const aiStore = useAiStore();
const journalStore = useJournalStore();
const { currentJournal } = storeToRefs(journalStore);

const props = defineProps<{
    journalId: string
}>();

const analysis = computed(() => aiStore.analysisMap[props.journalId]);
const isLoading = computed(() => aiStore.isAiLoading[props.journalId]);
const activeTab = computed(() => aiStore.currentTab);

const isDropdownOpen = ref(false);
const selectedReflectionType = ref<ReflectionType | null>(null);
const reflectionTypes = ref<Array<{ type: ReflectionType; label: string; description: string; icon: string }>>([]);
const reflectionLoading = ref(false);

const { result: reflectionTypesResult, loading: reflectionTypesLoading } = useAvailableReflectionTypesQuery();

watch(reflectionTypesResult, (result) => {
    if (result?.availableReflectionTypes) {
        reflectionTypes.value = result.availableReflectionTypes as any;
        if (!selectedReflectionType.value && reflectionTypes.value.length > 0) {
            selectedReflectionType.value = reflectionTypes.value[0].type;
        }
    }
}, { immediate: true });

const currentReflection = computed(() => {
    if (!selectedReflectionType.value) return null;
    return aiStore.reflectionMap[`${props.journalId}:${selectedReflectionType.value}`];
});

const isReflectionLoading = computed(() => {
    if (!selectedReflectionType.value) return false;
    return aiStore.isReflectionLoading[`${props.journalId}:${selectedReflectionType.value}`] || reflectionLoading.value;
});

function selectType(type: ReflectionType) {
    selectedReflectionType.value = type;
    isDropdownOpen.value = false;
}

async function generateCurrentReflection() {
    if (!selectedReflectionType.value) return;
    reflectionLoading.value = true;
    try {
        await aiStore.createReflection(props.journalId, selectedReflectionType.value);
    } finally {
        reflectionLoading.value = false;
    }
}

function getSelectedTypeInfo() {
    if (!selectedReflectionType.value) {
        return { type: null, label: 'Loading...', description: '', icon: 'target' };
    }
    return reflectionTypes.value.find(t => t.type === selectedReflectionType.value) || {
        type: selectedReflectionType.value,
        label: String(selectedReflectionType.value),
        description: '',
        icon: 'target',
    };
}

onMounted(() => {
    if (!analysis.value && currentJournal.value?.aiAnalysis) {
        aiStore.setAnalysis(props.journalId, {
            ...currentJournal.value.aiAnalysis,
            metrics: currentJournal.value.metrics
        });
    }
    
    if (!analysis.value && !isLoading.value) {
        aiStore.createAiAnalysis(props.journalId);
    }
});
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
                    <button 
                        class="tab-btn" 
                        :class="{ active: activeTab === 'reflection' }"
                        @click="aiStore.currentTab = 'reflection'"
                    >
                        <Sparkles :size="16" />
                        Reflect
                    </button>
                </div>

                <div v-if="activeTab === 'reflection'" class="reflection-selector">
                    <div class="custom-select" @click="isDropdownOpen = !isDropdownOpen">
                        <div class="selected-type">
                            <span class="type-label">{{ getSelectedTypeInfo().label }}</span>
                            <ChevronDown :size="16" class="dropdown-icon" :class="{ rotated: isDropdownOpen }" />
                        </div>
                        <div class="type-description">{{ getSelectedTypeInfo().description }}</div>
                    </div>

                    <Transition name="fade">
                        <div v-if="isDropdownOpen" class="dropdown-menu">
                            <div 
                                v-for="type in reflectionTypes" 
                                :key="type.type"
                                class="dropdown-item"
                                :class="{ active: type.type === selectedReflectionType }"
                                @click="selectType(type.type)"
                            >
                                <span class="item-label">{{ type.label }}</span>
                                <span class="item-desc">{{ type.description }}</span>
                            </div>
                        </div>
                    </Transition>

                    <button 
                        class="generate-reflection-btn"
                        @click="generateCurrentReflection"
                        :disabled="isReflectionLoading"
                    >
                        <WandSparkles :size="14" />
                        {{ isReflectionLoading ? 'Generating...' : 'Generate' }}
                    </button>
                </div>
            </header>

            <div class="ai-scroll-container">
                <div v-if="activeTab === 'insight'">
                    <div v-if="isLoading" class="loading-state">
                        <div class="shimmer-text"></div>
                        <div class="shimmer-text"></div>
                        <div class="shimmer-text short"></div>
                        <p class="loading-label">Brewing your insight...</p>
                    </div>

                    <div v-else-if="analysis" class="analysis-wrapper">
                        <AiInsight :analysis="analysis" />
                    </div>

                    <div v-else class="empty-state">
                        <p>No analysis available for this entry.</p>
                        <button @click="aiStore.createAiAnalysis(props.journalId)" class="btn-retry">Generate Now</button>
                    </div>
                </div>

                <div v-else-if="activeTab === 'analysis'">
                    <div v-if="isLoading" class="loading-state">
                        <div class="shimmer-text"></div>
                        <div class="shimmer-text"></div>
                        <div class="shimmer-text short"></div>
                        <p class="loading-label">Analyzing your metrics...</p>
                    </div>

                    <div v-else-if="analysis?.metrics" class="analysis-wrapper">
                        <AiAnalysisView :metrics="analysis.metrics" />
                    </div>

                    <div v-else class="empty-state">
                        <p>No metrics available for this entry.</p>
                        <button @click="aiStore.createAiAnalysis(props.journalId)" class="btn-retry">Generate Now</button>
                    </div>
                </div>

                <div v-else-if="activeTab === 'reflection'">
                    <div v-if="isReflectionLoading" class="loading-state">
                        <div class="shimmer-text"></div>
                        <div class="shimmer-text"></div>
                        <div class="shimmer-text short"></div>
                        <p class="loading-label">Generating {{ getSelectedTypeInfo().label }} reflection...</p>
                    </div>

                    <div v-else-if="currentReflection" class="analysis-wrapper">
                        <AiReflection :reflection="currentReflection" />
                        <button 
                            class="btn-regenerate-reflection"
                            @click="generateCurrentReflection"
                        >
                            <WandSparkles :size="14" />
                            Regenerate
                        </button>
                    </div>

                    <div v-else class="empty-state">
                        <Sparkles :size="32" class="empty-icon" />
                        <p>Choose a reflection style and click Generate to explore different perspectives on your thoughts.</p>
                    </div>
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
    font-size: 0.8rem;
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

.reflection-selector {
    margin-top: 1rem;
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
}

.custom-select {
    background: #EDEDED;
    border: 1px solid rgba(0, 0, 0, 0.08);
    border-radius: 10px;
    padding: 0.75rem 1rem;
    cursor: pointer;
    transition: all 0.2s ease;
}

.custom-select:hover {
    border-color: rgba(0, 0, 0, 0.15);
    background: #f0f0f0;
}

.selected-type {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.type-label {
    font-weight: 600;
    color: #18181b;
    font-size: 0.95rem;
}

.dropdown-icon {
    color: #666;
    transition: transform 0.2s ease;
}

.dropdown-icon.rotated {
    transform: rotate(180deg);
}

.type-description {
    font-size: 0.75rem;
    color: #71717a;
    margin-top: 0.25rem;
}

.dropdown-menu {
    position: absolute;
    left: 1.25rem;
    right: 1.25rem;
    top: auto;
    margin-top: 0.25rem;
    background: #fff;
    border: 1px solid rgba(0, 0, 0, 0.1);
    border-radius: 12px;
    box-shadow: 0 10px 40px rgba(0, 0, 0, 0.1);
    max-height: 300px;
    overflow-y: auto;
    z-index: 1000;
}

.dropdown-item {
    padding: 0.85rem 1rem;
    cursor: pointer;
    transition: background 0.15s ease;
    border-bottom: 1px solid rgba(0, 0, 0, 0.04);
}

.dropdown-item:last-child {
    border-bottom: none;
}

.dropdown-item:hover {
    background: #f5f5f5;
}

.dropdown-item.active {
    background: #EBD8DC;
}

.item-label {
    display: block;
    font-weight: 600;
    color: #18181b;
    font-size: 0.9rem;
}

.item-desc {
    display: block;
    font-size: 0.75rem;
    color: #71717a;
    margin-top: 0.15rem;
}

.generate-reflection-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    padding: 0.75rem 1rem;
    background: #000;
    color: #fff;
    border: none;
    border-radius: 10px;
    font-weight: 600;
    font-size: 0.9rem;
    cursor: pointer;
    transition: all 0.2s ease;
}

.generate-reflection-btn:hover:not(:disabled) {
    background: #1a1a1a;
    transform: translateY(-1px);
}

.generate-reflection-btn:disabled {
    opacity: 0.6;
    cursor: not-allowed;
}

.btn-regenerate-reflection {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    padding: 0.85rem 1rem;
    background: #DBD3DC;
    color: #18181b;
    border: 1px solid rgba(0, 0, 0, 0.08);
    border-radius: 10px;
    font-weight: 600;
    font-size: 0.9rem;
    cursor: pointer;
    transition: all 0.2s ease;
    margin-top: 1rem;
    font-family: "Figtree", sans-serif;
}

.btn-regenerate-reflection:hover {
    background: #cfc7d0;
}

.empty-icon {
    color: #999;
    margin-bottom: 1rem;
    opacity: 0.5;
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
