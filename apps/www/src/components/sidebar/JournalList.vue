<script setup lang="ts">
import { useJournalStore } from '@/stores/journal-store';
import { computed } from 'vue';
import JournalGroup from './JournalGroup.vue';
import { useRouter } from 'vue-router';

const journalStore = useJournalStore();
const model = defineModel<'YEAR' | 'MONTH'>();
const router = useRouter();

const treeData = computed(() => {
    const pages = journalStore.pages?.journalPages?.pages || [];
    
    if (model.value === 'YEAR') {
        const years: Record<string, Record<string, any[]>> = {};

        pages.forEach(page => {
            const date = new Date(page.date);
            const y = date.getFullYear().toString();
            const m = date.toLocaleString('default', { month: 'long' });

            if (!years[y]) years[y] = {};
            if (!years[y][m]) years[y][m] = [];
            
            years[y][m].push(page);
        });

        const sortedYears = Object.keys(years).sort((a, b) => b.localeCompare(a));
        const result: Record<string, any> = {};
        for (const y of sortedYears) { result[y] = years[y]; }
        
        return { type: 'YEAR', groups: result };
    } else {
        const months: Record<string, any[]> = {};

        pages.forEach(page => {
            const date = new Date(page.date);
            const label = date.toLocaleString('default', { month: 'long', year: 'numeric' });

            if (!months[label]) months[label] = [];
            months[label].push(page);
        });

        return { type: 'MONTH', groups: months };
    }
});

const getDayLabel = (dateString: string) => {
    const d = new Date(dateString);
    return `${d.getDate()} ${d.toLocaleString('default', { month: 'short' })}`;
};

const handleSelect = (id: string) => {
    return router.push(`/journal/${id}`)
};
</script>

<template>
    <div class="list-wrapper">
        <template v-if="treeData.type === 'YEAR'">
            <JournalGroup 
                v-for="(months, year) in treeData.groups" 
                :key="year" 
                :label="year"
            >
                <JournalGroup 
                    v-for="(days, month) in months" 
                    :key="month" 
                    :label="month.toString()" 
                    :level="1"
                >
                    <div 
                        v-for="page in days" 
                        :key="page.id" 
                        class="leaf-item"
                        @click="handleSelect(page.id)"
                    >
                        <span class="date-text">{{ getDayLabel(page.date) }}</span>
                        <span v-if="page.location" class="loc-text">{{ page.location.split(',')[0] }}</span>
                    </div>
                </JournalGroup>
            </JournalGroup>
        </template>

        <template v-else>
            <JournalGroup 
                v-for="(days, monthLabel) in treeData.groups" 
                :key="monthLabel" 
                :label="monthLabel"
            >
                <div 
                    v-for="page in days" 
                    :key="page.id" 
                    class="leaf-item"
                    @click="handleSelect(page.id)"
                >
                    <span class="date-text">{{ getDayLabel(page.date) }}</span>
                    <span v-if="page.location" class="loc-text">{{ page.location.split(',')[0] }}</span>
                </div>
            </JournalGroup>
        </template>
    </div>
</template>

<style scoped>
.list-wrapper {
    user-select: none;
    margin: 0 2rem;
}

.leaf-item {
    padding: 4px 16px 4px 48px; 
    font-size: 0.85rem;
    cursor: pointer;
    display: flex;
    justify-content: space-between;
    align-items: center;
    transition: background 0.2s ease;
}

.leaf-item:hover {
    background: rgba(0, 0, 0, 0.05);
    border-radius: 8px;
}

.date-text {
    font-weight: 500;
    color: #1a1a1a;
}

.loc-text {
    font-size: 0.85rem;
    opacity: 0.4;
    font-style: italic;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    max-width: 100px;
    color: #000;
}
</style>