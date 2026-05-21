<script setup lang="ts">
import { Lightbulb, HelpCircle, Sparkles } from 'lucide-vue-next';

defineProps<{
    reflection: any;
}>();

function formatReflectionType(type: string): string {
    const map: Record<string, string> = {
        'pragmatic': 'Pragmatic',
        'psychological': 'Psychological',
        'cynical': 'Cynical',
        'philosophical': 'Philosophical',
        'empathetic': 'Empathetic',
        'stoic': 'Stoic',
        'romantic': 'Romantic',
        'critical': 'Critical',
        'playful': 'Playful',
        'spiritual': 'Spiritual',
        'narrative': 'Narrative',
        'future-oriented': 'Future-Oriented',
        'past-oriented': 'Past-Oriented',
        'social': 'Social',
        'existential': 'Existential',
        'mindful': 'Mindful',
        'ambition-focused': 'Ambition-Focused',
        'contentment-focused': 'Contentment-Focused',
        'shadow-focused': 'Shadow-Focused',
        'integration-focused': 'Integration-Focused',
    };
    return map[type] || type;
}
</script>

<template>
    <div class="reflection-view">
        <section class="reflection-section">
            <div class="reflection-badge">
                <Sparkles :size="14" />
                <span>{{ formatReflectionType(reflection.type) }}</span>
            </div>
            <p class="reflection-text">{{ reflection.content }}</p>
        </section>

        <section v-if="reflection.keyInsights?.length" class="insights-section">
            <h3>Key Insights</h3>
            <div class="insights-list">
                <div v-for="(insight, index) in reflection.keyInsights" :key="index" class="insight-item">
                    <Lightbulb :size="16" class="insight-icon" />
                    <span>{{ insight }}</span>
                </div>
            </div>
        </section>

        <section v-if="reflection.suggestedQuestion" class="question-section">
            <HelpCircle :size="28" class="question-icon" />
            <p class="question-text">{{ reflection.suggestedQuestion }}</p>
        </section>
    </div>
</template>

<style scoped>
.reflection-view {
    display: flex;
    flex-direction: column;
    gap: 1rem;
}

.reflection-section {
    margin-bottom: 2rem;
}

.reflection-badge {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    background: #DBD3DC;
    padding: 0.4rem 0.75rem;
    border-radius: 8px;
    color: #24283B;
    font-size: 0.75rem;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    margin-bottom: 1.5rem;
}

.reflection-text {
    font-family: "Ibarra Real Nova", serif;
    font-size: 1.1rem;
    line-height: 1.7;
    color: #000000;
    white-space: pre-line;
}

.insights-section h3 {
    font-size: 1rem;
    font-weight: 700;
    margin-bottom: 1.25rem;
    color: #000;
    text-transform: uppercase;
    letter-spacing: 0.05em;
}

.insights-list {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
}

.insight-item {
    display: flex;
    gap: 0.75rem;
    padding: 1rem;
    background: #DBD3DC;
    border-radius: 12px;
    border: 1px solid rgba(0, 0, 0, 0.04);
    align-items: flex-start;
}

.insight-icon {
    color: #8b5cf6;
    flex-shrink: 0;
    margin-top: 0.1rem;
}

.insight-item span {
    font-size: 0.95rem;
    line-height: 1.5;
    color: #1a1a1a;
}

.question-section {
    position: relative;
    padding: 2rem 1.5rem;
    margin-top: 2rem;
    background: #fabab5;
    border-radius: 16px;
    text-align: center;
    border: 1px dashed rgba(0, 0, 0, 0.08);
}

.question-icon {
    position: absolute;
    top: -14px;
    left: 20px;
    color: #000000;
    opacity: 0.15;
}

.question-text {
    font-family: "Ibarra Real Nova", serif;
    font-style: italic;
    font-size: 1.2rem;
    color: #1a1a1a;
    line-height: 1.5;
}
</style>
