import { Injectable } from '@nestjs/common'
import { PrismaService } from '../database/prisma.service'
import { SearchHistory } from '../generated/prisma/client'

@Injectable()
export class SearchRepository {
    constructor(private readonly prisma: PrismaService) {}

    async saveSearch(
        userId: string,
        query: string,
        results: any,
        resultCount: number,
    ): Promise<SearchHistory> {
        return this.prisma.searchHistory.create({
            data: {
                userId,
                query,
                results,
                resultCount,
            },
        })
    }

    async getSearchHistory(
        userId: string,
        limit: number = 20,
    ): Promise<SearchHistory[]> {
        return this.prisma.searchHistory.findMany({
            where: { userId },
            orderBy: { executedAt: 'desc' },
            take: limit,
        })
    }

    async deleteSearch(
        userId: string,
        id: string,
    ): Promise<SearchHistory | null> {
        const existing = await this.prisma.searchHistory.findUnique({
            where: { id },
        })

        if (!existing || existing.userId !== userId) {
            return null
        }

        return this.prisma.searchHistory.delete({
            where: { id },
        })
    }

    async clearSearchHistory(userId: string): Promise<number> {
        const result = await this.prisma.searchHistory.deleteMany({
            where: { userId },
        })
        return result.count
    }
}
