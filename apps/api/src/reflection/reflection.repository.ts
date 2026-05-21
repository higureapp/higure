import { Injectable } from '@nestjs/common'
import { PrismaService } from '../database/prisma.service'
import { JournalReflection, ReflectionType } from '../generated/prisma/client'

@Injectable()
export class ReflectionRepository {
    constructor(private readonly prisma: PrismaService) {}

    async createReflection(
        journalPageId: string,
        type: ReflectionType,
        content: string,
        keyInsights: string[],
        suggestedQuestion: string,
    ): Promise<JournalReflection> {
        return this.prisma.journalReflection.upsert({
            where: {
                journalPageId_type: {
                    journalPageId,
                    type,
                },
            },
            create: {
                journalPageId,
                type,
                content,
                keyInsights,
                suggestedQuestion,
                generatedAt: new Date(),
            },
            update: {
                content,
                keyInsights,
                suggestedQuestion,
                generatedAt: new Date(),
            },
        })
    }

    async getReflectionByJournalPageAndType(
        journalPageId: string,
        type: ReflectionType,
    ): Promise<JournalReflection | null> {
        return this.prisma.journalReflection.findUnique({
            where: {
                journalPageId_type: {
                    journalPageId,
                    type,
                },
            },
        })
    }

    async getAllReflectionsByJournalPage(
        journalPageId: string,
    ): Promise<JournalReflection[]> {
        return this.prisma.journalReflection.findMany({
            where: { journalPageId },
            orderBy: { generatedAt: 'desc' },
        })
    }

    async deleteReflection(id: string): Promise<JournalReflection | null> {
        const reflection = await this.prisma.journalReflection.findUnique({
            where: { id },
        })
        if (!reflection) return null

        return this.prisma.journalReflection.delete({
            where: { id },
        })
    }
}
