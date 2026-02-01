<script setup lang="ts">
import type { LucideProps } from 'lucide-vue-next';
import type { FunctionalComponent } from 'vue';
import { RouterLink } from 'vue-router';

defineProps<{
    icon: FunctionalComponent<LucideProps, {}, any, {}>;
    size: number;
    label?: string;
}>()
</script>

<template>
    <RouterLink to="/journal/new" class="act-btn-wrapper">
        <span v-if="label" class="tooltip">{{ label }}</span>
        
        <div class="act-btn">
            <component :is="icon" :size="size" color="#000" />
        </div>
    </RouterLink>
</template>

<style scoped>
.act-btn-wrapper {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 0.8rem;
    text-decoration: none;
}

.act-btn {
    width: 1.3rem;
    height: 1.3rem;
    padding: 0.5rem;
    background-color: #ffbcbcdc;
    border-radius: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    aspect-ratio: 1/1;
    box-shadow: 0px 0px 4px 0px rgba(0, 0, 0, 0.2);
    cursor: pointer;
    transition: all 0.3s ease;
}

.act-btn:hover {
    background-color: #cf9797dc;
    transform: scale(1.1);
}

.tooltip {
    position: absolute;
    right: 120%; 
    background-color: #666;
    color: white;
    padding: 4px 8px;
    font-family: 'Glory', sans-serif;
    border-radius: 6px;
    font-size: 0.9rem;
    white-space: nowrap;
    opacity: 0;
    pointer-events: none;
    transition: opacity 0.3s ease, transform 0.3s ease;
    transform: translateX(10px);
}

.act-btn-wrapper:hover .tooltip {
    opacity: 1;
    transform: translateX(0);
}
</style>