<script setup lang="ts">
import { onClickOutside } from '@vueuse/core';
import { X } from 'lucide-vue-next';
import { ref } from 'vue';

const props = defineProps<{
    closeFn: () => void
}>();

const fabRef = ref(null); 

onClickOutside(fabRef, () => (props.closeFn()));
</script>

<template>
    <Teleport to="body">
        <Transition name="fade-slide">
            <div class="alert-overlay">
                <div class="alert-box" ref="fabRef">
                    <div class="close-modal" @click="closeFn">
                        <X :size="24" color="#000" />
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

</style>