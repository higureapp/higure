<script setup lang="ts">
import JournalEditor from '@/components/journals/JournalEditor.vue';

</script>

<template>
    <div class="journal-detail-page">
        <JournalEditor class="journal-detail-new" is-new />
        <div class="bar">
            <AiBar />
        </div>
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
    animation: fadeIn 0.5s ease-in-out;
}

.journal-detail-new {
    padding: 2rem;
    animation: fadeIn 0.5s ease-in-out;
    width: 100%;
    width: 40vw;
}

@media (max-width: 640px) {
    .journal-detail-new {
        width: 100vw;
    }
}
</style>