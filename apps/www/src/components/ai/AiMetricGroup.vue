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
    background: var(--tag-bg);
    padding: 1rem;
    border-radius: 1rem;
    box-shadow: var(--shadow-subtle);
}

.metric-group h4 {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-size: 0.7rem;
    font-weight: 700;
    text-transform: uppercase;
    color: var(--text-primary);
    letter-spacing: 0.05em;
    margin: 0 0 0.25rem 0;
}

.items {
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
}
</style>
