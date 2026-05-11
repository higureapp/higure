<script setup lang="ts">
import { Music, Quote, Wand2, PlayCircle } from 'lucide-vue-next';

defineProps<{
    analysis: any;
}>();
</script>

<template>
    <div class="insight-view">
        <!-- Critical Analysis section -->
        <section class="analysis-section">
            <div class="section-badge">Reflection</div>
            <p class="critical-text">{{ analysis.criticalAnalysis }}</p>
        </section>

        <!-- Quote Section -->
        <section v-if="analysis.quote" class="quote-section">
            <Quote :size="32" class="quote-icon" />
            <blockquote class="elegant-quote">
                "{{ analysis.quote }}"
            </blockquote>
            <cite class="quote-author">— {{ analysis.quoteAuthor }}</cite>
        </section>

        <!-- Suggested Songs -->
        <section class="songs-section">
            <h3>Match the Vibe</h3>
            <div class="songs-grid">
                <div v-for="(song, index) in analysis.suggestedSongs" :key="index" class="song-card">
                    <div class="song-cover">
                        <img 
                            v-if="song.coverUrl"
                            :src="song.coverUrl" 
                            :alt="song.title" 
                            @error="(e: any) => e.target.src = '/song_placeholder.png'"
                        />
                        <div v-else class="song-placeholder">
                            <Music :size="24" />
                        </div>
                    </div>


                    <div class="song-info">
                        <div class="song-header">
                            <span class="song-artist">{{ song.author || song.artist || 'Unknown' }}</span>
                        </div>
                        <h4 class="song-title">{{ song.title }}</h4>
                        <p class="song-reason">{{ song.reason }}</p>
                    </div>
                    <a v-if="song.spotifyUrl" :href="song.spotifyUrl" target="_blank" class="play-btn">
                        <PlayCircle :size="24" />
                    </a>
                </div>
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

.critical-text {
    font-family: "Ibarra Real Nova", serif;
    font-size: 1.1rem;
    line-height: 1.7;
    color: #000000;
    white-space: pre-line;
}

.quote-section {
    position: relative;
    padding: 2.5rem 1.5rem;
    margin: 2.5rem 0;
    background: #fabab5;
    border-radius: 16px;
    text-align: center;
    border: 1px dashed rgba(0, 0, 0, 0.08);
}

.quote-icon {
    position: absolute;
    top: -15px;
    left: 20px;
    color: #000000;
    opacity: 0.15;
}

.elegant-quote {
    font-family: "Ibarra Real Nova", serif;
    font-style: italic;
    font-size: 1.4rem;
    color: #1a1a1a;
    margin-bottom: 1rem;
    line-height: 1.4;
}

.quote-author {
    font-family: "Figtree", sans-serif;
    font-size: 0.85rem;
    color: #666;
    font-weight: 500;
    letter-spacing: 0.1em;
}

.songs-section h3 {
    font-size: 1rem;
    font-weight: 700;
    margin-bottom: 1.25rem;
    color: #000;
    text-transform: uppercase;
    letter-spacing: 0.05em;
}

.songs-grid {
    display: flex;
    flex-direction: column;
    gap: 1rem;
}

.song-card {
    background: #DBD3DC;
    padding: 1.25rem;
    border-radius: 12px;
    border: 1px solid rgba(0, 0, 0, 0.04);
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 1rem;
    transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.song-cover {
    width: 64px;
    height: 64px;
    flex-shrink: 0;
    align-self: start;
    border-radius: 8px;
    overflow: hidden;
    background: #24283B;
}

.song-cover img {
    width: 100%;
    height: 100%;
    object-fit: cover;
}

.song-placeholder {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    background: #2E3440;
    color: #a1a1aa;
}

.song-card:hover {

    transform: translateY(-2px);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.05);
}

.song-info {
    flex: 1;
}


.song-header {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    color: #999;
    margin-bottom: 0.25rem;
}

.song-artist {
    font-size: 0.7rem;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.04em;
}

.song-title {
    font-size: 1.05rem;
    font-weight: 600;
    margin: 0 0 0.5rem 0;
    color: #1a1a1a;
}

.song-reason {
    font-size: 0.85rem;
    color: #666;
    line-height: 1.5;
    font-style: italic;
}

.play-btn {
    color: #1db954;
    transition: transform 0.2s ease;
}

.play-btn:hover {
    transform: scale(1.1);
}
</style>
