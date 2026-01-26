<script setup lang="ts">
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
</script>

<template>
    <div class="logo-container">
        <img :src="format === 'png' ? '/higure_crop.png' : '/logo_higure.svg'" alt="Higure logo" :style="{ width: size }" />
    </div>
</template>

<style scoped>
.logo-container {
    display: inline-block;
}

.logo-container img {
    display: block;
    height: auto;
}
</style>
