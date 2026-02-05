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
            <span class="dayofweek">{{ numToWeekDay[new Date(page.date).getDay()]?.toUpperCase() }}</span>
            <span class="dayofmonth">{{ new Date(page.date).getDate() }}</span>
        </div>
        <div class="jbody">
            <p class="content">{{ page.content.slice(0, 150) }}...</p>
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
    gap: 1rem;
    align-items: center;
    transition: 300ms;
    text-decoration: none;
}

.jdate {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 3.5rem;
    flex-shrink: 0;
    text-align: center;
}

.dayofweek {
    font-family: "Ibarra Real Nova", serif;
    font-size: 0.7rem;
    margin: 0;
    line-height: 1;
    color: #666;
}

.dayofmonth {
    font-family: "Glory", sans-serif;
    font-weight: bold;
    font-size: 1.8rem;
    margin: 0;
    line-height: 1.1;
}

.jbody {
    flex-grow: 1;
}

.jcard:hover {
    box-shadow: 0 0 3px 0 #000;
    background-color: #FDC3C3;
    transition: 300ms;
}
</style>