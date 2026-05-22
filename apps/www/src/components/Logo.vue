<script setup lang="ts">
import router from '@/router';
import { useSettingsStore } from '../stores/settings-store' 

withDefaults(
    defineProps<{
        format?: 'png' | 'svg'
        size?: number | string
    }>(),
    {
        format: 'svg',
        size: '100%'
    }
)

const settingsStore = useSettingsStore()
</script>

<template>
    <div class="logo-container" @click="router.push('/')">
        <img 
            :src="format === 'png' ? '/higure_crop.png' : '/logo_higure.svg'" 
            alt="Higure logo" 
            :style="{ width: size }" 
            :class="{ 'is-dark': settingsStore.isDarkTheme }"
        />
    </div>
</template>

<style scoped>
.logo-container {
    display: inline-block;
    cursor: pointer;
}

.logo-container img {
    display: block;
    height: auto;
    transition: filter 0.3s ease;
}

.logo-container img.is-dark {
    filter: invert(1);
}
</style>