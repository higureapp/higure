import { ObjectType, Field } from '@nestjs/graphql'

@ObjectType()
export class SearchDateFilterModel {
    @Field(() => String, { nullable: true })
    fromDate: string | null

    @Field(() => String, { nullable: true })
    toDate: string | null

    @Field(() => String, { nullable: true })
    relativeDescription: string | null
}

@ObjectType()
export class SearchConceptModel {
    @Field(() => String)
    concept: string

    @Field(() => [String])
    synonyms: string[]
}

@ObjectType()
export class SearchQueryAnalysisModel {
    @Field(() => String)
    originalQuery: string

    @Field(() => String)
    language: string

    @Field(() => SearchDateFilterModel)
    dateFilter: SearchDateFilterModel

    @Field(() => [SearchConceptModel])
    concepts: SearchConceptModel[]

    @Field(() => Boolean)
    requiresSemanticSearch: boolean

    @Field(() => [String])
    explicitKeywords: string[]
}

@ObjectType()
export class SearchHighlightModel {
    @Field(() => String)
    matchedText: string

    @Field(() => Number)
    startIndex: number

    @Field(() => Number)
    endIndex: number

    @Field(() => String)
    matchingConcept: string
}

@ObjectType()
export class SearchResultModel {
    @Field(() => String)
    journalPageId: string

    @Field(() => String)
    date: string

    @Field(() => Number)
    relevanceScore: number

    @Field(() => [SearchHighlightModel])
    highlights: SearchHighlightModel[]

    @Field(() => String)
    summary: string

    @Field(() => String, { nullable: true })
    location: string | null

    @Field(() => Number, { nullable: true })
    mood: number | null

    @Field(() => String, { nullable: true })
    contentPreview?: string | null
}

@ObjectType()
export class SearchResponseModel {
    @Field(() => SearchQueryAnalysisModel)
    queryAnalysis: SearchQueryAnalysisModel

    @Field(() => [SearchResultModel])
    results: SearchResultModel[]

    @Field(() => Number)
    totalMatches: number

    @Field(() => Number, { nullable: true })
    searchDurationMs?: number | null
}

@ObjectType()
export class SearchHistoryItemModel {
    @Field(() => String)
    id: string

    @Field(() => String)
    query: string

    @Field(() => Date)
    executedAt: Date

    @Field(() => Number)
    resultCount: number
}
