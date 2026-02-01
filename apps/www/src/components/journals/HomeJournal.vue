<script setup lang="ts">
import { computed } from 'vue';
import { useJournalStore } from '@/stores/journal-store';
import { storeToRefs } from 'pinia';
import JournalSection from './JournalSection.vue';
import dayjs from 'dayjs';

const journalStore = useJournalStore();
const { pages } = storeToRefs(journalStore);

const safePages = computed(() => pages.value?.journalPages?.pages || []);

const groupedPages = computed(() => {
    const groups: Record<string, any[]> = {};

    safePages.value.forEach(page => {
        const monthYear = dayjs(page.date).format('MMMM YYYY');
        if (!groups[monthYear]) groups[monthYear] = [];
        groups[monthYear].push(page);
    });

    return groups;
});
</script>

<template>
    <div class="journals-container">
        <template v-if="Object.keys(groupedPages).length > 0">
            <JournalSection v-for="(items, monthYear) in groupedPages" :key="monthYear" :pages="items"
                :section-title="monthYear" />
        </template>

        <div v-else-if="journalStore.isLoading" class="loading">
            Loading journals...
        </div>
    </div>
</template>

<style scoped>
.journals-container {
    padding: 0 5px;
    height: 100vh;
    overflow-y: scroll;
    overflow-x: hidden;
    -webkit-overflow-scrolling: touch;
    padding-bottom: 5rem;
}

.loading {
    padding: 2rem;
    text-align: center;
    font-style: italic;
    color: #666;
}
</style>