<script setup lang="ts">
import Greeting from '@/components/Greeting.vue';
import PlusButton from '@/components/PlusButton.vue';
import SideBar from '@/components/sidebar/SideBar.vue';
import WeekMenu from '@/components/WeekMenu.vue';
import { useAuthStore } from '@/stores/auth-store';
import { useJournalStore } from '@/stores/journal-store';
import { computed, ref } from 'vue';
import HomeJournal from '@/components/journals/HomeJournal.vue';

const authStore = useAuthStore();
const journalStore = useJournalStore();

const me = ref(authStore.me);

const journals = computed(() => journalStore.pages?.journalPages ?? null)
</script>

<template>
    <div class="container">
        <div class="sidebar">
            <SideBar />
        </div>
        <div class="main">
            <div class="base">
                <div class="header">
                    <div class="greeting">
                        <Greeting :me="me!" size="1.3rem" />
                    </div>
                    <div class="weekmenu">
                        <WeekMenu show-streak />
                    </div>
                </div>
                <HomeJournal/>
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
    overflow: hidden;
}

.base {
    width: 45vw;
    height: 100%;
    display: flex;
    flex-direction: column;
    padding: 1rem;
}

.header {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    flex-shrink: 0;
    padding-bottom: 1rem;
    margin-top: 1rem;
}

:deep(.journals-container) {
    flex-grow: 1;
    overflow-y: auto;
    scrollbar-width: none; 
}
:deep(.journals-container::-webkit-scrollbar) {
    display: none;
}
</style>
