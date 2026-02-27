import { Injectable } from '@nestjs/common'
import { PrismaService } from '../database/prisma.service'
import { JournalAIAnalysis } from '../generated/prisma/client'
import { JournalAIAnalysisUpdateInput } from '../generated/prisma/models'

@Injectable()
export class AnalysisRepository {
    constructor(private readonly prisma: PrismaService) { }

    async createAnalysis(
        journalPageId: string,
        criticalAnalysis: string,
        suggestedSongs: any[],
        quote?: string,
        quoteAuthor?: string,
    ): Promise<JournalAIAnalysis> {
        return this.prisma.journalAIAnalysis.create({
            data: {
                journalPageId,
                criticalAnalysis,
                suggestedSongs,
                quote,
                quoteAuthor,
            },
        })
    }

    async getAnalysisByJournalPageId(
        journalPageId: string,
    ): Promise<JournalAIAnalysis | null> {
        return this.prisma.journalAIAnalysis.findUnique({
            where: { journalPageId },
        })
    }

    async updateAnalysis(
        id: string,
        data: JournalAIAnalysisUpdateInput,
    ): Promise<JournalAIAnalysis> {
        return this.prisma.journalAIAnalysis.update({
            where: { id },
            data,
        })
    }

    async deleteAnalysis(id: string): Promise<JournalAIAnalysis> {
        return this.prisma.journalAIAnalysis.delete({
            where: { id },
        })
    }
}
