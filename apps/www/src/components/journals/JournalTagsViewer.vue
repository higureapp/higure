<script setup lang="ts">
import { Plus } from 'lucide-vue-next';
import { RouterLink } from 'vue-router';

defineProps<{
    tags: string[];
}>();
</script>

<template>
    <div v-if="tags.length" class="tags">
        <p class="tag" v-for="tag in tags" :key="tag">
            [<RouterLink :to="`/tag/${tag}`">{{ tag }}</RouterLink>]
        </p>
    </div>
    <div v-else class="add-tags">
        <Plus :size="16" color="#333" />
        <p class="add-label">Add tags</p>
    </div>
</template>

<style scoped>
.tags {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
}

.tag {
    margin: 0;
}

.tag a {
    text-decoration: none;
    color: #333;
}

.tag a:hover {
    text-decoration: underline;
}

.add-tags {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 0.5rem;
    padding: 0.3rem;
    cursor: pointer;
    transition: opacity 0.2s;
}

.add-tags:hover {
    opacity: 0.7;
}

.add-label {
    margin: 0;
    font-size: 0.9rem;
    color: #666;
}
</style>