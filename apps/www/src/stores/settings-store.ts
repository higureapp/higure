import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useSettingsStore = defineStore('settings', () => {
    const isModalOpen = ref<boolean>(false)
    const openModal = () => (isModalOpen.value = true)
    const closeModal = () => (isModalOpen.value = false)

    return {
        isModalOpen,
        openModal,
        closeModal,
    }
})
