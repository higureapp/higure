import Home from '@/views/Home.vue'
import SignInView from '@/views/SignInView.vue'
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'home',
            component: Home,
            meta: { requiresAuth: true },
        },
        {
            path: '/signin',
            name: 'Sign in',
            component: SignInView,
            meta: { requiresAuth: false },
        },
    ],
})

export default router
