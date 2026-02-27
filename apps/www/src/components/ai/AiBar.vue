<script setup lang="ts">
import { useAiStore } from '@/stores/ai-store';
import { X, Music, Quote, Sparkles, Wand2, PlayCircle } from 'lucide-vue-next';
import { onMounted, computed } from 'vue';
import { useJournalStore } from '@/stores/journal-store';
import { storeToRefs } from 'pinia';

const aiStore = useAiStore();
const journalStore = useJournalStore();
const { currentJournal } = storeToRefs(journalStore);

const props = defineProps<{
    journalId: string
}>();

const analysis = computed(() => aiStore.analysisMap[props.journalId]);
const isLoading = computed(() => aiStore.isAiLoading[props.journalId]);

onMounted(() => {
    // Check if we already have it in the store or in the journal object
    if (!analysis.value && currentJournal.value?.aiAnalysis) {
        aiStore.setAnalysis(props.journalId, currentJournal.value.aiAnalysis as any);
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
                <div class="header-title">
                    <Sparkles :size="20" class="icon-sparkle" />
                    <h2>AI Insights</h2>
                </div>
                <button class="close-button" @click="aiStore.hideBar()" aria-label="Close">
                    <X :size="20" />
                </button>
            </header>

            <div class="ai-scroll-container">
                <div v-if="isLoading" class="loading-state">
                    <div class="shimmer-card"></div>
                    <div class="shimmer-text"></div>
                    <div class="shimmer-text short"></div>
                    <p class="loading-label">Brewing your analysis...</p>
                </div>

                <div v-else-if="analysis" class="analysis-content">
                    <!-- Critical Analysis section -->
                    <section class="analysis-section">
                        <div class="section-badge"><Wand2 :size="14" /> Reflection</div>
                        <p class="critical-text">{{ analysis.criticalAnalysis }}</p>
                    </section>

                    <!-- Quote Section -->
                    <section v-if="analysis.quote" class="quote-section">
                        <Quote :size="32" class="quote-icon" />
                        <blockquote class="elegant-quote">
                            "{{ analysis.quote }}"
                        </blockquote>
                        <cite class="quote-author">— {{ analysis.quoteAuthor }}</cite>
                    </section>

                    <!-- Suggested Songs -->
                    <section class="songs-section">
                        <h3>Match the Vibe</h3>
                        <div class="songs-grid">
                            <div v-for="(song, index) in analysis.suggestedSongs" :key="index" class="song-card">
                                <div class="song-info">
                                    <div class="song-header">
                                        <Music :size="16" />
                                        <span class="song-artist">{{ song.author || song.artist || 'Unknown' }}</span>
                                    </div>
                                    <h4 class="song-title">{{ song.title }}</h4>
                                    <p class="song-reason">{{ song.reason }}</p>
                                </div>
                                <a v-if="song.spotifyUrl" :href="song.spotifyUrl" target="_blank" class="play-btn">
                                    <PlayCircle :size="24" />
                                </a>
                            </div>
                        </div>
                    </section>
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
    background: #fdfbfb;
    border-left: 1px solid rgba(0, 0, 0, 0.05);
    display: flex;
    flex-direction: column;
    box-shadow: -10px 0 30px rgba(0, 0, 0, 0.02);
    z-index: 100;
}

.ai-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1.5rem;
    border-bottom: 1px solid rgba(0, 0, 0, 0.03);
}

.header-title {
    display: flex;
    align-items: center;
    gap: 0.75rem;
}

.header-title h2 {
    font-size: 1.25rem;
    font-weight: 600;
    color: #1a1a1a;
    margin: 0;
    letter-spacing: -0.02em;
}

.icon-sparkle {
    color: #8b5cf6;
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
    background: #f0f0f0;
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

/* Content Styles */
.analysis-section {
    margin-bottom: 2.5rem;
}

.section-badge {
    display: inline-flex;
    align-items: center;
    gap: 0.4rem;
    background: rgba(139, 92, 246, 0.1);
    color: #7c3aed;
    padding: 0.3rem 0.75rem;
    border-radius: 20px;
    font-size: 0.75rem;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    margin-bottom: 1rem;
}

.critical-text {
    font-family: "Ibarra Real Nova", serif;
    font-size: 1.1rem;
    line-height: 1.7;
    color: #333;
    white-space: pre-line;
}

.quote-section {
    position: relative;
    padding: 2.5rem 1.5rem;
    margin: 2.5rem 0;
    background: #fffafa;
    border-radius: 16px;
    text-align: center;
    border: 1px dashed rgba(0, 0, 0, 0.08);
}

.quote-icon {
    position: absolute;
    top: -15px;
    left: 20px;
    color: #ef4444;
    opacity: 0.15;
}

.elegant-quote {
    font-family: "Ibarra Real Nova", serif;
    font-style: italic;
    font-size: 1.4rem;
    color: #1a1a1a;
    margin-bottom: 1rem;
    line-height: 1.4;
}

.quote-author {
    font-family: "Figtree", sans-serif;
    font-size: 0.85rem;
    color: #666;
    font-weight: 500;
    text-transform: uppercase;
    letter-spacing: 0.1em;
}

.songs-section h3 {
    font-size: 1rem;
    font-weight: 700;
    margin-bottom: 1.25rem;
    color: #000;
    text-transform: uppercase;
    letter-spacing: 0.05em;
}

.songs-grid {
    display: flex;
    flex-direction: column;
    gap: 1rem;
}

.song-card {
    background: white;
    padding: 1.25rem;
    border-radius: 12px;
    border: 1px solid rgba(0, 0, 0, 0.04);
    display: flex;
    justify-content: space-between;
    align-items: center;
    transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.song-card:hover {
    transform: translateY(-2px);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.05);
}

.song-info {
    flex: 1;
}

.song-header {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    color: #999;
    margin-bottom: 0.25rem;
}

.song-artist {
    font-size: 0.7rem;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.04em;
}

.song-title {
    font-size: 1.05rem;
    font-weight: 600;
    margin: 0 0 0.5rem 0;
    color: #1a1a1a;
}

.song-reason {
    font-size: 0.85rem;
    color: #666;
    line-height: 1.5;
    font-style: italic;
}

.play-btn {
    color: #1db954;
    transition: transform 0.2s ease;
}

.play-btn:hover {
    transform: scale(1.1);
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
</style>