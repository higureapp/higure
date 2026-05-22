<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { ChevronLeft, ChevronRight, ArrowLeft } from 'lucide-vue-next'
import dayjs from 'dayjs'
import SideBar from '@/components/sidebar/SideBar.vue'
import PlusButton from '@/components/PlusButton.vue'
import { useJournalStore } from '@/stores/journal-store'
import { storeToRefs } from 'pinia'

const router = useRouter()
const journalStore = useJournalStore()
const { allPages } = storeToRefs(journalStore)

const today = dayjs()
const currentMonth = ref(dayjs().startOf('month'))

const monthYear = computed(() => currentMonth.value.format('MMMM YYYY'))

onMounted(async () => {
    if (!allPages.value || allPages.value.length === 0) {
        await journalStore.loadAllPages()
    }
})

const journalDateMap = computed(() => {
    const map = new Map<string, typeof allPages.value>()
    if (!allPages.value) return map

    for (const j of allPages.value) {
        const key = dayjs(j.date).format('YYYY-MM-DD')
        if (!map.has(key)) map.set(key, [])
        map.get(key)!.push(j)
    }
    return map
})

const selectedDate = ref<string | null>(null)

const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

interface CalendarDay {
    date: number
    dateStr: string
    isCurrentMonth: boolean
    isToday: boolean
    isSelected: boolean
    entries: typeof allPages.value
    dateObj: dayjs.Dayjs
    weekRow: number
}

const calendarDays = computed(() => {
    const month = currentMonth.value
    const firstDay = month.startOf('month')

    const startDow = firstDay.day()
    const startOffset = startDow

    const cells: CalendarDay[] = []
    const totalCells = 42

    for (let i = 0; i < totalCells; i++) {
        const offset = i - startOffset
        const day = firstDay.add(offset, 'day')
        const dateStr = day.format('YYYY-MM-DD')
        const isCurrent = day.month() === month.month()
        const entries = journalDateMap.value.get(dateStr) ?? []
        const weekRow = Math.floor(i / 7)

        cells.push({
            date: day.date(),
            dateStr,
            isCurrentMonth: isCurrent,
            isToday: day.isSame(today, 'day'),
            isSelected: dateStr === selectedDate.value,
            entries,
            dateObj: day,
            weekRow,
        })
    }

    return cells
})

function prevMonth() {
    selectedDate.value = null
    currentMonth.value = currentMonth.value.subtract(1, 'month')
}

function nextMonth() {
    selectedDate.value = null
    currentMonth.value = currentMonth.value.add(1, 'month')
}

function selectDay(day: CalendarDay) {
    if (!day.isCurrentMonth) return
    selectedDate.value = selectedDate.value === day.dateStr ? null : day.dateStr
}

function goToEntry(entryId: string) {
    router.push(`/journal/${entryId}`)
}

function goToToday() {
    selectedDate.value = null
    currentMonth.value = dayjs().startOf('month')
}

function contentPreview(content: string): string {
    return content.length > 80 ? content.slice(0, 80) + '…' : content
}
</script>

<template>
    <div class="container">
        <div class="sidebar">
            <SideBar />
        </div>
        <div class="main">
            <div class="base">
                <div class="top-bar">
                    <button class="back-btn" @click="router.push('/')">
                        <ArrowLeft :size="18" />
                        <span>Home</span>
                    </button>
                </div>

                <div class="calendar-wrapper">
                    <div class="calendar-container">
                        <div class="calendar-header">
                            <h2 class="month-title">{{ monthYear }}</h2>
                            <div class="header-nav">
                                <button class="nav-btn" @click="prevMonth">
                                    <ChevronLeft :size="18" />
                                </button>
                                <button class="today-btn" @click="goToToday">Today</button>
                                <button class="nav-btn" @click="nextMonth">
                                    <ChevronRight :size="18" />
                                </button>
                            </div>
                        </div>

                        <div class="calendar-grid">
                            <div
                                v-for="day in dayNames"
                                :key="day"
                                class="day-header"
                            >
                                {{ day }}
                            </div>

                            <div
                                v-for="(day, idx) in calendarDays"
                                :key="day.dateStr + monthYear"
                                class="day-cell"
                                :class="{
                                    'current-month': day.isCurrentMonth,
                                    'other-month': !day.isCurrentMonth,
                                    today: day.isToday,
                                    selected: day.isSelected,
                                    'has-entries': day.entries.length > 0,
                                }"
                                @click="selectDay(day)"
                            >
                                <span class="day-number" :class="{ 'today-badge': day.isToday }">
                                    {{ day.date }}
                                </span>

                                <div class="day-entries" v-if="day.isCurrentMonth && day.entries.length">
                                    <template v-for="(entry, entryIdx) in day.entries.slice(0, 5)" :key="entry.id">
                                        <div
                                            v-if="entryIdx < 4"
                                            class="entry-item"
                                            @click.stop="goToEntry(entry.id)"
                                        >
                                            <span class="entry-text">
                                                {{ contentPreview(entry.content) }}
                                            </span>
                                        </div>
                                        <div
                                            v-else-if="entryIdx === 4 && day.entries.length > 4"
                                            class="entry-item entry-more"
                                            @click.stop="selectDay(day)"
                                        >
                                            <span class="entry-text">
                                                +{{ day.entries.length - 4 }} more
                                            </span>
                                        </div>
                                    </template>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="plus-wrapper">
                <PlusButton />
            </div>
        </div>
    </div>
</template>

<style scoped>
.container {
    display: flex;
    flex-direction: row;
    height: 100vh;
    overflow: hidden;
}

.main {
    background: var(--bg-main);
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    overflow-y: auto;
    padding: 2rem 0;
}

.base {
    width: 85vw;
    max-width: 1100px;
    min-height: 0;
    display: flex;
    flex-direction: column;
    padding: 0 1rem;
}

@media (max-width: 1200px) {
    .base {
        width: 95vw;
        max-width: none;
    }
}

.top-bar {
    display: flex;
    align-items: center;
    margin-bottom: 1rem;
    flex-shrink: 0;
}

.back-btn {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.4rem 0.75rem;
    border: none;
    background: transparent;
    color: var(--text-secondary);
    font-family: "Figtree", sans-serif;
    font-size: 0.85rem;
    font-weight: 500;
    cursor: pointer;
    border-radius: 8px;
    transition: all 0.2s ease;
}

.back-btn:hover {
    background: var(--hover-overlay-strong);
    color: var(--text-primary);
}

.calendar-wrapper {
    flex: 0 0 auto;
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin-top: 5rem;
}

.calendar-container {
    border-radius: 16px;
    box-shadow: var(--shadow-medium);
    overflow: hidden;
    border: 1px solid var(--border-medium);
    background: var(--bg-secondary);
}

.calendar-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1.25rem 1.5rem;
    border-bottom: 1px solid var(--border-medium);
    background: var(--bg-secondary);
}

.month-title {
    font-family: "Ibarra Real Nova", serif;
    font-size: 1.4rem;
    font-weight: 600;
    color: var(--text-primary);
    margin: 0;
}

.header-nav {
    display: flex;
    align-items: center;
    gap: 0.5rem;
}

.nav-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 32px;
    height: 32px;
    border: none;
    background: transparent;
    color: var(--icon-color);
    border-radius: 50%;
    cursor: pointer;
    transition: all 0.2s ease;
}

.nav-btn:hover {
    background: var(--hover-overlay-strong);
}

.today-btn {
    padding: 0.35rem 1rem;
    border: 1px solid var(--border-medium);
    background: var(--bg-card);
    color: var(--text-primary);
    border-radius: 8px;
    font-family: "Figtree", sans-serif;
    font-size: 0.8rem;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.2s ease;
}

.today-btn:hover {
    background: var(--hover-overlay);
    border-color: var(--border-hover);
}

.calendar-grid {
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    grid-template-rows: auto repeat(6, minmax(110px, 1fr));
    min-height: 680px;
}

@media (max-width: 900px) {
    .calendar-grid {
        grid-template-rows: auto repeat(6, minmax(90px, 1fr));
        min-height: 550px;
    }
}

.day-header {
    text-align: center;
    padding: 0.75rem 0.25rem 0.5rem;
    font-family: "Figtree", sans-serif;
    font-size: 0.75rem;
    font-weight: 600;
    color: var(--text-secondary);
    text-transform: uppercase;
    letter-spacing: 0.05em;
    border-bottom: 1px solid var(--border-medium);
    background: var(--bg-secondary);
}

.day-cell {
    position: relative;
    display: flex;
    flex-direction: column;
    padding: 0.5rem 0.4rem;
    border-right: 1px solid var(--border-light);
    border-bottom: 1px solid var(--border-light);
    cursor: default;
    transition: background 0.15s ease;
    min-height: 0;
    overflow: hidden;
}

.day-cell:nth-child(7n) {
    border-right: none;
}

.day-cell.other-month {
    background: var(--bg-main);
}

.day-cell.other-month .day-number {
    opacity: 0.3;
}

.day-cell.current-month {
    cursor: pointer;
    background: var(--bg-tab-inactive);
}

.day-cell.current-month:hover {
    background: var(--hover-overlay);
}

.day-cell.selected {
    background: var(--accent-purple-light);
}

.day-cell.today {
    background: var(--bg-card);
}

.day-number {
    font-family: "Figtree", sans-serif;
    font-size: 0.8rem;
    font-weight: 500;
    color: var(--text-primary);
    text-align: left;
    line-height: 1;
    min-height: 22px;
    margin-bottom: 0.25rem;
}

.today-badge {
    background: var(--accent-purple);
    color: white;
    width: 24px;
    height: 24px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    font-weight: 600;
}

.day-entries {
    display: flex;
    flex-direction: column;
    gap: 3px;
    overflow: hidden;
    flex: 1;
    min-height: 0;
}

.entry-item {
    font-size: 0.8rem;
    padding: 0.2rem 0.4rem;
    border-radius: 4px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    cursor: pointer;
    transition: all 0.15s ease;
    background: var(--accent-purple);
    color: white;
    font-family: "Ibarra Real Nova", serif;
    font-weight: 500;
    flex-shrink: 0;
}

.entry-item:hover {
    opacity: 0.85;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.entry-more {
    background: var(--accent-purple-light);
    color: var(--accent-purple);
    border: 1px dashed var(--accent-purple);
    font-style: italic;
}

.entry-more:hover {
    background: var(--accent-purple-light);
    opacity: 1;
}

.entry-text {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}
</style>
