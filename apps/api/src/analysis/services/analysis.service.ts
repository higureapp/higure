import { Injectable } from '@nestjs/common'
import { AnalysisModel } from '../models/analysis.model'
import { AnalysisRepository } from '../analysis.repository'
import { AiAnalysis } from '@higure/ai'
import { JournalsService } from '@/journals/services/journals.service'
import { Journal } from '@/journals/models/journal.model'
import { AnalysisMapper } from '../mappers/analysis.mapper'

@Injectable()
export class AnalysisService {
    constructor(
        private readonly journalService: JournalsService,
        private readonly analysisRepository: AnalysisRepository,
    ) {}

    async createAnalysis(
        userId: string,
        journalPageId: string,
    ): Promise<AnalysisModel> {
        const existingAnalysis =
            await this.analysisRepository.getAnalysisByJournalPageId(
                journalPageId,
            )
        if (existingAnalysis) {
            return AnalysisMapper.toModel(existingAnalysis)
        }

        const journal = await this.journalService.getJournalPage(
            journalPageId,
            userId,
        )
        const analysis = await this.generateAnalysis(journal)

        const newAnalysis = await this.analysisRepository.createAnalysis(
            journalPageId,
            analysis.criticalAnalysis,
            analysis.suggestedSongs,
            analysis.metrics,
            analysis.quote,
            analysis.quoteAuthor,
        )

        return AnalysisMapper.toModel(newAnalysis)
    }

    async regenerateAnalysis(
        userId: string,
        analysisId: string,
    ): Promise<AnalysisModel> {
        const existingAnalysis =
            await this.analysisRepository.getAnalysisByJournalPageId(analysisId)
        if (!existingAnalysis) {
            throw new Error('Analysis not found')
        }

        const journal = await this.journalService.getJournalPage(
            existingAnalysis.journalPageId,
            userId,
        )

        const newAnalysisData = await this.generateAnalysis(journal)

        const updatedAnalysis = await this.analysisRepository.updateAnalysis(
            existingAnalysis.id,
            {
                criticalAnalysis: newAnalysisData.criticalAnalysis,
                suggestedSongs: newAnalysisData.suggestedSongs,
                quote: newAnalysisData.quote,
                quoteAuthor: newAnalysisData.quoteAuthor,
                generatedAt: new Date(),
            },
            newAnalysisData.metrics,
        )

        return AnalysisMapper.toModel(updatedAnalysis)
    }

    private async generateAnalysis(journal: Journal) {
        const analysis = await AiAnalysis.generateAnalysis({
            content: journal.content,
            date: journal.date,
            location: journal.location ?? undefined,
            mood: journal.mood,
        })

        // Enrich songs with real covers if missing
        if (analysis.suggestedSongs) {
            for (const song of analysis.suggestedSongs) {
                if (!song.coverUrl) {
                    try {
                        const query = encodeURIComponent(
                            `${song.title} ${song.artist}`,
                        )
                        const response = await fetch(
                            `https://itunes.apple.com/search?term=${query}&entity=song&limit=1`,
                        )
                        const data: any = await response.json()
                        if (data.results && data.results.length > 0) {
                            song.coverUrl =
                                data.results[0].artworkUrl100.replace(
                                    '100x100bb',
                                    '600x600bb',
                                )
                        }
                    } catch (e) {
                        console.error(
                            'Failed to fetch cover for',
                            song.title,
                            e,
                        )
                    }
                }
            }
        }

        return analysis
    }

    async getAnalysisByJournalPageId(
        journalPageId: string,
    ): Promise<AnalysisModel | null> {
        const analysis =
            await this.analysisRepository.getAnalysisByJournalPageId(
                journalPageId,
            )
        return analysis ? AnalysisMapper.toModel(analysis) : null
    }

    async deleteAnalysis(id: string): Promise<AnalysisModel | null> {
        const analysis = await this.analysisRepository.deleteAnalysis(id)
        return analysis ? AnalysisMapper.toModel(analysis) : null
    }
}
