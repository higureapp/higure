<script setup lang="ts">
import { Circle, CheckCircle2, CheckCircle, CircleCheck } from 'lucide-vue-next';
import { computed } from 'vue';
import { useJournalStore } from '@/stores/journal-store';
import dayjs from 'dayjs';
import isToday from 'dayjs/plugin/isToday';
import weekday from 'dayjs/plugin/weekday';

dayjs.extend(isToday);
dayjs.extend(weekday);

defineProps<{
    showStreak?: boolean;
}>();

const journalStore = useJournalStore();

const daysLabels = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

const startOfWeek = computed(() => {
    const today = dayjs();
    const dayOfWeek = today.day();
    const daysToSubtract = dayOfWeek === 0 ? 6 : dayOfWeek - 1;
    
    return today.subtract(daysToSubtract, 'day').startOf('day');
});

const weekDays = computed(() => {
    return daysLabels.map((label, index) => {
        const dateOfEntry = startOfWeek.value.add(index, 'day');
        const hasPost = journalStore.pages?.journalPages?.pages?.some(page =>
            dayjs(page.date).isSame(dateOfEntry, 'day')
        );

        return {
            label: label[0],
            isToday: dateOfEntry.isToday(),
            completed: hasPost
        };
    });
});

const currentStreak = computed(() => {
    const posts = journalStore.pages?.journalPages?.pages || [];
    if (posts.length === 0) return 0;

    const dates = [...new Set(posts.map(p => dayjs(p.date).format('YYYY-MM-DD')))]
        .sort((a, b) => dayjs(b).diff(dayjs(a)));

    let streak = 0;
    let checkDate = dayjs().startOf('day');

    const hasPostToday = dates.includes(checkDate.format('YYYY-MM-DD'));
    if (!hasPostToday) {
        checkDate = checkDate.subtract(1, 'day');
    }

    for (const date of dates) {
        if (dayjs(date).isSame(checkDate, 'day')) {
            streak++;
            checkDate = checkDate.subtract(1, 'day');
        } else if (dayjs(date).isBefore(checkDate, 'day')) {
            break; 
        }
    }
    return streak;
});
</script>

<template>
    <div class="week-container">
        <div v-if="showStreak" class="streak">
            <p>{{ currentStreak }} days streak</p>
        </div>

        <div class="days-wrapper">
            <div v-for="(day, index) in weekDays" :key="index" class="day">
                <div class="icon-wrapper" :class="{ today: day.isToday }">
                    <component :is="day.completed ? CircleCheck : Circle" :size="18"
                        :color="day.completed ? '#FDC3C3' : '#888'" :fill="day.completed ? '#000' : 'none'"
                        style="color: white;" />
                </div>
                <p class="day-label">{{ day.label }}</p>
            </div>
        </div>
    </div>
</template>

<style scoped>
.week-container {
    display: flex;
    flex-direction: column;
    color: var(--text-primary);
}

.streak {
    width: 100%;
    margin-bottom: 0.5rem;
    color: var(--text-primary);
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

.today {
    background-color: #FFBDD2;
    box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.2);
    border-radius: 50%;
}

.icon-wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 26px;
    height: 26px;
    transition: all 0.3s ease;
}

.day-label {
    margin: 0;
    font-size: 0.75rem;
    font-weight: 600;
    color: #444;
}
</style>