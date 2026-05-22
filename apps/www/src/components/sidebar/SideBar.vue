<script setup lang="ts">
import { Calendar, Icon, Moon, Sun, Search, Settings } from 'lucide-vue-next';
import Logo from '../Logo.vue';
import { ref, computed, type Ref } from 'vue';
import { useSettingsStore } from '@/stores/settings-store';
import { useSearchStore } from '@/stores/search-store';
import router from '@/router';
import MenuSection from './MenuSection.vue';
import JournalList from './JournalList.vue';

const settingsStore = useSettingsStore();
const searchStore = useSearchStore();

const actions = ref([
    {
        icon: Calendar,
        click: () => router.push('/calendar')
    },
    {
        icon: Search,
        click: () => searchStore.openModal()
    },
    {
        icon: Settings,
        click: () => settingsStore.openModal()
    },
])

const themeIcon = computed(() => settingsStore.isDarkTheme ? Sun : Moon);

function toggleTheme() {
    settingsStore.toggleTheme();
}

const selectFilter: Ref<'YEAR' | 'MONTH'> = ref('YEAR')


</script>

<template>
    <div class="sidebar-container">
        <div class="header">
            <div class="logo">
                <Logo format="png" size="140px" />
            </div>
            <div class="actions">
                <div class="action-item" v-for="action in actions" @click="action.click">
                    <component class="action-icon" :is="action.icon" :color="settingsStore.isDarkTheme ? '#e5e5e5' : '#000000'" :size="20" />
                </div>
                <div class="action-item theme-toggle" @click="toggleTheme">
                    <component class="action-icon" :is="themeIcon" :color="settingsStore.isDarkTheme ? '#e5e5e5' : '#000000'" :size="20" />
                </div>
            </div>
        </div>
        <div class="sidebar-sections">
            <MenuSection label="Journals" with-order v-model="selectFilter">
                <JournalList v-model="selectFilter" />
            </MenuSection>
        </div>
    </div>
</template>

<style scoped>
.sidebar-container {
    background: linear-gradient(90deg, var(--sidebar-gradient-start) 0%, var(--sidebar-gradient-end) 100%);
    height: 100vh;
    width: clamp(260px, 17vw, 300px);
    display: flex;
    flex-direction: column;
    align-items: stretch;
    transition: background 0.3s ease;
}

.header {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    max-height: 30vh;
    margin: 1rem auto;
}

.actions {
    display: flex;
    flex-direction: row;
    gap: 1rem;
    padding: 0.5rem;
}

.sidebar-sections {
    flex-grow: 1;
    overflow-y: auto;
    display: flex;
    flex-direction: column;
    width: 100%;
}

.action-item {
    display: flex;
    align-items: center;
    justify-content: center;
    transition: transform 300ms ease;
    cursor: pointer;
}

.action-item .action-icon {
    filter: drop-shadow(2px 4px 6px rgba(0, 0, 0, 0.2));
}

.action-item:hover {
    transform: translateY(-3px);
}

.theme-toggle {
    transition: transform 300ms ease, opacity 0.3s ease;
}

.theme-toggle:hover {
    transform: translateY(-3px) rotate(15deg);
}
</style>