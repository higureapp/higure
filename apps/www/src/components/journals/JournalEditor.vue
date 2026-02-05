<script setup lang="ts">
import { ref, computed, watch } from 'vue';
import dayjs from 'dayjs';
import { ArrowLeft, Check, Save, Trash, Trash2 } from 'lucide-vue-next';
import JournalTagsViewer from './JournalTagsViewer.vue';
import router from '@/router';
import { useJournalStore } from '@/stores/journal-store';
import { useAlertStore } from '@/stores/alert-store';

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
    return dayjs(props.date).format('dddd, DD MMMM YYYY');
});

const formattedTime = computed(() => {
    if (!journal.value.time) return '';
    return dayjs(journal.value.time).format('HH:mm');
});

const formattedContent = computed(() => {
    let text = journal.value.content;
    text = text.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
    text = text.replace(/(?<!\*)\*(?!\*)(.+?)(?<!\*)\*(?!\*)/g, '<em>$1</em>');
    return text;
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
    router.go(-1);
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
        <div class="action-buttons">
            <button class="btn-back" @click="handleBack">
                <component :is="ArrowLeft" :size="18" />
                Back
            </button>
            <button class="btn-save" @click="handleSave">
                <component :is="isSaved ? Check : Save" :size="18" />
                {{ isSaved ? 'Saved' : 'Save' }}
            </button>
            <button class="btn-delete" @click="deleteAccount">
                <component :is="Trash2" :size="18" />
            </button>
        </div>

        <div class="content">
            <div class="journal-header">
                <h1>{{ formattedDate }}</h1>
                <p class="time">
                    <b>{{ formattedTime }}</b>
                    <textarea v-model="journal.location" class="location" spellcheck="false"
                        placeholder="Add location..." @input="handleLocation" maxlength="64"></textarea>
                </p>
                <JournalTagsViewer :tags="journal.tags" class="tags" />
            </div>

            <div class="editor-container">
                <textarea v-model="journal.content" @input="handleInput" class="journal-editor"
                    placeholder="Start to write..." spellcheck="false"></textarea>
                <div class="journal-preview" v-html="formattedContent"></div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.journal-editor-page {
    padding: 2rem;
    width: 40vw;
    min-height: 100vh;
    height: 100%;
    margin: 0 auto;
    font-family: "Ibarra Real Nova", serif;
    color: #000000;
    position: relative;
}

.action-buttons {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1rem;
    gap: 1rem;
    border-bottom: 1px solid #000000;
    padding-bottom: 1rem;
}

.action-buttons button {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    border: none;
    border-radius: 6px;
    font-family: "Ibarra Real Nova", serif;
    font-size: 1rem;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.2s ease;
}

.btn-back {
    background-color: transparent;
    color: #000000;
}

.btn-back:active {
    transform: translateY(1px);
}

.btn-save {
    background-color: transparent;
    color: #2d2d2d;
    margin-left: auto;
}

.btn-save:active {
    transform: translateY(1px);
}

b {
    font-weight: 600;
}

.content {
    animation: fadeIn 0.5s ease-in-out;
    width: 98%;
    max-width: 40vw;
    margin: 0 auto;
}

@keyframes fadeIn {
    from {
        opacity: 0;
    }

    to {
        opacity: 1;
    }
}

.journal-header {
    margin-top: 2rem;
    margin-bottom: 2rem;
    padding-bottom: 1rem;
}

.journal-header h1 {
    font-size: 2rem;
    font-weight: 600;
    margin: 0 0 0.5rem 0;
    color: #1a1a1a;
}

.journal-header .time {
    display: flex;
    align-items: start;
    gap: 8px;
    font-size: 1.1rem;
    color: #000000;
    margin: 0;
    font-weight: 400;
}

.time .location {
    color: #000;
    border: none;
    outline: none;
    resize: none;
    font-family: "Ibarra Real Nova", serif;
    font-size: 1.1rem;
    background: transparent;
    padding: 0;
    font-weight: 400;
    caret-color: #000000;
    width: 100%;
    height: 1.5em;
}

.tags {
    margin-top: 2rem;
}

.editor-container {
    position: relative;
    width: 100%;
}

.journal-editor,
.journal-preview {
    font-family: "Ibarra Real Nova", serif;
    font-size: 1.1rem;
    line-height: 1.8;
    padding: 0;
    margin: 0;
    border: none;
    width: 100%;
    box-sizing: border-box;
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
    caret-color: #000000;
    resize: none;
    z-index: 2;
    outline: none;
    overflow: hidden;
}

.journal-preview {
    position: relative;
    min-height: 50vh;
    color: #000000;
    z-index: 1;
    pointer-events: none;
    overflow: hidden;
}

.journal-preview :deep(strong) {
    font-weight: 700;
}

.journal-preview :deep(em) {
    font-style: italic;
}

.journal-editor::placeholder {
    color: #999;
    font-style: italic;
}
</style>