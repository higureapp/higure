<script setup lang="ts">
import { Circle } from 'lucide-vue-next';
import { ref } from 'vue';

defineProps<{
    showStreak?: boolean;
}>()

const days = ref("MTWTFSS".split(''));
</script>

<template>
    <div class="week-container">
        <div v-if="showStreak" class="streak">
            <p>2 days streak</p>
        </div>
        
        <div class="days-wrapper">
            <div v-for="(day, index) in days" :key="index" class="day">
                <component :is="Circle" :size="18" color="#000" />
                <p class="day-label">{{ day }}</p>
            </div>
        </div>
    </div>
</template>

<style scoped>
.week-container {
    display: flex;
    flex-direction: column; 
    color: #000;
}

.streak {
    width: 100%;
    margin-bottom: 0.5rem;
}

.streak > p {
    text-align: end;    
    font-weight: normal;
    font-size: 1.2rem;
    margin: 0;
}

.days-wrapper {
    display: flex;
    flex-direction: row;
    gap: 0.8rem;    
}

.day {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.2rem;
}

.day-label {
    margin: 0;
    font-size: 0.75rem;
    font-weight: 600;
}
</style>