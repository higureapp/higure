import { defineStore } from 'pinia'
import { ref, watch, computed } from 'vue'

export const useSettingsStore = defineStore('settings', () => {
    const isModalOpen = ref<boolean>(false)
    const isDarkTheme = ref<boolean>(localStorage.getItem('higure-theme') === 'dark')

    const openModal = () => (isModalOpen.value = true)
    const closeModal = () => (isModalOpen.value = false)

    const themeLabel = computed(() => isDarkTheme.value ? 'Dark' : 'Light')

    function toggleTheme() {
        isDarkTheme.value = !isDarkTheme.value
    }

    watch(isDarkTheme, (newValue) => {
        if (newValue) {
            document.documentElement.classList.add('dark')
            localStorage.setItem('higure-theme', 'dark')
        } else {
            document.documentElement.classList.remove('dark')
            localStorage.setItem('higure-theme', 'light')
        }
    }, { immediate: true })

    return {
        isModalOpen,
        isDarkTheme,
        themeLabel,
        openModal,
        closeModal,
        toggleTheme,
    }
})
