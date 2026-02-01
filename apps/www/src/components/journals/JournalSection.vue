<script setup lang="ts">
import type { GetJournalPageQuery, GetJournalPagesQuery } from '../../../gql_generated/graphql';
import JournalCard from './JournalCard.vue';

defineProps<{
    sectionTitle: string;
    pages: NonNullable<GetJournalPagesQuery['journalPages']['pages']>;
}>();
</script>

<template>
    <div class="journals-section">
        <h1>{{ sectionTitle }}</h1>
        <JournalCard v-for="page in pages" :page="page" />
    </div>
</template>

<style scoped>

h1 {
    color: #000000;
    font-family: "Ibarra Real Nova", serif;
    font-weight: 600;
    font-optical-sizing: auto;
    font-style: normal;
    font-size: 1.3rem;
    margin: 3rem 0;
}
</style>