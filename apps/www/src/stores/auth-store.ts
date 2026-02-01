import { computed, ref, watch } from 'vue'
import { defineStore } from 'pinia'
import {
    useGetMeQuery,
    useSignInMutation,
    useSignUpMutation,
} from '../../gql_generated/graphql'

export interface RegisterOpts {
    email: string
    password: string
    firstname: string
    lastname: string
}

export const useAuthStore = defineStore('auth', () => {
    const token = ref<string | null>(localStorage.getItem('token'))
    const isLoading = ref<boolean>(false)

    const { mutate: signInMutation } = useSignInMutation()
    const { mutate: signUpMutation } = useSignUpMutation()
    const { result: getMeResult, refetch: refetchMe } = useGetMeQuery({
        enabled: computed(() => !!token.value),
        fetchPolicy: 'network-only',
    })
    const me = computed(() => getMeResult.value?.me ?? null)
    const isLoggedIn = computed(() => {
        if (!token.value) return false
        return !!getMeResult.value?.me
    })

    window.addEventListener('storage', (event) => {
        if (event.key === 'token' && !event.newValue) {
            token.value = null
        }
    })

    watch(token, async (newToken) => {
        if (newToken) {
            await refetchMe()
        }
    })

    async function login(email: string, password: string) {
        isLoading.value = true
        try {
            const result = await signInMutation({ input: { email, password } })
            if (result?.data?.signIn.access_token) {
                setToken(result.data.signIn.access_token)
                await refetchMe()
                return true
            }
        } catch (err) {
            console.error('Login Error:', err)
            throw err
        } finally {
            isLoading.value = false
        }
    }

    async function register(input: RegisterOpts) {
        isLoading.value = true
        try {
            const result = await signUpMutation({ input })
            if (result?.data?.signUp.access_token) {
                setToken(result.data.signUp.access_token)
                await refetchMe()
                return true
            }
        } catch (err) {
            console.error('Registration Error:', err)
            throw err
        } finally {
            isLoading.value = false
        }
    }

    function setToken(newToken: string) {
        token.value = newToken
        localStorage.setItem('token', newToken)
    }

    function logout() {
        token.value = null
        localStorage.removeItem('token')
        getMeResult.value = undefined
    }

    return {
        token,
        me,
        isLoading,
        isLoggedIn,
        login,
        register,
        logout,
        refetchMe,
    }
})
