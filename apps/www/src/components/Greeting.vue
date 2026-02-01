<script setup lang="ts">
import { computed } from 'vue';
import type { GetMeQuery } from '../../gql_generated/graphql';

defineProps<{
    me: NonNullable<GetMeQuery['me']>,
    size?: string
}>()

const greeting = computed(() => {
    const hour = new Date().getHours();
    
    if (hour >= 5 && hour < 12) return 'Good morning';
    if (hour >= 12 && hour < 17) return 'Good afternoon';
    if (hour >= 17 && hour < 21) return 'Good evening';
    return 'Good night';
});
</script>

<template>
    <h1 :style="{ fontSize: size }">
        {{ greeting }}, <br>
        <b>{{ me.firstname }}</b>
    </h1>
</template>

<style scoped>
h1 {
    color: #000;
    font-family: "Ibarra Real Nova", serif;
    font-weight: 300;
    font-optical-sizing: auto;
    font-style: normal;
    line-height: 1.2;
}

b {
    font-weight: 700;
}
</style>