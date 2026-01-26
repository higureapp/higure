import { useAuthStore } from '@/stores/auth-store'
import HomeView from '@/views/HomeView.vue'
import SignInView from '@/views/SignInView.vue'
import SignUpView from '@/views/SignUpView.vue'
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'home',
            component: HomeView,
            meta: { requiresAuth: true },
        },
        {
            path: '/signin',
            name: 'Sign in',
            component: SignInView,
            meta: { requiresAuth: false },
        },
        {
            path: '/signup',
            name: 'Sign up',
            component: SignUpView,
            meta: { requiresAuth: false },
        },
    ],
})

router.beforeEach(async (to, from, next) => {
    const auth = useAuthStore()

    if (auth.token && !auth.me && !auth.isLoading) {
        try {
            await auth.refetchMe()
        } catch (error) {
            console.error('Failed to fetch user data:', error)
            auth.logout()
        }
    }

    if (auth.isLoading) {
        await new Promise(resolve => {
            const unwatch = auth.$subscribe(() => {
                if (!auth.isLoading) {
                    unwatch()
                    resolve(true)
                }
            })
        })
    }

    if (to.meta.guestOnly && auth.isLoggedIn) {
        return next('/')
    }

    if (to.meta.requiresAuth && !auth.isLoggedIn) {
        return next({
            name: 'signin',
            query: { redirect: to.fullPath }
        })
    }

    next()
})

export default router
