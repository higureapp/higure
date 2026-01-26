import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useLocalStore = defineStore('localStore', () => {
    
    function setItem(key: string, value: string) {
        localStorage.setItem(key, value);
    }

    function removeItem(key: string) {
        localStorage.removeItem(key);
    }

    function getItem(key: string): string | null {
        return localStorage.getItem(key);
    }

    return { setItem, removeItem, getItem }
})
