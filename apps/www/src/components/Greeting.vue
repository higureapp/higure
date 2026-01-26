<script setup lang="ts">
import type { GetMeQuery, GetMeQueryVariables } from '../../gql_generated/graphql';

defineProps<{
    me: NonNullable<GetMeQuery['me']>,
    size?: string
}>()

</script>

<template>
    <h1 :style="{ fontSize: size }">Good morning, <br><b>{{ me.firstname }}</b></h1>
</template>

<style scoped>

h1 {
    color: #000;
    font-family: "Ibarra Real Nova", serif;
    font-weight: 300;
    font-optical-sizing: auto;
    font-style: normal;
}
</style>