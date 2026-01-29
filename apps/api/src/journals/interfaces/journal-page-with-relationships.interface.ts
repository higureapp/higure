export interface JournalPageWithRelations {
    id: string
    userId: string
    date: Date
    time: Date | null
    location: string | null
    content: string
    mood: number
    isActive: boolean
    lastModified: Date
    createdAt: Date
    updatedAt: Date
    tags: Array<{
        id: string
        name: string
        color: string | null
    }>
    metrics: {
        wordCount: number
        sentenceCount: number
        averageSentenceLength: number
        paragraphCount: number
        textDensity: number
        estimatedWritingTime: number
        temporalReferencesCount: number
        temporalFocus: number
        emotionalValence: number
        emotionalIntensity: number
        emotionalVariability: number
        emotionalWordsCount: number
        introspectionIndex: number
        questionsCount: number
        causeEffectCount: number
        eventsCount: number
        charactersCount: number
        firstPersonUsage: number
        narrativeSequentiality: number
        lexicalRichness: number
        keyRepetitionsCount: number
        metaphorsCount: number
        formality: number
    } | null
    aiAnalysis: {
        criticalAnalysis: string
        suggestedSongs: any
        quote: string | null
        quoteAuthor: string | null
        generatedAt: Date
        modelVersion: string
    } | null
}
