<script setup lang="ts">
import { useAlertStore } from '@/stores/alert-store';
const alertStore = useAlertStore();
</script>

<template>
    <Teleport to="body">
        <Transition name="fade-slide">
            <div v-if="alertStore.isShowed" class="alert-overlay">
                <div class="alert-box">
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
    backdrop-filter: blur(4px);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 9999;
}

.alert-box {
    background: white;
    padding: 2rem;
    border-radius: 12px;
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.3);
    width: 90%;
    max-width: 400px;
    text-align: center;
    box-shadow: 0 0 3px 0 #000;
}

.alert-message {
    font-size: 1.1rem;
    color: #333;
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
    background: #e0e0e0;
    color: #333;
}

.btn-confirm {
    background: #000;
    color: #fff;
}

.btn-confirm:hover {
    background: #333;
}
</style>