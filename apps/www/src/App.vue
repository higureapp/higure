<script setup lang="ts">
import { watch } from 'vue';
import LoadingPage from './components/LoadingPage.vue';
import { useAuthStore } from './stores/auth-store';
import { useJournalStore } from './stores/journal-store';
import router from './router';
import { useAlertStore } from './stores/alert-store';
import ConfirmationAlert from './components/alerts/ConfirmationAlert.vue';

const auth = useAuthStore();
const journal = useJournalStore();
const alertStore = useAlertStore();

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
</template>

<style scoped>

</style>