<script setup lang="ts">
import { ref, computed, watch } from 'vue';
import dayjs from 'dayjs';
import { ArrowLeft, Check, Save, Trash2, MapPin, Calendar, Clock, Search } from 'lucide-vue-next';
import JournalTagsViewer from './JournalTagsViewer.vue';
import router from '@/router';
import { useJournalStore } from '@/stores/journal-store';
import { useAlertStore } from '@/stores/alert-store';
import { useSearchStore } from '@/stores/search-store';
import AiActions from '../ai/AiActions.vue';

const searchStore = useSearchStore();

const props = defineProps<{
    id?: string;
    content?: string;
    date?: string;
    time?: string;
    tags?: string[];
    location?: string;
    isNew: boolean;
}>();

const isToCreate = ref<boolean>(props.isNew);

const journal = ref({
    id: props.id || '',
    content: props.content || '',
    date: props.date ? new Date(props.date) : new Date(Date.now()),
    time: props.time ? new Date(props.time) : new Date(Date.now()),
    tags: props.tags || [],
    location: props.location || '',
});

watch(() => props.id, () => {
    journal.value = {
        id: props.id || '',
        content: props.content || '',
        date: props.date ? new Date(props.date) : new Date(),
        time: props.time ? new Date(props.time) : new Date(),
        tags: props.tags || [],
        location: props.location || '',
    };
}, { immediate: true });

const formattedDate = computed(() => {
    if (!journal.value.date) return '';
    return dayjs(props.date).format('dddd, DD MMM YYYY');
});

const formattedTime = computed(() => {
    if (!journal.value.time) return '';
    return dayjs(journal.value.time).format('HH:mm');
});

const formattedContent = computed(() => {
    let html = journal.value.content;
    html = html.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
    html = html.replace(/\*\*(.+?)\*\*/g, (match, content) => `<strong>${content}</strong>`);
    html = html.replace(/(?<!\*)\*(?!\*)([^*]+?)(?<!\*)\*(?!\*)/g, (match, content) => `<em>${content}</em>`);
    html = html.replace(/^([\-\*])\s/gm, '<span class="bullet">•</span> ');
    html = html.replace(/^(\d+)\.\s/gm, '<span class="number">$1.</span> ');
    return html;
});

const isSaved = ref<boolean>(true);

const handleInput = (event: Event) => {
    const target = event.target as HTMLTextAreaElement;
    journal.value.content = target.value;
    isSaved.value = false;
};

const handleLocation = (event: Event) => {
    isSaved.value = false;
}

const journalStore = useJournalStore();

const handleSave = async () => {
    if (isSaved.value) return;
    try {
        if (isToCreate.value || !journal.value.id) {
            const newEntry = await journalStore.createJournal({
                content: journal.value.content,
                location: journal.value.location,
                date: journal.value.date.toISOString()
            });
            if (newEntry?.data && newEntry.data?.createJournalPage.id) {
                journal.value.id = newEntry.data.createJournalPage.id;
            }
            isToCreate.value = false;
        } else {
            await journalStore.updateJournal(journal.value.id, {
                content: journal.value.content,
                location: journal.value.location
            });
        }
        isSaved.value = true;
    } catch (e) {
        console.error(e);
    }
};

const handleBack = () => {
    if (searchStore.cameFromSearch) {
        searchStore.backToSearch();
    } else {
        router.go(-1);
    }
};

const alertStore = useAlertStore();

async function deleteAccount() {
    const confirmed = await alertStore.askConfirmation("You want to delete this journal?");
    if (confirmed) {
        await journalStore.deleteJournal(journal.value.id);
        handleBack();
    }
}
</script>

<template>
    <div class="journal-editor-page">
        <header class="page-header">
            <button class="btn-back" @click="handleBack">
                <component :is="ArrowLeft" :size="20" />
                <span>Back</span>
            </button>

            <div class="header-actions">
                <button class="btn-save" @click="handleSave" :class="{ saved: isSaved, unsaved: !isSaved }">
                    <component :is="isSaved ? Check : Save" :size="18" />
                    <span>{{ isSaved ? 'Saved' : 'Save' }}</span>
                </button>
                <button class="btn-delete" @click="deleteAccount">
                    <component :is="Trash2" :size="18" />
                </button>
            </div>
        </header>

        <article class="journal-content">
            <div class="journal-meta">
                <h1 class="journal-date">{{ formattedDate }}</h1>

                <div class="meta-details">
                    <div class="meta-item">
                        <component :is="Clock" :size="16" class="meta-icon" />
                        <span class="meta-text">{{ formattedTime }}</span>
                    </div>

                    <div class="meta-item location-item">
                        <component :is="MapPin" :size="16" class="meta-icon" />
                        <input v-model="journal.location" class="location-input" spellcheck="false"
                            placeholder="Add location..." @input="handleLocation" maxlength="64" />
                    </div>
                </div>

                <JournalTagsViewer v-if="journal.tags.length" :tags="journal.tags" class="journal-tags" />
            </div>

            <div class="editor-wrapper">
                <textarea v-model="journal.content" @input="handleInput" class="journal-editor"
                    placeholder="Start writing your thoughts..." spellcheck="false"></textarea>
                <div class="journal-preview" v-html="formattedContent"></div>
            </div>
        </article>

        <div class="side-actions">
            <AiActions />
        </div>
    </div>
</template>

<style scoped>
.journal-view-container {
    width: 100%;
    display: flex;
    flex-direction: row;
    overflow: hidden;
}

.journal-editor-page {
    min-height: 100vh;
    width: 100%;
    font-family: "Ibarra Real Nova", serif;
    color: var(--text-primary);
    background: var(--bg-main);
}

.page-header {
    position: sticky;
    top: 0;
    z-index: 100;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem 1.5rem;
    background: color-mix(in srgb, var(--bg-main) 70%, transparent);
    backdrop-filter: blur(8px);
}

.header-actions {
    display: flex;
    gap: 0.75rem;
    align-items: center;
}

.page-header button {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    border: none;
    background: transparent;
    font-family: inherit;
    font-size: 0.95rem;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
    border-radius: 8px;
    padding: 0.5rem 0.75rem;
    color: var(--text-primary);
}

.btn-back:hover {
    background: var(--hover-overlay-strong);
    transform: translateX(-2px);
}

.btn-save.unsaved:hover {
    background: var(--hover-overlay-strong);
    color: var(--text-primary);
}

.btn-save.saved {
    color: var(--accent-success);
    cursor: default;
}

.btn-delete {
    color: var(--accent-danger);
}

.btn-delete:hover {
    background: color-mix(in srgb, var(--accent-danger) 10%, transparent);
    transform: scale(1.05);
}

.journal-content {
    margin: 0 auto;
    padding: 2rem 1.5rem 6rem;
    min-height: calc(100vh - 70px);
    width: 90%;
}

.journal-date {
    font-size: clamp(1.75rem, 5vw, 2.25rem);
    font-weight: 600;
    margin: 0 0 1.5rem 0;
    color: var(--text-primary);
    letter-spacing: -0.02em;
    line-height: 1.2;
}

.meta-details {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
    margin-bottom: 1.5rem;
}

.meta-item {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.25rem 0;
    color: var(--text-secondary);
}

.location-input {
    flex: 1;
    border: none;
    outline: none;
    background: transparent;
    padding: 0;
    font-size: 1rem;
    color: var(--text-primary);
    font-family: inherit;
    border-bottom: 1px solid transparent;
    transition: border-color 0.2s;
}

.editor-wrapper {
    position: relative;
    width: 100%;
    margin-top: 1rem;
}

.journal-editor,
.journal-preview {
    font-family: inherit;
    font-size: 1.125rem;
    line-height: 1.8;
    width: 100%;
    min-height: 60vh;
    padding: 0;
    margin: 0;
    white-space: pre-wrap;
    word-wrap: break-word;
}

.journal-editor {
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    color: transparent;
    background: transparent;
    caret-color: var(--editor-caret);
    resize: none;
    z-index: 2;
    border: none;
    outline: none;
    overflow: hidden;
}

.journal-preview {
    position: relative;
    color: var(--editor-preview);
    z-index: 1;
    pointer-events: none;
}

.journal-editor::placeholder {
    color: var(--text-placeholder);
    opacity: 1;
}

.journal-editor:placeholder-shown + .journal-preview {
    visibility: hidden;
}

.journal-preview :deep(strong) {
    font-weight: 700;
}

.journal-preview :deep(em) {
    font-style: italic;
}

@media (max-width: 640px) {

    .btn-back span,
    .btn-save span {
        display: none;
    }

    .page-header {
        padding: 0.75rem 1rem;
    }

    .journal-content {
        padding: 1rem 1rem 4rem;
        width: 100%;
        box-sizing: border-box;
    }

    .journal-date {
        margin-bottom: 1rem;
    }
}

.side-actions {
    --bg-green: var(--side-actions-bg);
    --radius: 20px;

    position: fixed;
    top: 40vh;
    right: 0;
    background-color: var(--bg-green);
    padding: 1rem;
    min-width: 50px;

    border-radius: var(--radius) 0 0 var(--radius);
    z-index: 10;
}

.side-actions::before {
    content: "";
    position: absolute;
    top: calc(var(--radius) * -1);
    right: 0;
    width: var(--radius);
    height: var(--radius);
    background-color: transparent;
    border-bottom-right-radius: var(--radius);
    box-shadow: 10px 10px 0 10px var(--bg-green);
    pointer-events: none;
}

.side-actions::after {
    content: "";
    position: absolute;
    bottom: calc(var(--radius) * -1);
    right: 0;
    width: var(--radius);
    height: var(--radius);
    background-color: transparent;
    border-top-right-radius: var(--radius);
    box-shadow: 10px -10px 0 10px var(--bg-green);
    pointer-events: none;
}
</style>