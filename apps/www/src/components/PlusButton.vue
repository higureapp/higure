<script setup lang="ts">
import { Plus, TypeIcon, XIcon, Image as ImageIcon, FileText } from 'lucide-vue-next';
import ActionButton from './ActionButton.vue';
import { ref } from 'vue';
import { onClickOutside } from '@vueuse/core';

const actions = ref([
    { icon: TypeIcon, label: 'Journal', path: '/journal/new' },
    { icon: ImageIcon, label: 'Image', path: '#' },
    { icon: FileText, label: 'Document', path: '#' },
]);

const isOpen = ref(false);
const fabRef = ref(null); 

onClickOutside(fabRef, () => (isOpen.value = false));
</script>

<template>
    <div class="fab-container" ref="fabRef">
        <TransitionGroup name="stack">
            <div v-if="isOpen" class="actions" key="actions-list">
                <ActionButton 
                    v-for="(action, index) in actions" 
                    :key="index"
                    :icon="action.icon" 
                    :label="action.label"
                    :size="18" 
                />
            </div>
        </TransitionGroup>

        <div class="plus-container" :class="{ 'is-active': isOpen }" @click="isOpen = !isOpen">
            <component :is="isOpen ? XIcon : Plus" color="#1D1B20" :size="28" />
        </div>
    </div>
</template>

<style scoped>
.fab-container {
    position: fixed;
    bottom: 2rem;
    right: 2rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    z-index: 100;
}

.plus-container {
    background-color: #FFBCBC;
    border-radius: 100%;
    width: 3.5rem;
    height: 3.5rem;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.3);
    cursor: pointer;
    transition: transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275), background-color 0.2s;
}

.plus-container:hover {
    background-color: #ff9a9a;
}

.plus-container.is-active {
    transform: rotate(90deg); 
}

.actions {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 1rem;
}

.stack-enter-active,
.stack-leave-active {
    transition: all 0.3s ease;
}

.stack-enter-from,
.stack-leave-to {
    opacity: 0;
    transform: translateY(20px) scale(0.5);
}
</style>