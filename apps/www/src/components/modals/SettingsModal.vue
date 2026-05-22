<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { X, Save, Loader2 } from 'lucide-vue-next'
import { useSettingsStore } from '@/stores/settings-store'
import { languages, themes, getBrowserTimezone, getBrowserLocale } from '@/utils/languages'
import type { LanguageValue, ThemeValue } from '@/utils/languages'

const settingsStore = useSettingsStore()
const { form, isSaving, error } = storeToRefs(settingsStore)

function handleCancel() {
    settingsStore.closeModal()
}

async function handleSave() {
    await settingsStore.saveSettings()
}

function updateLanguage(value: string) {
    form.value.language = value as LanguageValue
}

function updateTheme(value: string) {
    form.value.theme = value as ThemeValue
}

function useBrowserTimezone() {
    form.value.timezone = getBrowserTimezone()
}

function useBrowserLocale() {
    form.value.locale = getBrowserLocale()
}
</script>

<template>
    <Teleport to="body">
        <Transition name="fade-slide">
            <div v-if="settingsStore.isModalOpen" class="settings-overlay">
                <div class="settings-modal">
                    <header class="modal-header">
                        <h2 class="modal-title">Settings</h2>
                        <button class="close-btn" @click="handleCancel" aria-label="Close">
                            <X :size="20" />
                        </button>
                    </header>

                    <div class="modal-body">
                        <p v-if="error" class="error-message">{{ error }}</p>

                        <div class="form-section">
                            <h3 class="section-title">Profile</h3>
                            
                            <div class="form-grid">
                                <div class="form-group">
                                    <label class="form-label">First Name</label>
                                    <input 
                                        v-model="form.firstname" 
                                        type="text" 
                                        class="form-input"
                                        placeholder="Enter your first name"
                                    />
                                </div>

                                <div class="form-group">
                                    <label class="form-label">Last Name</label>
                                    <input 
                                        v-model="form.lastname" 
                                        type="text" 
                                        class="form-input"
                                        placeholder="Enter your last name"
                                    />
                                </div>
                            </div>

                            <div class="form-group">
                                <label class="form-label">Email</label>
                                <input 
                                    v-model="form.email" 
                                    type="email" 
                                    class="form-input"
                                    placeholder="Enter your email"
                                />
                            </div>
                        </div>

                        <div class="form-section">
                            <h3 class="section-title">Localization</h3>
                            
                            <div class="form-group">
                                <label class="form-label">
                                    Timezone
                                    <button 
                                        type="button" 
                                        class="hint-btn" 
                                        @click="useBrowserTimezone"
                                        title="Use browser timezone"
                                    >
                                        Auto
                                    </button>
                                </label>
                                <input 
                                    v-model="form.timezone" 
                                    type="text" 
                                    class="form-input"
                                    placeholder="e.g., Europe/Rome, America/New_York"
                                />
                                <p class="form-hint">Your timezone for date and time calculations</p>
                            </div>

                            <div class="form-group">
                                <label class="form-label">
                                    Locale
                                    <button 
                                        type="button" 
                                        class="hint-btn" 
                                        @click="useBrowserLocale"
                                        title="Use browser locale"
                                    >
                                        Auto
                                    </button>
                                </label>
                                <input 
                                    v-model="form.locale" 
                                    type="text" 
                                    class="form-input"
                                    placeholder="e.g., it-IT, en-US, es-ES"
                                />
                                <p class="form-hint">Your locale for formatting dates and numbers</p>
                            </div>
                        </div>

                        <div class="form-section">
                            <h3 class="section-title">Preferences</h3>
                            
                            <div class="form-group">
                                <label class="form-label">Language</label>
                                <div class="radio-group">
                                    <label 
                                        v-for="lang in languages" 
                                        :key="lang.value" 
                                        class="radio-item"
                                        :class="{ active: form.language === lang.value }"
                                    >
                                        <input 
                                            type="radio" 
                                            :value="lang.value" 
                                            v-model="form.language"
                                            @change="updateLanguage(lang.value)"
                                            class="radio-input"
                                        />
                                        <span class="radio-label">{{ lang.label }}</span>
                                    </label>
                                </div>
                            </div>

                            <div class="form-group">
                                <label class="form-label">Theme</label>
                                <div class="radio-group">
                                    <label 
                                        v-for="t in themes" 
                                        :key="t.value" 
                                        class="radio-item"
                                        :class="{ active: form.theme === t.value }"
                                    >
                                        <input 
                                            type="radio" 
                                            :value="t.value" 
                                            v-model="form.theme"
                                            @change="updateTheme(t.value)"
                                            class="radio-input"
                                        />
                                        <span class="radio-label">{{ t.label }}</span>
                                    </label>
                                </div>
                                <p class="form-hint">The sidebar theme toggle also updates this setting</p>
                            </div>
                        </div>
                    </div>

                    <footer class="modal-footer">
                        <button 
                            type="button" 
                            class="btn btn-secondary" 
                            @click="handleCancel"
                        >
                            Cancel
                        </button>
                        <button 
                            type="button" 
                            class="btn btn-primary" 
                            @click="handleSave"
                            :disabled="isSaving"
                        >
                            <Loader2 v-if="isSaving" :size="18" class="spinning" />
                            <Save v-else :size="18" />
                            <span>{{ isSaving ? 'Saving...' : 'Save Changes' }}</span>
                        </button>
                    </footer>
                </div>
            </div>
        </Transition>
    </Teleport>
</template>

<style scoped>
.fade-slide-enter-active,
.fade-slide-leave-active {
    transition: opacity 0.2s ease, transform 0.2s cubic-bezier(0.16, 1, 0.3, 1);
}

.fade-slide-enter-from,
.fade-slide-leave-to {
    opacity: 0;
    transform: scale(0.95);
}

.settings-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background: var(--bg-overlay);
    backdrop-filter: blur(6px);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 9999;
}

.settings-modal {
    background: var(--bg-main);
    border-radius: 16px;
    box-shadow: var(--shadow-dropdown);
    width: 90%;
    max-width: 520px;
    max-height: 85vh;
    display: flex;
    flex-direction: column;
    position: relative;
    overflow: hidden;
}

.modal-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1.25rem 1.5rem;
    border-bottom: 1px solid var(--border-subtle);
    background: var(--bg-main);
}

.modal-title {
    font-size: 1.25rem;
    font-weight: 700;
    color: var(--text-primary);
    font-family: "Figtree", sans-serif;
    margin: 0;
}

.close-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0.5rem;
    border-radius: 8px;
    border: none;
    background: transparent;
    color: var(--icon-color-secondary);
    cursor: pointer;
    transition: all 0.2s ease;
}

.close-btn:hover {
    background: var(--hover-overlay-strong);
    color: var(--icon-color);
}

.modal-body {
    flex: 1;
    overflow-y: auto;
    padding: 1.5rem;
}

.error-message {
    background: color-mix(in srgb, var(--accent-danger) 15%, transparent);
    color: var(--accent-danger);
    padding: 0.75rem 1rem;
    border-radius: 8px;
    font-size: 0.875rem;
    margin-bottom: 1rem;
    font-family: "Figtree", sans-serif;
}

.form-section {
    margin-bottom: 1.75rem;
}

.form-section:last-child {
    margin-bottom: 0;
}

.section-title {
    font-size: 0.75rem;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    color: var(--text-secondary);
    margin: 0 0 1rem 0;
    font-family: "Figtree", sans-serif;
}

.form-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 1rem;
}

.form-group {
    margin-bottom: 1rem;
}

.form-group:last-child {
    margin-bottom: 0;
}

.form-label {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-size: 0.875rem;
    font-weight: 600;
    color: var(--text-primary);
    margin-bottom: 0.5rem;
    font-family: "Figtree", sans-serif;
}

.hint-btn {
    font-size: 0.7rem;
    font-weight: 500;
    padding: 0.15rem 0.4rem;
    border-radius: 4px;
    border: 1px solid var(--border-medium);
    background: var(--bg-card);
    color: var(--text-secondary);
    cursor: pointer;
    transition: all 0.2s ease;
}

.hint-btn:hover {
    background: var(--hover-overlay);
    color: var(--text-primary);
}

.form-input {
    width: 100%;
    padding: 0.75rem 1rem;
    border-radius: 10px;
    border: 1px solid var(--border-light);
    background: var(--bg-card);
    color: var(--text-primary);
    font-size: 0.95rem;
    font-family: "Ibarra Real Nova", serif;
    outline: none;
    transition: all 0.2s ease;
    box-sizing: border-box;
}

.form-input::placeholder {
    color: var(--text-placeholder);
}

.form-input:focus {
    border-color: var(--accent-purple);
    box-shadow: 0 0 0 3px var(--accent-purple-light);
}

.form-hint {
    font-size: 0.75rem;
    color: var(--text-tertiary);
    margin: 0.35rem 0 0 0;
    font-family: "Figtree", sans-serif;
}

.radio-group {
    display: flex;
    flex-wrap: wrap;
    gap: 0.75rem;
}

.radio-item {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.5rem 0.875rem;
    border-radius: 8px;
    border: 1px solid var(--border-light);
    background: var(--bg-card);
    cursor: pointer;
    transition: all 0.2s ease;
}

.radio-item:hover {
    border-color: var(--border-hover);
    background: var(--hover-overlay);
}

.radio-item.active {
    border-color: var(--accent-purple);
    background: var(--accent-purple-light);
}

.radio-input {
    margin: 0;
    cursor: pointer;
}

.radio-label {
    font-size: 0.9rem;
    font-weight: 500;
    color: var(--text-primary);
    font-family: "Figtree", sans-serif;
    cursor: pointer;
}

.modal-footer {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    gap: 0.75rem;
    padding: 1rem 1.5rem;
    border-top: 1px solid var(--border-subtle);
    background: var(--bg-main);
}

.btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    padding: 0.65rem 1.25rem;
    border-radius: 8px;
    border: none;
    font-size: 0.9rem;
    font-weight: 600;
    font-family: "Figtree", sans-serif;
    cursor: pointer;
    transition: all 0.2s ease;
}

.btn:disabled {
    opacity: 0.5;
    cursor: not-allowed;
}

.btn-secondary {
    background: var(--button-secondary-bg);
    color: var(--button-secondary-text);
}

.btn-secondary:hover:not(:disabled) {
    background: var(--button-secondary-hover);
}

.btn-primary {
    background: var(--button-primary-bg);
    color: var(--button-primary-text);
}

.btn-primary:hover:not(:disabled) {
    background: var(--button-primary-hover);
}

.spinning {
    animation: spin 1s linear infinite;
}

@keyframes spin {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
}

@media (max-width: 640px) {
    .form-grid {
        grid-template-columns: 1fr;
    }
    
    .radio-group {
        flex-direction: column;
        gap: 0.5rem;
    }
    
    .radio-item {
        width: 100%;
        box-sizing: border-box;
    }
    
    .modal-footer {
        flex-direction: column-reverse;
    }
    
    .btn {
        width: 100%;
    }
}
</style>
