<script setup lang="ts">
import { Calendar, Icon, Moon, Search, Settings } from 'lucide-vue-next';
import Logo from '../Logo.vue';
import { ref } from 'vue';

const actions = ref([
    {
        icon: Calendar,
        src: '/signin'
    },
    {
        icon: Search,
        src: '#'
    },
    {
        icon: Settings,
        src: '#'
    },
    {
        icon: Moon,
        src: '#'
    },
])

</script>

<template>
    <div class="container">
        <div class="header">
            <div class="logo">
                <Logo format="png" size="140px" />
            </div>
            <div class="actions">
                <RouterLink class="action-item" :to="action.src" v-for="action in actions">
                    <component :is="action.icon" color="#000000" :size="20" />
                </RouterLink>
            </div>
        </div>
    </div>
</template>

<style scoped>
.container {
    background: linear-gradient(90deg, #CFD9DF 0%, #FED6E3 100%);
    height: 100vh;
    width: 15vw;
    min-width: 120px; 
}

.header {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    padding: 1rem;
}

.actions {
    display: flex;
    flex-direction: row;
    gap: 1rem;
    padding: 0.5rem;
}

.action-item {
    display: flex;
    align-items: center;
    justify-content: center;
    transition: transform 300ms ease;
}

.action-item:hover {

    transform: translateY(-3px);
}
</style>