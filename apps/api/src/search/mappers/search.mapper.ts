import {
    SearchResponseModel,
    SearchResultModel,
    SearchQueryAnalysisModel,
    SearchDateFilterModel,
    SearchConceptModel,
    SearchHighlightModel,
    SearchHistoryItemModel,
} from '../models/search.model'
import { SearchHistory } from '../../generated/prisma/client'
import {
    AiSearchResponse,
    SearchResult,
    SearchQueryAnalysis,
    SearchDateFilter,
    SearchConcept,
    SearchHighlight,
    SearchJournalEntry,
} from '@higure/ai'

export class SearchMapper {
    static toSearchResponseModel(
        response: AiSearchResponse,
        journalsMap?: Map<string, SearchJournalEntry>,
    ): SearchResponseModel {
        const model = new SearchResponseModel()
        model.queryAnalysis = this.toQueryAnalysisModel(response.queryAnalysis)
        model.results = response.results.map((r) =>
            this.toResultModel(r, journalsMap?.get(r.journalPageId)),
        )
        model.totalMatches = response.totalMatches
        model.searchDurationMs = response.searchDurationMs ?? null
        return model
    }

    static toQueryAnalysisModel(
        analysis: SearchQueryAnalysis,
    ): SearchQueryAnalysisModel {
        const model = new SearchQueryAnalysisModel()
        model.originalQuery = analysis.originalQuery
        model.language = analysis.language
        model.dateFilter = this.toDateFilterModel(analysis.dateFilter)
        model.concepts = analysis.concepts.map((c) => this.toConceptModel(c))
        model.requiresSemanticSearch = analysis.requiresSemanticSearch
        model.explicitKeywords = analysis.explicitKeywords
        return model
    }

    static toDateFilterModel(filter: SearchDateFilter): SearchDateFilterModel {
        const model = new SearchDateFilterModel()
        model.fromDate = filter.fromDate
        model.toDate = filter.toDate
        model.relativeDescription = filter.relativeDescription
        return model
    }

    static toConceptModel(concept: SearchConcept): SearchConceptModel {
        const model = new SearchConceptModel()
        model.concept = concept.concept
        model.synonyms = concept.synonyms
        return model
    }

    static toResultModel(
        result: SearchResult,
        journal?: SearchJournalEntry,
    ): SearchResultModel {
        const model = new SearchResultModel()
        model.journalPageId = result.journalPageId
        model.date = result.date
        model.relevanceScore = result.relevanceScore
        model.highlights = result.highlights.map((h) =>
            this.toHighlightModel(h),
        )
        model.summary = result.summary
        model.location = result.location ?? null
        model.mood = result.mood ?? null

        if (journal) {
            model.contentPreview =
                journal.content.length > 200
                    ? journal.content.substring(0, 200) + '...'
                    : journal.content
        }

        return model
    }

    static toHighlightModel(highlight: SearchHighlight): SearchHighlightModel {
        const model = new SearchHighlightModel()
        model.matchedText = highlight.matchedText
        model.startIndex = highlight.startIndex
        model.endIndex = highlight.endIndex
        model.matchingConcept = highlight.matchingConcept
        return model
    }

    static toSearchHistoryItemModel(
        entity: SearchHistory,
    ): SearchHistoryItemModel {
        const model = new SearchHistoryItemModel()
        model.id = entity.id
        model.query = entity.query
        model.executedAt = entity.executedAt
        model.resultCount = entity.resultCount
        return model
    }

    static toSearchHistoryItemModelArray(
        entities: SearchHistory[],
    ): SearchHistoryItemModel[] {
        return entities.map((e) => this.toSearchHistoryItemModel(e))
    }

    static toEmptySearchResponseModel(query: string): SearchResponseModel {
        const model = new SearchResponseModel()

        const queryAnalysis = new SearchQueryAnalysisModel()
        queryAnalysis.originalQuery = query
        queryAnalysis.language = 'en'
        queryAnalysis.requiresSemanticSearch = false
        queryAnalysis.explicitKeywords = []
        queryAnalysis.concepts = []

        const dateFilter = new SearchDateFilterModel()
        dateFilter.fromDate = null
        dateFilter.toDate = null
        dateFilter.relativeDescription = null
        queryAnalysis.dateFilter = dateFilter

        model.queryAnalysis = queryAnalysis
        model.results = []
        model.totalMatches = 0
        model.searchDurationMs = 0

        return model
    }
}
