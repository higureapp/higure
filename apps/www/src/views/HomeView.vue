<script setup lang="ts">
import Greeting from '@/components/Greeting.vue';
import SideBar from '@/components/sidebar/SideBar.vue';
import WeekMenu from '@/components/WeekMenu.vue';
import { useAuthStore } from '@/stores/auth-store';
import { ref } from 'vue';

const authStore = useAuthStore();

const me = ref(authStore.me);
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
            </div>
        </div>
    </div>
</template>

<style scoped>
.container {
    display: flex;
    flex-direction: row;
    height: 100vh;
}

.main {
    background: #EDEDED;
    width: 100%;
    display: flex;
    justify-content: center;
}

.base {
    width: 50vw;
    padding: 1rem;
}

.header {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
}
</style>