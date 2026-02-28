import { Injectable } from '@nestjs/common'
import { PrismaService } from '../database/prisma.service'
import { JournalAIAnalysis, JournalMetrics } from '../generated/prisma/client'
import { JournalAIAnalysisUpdateInput } from '../generated/prisma/models'

export type AnalysisWithMetrics = JournalAIAnalysis & {
    metrics?: JournalMetrics | null
}

@Injectable()
export class AnalysisRepository {
    constructor(private readonly prisma: PrismaService) { }

    async createAnalysis(
        journalPageId: string,
        criticalAnalysis: string,
        suggestedSongs: any[],
        metrics: any,
        quote?: string,
        quoteAuthor?: string,
    ): Promise<AnalysisWithMetrics> {
        return this.prisma.$transaction(async (tx) => {
            const analysis = await tx.journalAIAnalysis.create({
                data: {
                    journalPageId,
                    criticalAnalysis,
                    suggestedSongs,
                    quote,
                    quoteAuthor,
                },
            })

            const journalMetrics = await tx.journalMetrics.create({
                data: {
                    journalPageId,
                    ...metrics,
                },
            })

            return { ...analysis, metrics: journalMetrics }
        })
    }

    async getAnalysisByJournalPageId(
        journalPageId: string,
    ): Promise<AnalysisWithMetrics | null> {
        const analysis = await this.prisma.journalAIAnalysis.findUnique({
            where: { journalPageId },
        })

        if (!analysis) return null

        const metrics = await this.prisma.journalMetrics.findUnique({
            where: { journalPageId },
        })

        return { ...analysis, metrics }
    }

    async updateAnalysis(
        id: string,
        data: JournalAIAnalysisUpdateInput,
        metrics?: any,
    ): Promise<AnalysisWithMetrics> {
        return this.prisma.$transaction(async (tx) => {
            const analysis = await tx.journalAIAnalysis.update({
                where: { id },
                data,
            })

            let journalMetrics = null
            if (metrics) {
                journalMetrics = await tx.journalMetrics.upsert({
                    where: { journalPageId: analysis.journalPageId },
                    create: {
                        journalPageId: analysis.journalPageId,
                        ...metrics,
                    },
                    update: metrics,
                })
            } else {
                journalMetrics = await tx.journalMetrics.findUnique({
                    where: { journalPageId: analysis.journalPageId },
                })
            }

            return { ...analysis, metrics: journalMetrics }
        })
    }

    async deleteAnalysis(id: string): Promise<JournalAIAnalysis> {
        return this.prisma.journalAIAnalysis.delete({
            where: { id },
        })
    }
}

