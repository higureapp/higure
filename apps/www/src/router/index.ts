import { useAuthStore } from '@/stores/auth-store'
import HomeView from '@/views/HomeView.vue'
import JournalNewView from '@/views/JournalNewView.vue'
import JournalView from '@/views/JournalView.vue'
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
            name: 'signin',
            component: SignInView,
            meta: { requiresAuth: false, guestOnly: true },
        },
        {
            path: '/signup',
            name: 'signup',
            component: SignUpView,
            meta: { requiresAuth: false, guestOnly: true },
        },
        {
            path: '/journal/:id',
            name: 'journal',
            component: JournalView,
            meta: { requiresAuth: true },
        },
        {
            path: '/journal/new',
            name: 'newjournal',
            component: JournalNewView,
            meta: { requiresAuth: true },
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
        await new Promise((resolve) => {
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

    if (to.meta.requiresAuth && !auth.token) {
        return next({ name: 'signin' })
    }

    if (to.meta.requiresAuth && !auth.isLoggedIn) {
        return next({
            name: 'signin',
            query: { redirect: to.fullPath },
        })
    }

    if (auth.token && !auth.me) {
        try {
            await auth.refetchMe()
        } catch (e) {
            auth.logout()
            return next({ name: 'signin' })
        }
    }

    next()
})

export default router
