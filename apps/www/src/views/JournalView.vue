<script setup lang="ts">
import { useRoute } from 'vue-router';
import { useJournalStore } from '@/stores/journal-store';
import { ref, watch } from 'vue';
import { storeToRefs } from 'pinia';
import { RouterLink } from 'vue-router';
import JournalEditor from '@/components/journals/JournalEditor.vue';
import AiBar from '@/components/ai/AiBar.vue';
import { useAiStore } from '@/stores/ai-store';

const route = useRoute();
const journalStore = useJournalStore();
const aiStore = useAiStore()
const { currentJournal, isLoading } = storeToRefs(journalStore);
const { setSelectedJournal } = journalStore;

const content = ref('');

watch(
    () => route.params.id,
    (newId) => {
        if (typeof newId === 'string') {
            setSelectedJournal(newId);
        } else if (!newId) {
            setSelectedJournal(null);
        }
    },
    { immediate: true }
);

watch(
    currentJournal,
    (journal) => {
        if (journal) {
            content.value = journal.content || '';
        }
    },
    { immediate: true }
);
</script>

<template>
    <div class="journal-detail-page">
        <div v-if="isLoading" class="loader">Loading..</div>

        <div v-else-if="currentJournal" class="content">
            <div class="editor-column">
                <div :class="{ editor_wrapper: aiStore.isShowed, editor: !aiStore.isShowed }">
                    <JournalEditor :id="currentJournal.id" :content="currentJournal.content" :date="currentJournal.date"
                        :time="currentJournal.time" :location="currentJournal.location || ''"
                        :tags="currentJournal.tags.map(t => t.name)" :is-new="false" />
                </div>
            </div>

            <aside v-if="aiStore.isShowed" class="ai-column">
                <AiBar />
            </aside>
        </div>

        <div v-else class="not-found">
            <p class="err-name">404</p>
            <p>Journal not found.</p>
            <router-link to="/">Go back to Home</router-link>
        </div>
    </div>
</template>

<style scoped>
.journal-detail-page {
    font-family: "Ibarra Real Nova", serif;
    color: #000000;
    background-color: #EDEDED;
    height: 100vh;
    width: 100%;
    overflow: hidden;
}

.content {
    display: flex;
    flex-direction: row;
    height: 100%;
    width: 100%;
    animation: fadeIn 0.5s ease-in-out;
}


.editor-column {
    flex: 1;
    height: 100%;
    overflow-y: auto;
    display: flex;
    justify-content: center;
    background-color: #EDEDED;
}


.editor {
    padding: 2rem;
    width: 100%;
    margin: 0 auto;
    max-width: 45vw;
}

.editor_wrapper {
    padding: 2rem;
    width: 100%;
    max-width: 800px;
    margin: 0 auto;
}

.ai-column {
    width: 30%;
    min-width: 300px;
    height: 100%;
    border-left: 1px solid #ddd;
    background-color: #ffffff;
}

.loader,
.not-found {
    height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}

.err-name {
    font-size: 150px;
    margin: 0;
}
</style>