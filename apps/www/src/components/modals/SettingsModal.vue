<script setup lang="ts">
import { useSettingsStore } from '@/stores/settings-store';
import Modal from './Modal.vue';
const settingsStore = useSettingsStore()

</script>

<template>
    <Modal v-if="settingsStore.isModalOpen" :close-fn="settingsStore.closeModal">
        <h1>Settings</h1>
    </Modal>
</template>

<style scoped></style>