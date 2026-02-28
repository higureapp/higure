<script setup lang="ts">
import { Brain, Stars } from 'lucide-vue-next';
import AiButton from './AiButton.vue';
import router from '@/router';
import { useAiStore } from '@/stores/ai-store';

const aiStore = useAiStore();
</script>

<template>
    <div class="ai-actions" v-if="!aiStore.isShowed">
        <AiButton :icon="Stars" label="Insight" :action="() => aiStore.showBar('insight')" />
        <AiButton :icon="Brain" label="Analysis" :action="() => aiStore.showBar('analysis')" />
    </div>
</template>


<style scoped>

.ai-actions {
    display: flex;
    gap: 1rem;
    flex-direction: column;
}

</style>