import { generateText, Output } from 'ai'
import { z } from 'zod'
import { google } from '@ai-sdk/google'

/**
 * Runtime schema validation to prevent LLM hallucinations from breaking the type safety.
 */
export const MusicSongSuggestionSchema = z.object({
    spotifyUrl: z.string(),
    title: z.string(),
    album: z.string(),
    author: z.string(),
    minutes: z.number().nonnegative(),
    coverUrl: z.string().nullable(),
})

export type MusicSongSuggestion = z.infer<typeof MusicSongSuggestionSchema>

export interface SuggestionOptions {
    quantity?: number
    temperature?: number
}

export class MusicCuratorService {
    private readonly context: string
    private readonly referenceDate: string

    constructor(context: string, referenceDate: Date = new Date()) {
        this.context = context.trim()
        this.referenceDate = referenceDate.toISOString()
    }

    /**
     * Composes the structured prompt with clear constraints.
     */
    private buildPrompt(quantity: number): string {
        return `
# ROLE
Expert Music Curator and Metadata Specialist.

# TASK
Analyze the input context and suggest exactly ${quantity} songs. 
Target context: "${this.context}"
Reference date: ${this.referenceDate}

# DATA INTEGRITY
- Minutes must be a numeric value (e.g., 3.5).
- If a cover URL is unavailable, use null.
`.trim()
    }

    /**
     * Orchestrates the suggestion process.
     */
    public async suggest(
        opts: SuggestionOptions = {},
    ): Promise<MusicSongSuggestion[]> {
        const quantity = opts.quantity ?? 1

        const { output } = await generateText({
            model: google('gemini-2.5-flash-lite'),
            output: Output.object({
                schema: z.object({
                    suggestions: z
                        .array(MusicSongSuggestionSchema)
                        .length(quantity),
                }),
            }),
            prompt: this.buildPrompt(quantity),
        })

        return output.suggestions
    }
}
