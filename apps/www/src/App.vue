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
import SearchModal from './components/modals/SearchModal.vue';

const auth = useAuthStore();
const journal = useJournalStore();
const settingsStore = useSettingsStore();

watch(() => auth.isLoggedIn, (isLoggedIn) => {
    if (isLoggedIn) {
        void journal.loadAllPages();
    }
}, { immediate: true });

watch(() => auth.token, (token) => {
    if (!token) {
        router.push('/signin')
    }
}, { immediate: true })
</script>

<template>
  <LoadingPage v-if="auth.isLoading || journal.isLoadingAll" />
  
  <router-view v-else v-slot="{ Component, route }">
    <transition name="fade-slide" mode="out-in">
      <component :is="Component" :key="route.path" class="page" />
    </transition>
  </router-view>

  <ConfirmationAlert />
  <SettingsModal />
  <SearchModal />
</template>

<style scoped>
.fade-slide-enter-from {
  opacity: 0;
  transform: translateY(10px);
}

.fade-slide-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}

.fade-slide-enter-active,
.fade-slide-leave-active {
  transition: all 0.3s ease-out;
}

.fade-slide-enter-to,
.fade-slide-leave-from {
  opacity: 1;
  transform: translateY(0);
}

.page {
  width: 100%;
  min-height: 100vh;
}
</style>