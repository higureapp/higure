import { generateObject } from 'ai'
import { z } from 'zod'
import { google } from '@ai-sdk/google'

/**
 * Schema for psychological and linguistic metrics of a journal page.
 * Matches the JournalMetrics model in Prisma.
 */
export const JournalMetricsSchema = z.object({
    wordCount: z.number().int().describe('Total number of words'),
    sentenceCount: z.number().int().describe('Total number of sentences'),
    averageSentenceLength: z
        .number()
        .describe('Average number of words per sentence'),
    paragraphCount: z.number().int().describe('Total number of paragraphs'),
    textDensity: z
        .number()
        .describe('Information density (unique words / total words)'),
    estimatedWritingTime: z
        .number()
        .int()
        .describe('Estimated time spent writing in minutes'),
    temporalReferencesCount: z
        .number()
        .int()
        .describe('Number of references to time (past, present, future)'),
    temporalFocus: z
        .number()
        .min(0)
        .max(10)
        .describe('Dominant temporal focus (0: past, 5: present, 10: future)'),
    emotionalValence: z
        .number()
        .min(-10)
        .max(10)
        .describe('Overall mood (-10: negative, 0: neutral, 10: positive)'),
    emotionalIntensity: z
        .number()
        .min(0)
        .max(10)
        .describe('Intensity of emotions expressed'),
    emotionalVariability: z
        .number()
        .min(0)
        .max(10)
        .describe('How much the mood changes throughout the text'),
    emotionalWordsCount: z
        .number()
        .int()
        .describe('Number of explicitly emotional words'),
    introspectionIndex: z
        .number()
        .min(0)
        .max(10)
        .describe('Degree of self-reflection and internal exploration'),
    questionsCount: z
        .number()
        .int()
        .describe('Number of rhetorical or real questions asked'),
    causeEffectCount: z
        .number()
        .int()
        .describe(
            'Number of logical/causal connections (because, therefore, etc.)',
        ),
    eventsCount: z
        .number()
        .int()
        .describe('Number of distinct events described'),
    charactersCount: z
        .number()
        .int()
        .describe('Number of people/characters mentioned'),
    firstPersonUsage: z
        .number()
        .describe('Percentage of first-person pronouns used'),
    narrativeSequentiality: z
        .number()
        .min(0)
        .max(10)
        .describe('How linear and chronological the narrative is'),
    lexicalRichness: z
        .number()
        .min(0)
        .max(1)
        .describe('Vocabulary diversity (TTR)'),
    keyRepetitionsCount: z
        .number()
        .int()
        .describe('Number of significant word repetitions'),
    metaphorsCount: z.number().int().describe('Estimated count of metaphors'),
    formality: z
        .number()
        .min(0)
        .max(10)
        .describe('How formal the writing style is'),
})

export const AnalysisSongSuggestionSchema = z.object({
    title: z.string(),
    artist: z.string(),
    reason: z
        .string()
        .describe('Why this song was suggested based on the entry'),
    spotifyUrl: z.string().optional(),
    coverUrl: z
        .string()
        .optional()
        .describe('URL to the song cover image if available'),
})

export const AiAnalysisResultSchema = z.object({
    criticalAnalysis: z
        .string()
        .describe(
            'A deep, psychological and philosophical analysis of the journal entry',
        ),
    suggestedSongs: z.array(AnalysisSongSuggestionSchema).length(3),
    quote: z.string().nullable().describe('An inspiring or relevant quote'),
    quoteAuthor: z.string().nullable().describe('The author of the quote'),
    metrics: JournalMetricsSchema,
})

export type AiAnalysisResult = z.infer<typeof AiAnalysisResultSchema>

export interface AnalysisInput {
    content: string
    date: Date
    location?: string
    mood?: number
}

export class AiAnalysis {
    public static async generateAnalysis(
        input: AnalysisInput,
    ): Promise<AiAnalysisResult> {
        const { object } = await generateObject({
            model: google('gemini-2.5-flash-lite'),
            schema: AiAnalysisResultSchema,
            prompt: `
            Analyze the following journal entry and provide a comprehensive psychological, stylistic, and emotional analysis.
            
            # JOURNAL ENTRY
            Date: ${input.date.toISOString()}
            Location: ${input.location || 'Unknown'}
            User Mood (1-10): ${input.mood || 'Not specified'}
            Content: "${input.content}"
            
            # INSTRUCTIONS
            1. Provide a 'criticalAnalysis': A 2-3 paragraph deep dive into the underlying themes, emotional state, and subconscious patterns visible in the text. Be empathetic but analytical.
            2. Suggest 3 songs that match the emotional "vibe" or themes of the entry. Include a reason for each.
            3. Provide a relevant 'quote' and its 'quoteAuthor' that resonates with the entry.
            4. Calculate all psychological and linguistic 'metrics' defined in the schema.
            5. Use the same language of the journal entry.
            
            Ensure the analysis is insightful and feels like it was written by a professional psychologist with a poetic touch.
            `.trim(),
        })

        return object
    }
}
