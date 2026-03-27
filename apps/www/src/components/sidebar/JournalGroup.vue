<script setup lang="ts">
import { ref } from 'vue';
import { ChevronRight, ChevronDown } from 'lucide-vue-next';

defineProps<{
    label: string,
    level?: number
}>()

const isOpen = ref(false);
</script>

<template>
    <div class="group-container" :style="{ paddingLeft: (level || 0) * 12 + 'px' }">
        <div class="group-header" @click="isOpen = !isOpen">
            <component :is="isOpen ? ChevronDown : ChevronRight" :size="14" class="icon" />
            <span class="label">{{ label }}</span>
        </div>
        <div v-if="isOpen" class="group-content">
            <slot />
        </div>
    </div>
</template>

<style scoped>
.group-header {
    display: flex;
    align-items: center;
    gap: 4px;
    padding: 4px 12px;
    cursor: pointer;
    user-select: none;
    transition: background 0.2s;
    color: #000;
    border-radius: 8px;
}
.group-header:hover {
    background: rgba(0, 0, 0, 0.05);
}
.label {
    font-size: 0.85rem;
    font-weight: 600;
    text-transform: capitalize;
}
.icon {
    opacity: 0.5;
}
.group-content {
    display: flex;
    flex-direction: column;
}
</style>