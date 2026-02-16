import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useAiStore = defineStore('ai', () => {
    const isShowed = ref<boolean>(false)
    const resolvePromise = ref<((value: boolean) => void) | null>(null)

    function showBar(): Promise<boolean> {
        isShowed.value = true

        return new Promise((resolve) => {
            resolvePromise.value = resolve
        })
    }

    function hideBar() {
        isShowed.value = false
        resolvePromise.value = null
    }

    return { isShowed, showBar, hideBar }
})
