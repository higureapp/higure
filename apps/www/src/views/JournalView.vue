<script setup lang="ts">
import { useRoute } from 'vue-router';
import { useJournalStore } from '@/stores/journal-store';
import { ref, watch } from 'vue';
import { storeToRefs } from 'pinia';
import { RouterLink } from 'vue-router';
import JournalEditor from '@/components/journals/JournalEditor.vue';

const route = useRoute();
const journalStore = useJournalStore();
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
            <JournalEditor :id="currentJournal.id" :content="currentJournal.content" :date="currentJournal.date"
                :time="currentJournal.time" :location="currentJournal.location || ''"
                :tags="currentJournal.tags.map(t => t.name)" :is-new="false" />
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
    margin: 0 auto;
    font-family: "Ibarra Real Nova", serif;
    color: #000000;
    background-color: #EDEDED;
    display: flex;
    justify-content: center;
}

.loader {
    text-align: center;
    color: #666;
    font-size: 1.2rem;
}

.content {
    padding: 2rem;
    animation: fadeIn 0.5s ease-in-out;
    width: 100%;
    max-width: 40vw;
}


@media (max-width: 640px) {
    .content {
        max-width: 100vw;
    }
}

.not-found {
    text-align: center;
    width: 100%;
    height: 100vh;
    background-color: #EDEDED;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}

.err-name {
    font-size: 150px;
}

.not-found p {
    font-size: 1.2rem;
    color: #555;
}

.not-found a {
    color: #007bff;
    text-decoration: none;
    font-weight: 500;
}

.not-found a:hover {
    text-decoration: underline;
}
</style>