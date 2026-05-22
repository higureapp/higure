export const languages = [
    { value: 'english', label: 'English' },
    { value: 'spanish', label: 'Español' },
    { value: 'french', label: 'Français' },
    { value: 'italian', label: 'Italiano' },
    { value: 'german', label: 'Deutsch' },
] as const

export type LanguageValue = typeof languages[number]['value']

export const themes = [
    { value: 'light', label: 'Light' },
    { value: 'dark', label: 'Dark' },
] as const

export type ThemeValue = typeof themes[number]['value']

export function getBrowserTimezone(): string {
    return Intl.DateTimeFormat().resolvedOptions().timeZone
}

export function getBrowserLocale(): string {
    return navigator.language || 'en-US'
}
