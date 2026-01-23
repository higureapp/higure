import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware'

const TOKEN_NAME = 'access_token';

export const useAuthStore = create(
    persist<{
        token: string | null
        setToken: (token: string | null) => void
        clearToken: () => void
        _hasHydrated: boolean
        setHasHydrated: (state: boolean) => void
    }>(
        (set) => ({
            token: null,
            _hasHydrated: false,
            setToken: (token) => set({ token }),
            clearToken: () => set({ token: null }),
            setHasHydrated: (state) => set({ _hasHydrated: state })
        }),
        {
            name: TOKEN_NAME,
            storage: createJSONStorage(() =>
                typeof window !== 'undefined' ? localStorage : {
                    getItem: () => null,
                    setItem: () => { },
                    removeItem: () => { }
                }
            ),
            onRehydrateStorage: () => (state) => {
                state?.setHasHydrated(true)
            }
        }
    )
)

export const getAuthToken = () => useAuthStore.getState().token
export const setAuthToken = (token: string | null) => useAuthStore.getState().setToken(token)
export const clearAuthToken = () => useAuthStore.getState().clearToken()
export const useHasHydrated = () => useAuthStore(state => state._hasHydrated)