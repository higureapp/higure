import { Injectable, NotFoundException } from '@nestjs/common'
import { PrismaService } from '../database/prisma.service'
import { Prisma } from '../generated/prisma/client'
import { IJournalsRepository } from './interfaces/journals-repository.interface'
import { JournalPageFilters } from './filters/journal.filter'
import { JournalPageWithRelations } from './interfaces/journal-page-with-relationships.interface'
import { JournalPaginationInput } from './inputs/journal-pagination.input'
import { CreateJournalInput } from './inputs/create-journal.input'
import { UpdateJournalInput } from './inputs/update-journal.input'

@Injectable()
export class JournalsRepository implements IJournalsRepository {
    constructor(private readonly prisma: PrismaService) {}

    private readonly includeRelations = {
        tags: {
            select: {
                id: true,
                name: true,
                color: true,
            },
        },
        metrics: {
            select: {
                wordCount: true,
                sentenceCount: true,
                averageSentenceLength: true,
                paragraphCount: true,
                textDensity: true,
                estimatedWritingTime: true,
                temporalReferencesCount: true,
                temporalFocus: true,
                emotionalValence: true,
                emotionalIntensity: true,
                emotionalVariability: true,
                emotionalWordsCount: true,
                introspectionIndex: true,
                questionsCount: true,
                causeEffectCount: true,
                eventsCount: true,
                charactersCount: true,
                firstPersonUsage: true,
                narrativeSequentiality: true,
                lexicalRichness: true,
                keyRepetitionsCount: true,
                metaphorsCount: true,
                formality: true,
            },
        },
        aiAnalysis: {
            select: {
                criticalAnalysis: true,
                suggestedSongs: true,
                quote: true,
                quoteAuthor: true,
                generatedAt: true,
                modelVersion: true,
            },
        },
    }

    public async findUnique(where: Prisma.JournalPageWhereUniqueInput) {
        const journal = await this.prisma.journalPage.findUnique({
            where,
        })

        return journal
    }

    async create(
        userId: string,
        data: CreateJournalInput,
    ): Promise<JournalPageWithRelations> {
        const { tagIds, ...pageData } = data

        return this.prisma.journalPage.create({
            data: {
                ...pageData,
                userId,
                ...(tagIds && {
                    tags: {
                        connect: tagIds.map((id) => ({ id })),
                    },
                }),
            },
            include: this.includeRelations,
        })
    }

    async findById(
        id: string,
        userId: string,
    ): Promise<JournalPageWithRelations | null> {
        return this.prisma.journalPage.findFirst({
            where: {
                id,
                userId,
                isActive: true,
            },
            include: this.includeRelations,
        })
    }

    async update(
        id: string,
        userId: string,
        data: UpdateJournalInput,
    ): Promise<JournalPageWithRelations> {
        const { tagIds, ...pageData } = data

        const existing = await this.findById(id, userId)
        if (!existing) {
            throw new NotFoundException(`Journal page with ID ${id} not found`)
        }

        return this.prisma.journalPage.update({
            where: { id },
            data: {
                ...pageData,
                ...(tagIds !== undefined && {
                    tags: {
                        set: [], // remove all the tags
                        connect: tagIds.map((tagId) => ({ id: tagId })), // Connect all tags
                    },
                }),
            },
            include: this.includeRelations,
        })
    }

    async softDelete(
        id: string,
        userId: string,
    ): Promise<JournalPageWithRelations> {
        const existing = await this.findById(id, userId)
        if (!existing) {
            throw new NotFoundException(`Journal page with ID ${id} not found`)
        }

        return this.prisma.journalPage.update({
            where: { id },
            data: {
                isActive: false,
            },
            include: this.includeRelations,
        })
    }

    async delete(
        id: string,
        userId: string,
    ): Promise<JournalPageWithRelations> {
        const existing = await this.findById(id, userId)
        if (!existing) {
            throw new NotFoundException(`Journal page with ID ${id} not found`)
        }

        return this.prisma.journalPage.delete({
            where: { id },
            include: this.includeRelations,
        })
    }

    async findMany(
        userId: string,
        filters?: JournalPageFilters,
        pagination?: JournalPaginationInput,
    ): Promise<JournalPageWithRelations[]> {
        const { page = 1, limit = 10 } = pagination || {}
        const skip = (page - 1) * limit

        const where = this.buildWhereClause(userId, filters)

        return this.prisma.journalPage.findMany({
            where: {
                ...where,
                isActive: true,
            },
            skip,
            take: limit,
            orderBy: {
                date: 'desc',
            },
            include: this.includeRelations,
        })
    }

    async count(userId: string, filters?: JournalPageFilters): Promise<number> {
        const where = this.buildWhereClause(userId, filters)
        return this.prisma.journalPage.count({
            where: {
                ...where,
                isActive: true,
            },
        })
    }

    private buildWhereClause(
        userId: string,
        filters?: JournalPageFilters,
    ): Prisma.JournalPageWhereInput {
        const where: Prisma.JournalPageWhereInput = {
            userId,
        }

        if (!filters) return where

        // Date filters
        if (filters.dateFrom || filters.dateTo) {
            where.date = {
                ...(filters.dateFrom && { gte: filters.dateFrom }),
                ...(filters.dateTo && { lte: filters.dateTo }),
            }
        }

        // Mood filters
        if (filters.moodMin !== undefined || filters.moodMax !== undefined) {
            where.mood = {
                ...(filters.moodMin !== undefined && { gte: filters.moodMin }),
                ...(filters.moodMax !== undefined && { lte: filters.moodMax }),
            }
        }

        // Location filter
        if (filters.location) {
            where.location = {
                contains: filters.location,
                //mode: 'insensitive',
            }
        }

        // Tags filter
        if (filters.tags?.length) {
            where.tags = {
                some: {
                    name: {
                        in: filters.tags,
                    },
                },
            }
        }

        // Search term filter
        if (filters.searchTerm) {
            where.content = {
                contains: filters.searchTerm,
                //mode: 'insensitive',
            }
        }

        // Active filter
        if (filters.isActive !== undefined) {
            where.isActive = filters.isActive
        }

        return where
    }
}
