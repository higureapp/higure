<script setup lang="ts">
import { Plus } from 'lucide-vue-next';

</script>

<template>
    <div class="plus-container">
        <component :is="Plus" color="#1D1B20" :size="28" />
    </div>
</template>

<style scoped>
.plus-container {
    background-color: #FFBCBC;
    border-radius: 100%;
    width: 1.2rem;
    height: 1.2rem;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 1rem;
    box-shadow: 0px 0px 4px 0px rgba(0, 0, 0, 0.50);
    cursor: pointer;
    transition: 300ms;
}

.plus-container:hover {
    transition: 300ms;
    background-color: #ffbcbcbd;
}
</style>