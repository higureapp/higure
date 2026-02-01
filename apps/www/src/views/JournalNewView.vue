<script setup lang="ts">
import JournalEditor from '@/components/journals/JournalEditor.vue';

</script>

<template>
    <div class="journal-detail-page">
        <JournalEditor is-new />
    </div>
</template>

<style scoped>
.journal-detail-page {
    padding: 2rem;
    margin: 0 auto;
    font-family: "Ibarra Real Nova", serif;
    color: #000000;
    background-color: #EDEDED;
    display: flex;
    justify-content: center;
}

</style>