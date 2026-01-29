import { Injectable } from '@nestjs/common'
import { JournalPageWithRelations } from '../interfaces/journal-page-with-relationships.interface'
import { JournalAIAnalysis } from '../models/journal-ai-analysis.model'
import { JournalMetrics } from '../models/journal-metrics.model'
import { JournalTag } from '../models/journal-tag.model'
import { Journal } from '../models/journal.model'

@Injectable()
export class JournalPageMapper {
    toEntity(prismaPage: JournalPageWithRelations): Journal {
        return {
            id: prismaPage.id,
            date: prismaPage.date,
            time: prismaPage.time,
            location: prismaPage.location,
            content: prismaPage.content,
            mood: prismaPage.mood,
            isActive: prismaPage.isActive,
            lastModified: prismaPage.lastModified,
            createdAt: prismaPage.createdAt,
            updatedAt: prismaPage.updatedAt,
            tags: this.mapTags(prismaPage.tags),
            metrics: prismaPage.metrics
                ? this.mapMetrics(prismaPage.metrics)
                : null,
            aiAnalysis: prismaPage.aiAnalysis
                ? this.mapAIAnalysis(prismaPage.aiAnalysis)
                : null,
        }
    }

    toEntities(prismaPages: JournalPageWithRelations[]): Journal[] {
        return prismaPages.map((page) => this.toEntity(page))
    }

    private mapTags(
        prismaTags: Array<{ id: string; name: string; color: string | null }>,
    ): JournalTag[] {
        return prismaTags.map((tag) => ({
            id: tag.id,
            name: tag.name,
            color: tag.color,
        }))
    }

    private mapMetrics(prismaMetrics: any): JournalMetrics {
        return {
            wordCount: prismaMetrics.wordCount,
            sentenceCount: prismaMetrics.sentenceCount,
            averageSentenceLength: prismaMetrics.averageSentenceLength,
            paragraphCount: prismaMetrics.paragraphCount,
            textDensity: prismaMetrics.textDensity,
            estimatedWritingTime: prismaMetrics.estimatedWritingTime,
            temporalReferencesCount: prismaMetrics.temporalReferencesCount,
            temporalFocus: prismaMetrics.temporalFocus,
            emotionalValence: prismaMetrics.emotionalValence,
            emotionalIntensity: prismaMetrics.emotionalIntensity,
            emotionalVariability: prismaMetrics.emotionalVariability,
            emotionalWordsCount: prismaMetrics.emotionalWordsCount,
            introspectionIndex: prismaMetrics.introspectionIndex,
            questionsCount: prismaMetrics.questionsCount,
            causeEffectCount: prismaMetrics.causeEffectCount,
            eventsCount: prismaMetrics.eventsCount,
            charactersCount: prismaMetrics.charactersCount,
            firstPersonUsage: prismaMetrics.firstPersonUsage,
            narrativeSequentiality: prismaMetrics.narrativeSequentiality,
            lexicalRichness: prismaMetrics.lexicalRichness,
            keyRepetitionsCount: prismaMetrics.keyRepetitionsCount,
            metaphorsCount: prismaMetrics.metaphorsCount,
            formality: prismaMetrics.formality,
        }
    }

    private mapAIAnalysis(prismaAnalysis: any): JournalAIAnalysis {
        // Parse suggestedSongs from JSON
        const suggestedSongs = Array.isArray(prismaAnalysis.suggestedSongs)
            ? prismaAnalysis.suggestedSongs
            : JSON.parse(prismaAnalysis.suggestedSongs || '[]')

        return {
            criticalAnalysis: prismaAnalysis.criticalAnalysis,
            suggestedSongs: suggestedSongs.map((song: any) => ({
                title: song.title,
                artist: song.artist,
                reason: song.reason,
            })),
            quote: prismaAnalysis.quote,
            quoteAuthor: prismaAnalysis.quoteAuthor,
            generatedAt: prismaAnalysis.generatedAt,
            modelVersion: prismaAnalysis.modelVersion,
        }
    }
}
