<script setup lang="ts">
import { useRouter } from 'vue-router';
import type { GetJournalPagesQuery } from '../../../gql_generated/graphql';


const props = defineProps<{
    page: NonNullable<GetJournalPagesQuery['journalPages']['pages'][0]>;
}>()

const numToWeekDay: Record<number, string> = {
    0: 'mon',
    1: 'tue',
    2: 'wed',
    3: 'thu',
    4: 'fri',
    5: 'sat',
    6: 'sun'
}

</script>

<template>
    <RouterLink :to="`/journal/${page.id}`" class="jcard">
        <div class="jdate">
            <p class="dayofweek">{{ numToWeekDay[new Date(page.date).getDay()]?.toUpperCase() }}</p>
            <p class="dayofmonth">{{ new Date(page.date).getDate() }}</p>
        </div>
        <div class="jbody">
            <p class="content">{{ page.content.slice(0, Math.floor(Math.random() * 70 + 125)) }}...</p>
        </div>
    </RouterLink>
</template>

<style scoped>
.jcard {
    color: #000000;
    padding: 1rem;
    border-radius: 14px;
    display: flex;
    flex-direction: row;
    gap: 2rem;
    transition: 300ms;
    cursor: pointer;
    box-shadow: 0 0 3px 0 #00000000;
    text-decoration: none;
}

.jcard:hover {
    box-shadow: 0 0 3px 0 #000;
    background-color: #FDC3C3;
    transition: 300ms;
}

.jdate {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 5%;
}

.jdate>.dayofweek {
    font-family: "Ibarra Real Nova", serif;
    font-weight: normal;
    font-optical-sizing: auto;
    font-style: normal;
    font-size: 0.7rem
}

.dayofmonth {
    font-family: "Glory", sans-serif;
    font-weight: bold;
    font-size: 1.5rem;
}
</style>