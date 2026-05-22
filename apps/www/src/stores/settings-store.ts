import { defineStore } from 'pinia'
import { ref, watch, computed } from 'vue'
import { storeToRefs } from 'pinia'
import { useAuthStore } from './auth-store'
import { useUpdateSettingsMutation } from '../../gql_generated/graphql'
import type { LanguageValue, ThemeValue } from '@/utils/languages'

export interface SettingsForm {
    firstname: string
    lastname: string
    email: string
    timezone: string
    locale: string
    language: LanguageValue | null
    theme: ThemeValue | null
}

export const useSettingsStore = defineStore('settings', () => {
    const authStore = useAuthStore()
    const { me } = storeToRefs(authStore)
    const { mutate: updateSettingsMutation } = useUpdateSettingsMutation()

    const isModalOpen = ref<boolean>(false)
    const isSaving = ref<boolean>(false)
    const error = ref<string | null>(null)

    const isDarkTheme = ref<boolean>(
        localStorage.getItem('higure-theme') === 'dark',
    )

    const form = ref<SettingsForm>({
        firstname: '',
        lastname: '',
        email: '',
        timezone: '',
        locale: '',
        language: null,
        theme: null,
    })

    const themeLabel = computed(() => (isDarkTheme.value ? 'Dark' : 'Light'))

    function openModal() {
        if (me.value) {
            form.value = {
                firstname: me.value.firstname || '',
                lastname: me.value.lastname || '',
                email: me.value.email || '',
                timezone: me.value.timezone || '',
                locale: me.value.locale || '',
                language: (me.value.language as LanguageValue) || null,
                theme: (me.value.theme as ThemeValue) || null,
            }
        }
        error.value = null
        isModalOpen.value = true
    }

    function closeModal() {
        isModalOpen.value = false
        error.value = null
    }

    function toggleTheme() {
        isDarkTheme.value = !isDarkTheme.value
    }

    function applyLocalTheme(themeValue: ThemeValue) {
        const shouldBeDark = themeValue === 'dark'
        if (isDarkTheme.value !== shouldBeDark) {
            isDarkTheme.value = shouldBeDark
        }
    }

    async function saveSettings() {
        isSaving.value = true
        error.value = null

        try {
            const mutationInput: Record<string, any> = {}

            if (form.value.firstname)
                mutationInput.firstname = form.value.firstname
            if (form.value.lastname)
                mutationInput.lastname = form.value.lastname
            if (form.value.email) mutationInput.email = form.value.email
            if (form.value.timezone)
                mutationInput.timezone = form.value.timezone
            if (form.value.locale) mutationInput.locale = form.value.locale
            if (form.value.language)
                mutationInput.language = form.value.language
            if (form.value.theme) mutationInput.theme = form.value.theme

            const result = await updateSettingsMutation({
                input: mutationInput,
            })

            if (result?.data?.updateSettings) {
                if (result.data.updateSettings.theme) {
                    applyLocalTheme(
                        result.data.updateSettings.theme as ThemeValue,
                    )
                }
                await authStore.refetchMe()
                closeModal()
            }
        } catch (err: any) {
            console.error('Failed to save settings:', err)
            error.value = err.message || 'Failed to save settings'
            throw err
        } finally {
            isSaving.value = false
        }
    }

    watch(
        isDarkTheme,
        (newValue) => {
            if (newValue) {
                document.documentElement.classList.add('dark')
                localStorage.setItem('higure-theme', 'dark')
            } else {
                document.documentElement.classList.remove('dark')
                localStorage.setItem('higure-theme', 'light')
            }
        },
        { immediate: true },
    )

    watch(me, (user) => {
        if (user?.theme && isModalOpen.value) {
            form.value.theme = user.theme as ThemeValue
        }
    })

    return {
        isModalOpen,
        isDarkTheme,
        isSaving,
        error,
        form,
        themeLabel,
        openModal,
        closeModal,
        toggleTheme,
        saveSettings,
        applyLocalTheme,
    }
})
