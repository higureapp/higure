import { Injectable } from '@nestjs/common'
import { SearchResponseModel, SearchHistoryItemModel } from '../models/search.model'
import { SearchRepository } from '../search.repository'
import { SearchMapper } from '../mappers/search.mapper'
import { AiSearch, SearchJournalEntry } from '@higure/ai'
import { JournalsService } from '@/journals/services/journals.service'

@Injectable()
export class SearchService {
    constructor(
        private readonly journalService: JournalsService,
        private readonly searchRepository: SearchRepository,
    ) {}

    async search(
        userId: string,
        query: string,
        saveToHistory: boolean = true,
    ): Promise<SearchResponseModel> {
        const allJournals = await this.getAllJournalsForSearch(userId)

        if (allJournals.length === 0) {
            return SearchMapper.toEmptySearchResponseModel(query)
        }

        let response
        try {
            response = await AiSearch.search({
                query,
                referenceDate: new Date(),
                journals: allJournals,
            })
        } catch (e) {
            console.error('AI Search failed:', e)
            return SearchMapper.toEmptySearchResponseModel(query)
        }

        const journalsMap = new Map<string, SearchJournalEntry>()
        allJournals.forEach((j) => journalsMap.set(j.id, j))

        const model = SearchMapper.toSearchResponseModel(response, journalsMap)

        if (saveToHistory && response.results.length > 0) {
            try {
                await this.searchRepository.saveSearch(
                    userId,
                    query,
                    response,
                    response.results.length,
                )
            } catch (e) {
                console.error('Failed to save search history:', e)
            }
        }

        return model
    }

    async getSearchHistory(userId: string): Promise<SearchHistoryItemModel[]> {
        const history = await this.searchRepository.getSearchHistory(userId, 30)
        return SearchMapper.toSearchHistoryItemModelArray(history)
    }

    async deleteSearch(userId: string, id: string): Promise<SearchHistoryItemModel | null> {
        const deleted = await this.searchRepository.deleteSearch(userId, id)
        return deleted ? SearchMapper.toSearchHistoryItemModel(deleted) : null
    }

    async clearSearchHistory(userId: string): Promise<number> {
        return this.searchRepository.clearSearchHistory(userId)
    }

    private async getAllJournalsForSearch(
        userId: string,
    ): Promise<SearchJournalEntry[]> {
        try {
            const allPages = []
            let currentPage = 1
            let hasMore = true

            while (hasMore && currentPage <= 20) {
                const result = await this.journalService.getJournalPages(
                    userId,
                    {},
                    { page: currentPage, limit: 100 },
                )
                allPages.push(...(result.pages || []))
                hasMore = result.hasMore
                currentPage++
            }

            return allPages.map((page) => ({
                id: page.id,
                date: page.date,
                content: page.content,
                location: page.location,
                mood: page.mood,
            }))
        } catch (e) {
            console.error('Failed to fetch journals for search:', e)
            return []
        }
    }
}
