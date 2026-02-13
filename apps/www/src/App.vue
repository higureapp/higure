<script setup lang="ts">
import { watch } from 'vue';
import LoadingPage from './components/LoadingPage.vue';
import { useAuthStore } from './stores/auth-store';
import { useJournalStore } from './stores/journal-store';
import router from './router';
import ConfirmationAlert from './components/alerts/ConfirmationAlert.vue';
import Modal from './components/modals/Modal.vue';
import { useSettingsStore } from './stores/settings-store';
import SettingsModal from './components/modals/SettingsModal.vue';

const auth = useAuthStore();
const journal = useJournalStore();
const settingsStore = useSettingsStore();

watch(() => auth.token, (token) => {
    if (!token) {
        router.push('/signin')
    }
}, { immediate: true })
</script>

<template>
    <LoadingPage v-if="auth.isLoading || journal.isLoading" />
    <RouterView v-else class="page" />

    <ConfirmationAlert />
    <SettingsModal />
</template>

<style scoped>

</style>