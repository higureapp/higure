<script setup lang="ts">
import { useAlertStore } from '@/stores/alert-store';
import { onClickOutside } from '@vueuse/core';
import { ref } from 'vue';
const alertStore = useAlertStore();


const fabRef = ref(null); 

onClickOutside(fabRef, () => (alertStore.isShowed = false));
</script>

<template>
    <Teleport to="body">
        <Transition name="fade-slide">
            <div v-if="alertStore.isShowed" class="alert-overlay">
                <div class="alert-box" ref="fabRef">
                    <p class="alert-message">{{ alertStore.message }}</p>
                    <div class="alert-actions">
                        <button @click="alertStore.cancel" class="btn-cancel">Dismiss</button>
                        <button @click="alertStore.confirm" class="btn-confirm">Yes</button>
                    </div>
                </div>
            </div>
        </Transition>
    </Teleport>
</template>


<style scoped>
.fade-slide-enter-active,
.fade-slide-leave-active {
    transition: opacity 0.1s ease, transform 0.1s cubic-bezier(0.16, 1, 0.3, 1);
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

.btn-cancel {
    background: var(--button-secondary-bg);
    color: var(--button-secondary-text);
}

.btn-confirm {
    background: var(--button-primary-bg);
    color: var(--button-primary-text);
}

.btn-confirm:hover {
    background: var(--button-primary-hover);
}
</style>