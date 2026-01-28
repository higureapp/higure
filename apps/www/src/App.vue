<script setup lang="ts">
import LoadingPage from './components/LoadingPage.vue';
import { useAuthStore } from './stores/auth-store';

const auth = useAuthStore();

</script>

<template>
  <LoadingPage v-if="auth.isLoading" />
  <RouterView v-else class="page" />
</template>

<style scoped></style>
