<script setup lang="ts">
const model = defineModel<'YEAR' | 'MONTH'>()
defineProps<{
    label: string,
    withOrder?: boolean
}>()
</script>

<template>
    <div class="menu-section">
        <div class="section-header">
            <span class="title">{{ label }}</span>
            <div v-if="withOrder" class="select-wrapper">
                <span class="chevron">▾</span>
                <select class="order-indicator" v-model="model">
                    <option value="YEAR">YEAR</option>
                    <option value="MONTH">MONTH</option> 
                </select>
            </div>
        </div>
        <div class="section-content">
            <slot /> 
        </div>
    </div>
</template>

<style scoped>
.menu-section {
    padding: 1rem 0; 
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
}
.section-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 2rem;
}
.title {
    font-weight: 700;
    font-size: 0.8rem;
    text-transform: uppercase;
    color: #000000;
    letter-spacing: 0.05em;
}
.select-wrapper {
    position: relative;
    display: flex;
    align-items: center;
}
.order-indicator {
    appearance: none; 
    -webkit-appearance: none;
    background: rgba(255, 255, 255, 0.4);
    backdrop-filter: blur(4px); 
    padding: 5px 10px 5px 25px; 
    border-radius: 20px;
    font-size: 0.75rem;
    font-weight: 500;
    border: 1px solid rgba(0, 0, 0, 0.1);
    color: #000;
    cursor: pointer;
    transition: all 0.2s ease;
    outline: none;
}
.chevron {
    font-size: 0.9rem;
    pointer-events: none; 
    color: #000000;
    position: absolute;
    left: 12px;
    z-index: 10;
}
.section-content {
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
}
</style>