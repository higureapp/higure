import { generateText } from 'ai'
import { z } from 'zod'
import { google } from '@ai-sdk/google'

/**
 * Runtime schema validation to prevent LLM hallucinations from breaking the type safety.
 */
export const SongSuggestionSchema = z.object({
    spotifyUrl: z.string(),
    title: z.string(),
    album: z.string(),
    author: z.string(),
    minutes: z.number().nonnegative(),
    coverUrl: z.string().nullable(),
})

export type SongSuggestion = z.infer<typeof SongSuggestionSchema>

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

# OUTPUT GUARANTEES
- Format: Valid JSON array only.
- No markdown formatting (no \`\`\`json).
- Fields: spotifyUrl (string), title (string), album (string), author (string), minutes (float), coverUrl (string or null).

# DATA INTEGRITY
- Minutes must be a numeric value (e.g., 3.5).
- If a cover URL is unavailable, use null.
`.trim()
    }

    /**
     * Sanitizes and parses the raw string response from the AI.
     */
    private parseResponse(raw: string): SongSuggestion[] {
        try {
            const sanitized = raw.replace(/```json|```/g, '').trim()
            const data = JSON.parse(sanitized)
            return z.array(SongSuggestionSchema).parse(data)
        } catch (error) {
            throw new Error(
                `AI response failed validation: ${error instanceof Error ? error.message : 'Invalid JSON'}`,
            )
        }
    }

    /**
     * Orchestrates the suggestion process.
     */
    public async suggest(
        opts: SuggestionOptions = {},
    ): Promise<SongSuggestion[]> {
        const quantity = opts.quantity ?? 1

        const response = await generateText({
            model: google('gemini-2.5-flash-lite'),
            prompt: this.buildPrompt(quantity),
        })

        return this.parseResponse(response.text)
    }
}
