import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useAlertStore = defineStore('alert', () => {
    const isShowed = ref<boolean>(false)
    const message = ref<string>('')

    const resolvePromise = ref<((value: boolean) => void) | null>(null)

    function askConfirmation(_message: string): Promise<boolean> {
        message.value = _message
        isShowed.value = true

        return new Promise((resolve) => {
            resolvePromise.value = resolve
        })
    }

    function confirm() {
        if (resolvePromise.value) resolvePromise.value(true)
        close()
    }

    function cancel() {
        if (resolvePromise.value) resolvePromise.value(false)
        close()
    }

    function close() {
        isShowed.value = false
        resolvePromise.value = null
    }

    return { isShowed, message, askConfirmation, confirm, cancel }
})
