import { MusicCuratorService } from './music-curator.js'

export interface AnalysisType {
    criticalAnalysis: string
    suggestedSongs: string
    quote: string | null
    quoteAuthor: string | null
    generatedAt: Date
    modelVersion: string
}

export interface AnalysisInput {
    content: string
    date: Date
    location: string
}

export class AiAnalysis {
    public static async generateAnalysis(
        input: AnalysisInput,
    ): Promise<AnalysisType> {
        const songSuggester = new MusicCuratorService(input.content, input.date)

        return {
            criticalAnalysis: '',
            suggestedSongs: JSON.stringify(
                await songSuggester.suggest({
                    quantity: 2,
                }),
            ),
            quote: '',
            quoteAuthor: '',
            generatedAt: new Date(Date.now()),
            modelVersion: 'gemini-2.5-flash-lite',
        }
    }
}
