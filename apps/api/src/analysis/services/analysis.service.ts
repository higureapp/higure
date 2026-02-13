import { Injectable } from '@nestjs/common'
import { AnalysisModel } from '../models/analysis.model'
import { AnalysisRepository } from '../analysis.repository'
import { AiAnalysis } from '@higure/ai'
import { JournalsService } from '@/src/journals/services/journals.service'
import { Journal } from '@/src/journals/models/journal.model'
import { AnalysisMapper } from '../mappers/analysis.mapper'

@Injectable()
export class AnalisysService {
    constructor(
        private readonly journalService: JournalsService,
        private readonly analysisRepository: AnalysisRepository,
    ) {}

    async createAnalysis(
        userId: string,
        journalPageId: string,
    ): Promise<AnalysisModel> {
        const journal = await this.journalService.getJournalPage(
            journalPageId,
            userId,
        )
        const analysis = await this.generateAnalysis(journal)

        const newAnalysis = await this.analysisRepository.createAnalysis(
            journalPageId,
            analysis.criticalAnalysis,
            JSON.parse(analysis.suggestedSongs),
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
                suggestedSongs: JSON.parse(newAnalysisData.suggestedSongs),
                quote: newAnalysisData.quote,
                quoteAuthor: newAnalysisData.quoteAuthor,
                generatedAt: new Date(),
            },
        )

        return AnalysisMapper.toModel(updatedAnalysis)
    }

    private async generateAnalysis(journal: Journal) {
        const analysis = await AiAnalysis.generateAnalysis({
            content: journal.content,
            date: journal.date,
            location: journal.location,
        })

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

    async deleteAnalysis(id: string): Promise<AnalysisModel> {
        const analysis = await this.analysisRepository.deleteAnalysis(id)
        return analysis ? AnalysisMapper.toModel(analysis) : null
    }
}
