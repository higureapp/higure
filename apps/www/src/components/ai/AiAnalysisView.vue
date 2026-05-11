<script setup lang="ts">
import { Activity, Brain, BarChart3, AlignLeft, Pencil, Clock } from 'lucide-vue-next';
import AiMetricGroup from './AiMetricGroup.vue';
import AiMetricItem from './AiMetricItem.vue';

defineProps<{
    metrics: any;
}>();

const formatTextDensity = (val: number) => (val * 100).toFixed(1) + '%';
const formatPercentage = (val: number) => (val * 100).toFixed(1) + '%';
</script>

<template>
    <div class="analysis-view">
        <section class="analysis-section">
            <div class="section-badge">Metrics Dashboard</div>
            <div class="metrics-grid">
                <AiMetricGroup title="Structural" :icon="AlignLeft">
                    <AiMetricItem label="Words" :value="metrics.wordCount" />
                    <AiMetricItem label="Density" :value="formatTextDensity(metrics.textDensity)" />
                    <AiMetricItem label="Time" :value="`${metrics.estimatedWritingTime}m`" />
                </AiMetricGroup>

                <AiMetricGroup title="Temporal" :icon="Clock">
                    <AiMetricItem 
                        label="Focus (Past→Fut)" 
                        show-progress 
                        :progress-value="metrics.temporalFocus * 10"
                        :progress-color="'#8b5cf6'"
                    />
                    <AiMetricItem label="Time Refs" :value="metrics.temporalReferencesCount" />
                </AiMetricGroup>

                
                <AiMetricGroup title="Emotional" :icon="Activity">
                    <AiMetricItem 
                        label="Valence" 
                        show-progress 
                        :progress-value="(metrics.emotionalValence + 10) * 5"
                        :progress-color="metrics.emotionalValence > 0 ? '#10b981' : '#f43f5e'"
                    />
                    <AiMetricItem label="Intensity" :value="`${metrics.emotionalIntensity}/10`" />
                </AiMetricGroup>

                <AiMetricGroup title="Cognitive" :icon="Brain">
                    <AiMetricItem label="Self-Reflection" :value="`${metrics.introspectionIndex}/10`" />
                    <AiMetricItem label="Inquiry" :value="`${metrics.questionsCount} qst`" />
                </AiMetricGroup>

                <AiMetricGroup title="Logic & Context" :icon="Pencil">
                    <AiMetricItem label="Cause/Effect" :value="metrics.causeEffectCount" />
                    <AiMetricItem label="Characters" :value="metrics.charactersCount" />
                    <AiMetricItem label="Events" :value="metrics.eventsCount" />
                </AiMetricGroup>

                <AiMetricGroup title="Style" :icon="Pencil">
                    <AiMetricItem label="Richness" :value="formatPercentage(metrics.lexicalRichness)" />
                    <AiMetricItem label="Formality" :value="`${metrics.formality}/10`" />
                </AiMetricGroup>

            </div>
        </section>
    </div>
</template>

<style scoped>
.analysis-section {
    margin-bottom: 2.5rem;
}

.section-badge {
    display: inline-flex;
    align-items: center;
    color: #24283B;
    font-size: 0.75rem;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    margin-bottom: 1.5rem;
}

.metrics-grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: 1.5rem;
}

@media (min-width: 640px) {
    .metrics-grid {
        grid-template-columns: 1fr;
    }
}
</style>
