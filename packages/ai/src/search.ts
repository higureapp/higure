import { generateText, Output } from 'ai'
import { z } from 'zod'
import { google } from '@ai-sdk/google'

export const SearchDateFilterSchema = z.object({
    fromDate: z
        .string()
        .nullable()
        .describe('ISO date string for start of range, or null if not filtered')
        .default(null),
    toDate: z
        .string()
        .nullable()
        .describe('ISO date string for end of range, or null if not filtered')
        .default(null),
    relativeDescription: z
        .string()
        .nullable()
        .describe(
            'Human description like "last 6 months", "last year", or null',
        )
        .default(null),
})

export const SearchConceptSchema = z.object({
    concept: z
        .string()
        .describe('The main concept or theme being searched for')
        .default(''),
    synonyms: z
        .array(z.string())
        .describe('Related terms and synonyms to look for')
        .default([]),
})

export const SearchQueryAnalysisSchema = z.object({
    originalQuery: z.string().describe('The original user query'),
    language: z
        .string()
        .describe('Language code like "it", "en", "es", etc.')
        .default('en'),
    dateFilter: SearchDateFilterSchema.default(() => ({
        fromDate: null,
        toDate: null,
        relativeDescription: null,
    })),
    concepts: z
        .array(SearchConceptSchema)
        .max(5)
        .describe('Up to 5 key concepts to search for')
        .default([]),
    requiresSemanticSearch: z
        .boolean()
        .describe(
            'True if this query needs semantic understanding vs just keyword matching',
        )
        .default(false),
    explicitKeywords: z
        .array(z.string())
        .describe('Any explicit keywords mentioned')
        .default([]),
})

export const SearchHighlightSchema = z.object({
    matchedText: z.string().describe('The exact text snippet that matched'),
    startIndex: z
        .number()
        .int()
        .describe('Starting character index in the original content'),
    endIndex: z
        .number()
        .int()
        .describe('Ending character index in the original content'),
    matchingConcept: z.string().describe('Which concept this matched'),
})

export const SearchResultSchema = z.object({
    journalPageId: z.string(),
    date: z.string().describe('ISO date of the journal entry'),
    relevanceScore: z.number().min(0).max(1).describe('Relevance from 0-1'),
    highlights: z
        .array(SearchHighlightSchema)
        .describe('Matching text snippets')
        .default([]),
    summary: z
        .string()
        .describe('Brief summary of why this entry matched')
        .default(''),
    location: z.string().nullable().default(null),
    mood: z.number().nullable().default(null),
})

export const AiSearchResponseSchema = z.object({
    queryAnalysis: SearchQueryAnalysisSchema,
    results: z.array(SearchResultSchema).max(200),
    totalMatches: z.number().int(),
    searchDurationMs: z.number().int().optional(),
})

export type SearchDateFilter = z.infer<typeof SearchDateFilterSchema>
export type SearchConcept = z.infer<typeof SearchConceptSchema>
export type SearchQueryAnalysis = z.infer<typeof SearchQueryAnalysisSchema>
export type SearchHighlight = z.infer<typeof SearchHighlightSchema>
export type SearchResult = z.infer<typeof SearchResultSchema>
export type AiSearchResponse = z.infer<typeof AiSearchResponseSchema>

export interface SearchJournalEntry {
    id: string
    date: Date
    content: string
    location?: string | null
    mood?: number | null
}

export interface SearchInput {
    query: string
    referenceDate: Date
    journals: SearchJournalEntry[]
}

function formatJournalForPrompt(
    journal: SearchJournalEntry,
    index: number,
): string {
    return `
--- ENTRY #${index + 1} [ID: ${journal.id}] ---
Date: ${journal.date.toISOString().split('T')[0]}
Location: ${journal.location || 'Unknown'}
Mood (1-10): ${journal.mood || 'Not specified'}

Content:
${journal.content}

`.trim()
}

export class AiSearch {
    public static async search(input: SearchInput): Promise<AiSearchResponse> {
        const startTime = Date.now()

        const { output } = await generateText({
            model: google('gemini-2.5-flash-lite'),
            output: Output.object({
                schema: AiSearchResponseSchema,
            }),
            prompt: this.buildSearchPrompt(input),
        })

        const duration = Date.now() - startTime

        const truncatedResults = output.results.slice(0, 50)

        return {
            ...output,
            results: truncatedResults,
            totalMatches: Math.min(output.totalMatches, 50),
            searchDurationMs: duration,
        }
    }

    private static buildSearchPrompt(input: SearchInput): string {
        const journalsText = input.journals
            .slice(0, 200)
            .map((j, i) => formatJournalForPrompt(j, i))
            .join('\n\n')

        const sampleJournalsWarning =
            input.journals.length > 200
                ? `\n\nNOTE: Showing first 200 entries for analysis. Apply date filtering first to narrow results.\n`
                : ''

        return `
# AI SEMANTIC SEARCH ENGINE

## USER QUERY
"${input.query}"

## REFERENCE DATE (for relative date filters like "last year")
${input.referenceDate.toISOString()}

## IMPORTANT
- Respond in the SAME LANGUAGE as the user's query (detect from "${input.query}")
- Example: if query is in Italian, your analysis and summaries should be in Italian

## CONTEXT
The user wants to search their personal journal entries using natural language.
${sampleJournalsWarning}

## JOURNAL ENTRIES TO ANALYZE
${journalsText}

## YOUR TASK

1. **FIRST: Analyze the query**
   - Detect the language
   - Parse any date filters: "last year", "past 6 months", "in 2023", "last summer", etc.
   - Extract key concepts/themes the user is looking for
   - Identify if this needs semantic understanding (e.g., "viaggi" = travel, trips, journeys)

2. **THEN: Find matching entries**
   - Score each entry from 0-1 for relevance
   - Return ONLY entries with relevance > 0.3
   - Maximum 50 results

3. **FINALLY: Create highlights**
   - For each matched entry, identify the EXACT text snippets that caused it to match
   - Calculate character positions (startIndex, endIndex) for highlighting
   - Write a brief summary in the user's language explaining why it matched

## OUTPUT FORMAT
Return a JSON object matching the schema with:
- queryAnalysis: Your analysis of what the user is searching for
- results: Array of matching journal entries with relevance, highlights, summary
- totalMatches: Total number of matching entries

## IMPORTANT
- For startIndex/endIndex: Count characters from the ACTUAL content string provided for each entry
- Be generous but accurate with relevance scoring
- If NO entries match, return empty results array (don't make up matches)
- ALL text in "summary" field must be in the DETECTED LANGUAGE of the query
`.trim()
    }
}
