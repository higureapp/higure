<script setup lang="ts">
import { useAiStore } from '@/stores/ai-store';
import { ref } from 'vue'

const aiStore = useAiStore();
</script>

<template>
    <div class="ai-bar" v-if="aiStore.isShowed">
        <div class="sidebar-header">
            <h2>My Playlist</h2>
        </div>
    </div>
</template>

<style scoped>
.ai-bar {
    width: 100%;
    height: 100%;
    background: #EBD8DC;
    color: #000;
    font-family: "Figtree", sans-serif;
    font-optical-sizing: auto;
    font-style: normal;
    padding: 2rem;
}
</style>