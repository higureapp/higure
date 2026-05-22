<script setup lang="ts">
import { computed } from 'vue';
import { useSettingsStore } from '@/stores/settings-store';

defineProps<{
    label: string;
    icon: any;
    action: () => void;
}>();

const settingsStore = useSettingsStore();
const iconColor = computed(() => settingsStore.isDarkTheme ? '#a0a0a0' : '#444');
</script>

<template>
    <div class="btn-ai" @click="action">
        <div class="icon-ai">
            <component :is="icon" size="38" :color="iconColor" />
        </div>
        <div class="text">
            <p>{{ label }}</p>
        </div>
    </div>
</template>

<style scoped>
.btn-ai {
    aspect-ratio: 1/1;
    padding: 1rem 1rem;
    width: 4rem;
    height: auto;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    border-radius: 14px;
    cursor: pointer;
    font-family: "Glory", sans-serif;
    transition: 300ms;
    background-color: var(--bg-tertiary);
    box-shadow: var(--shadow-strong);
}

.btn-ai:hover {
    background: var(--bg-card-hover);
    transition: 300ms;
    transform: translateY(3px);
    box-shadow: none;
}
</style>
