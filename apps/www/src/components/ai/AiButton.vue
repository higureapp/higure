<script setup lang="ts">

defineProps<{
    label: string;
    icon: any;
    action: () => void;
}>();

</script>

<template>
    <div class="btn-ai" @click="action">
        <div class="icon-ai">
            <component :is="icon" size="38" color="#000" />
        </div>
        <div class="text">
            <p>{{ label }}</p>
        </div>
    </div>
</template>

<style scoped>
.btn-ai {
    aspect-ratio: 1/1;
    border: 1px solid #000;
    padding: 1rem 1rem;
    width: 4rem;
    height: auto;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    border-radius: 14px;
    cursor: pointer;
    font-family: "Glory", sans-serif;
    transition: 300ms;
    background-color: #EBD8DC;
    box-shadow: 0 0 3px 0 #000;
}

.btn-ai:hover {
    background: #FDC3C3;
    transition: 300ms;
    transform: translateY(3px);
    box-shadow: 0;
}
</style>