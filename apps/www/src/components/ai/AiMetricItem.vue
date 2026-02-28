<script setup lang="ts">
defineProps<{
    label: string;
    value?: string | number;
    showProgress?: boolean;
    progressValue?: number;
    progressColor?: string;
}>();
</script>

<template>
    <div class="metric-item">
        <span class="label">{{ label }}</span>
        <div v-if="showProgress" class="progress-bar">
            <div class="progress-fill" :style="{ width: `${progressValue}%`, background: progressColor }"></div>
        </div>
        <span v-else class="value">{{ value }}</span>
    </div>
</template>

<style scoped>
.metric-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0.25rem 0;
}

.label {
    font-size: 0.8rem;
    color: #3c3c3c;
}

.value {
    font-size: 0.85rem;
    font-weight: 600;
    color: #000000;
}

.progress-bar {
    width: 60px;
    height: 6px;
    background: #f0f0f0;
    border-radius: 3px;
    overflow: hidden;
}

.progress-fill {
    height: 100%;
    border-radius: 3px;
    transition: width 0.3s ease;
}
</style>
