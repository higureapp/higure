<script setup lang="ts">
import { onClickOutside } from '@vueuse/core';
import { X } from 'lucide-vue-next';
import { ref, computed } from 'vue';
import { useSettingsStore } from '@/stores/settings-store';

const props = defineProps<{
    closeFn: () => void
}>();

const settingsStore = useSettingsStore();
const fabRef = ref(null); 

const iconColor = computed(() => settingsStore.isDarkTheme ? '#e5e5e5' : '#000000');

onClickOutside(fabRef, () => (props.closeFn()));
</script>

<template>
    <Teleport to="body">
        <Transition name="fade-slide">
            <div class="alert-overlay">
                <div class="alert-box" ref="fabRef">
                    <div class="close-modal" @click="closeFn">
                        <X :size="24" :color="iconColor" />
                    </div>
                    <slot></slot>
                </div>
            </div>
        </Transition>
    </Teleport>
</template>

<style scoped>
.fade-slide-enter-active,
.fade-slide-leave-active {
    transition: opacity 0.2s ease, transform 0.2s cubic-bezier(0.16, 1, 0.3, 1);
}

.fade-slide-enter-from,
.fade-slide-leave-to {
    opacity: 0;
    transform: scale(0.95);
}

.alert-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background: var(--bg-overlay);
    backdrop-filter: blur(4px);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 9999;
}

.alert-box {
    background: var(--bg-card);
    padding: 2rem;
    border-radius: 12px;
    box-shadow: var(--shadow-dropdown);
    width: 90%;
    max-width: 400px;
    text-align: center;
    box-shadow: var(--shadow-strong);
    position: relative;
}

.close-modal {
    position: absolute;
    top: 0.5rem;
    right: 0.5rem;
    transition: 300ms;
    cursor: pointer;
}

.close-modal:hover {
    opacity: 75%;
    transition: 300ms;
}

.alert-message {
    font-size: 1.1rem;
    color: var(--text-primary);
    margin-bottom: 1.5rem;
}

.alert-actions {
    display: flex;
    gap: 12px;
    justify-content: center;
}

button {
    padding: 10px 20px;
    border-radius: 6px;
    border: none;
    cursor: pointer;
    font-weight: 600;
    transition: background 0.2s;
}

</style>