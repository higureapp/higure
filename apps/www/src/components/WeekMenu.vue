<script setup lang="ts">
import { Circle } from 'lucide-vue-next';
import { ref } from 'vue';

defineProps<{
    showStreak?: boolean;
}>()

const days = ref([
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday"
]);

const todayIndex = new Date().getDay() - 1;
const streak = ref<number>(0);

</script>

<template>
    <div class="week-container">
        <div v-if="showStreak" class="streak">
            <p>{{ streak }} days streak</p>
        </div>

        <div class="days-wrapper">
            <div v-for="(day, index) in days" :key="index" :class="{ day }">

                <div class="icon-wrapper" :class="{ today: todayIndex === index }">
                    <component :is="Circle" :size="18" color="#000" />
                </div>
                <p class="day-label">{{ day[0] }}</p>
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

.streak>p {
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
    position: relative;
    width: 1rem;
}

.day-label {
    margin: 0;
    font-size: 0.75rem;
    font-weight: 600;
}

.icon-wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 26px;
    height: 26px;
}

.today {
    background-color: #FFBDD2;
    box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.25);
    border-radius: 50%;
}
</style>