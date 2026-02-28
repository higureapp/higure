<script setup lang="ts">
import type { Component } from 'vue';

defineProps<{
    title: string;
    icon: Component;
}>();
</script>

<template>
    <div class="metric-group">
        <h4><component :is="icon" :size="14" /> {{ title }}</h4>
        <div class="items">
            <slot />
        </div>
    </div>
</template>

<style scoped>
.metric-group {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
    background: #ccc;
    padding: 1rem;
    border-radius: 1rem;
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.01), 0 2px 4px -1px rgba(0, 0, 0, 0.006);
}

.metric-group h4 {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-size: 0.7rem;
    font-weight: 700;
    text-transform: uppercase;
    color: #000000;
    letter-spacing: 0.05em;
    margin: 0 0 0.25rem 0;
}

.items {
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
}
</style>
