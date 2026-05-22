<script setup lang="ts">
import { onClickOutside } from '@vueuse/core';
import { X, Search, Trash2, Clock, ArrowRight, Loader2 } from 'lucide-vue-next';
import { ref, watch, computed } from 'vue';
import { useSearchStore } from '@/stores/search-store';
import router from '@/router';

const searchStore = useSearchStore();

const searchInput = ref('');
const showResults = ref(false);
const showHistory = ref(true);

const modalRef = ref<HTMLElement | null>(null);
const inputRef = ref<HTMLInputElement | null>(null);

onClickOutside(modalRef, () => (searchStore.closeModal()));

function handleSearch() {
    if (searchInput.value.trim()) {
        searchStore.search(searchInput.value);
        showResults.value = true;
        showHistory.value = false;
    }
}

function handleKeydown(e: KeyboardEvent) {
    if (e.key === 'Enter') {
        handleSearch();
    }
}

function openFromHistory(query: string) {
    searchInput.value = query;
    searchStore.search(query);
    showResults.value = true;
    showHistory.value = false;
}

function openJournal(journalId: string) {
    searchStore.openJournal(journalId);
}

function formatDate(isoString: string): string {
    const date = new Date(isoString);
    return date.toLocaleDateString('it-IT', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
    });
}

function formatRelevance(score: number): string {
    if (score >= 0.8) return 'Very relevant';
    if (score >= 0.5) return 'Relevant';
    return 'Partially relevant';
}

watch(() => searchStore.isModalOpen, (isOpen) => {
    if (isOpen) {
        setTimeout(() => {
            inputRef.value?.focus();
        }, 100);
    } else {
        showResults.value = false;
        showHistory.value = true;
    }
});

const hasHistory = computed(() => searchStore.searchHistory.length > 0);
</script>

<template>
    <Teleport to="body">
        <Transition name="fade-slide">
            <div class="search-overlay" v-if="searchStore.isModalOpen">
                <div class="search-box" ref="modalRef">
                    <div class="search-header">
                        <div class="search-input-wrapper">
                            <Search :size="20" class="search-icon" />
                            <input
                                ref="inputRef"
                                v-model="searchInput"
                                type="text"
                                placeholder="Search your notes... (e.g., 'all travel posts')"
                                class="search-input"
                                @keydown="handleKeydown"
                            />
                            <button
                                class="search-btn"
                                @click="handleSearch"
                                :disabled="!searchInput.trim() || searchStore.isSearching"
                            >
                                <Loader2 v-if="searchStore.isSearching" :size="18" class="spinning" />
                                <ArrowRight v-else :size="18" />
                            </button>
                        </div>
                        <div v-if="false" class="close-modal" @click="searchStore.closeModal">
                            <X :size="24" color="#000" />
                        </div>
                    </div>

                    <div class="search-body">
                        <Transition name="fade" mode="out-in">
                             <template v-if="searchStore.searchLoading">
                                <div class="search-loading">
                                    <Loader2 :size="32" class="spinning" />
                                    <p>Searching with AI...</p>
                                </div>
                            </template>

                            <template v-else-if="showResults && searchStore.searchResults">
                                <div class="results-section">
                                    <div class="results-header">
                                        <span class="results-count">
                                            {{ searchStore.searchResults.totalMatches }} results
                                        </span>
                                        <button class="btn-show-history" @click="showHistory = true; showResults = false">
                                            <Clock :size="14" />
                                            History
                                        </button>
                                    </div>

                                    <div class="results-list" v-if="searchStore.searchResults.results?.length">
                                        <div
                                            v-for="result in searchStore.searchResults.results"
                                            :key="result.journalPageId"
                                            class="result-card"
                                            @click="openJournal(result.journalPageId)"
                                        >
                                            <div class="result-header">
                                                <span class="result-date">{{ formatDate(result.date) }}</span>
                                                <span class="result-relevance">{{ formatRelevance(result.relevanceScore) }}</span>
                                            </div>
                                            <p class="result-summary">{{ result.summary }}</p>
                                            <div class="result-preview" v-if="result.contentPreview">
                                                {{ result.contentPreview }}
                                            </div>
                                            <div class="result-highlights" v-if="result.highlights?.length">
                                                <div
                                                    v-for="(highlight, idx) in result.highlights.slice(0, 2)"
                                                    :key="idx"
                                                    class="highlight-item"
                                                >
                                                    <span class="highlight-concept">{{ highlight.matchingConcept }}:</span>
                                                    <span class="highlight-text">"{{ highlight.matchedText }}"</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="no-results" v-else>
                                        <p>No results found for "{{ searchInput }}"</p>
                                    </div>
                                </div>
                            </template>

                            <template v-else-if="showHistory && hasHistory">
                                <div class="history-section">
                                    <div class="history-header">
                                        <h3>Recently searched</h3>
                                        <button
                                            class="btn-clear-history"
                                            v-if="hasHistory"
                                            @click="searchStore.clearAllHistory"
                                        >
                                            <Trash2 :size="14" />
                                            Clean all
                                        </button>
                                    </div>
                                    <div class="history-list">
                                        <div
                                            v-for="item in searchStore.searchHistory"
                                            :key="item.id"
                                            class="history-item"
                                        >
                                            <Clock :size="16" class="history-icon" />
                                            <span
                                                class="history-query"
                                                @click="openFromHistory(item.query)"
                                            >
                                                {{ item.query }}
                                            </span>
                                            <span class="history-meta">
                                                {{ item.resultCount }} results
                                            </span>
                                            <button
                                                class="btn-delete-history"
                                                @click.stop="searchStore.deleteHistoryItem(item.id)"
                                            >
                                                <Trash2 :size="14" />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </template>

                            <template v-else>
                                <div class="search-empty">
                                    <Search :size="48" class="empty-icon" />
                                    <p>Search your notes using natural language</p>
                                    <div class="search-suggestions">
                                        <span class="suggestion" @click="searchInput = 'post where I talk about travel'">
                                            "post where I talk about travel"
                                        </span>
                                        <span class="suggestion" @click="searchInput = 'happy moments in the last year'">
                                            "happy moments in the last year"
                                        </span>
                                        <span class="suggestion" @click="searchInput = 'thoughts on work and career'">
                                            "thoughts on work and career"
                                        </span>
                                    </div>
                                </div>
                            </template>
                        </Transition>
                    </div>
                </div>
            </div>
        </Transition>
    </Teleport>
</template>

<style scoped>
.fade-slide-enter-active,
.fade-slide-leave-active {
    transition: opacity 0.2s ease, transform 0.2s cubic-bezier(0.16, 1, 0.3, 1);
}

.fade-slide-enter-from,
.fade-slide-leave-to {
    opacity: 0;
    transform: scale(0.95);
}

.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.15s ease;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}

.search-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background: rgba(0, 0, 0, 0.3);
    backdrop-filter: blur(6px);
    display: flex;
    align-items: flex-start;
    justify-content: center;
    padding-top: 10vh;
    z-index: 9999;
}

.search-box {
    background: #EDEDED;
    border-radius: 16px;
    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.15);
    width: 90%;
    max-width: 700px;
    max-height: 80vh;
    display: flex;
    flex-direction: column;
    position: relative;
    overflow: hidden;
}

.search-header {
    display: flex;
    align-items: center;
    gap: 1rem;
    padding: 1.25rem 1.25rem 1rem 1.25rem;
    border-bottom: 1px solid rgba(0, 0, 0, 0.05);
    background: #EDEDED;
}

.search-input-wrapper {
    flex: 1;
    display: flex;
    align-items: center;
    background: #fff;
    border: 1px solid rgba(0, 0, 0, 0.08);
    border-radius: 12px;
    padding: 0 0.75rem 0 1rem;
    gap: 0.5rem;
}

.search-icon {
    color: #999;
    flex-shrink: 0;
}

.search-input {
    flex: 1;
    border: none;
    background: transparent;
    font-size: 1rem;
    padding: 0.85rem 0;
    outline: none;
    font-family: "Figtree", sans-serif;
}

.search-input::placeholder {
    color: #aaa;
}

.search-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0.5rem;
    background: #000;
    border: none;
    border-radius: 8px;
    color: #fff;
    cursor: pointer;
    transition: all 0.2s ease;
}

.search-btn:hover:not(:disabled) {
    background: #1a1a1a;
}

.search-btn:disabled {
    opacity: 0.4;
    cursor: not-allowed;
}

.close-modal {
    position: absolute;
    top: 1rem;
    right: 1rem;
    transition: opacity 0.2s;
    cursor: pointer;
    padding: 0.25rem;
    border-radius: 50%;
}

.close-modal:hover {
    background: rgba(0, 0, 0, 0.05);
}

.search-body {
    flex: 1;
    overflow-y: auto;
    padding: 1rem 1.25rem 1.5rem 1.25rem;
}

.search-loading {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 3rem;
    gap: 1rem;
    color: #666;
}

.spinning {
    animation: spin 1s linear infinite;
}

@keyframes spin {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
}

.search-empty {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 2rem 1rem;
    text-align: center;
    color: #666;
}

.empty-icon {
    opacity: 0.3;
    margin-bottom: 1rem;
}

.search-suggestions {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
    margin-top: 1.5rem;
    justify-content: center;
}

.suggestion {
    font-size: 0.85rem;
    padding: 0.5rem 1rem;
    background: #DBD3DC;
    border-radius: 20px;
    cursor: pointer;
    transition: all 0.2s ease;
    font-family: "Figtree", sans-serif;
}

.suggestion:hover {
    background: #cfc7d0;
}

.results-section {
    display: flex;
    flex-direction: column;
    gap: 1rem;
}

.results-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-bottom: 0.5rem;
}

.results-count {
    font-size: 0.85rem;
    font-weight: 600;
    color: #666;
    text-transform: uppercase;
    letter-spacing: 0.05em;
}

.btn-show-history {
    display: flex;
    align-items: center;
    gap: 0.4rem;
    padding: 0.4rem 0.75rem;
    background: transparent;
    border: 1px solid rgba(0, 0, 0, 0.1);
    border-radius: 8px;
    font-size: 0.8rem;
    color: #666;
    cursor: pointer;
    transition: all 0.2s ease;
}

.btn-show-history:hover {
    background: rgba(0, 0, 0, 0.02);
    border-color: rgba(0, 0, 0, 0.15);
}

.results-list {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
}

.result-card {
    background: #fff;
    border-radius: 12px;
    padding: 1rem 1.25rem;
    border: 1px solid rgba(0, 0, 0, 0.04);
    cursor: pointer;
    transition: all 0.2s ease;
}

.result-card:hover {
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
    transform: translateY(-1px);
}

.result-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 0.5rem;
}

.result-date {
    font-size: 0.8rem;
    font-weight: 600;
    color: #8b5cf6;
    text-transform: uppercase;
    letter-spacing: 0.03em;
}

.result-relevance {
    font-size: 0.75rem;
    padding: 0.25rem 0.5rem;
    background: rgba(139, 92, 246, 0.1);
    border-radius: 4px;
    color: #7c3aed;
}

.result-summary {
    font-family: "Ibarra Real Nova", serif;
    font-size: 1rem;
    line-height: 1.5;
    color: #1a1a1a;
    margin: 0.5rem 0;
}

.result-preview {
    font-size: 0.85rem;
    color: #666;
    line-height: 1.5;
    margin-top: 0.5rem;
    padding-top: 0.5rem;
    border-top: 1px solid rgba(0, 0, 0, 0.04);
}

.result-highlights {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    margin-top: 0.75rem;
    padding-top: 0.75rem;
    border-top: 1px dashed rgba(0, 0, 0, 0.06);
}

.highlight-item {
    font-size: 0.85rem;
}

.highlight-concept {
    font-weight: 600;
    color: #8b5cf6;
    margin-right: 0.25rem;
}

.highlight-text {
    font-style: italic;
    color: #555;
}

.no-results {
    text-align: center;
    padding: 3rem 1rem;
    color: #999;
}

.history-section {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
}

.history-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-bottom: 0.25rem;
}

.history-header h3 {
    margin: 0;
    font-size: 0.85rem;
    font-weight: 600;
    color: #666;
    text-transform: uppercase;
    letter-spacing: 0.05em;
}

.btn-clear-history {
    display: flex;
    align-items: center;
    gap: 0.4rem;
    padding: 0.4rem 0.75rem;
    background: transparent;
    border: none;
    border-radius: 8px;
    font-size: 0.8rem;
    color: #999;
    cursor: pointer;
    transition: all 0.2s ease;
}

.btn-clear-history:hover {
    color: #ef4444;
    background: rgba(239, 68, 68, 0.05);
}

.history-list {
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
}

.history-item {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    padding: 0.75rem 0.85rem;
    border-radius: 8px;
    cursor: pointer;
    transition: all 0.2s ease;
}

.history-item:hover {
    background: rgba(0, 0, 0, 0.02);
}

.history-icon {
    color: #999;
    flex-shrink: 0;
}

.history-query {
    flex: 1;
    font-size: 0.95rem;
    color: #1a1a1a;
    font-family: "Ibarra Real Nova", serif;
}

.history-query:hover {
    text-decoration: underline;
}

.history-meta {
    font-size: 0.75rem;
    color: #999;
    flex-shrink: 0;
}

.btn-delete-history {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0.4rem;
    background: transparent;
    border: none;
    border-radius: 6px;
    color: #bbb;
    cursor: pointer;
    opacity: 0;
    transition: all 0.2s ease;
}

.history-item:hover .btn-delete-history {
    opacity: 1;
}

.btn-delete-history:hover {
    color: #ef4444;
    background: rgba(239, 68, 68, 0.05);
}
</style>
