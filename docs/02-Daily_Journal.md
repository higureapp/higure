# Daily Journal Pages

Daily journal pages allow users to document their thoughts, experiences, and reflections on a daily basis. The application provides AI-powered analysis to generate insights, mood tracking, and structural metrics.

## Core Fields

Each journal page contains:

- **Date**: The date of the journal entry
- **Time**: Optional timestamp of when the entry was created
- **Location**: Optional location where the entry was written
- **Last Modified**: Timestamp of the last edit
- **Soft Delete**: `isActive` flag for soft deletion
- **Tags/Categories**: Multiple tags for organization
- **Mood**: Emotional state on a scale of 1-10

## AI-Generated Analysis

The AI analyzes each journal entry to provide:

- **Critical Analysis**: AI-generated reflection on the text (regenerable)
- **Suggested Songs**: Music recommendations based on content and mood
- **Quote/Citation**: Famous quote or poetic phrase related to the themes

## Analytical Metrics

### 1. Structural Parameters

Measure the "shape" of the text:

- **Word Count**: Total number of words
- **Sentence Count**: Total number of sentences
- **Average Sentence Length**: Words per sentence
- **Paragraph Count**: Number of paragraphs
- **Text Density**: Words per paragraph (indicates flow continuity)

### 2. Temporal Parameters

Related to time and reflection:

- **Estimated Writing Time** (minutes): Based on word count / 20-30 wpm
- **Temporal References Count**: Mentions of "today", "yesterday", dates, times
- **Temporal Focus** (0-10 scale):
    - 0 = distant past
    - 10 = immediate present

### 3. Emotional Parameters

Quantify emotional state:

- **Emotional Valence** (-10 to +10): Negative ↔ Positive
- **Emotional Intensity** (0-10): How emotionally charged
- **Emotional Variability** (0-10): Stability vs oscillations
- **Emotional Words Count**: Words like "happy", "anxious", "fear", "anger"

### 4. Cognitive/Reflective Parameters

How "thoughtful" the text is:

- **Introspection Index** (0-10): Based on "I think", "I believe", "I wonder"
- **Questions Count**: Number of questions present
- **Cause/Effect Statements Count**: "because", "therefore", "consequently"

### 5. Narrative Parameters

Events vs mental states:

- **Events Narrated Count**: Distinct events described
- **Characters Mentioned Count**: People referenced
- **First Person Usage** (%): Percentage of first-person pronouns
- **Narrative Sequentiality** (0-10): Chaotic ↔ Linear

### 6. Stylistic Parameters

Writing style:

- **Lexical Richness**: Unique words / Total words
- **Key Repetitions Count**: Frequently repeated words
- **Metaphors/Figures Count**: Estimated figurative language
- **Formality** (0-10): Informal ↔ Formal

---

## Database Schema

### JournalPage Model

```typescript
model JournalPage {
  id          String   @id @default(uuid())
  userId      String

  // Core fields
  date        DateTime
  time        DateTime?
  location    String?
  content     String   @db.Text

  // Metadata
  mood        Int      @default(5) // 1-10 scale
  isActive    Boolean  @default(true)
  lastModified DateTime @updatedAt

  // Relations
  user        User     @relation(fields: [userId], references: [id], onDelete: Cascade)
  tags        JournalTag[]
  aiAnalysis  JournalAIAnalysis?
  metrics     JournalMetrics?

  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt

  @@index([userId, date])
  @@index([userId, isActive])
}

model JournalTag {
  id            String   @id @default(uuid())
  name          String
  color         String?
  userId        String

  user          User     @relation(fields: [userId], references: [id], onDelete: Cascade)
  journalPages  JournalPage[]

  createdAt     DateTime @default(now())

  @@unique([userId, name])
  @@index([userId])
}

model JournalAIAnalysis {
  id              String   @id @default(uuid())
  journalPageId   String   @unique

  // AI-generated content
  criticalAnalysis String  @db.Text
  suggestedSongs   Json    // Array of {title, artist, reason}
  quote           String?
  quoteAuthor     String?

  // Generation metadata
  generatedAt     DateTime @default(now())
  modelVersion    String   @default("claude-sonnet-4-5")

  journalPage     JournalPage @relation(fields: [journalPageId], references: [id], onDelete: Cascade)

  @@index([journalPageId])
}

model JournalMetrics {
  id              String   @id @default(uuid())
  journalPageId   String   @unique

  // 1. Structural Parameters
  wordCount           Int
  sentenceCount       Int
  averageSentenceLength Float
  paragraphCount      Int
  textDensity         Float

  // 2. Temporal Parameters
  estimatedWritingTime Int    // minutes
  temporalReferencesCount Int
  temporalFocus       Float   // 0-10

  // 3. Emotional Parameters
  emotionalValence    Float   // -10 to +10
  emotionalIntensity  Float   // 0-10
  emotionalVariability Float  // 0-10
  emotionalWordsCount Int

  // 4. Cognitive/Reflective Parameters
  introspectionIndex  Float   // 0-10
  questionsCount      Int
  causeEffectCount    Int

  // 5. Narrative Parameters
  eventsCount         Int
  charactersCount     Int
  firstPersonUsage    Float   // percentage
  narrativeSequentiality Float // 0-10

  // 6. Stylistic Parameters
  lexicalRichness     Float   // 0-1
  keyRepetitionsCount Int
  metaphorsCount      Int
  formality           Float   // 0-10

  // Metadata
  calculatedAt        DateTime @default(now())

  journalPage         JournalPage @relation(fields: [journalPageId], references: [id], onDelete: Cascade)

  @@index([journalPageId])
}
```

---

## API Endpoints

### Create Journal Page

**Mutation:**

```graphql
mutation CreateJournalPage($input: CreateJournalPageInput!) {
    createJournalPage(input: $input) {
        id
        date
        mood
        content
        tags {
            id
            name
            color
        }
    }
}
```

**Input:**

```typescript
input CreateJournalPageInput {
  date: DateTime!
  time: DateTime
  location: String
  content: String!
  mood: Int! // 1-10
  tagIds: [String!]
}
```

### Update Journal Page

**Mutation:**

```graphql
mutation UpdateJournalPage($id: String!, $input: UpdateJournalPageInput!) {
    updateJournalPage(id: $id, input: $input) {
        id
        lastModified
        content
    }
}
```

### Generate AI Analysis

**Mutation:**

```graphql
mutation GenerateAIAnalysis($journalPageId: String!) {
    generateAIAnalysis(journalPageId: $journalPageId) {
        id
        criticalAnalysis
        suggestedSongs {
            title
            artist
            reason
        }
        quote
        quoteAuthor
        generatedAt
    }
}
```

### Regenerate AI Analysis

```graphql
mutation RegenerateAIAnalysis($journalPageId: String!) {
    regenerateAIAnalysis(journalPageId: $journalPageId) {
        id
        criticalAnalysis
        generatedAt
    }
}
```

### Get Journal Pages

**Query:**

```graphql
query GetJournalPages(
    $filters: JournalPageFilters
    $pagination: PaginationInput
) {
    journalPages(filters: $filters, pagination: $pagination) {
        pages {
            id
            date
            mood
            location
            tags {
                name
                color
            }
            metrics {
                wordCount
                emotionalValence
            }
        }
        totalCount
        hasMore
    }
}
```

**Filters:**

```typescript
input JournalPageFilters {
  startDate: DateTime
  endDate: DateTime
  tagIds: [String!]
  moodRange: MoodRangeInput
  isActive: Boolean = true
}

input MoodRangeInput {
  min: Int
  max: Int
}
```

### Get Journal Statistics

**Query:**

```graphql
query GetJournalStats($period: StatsPeriod!) {
    journalStats(period: $period) {
        totalEntries
        averageMood
        averageWordCount
        mostUsedTags {
            name
            count
        }
        moodTrend {
            date
            mood
        }
        emotionalValenceTrend {
            date
            valence
        }
    }
}
```

---

## Business Logic

### AI Analysis Generation

```typescript
class JournalAIService {
    async generateAnalysis(journalPageId: string): Promise<JournalAIAnalysis> {
        const page = await this.journalRepository.findOne(journalPageId)

        const prompt = `
      Analyze this journal entry and provide:
      1. A critical, empathetic analysis (150-200 words)
      2. Three song suggestions that match the mood and themes
      3. A relevant famous quote or poetic phrase
      
      Journal content:
      ${page.content}
      
      Mood: ${page.mood}/10
      Date: ${page.date}
      Location: ${page.location || 'Not specified'}
    `

        const response = await this.anthropicAPI.messages.create({
            model: 'claude-sonnet-4-5',
            messages: [{ role: 'user', content: prompt }],
            response_format: {
                type: 'json_schema',
                schema: AIAnalysisSchema,
            },
        })

        const analysis = JSON.parse(response.content)

        return await this.analysisRepository.create({
            journalPageId,
            criticalAnalysis: analysis.criticalAnalysis,
            suggestedSongs: analysis.songs,
            quote: analysis.quote.text,
            quoteAuthor: analysis.quote.author,
            modelVersion: 'claude-sonnet-4-5',
        })
    }

    async regenerateAnalysis(
        journalPageId: string,
    ): Promise<JournalAIAnalysis> {
        await this.analysisRepository.delete({ journalPageId })
        return this.generateAnalysis(journalPageId)
    }
}
```

### Metrics Calculation

```typescript
class JournalMetricsService {
    async calculateMetrics(journalPageId: string): Promise<JournalMetrics> {
        const page = await this.journalRepository.findOne(journalPageId)
        const text = page.content

        return {
            journalPageId,

            // Structural
            wordCount: this.countWords(text),
            sentenceCount: this.countSentences(text),
            averageSentenceLength: this.averageSentenceLength(text),
            paragraphCount: this.countParagraphs(text),
            textDensity: this.calculateTextDensity(text),

            // Temporal
            estimatedWritingTime: this.estimateWritingTime(text),
            temporalReferencesCount: this.countTemporalReferences(text),
            temporalFocus: await this.calculateTemporalFocus(text),

            // Emotional
            emotionalValence: await this.analyzeEmotionalValence(text),
            emotionalIntensity: await this.analyzeEmotionalIntensity(text),
            emotionalVariability: await this.analyzeEmotionalVariability(text),
            emotionalWordsCount: this.countEmotionalWords(text),

            // Cognitive
            introspectionIndex: this.calculateIntrospection(text),
            questionsCount: this.countQuestions(text),
            causeEffectCount: this.countCauseEffect(text),

            // Narrative
            eventsCount: await this.countEvents(text),
            charactersCount: this.countCharacters(text),
            firstPersonUsage: this.calculateFirstPersonUsage(text),
            narrativeSequentiality: await this.analyzeSequentiality(text),

            // Stylistic
            lexicalRichness: this.calculateLexicalRichness(text),
            keyRepetitionsCount: this.countKeyRepetitions(text),
            metaphorsCount: await this.estimateMetaphors(text),
            formality: await this.analyzeFformality(text),
        }
    }

    private countWords(text: string): number {
        return text.trim().split(/\s+/).length
    }

    private countSentences(text: string): number {
        return text.split(/[.!?]+/).filter((s) => s.trim()).length
    }

    private countParagraphs(text: string): number {
        return text.split(/\n\n+/).filter((p) => p.trim()).length
    }

    private calculateTextDensity(text: string): number {
        const words = this.countWords(text)
        const paragraphs = this.countParagraphs(text)
        return paragraphs > 0 ? words / paragraphs : 0
    }

    private estimateWritingTime(text: string): number {
        const words = this.countWords(text)
        const wpm = 25 // Average writing speed
        return Math.round(words / wpm)
    }

    private countTemporalReferences(text: string): number {
        const temporalWords =
            /\b(oggi|ieri|domani|ora|adesso|prima|dopo|quando|mentre|lunedì|martedì|gennaio|febbraio|\d{1,2}:\d{2}|\d{1,2}\/\d{1,2})\b/gi
        return (text.match(temporalWords) || []).length
    }

    private calculateLexicalRichness(text: string): number {
        const words = text.toLowerCase().split(/\s+/)
        const uniqueWords = new Set(words)
        return words.length > 0 ? uniqueWords.size / words.length : 0
    }

    private countQuestions(text: string): number {
        return (text.match(/\?/g) || []).length
    }

    private calculateIntrospection(text: string): number {
        const introspectivePatterns =
            /\b(penso|credo|mi chiedo|rifletto|sento|immagino|suppongo)\b/gi
        const matches = (text.match(introspectivePatterns) || []).length
        const words = this.countWords(text)
        const ratio = words > 0 ? (matches / words) * 100 : 0
        return Math.min(ratio * 2, 10) // Scale to 0-10
    }

    private async analyzeEmotionalValence(text: string): Promise<number> {
        // Use AI for nuanced analysis
        const prompt = `Rate the emotional valence of this text on a scale from -10 (very negative) to +10 (very positive). Return only the number.

Text: ${text}`

        const response = await this.anthropicAPI.messages.create({
            model: 'claude-haiku-4-5',
            messages: [{ role: 'user', content: prompt }],
            max_tokens: 10,
        })

        return parseFloat(response.content[0].text)
    }

    // Similar AI-assisted methods for other complex metrics...
}
```

### Automatic Analysis Trigger

```typescript
class JournalPageService {
    async createJournalPage(
        input: CreateJournalPageInput,
        userId: string,
    ): Promise<JournalPage> {
        const page = await this.repository.create({
            ...input,
            userId,
        })

        // Trigger async analysis
        this.queueAnalysis(page.id)

        return page
    }

    async updateJournalPage(
        id: string,
        input: UpdateJournalPageInput,
    ): Promise<JournalPage> {
        const page = await this.repository.update(id, input)

        // Regenerate analysis if content changed
        if (input.content) {
            this.queueAnalysis(page.id)
        }

        return page
    }

    private async queueAnalysis(journalPageId: string): Promise<void> {
        // Use job queue for async processing
        await this.jobQueue.add('analyze-journal', {
            journalPageId,
            tasks: ['ai-analysis', 'metrics'],
        })
    }
}
```

---

## Frontend Components

### Journal Page Editor

```typescript
interface JournalEditorProps {
  initialData?: JournalPage;
  onSave: (data: CreateJournalPageInput) => void;
}

function JournalEditor({ initialData, onSave }: JournalEditorProps) {
  const [content, setContent] = useState(initialData?.content || '');
  const [mood, setMood] = useState(initialData?.mood || 5);
  const [location, setLocation] = useState(initialData?.location || '');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  return (
    <div className="journal-editor">
      <div className="metadata">
        <DateTimePicker defaultValue={new Date()} />
        <LocationInput value={location} onChange={setLocation} />
        <MoodSlider value={mood} onChange={setMood} min={1} max={10} />
        <TagSelector selected={selectedTags} onChange={setSelectedTags} />
      </div>

      <RichTextEditor
        value={content}
        onChange={setContent}
        placeholder="What's on your mind today?"
        minHeight="300px"
      />

      <div className="actions">
        <WordCount count={content.split(/\s+/).length} />
        <Button onClick={() => onSave({ content, mood, location, tagIds: selectedTags })}>
          Save Entry
        </Button>
      </div>
    </div>
  );
}
```

### AI Analysis Display

```typescript
interface AIAnalysisProps {
  analysis: JournalAIAnalysis;
  onRegenerate: () => void;
}

function AIAnalysisDisplay({ analysis, onRegenerate }: AIAnalysisProps) {
  return (
    <Card className="ai-analysis">
      <CardHeader>
        <h3>AI Analysis</h3>
        <Button variant="ghost" onClick={onRegenerate}>
          Regenerate
        </Button>
      </CardHeader>

      <CardBody>
        <section className="critical-analysis">
          <h4>Reflection</h4>
          <p>{analysis.criticalAnalysis}</p>
        </section>

        <section className="suggested-songs">
          <h4>Suggested Songs</h4>
          {analysis.suggestedSongs.map((song, i) => (
            <SongCard key={i} {...song} />
          ))}
        </section>

        {analysis.quote && (
          <section className="quote">
            <blockquote>
              {analysis.quote}
              <cite>— {analysis.quoteAuthor}</cite>
            </blockquote>
          </section>
        )}
      </CardBody>

      <CardFooter>
        <small>Generated {formatDistanceToNow(analysis.generatedAt)} ago</small>
      </CardFooter>
    </Card>
  );
}
```

### Metrics Dashboard

```typescript
function MetricsDashboard({ metrics }: { metrics: JournalMetrics }) {
  return (
    <div className="metrics-grid">
      <MetricCard
        title="Structure"
        items={[
          { label: 'Words', value: metrics.wordCount },
          { label: 'Sentences', value: metrics.sentenceCount },
          { label: 'Paragraphs', value: metrics.paragraphCount }
        ]}
      />

      <MetricCard
        title="Emotional State"
        items={[
          { label: 'Valence', value: metrics.emotionalValence, range: [-10, 10] },
          { label: 'Intensity', value: metrics.emotionalIntensity, range: [0, 10] }
        ]}
      />

      <MetricCard
        title="Writing Style"
        items={[
          { label: 'Lexical Richness', value: `${(metrics.lexicalRichness * 100).toFixed(1)}%` },
          { label: 'Formality', value: metrics.formality, range: [0, 10] }
        ]}
      />

      <RadarChart
        data={{
          introspection: metrics.introspectionIndex,
          emotionalIntensity: metrics.emotionalIntensity,
          narrativeSequentiality: metrics.narrativeSequentiality,
          formality: metrics.formality
        }}
      />
    </div>
  );
}
```

---

## Testing Scenarios

### Unit Tests

```typescript
describe('JournalMetricsService', () => {
    it('should calculate word count correctly', () => {
        const text = 'Today was a beautiful day. I felt happy.'
        const metrics = service.calculateMetrics(text)
        expect(metrics.wordCount).toBe(9)
    })

    it('should detect temporal references', () => {
        const text =
            'Yesterday I met John. Today I feel better. Tomorrow will be great.'
        const count = service.countTemporalReferences(text)
        expect(count).toBeGreaterThanOrEqual(3)
    })

    it('should calculate lexical richness', () => {
        const text = 'happy happy sad sad happy'
        const richness = service.calculateLexicalRichness(text)
        expect(richness).toBe(0.4) // 2 unique / 5 total
    })
})

describe('JournalAIService', () => {
    it('should generate analysis with all required fields', async () => {
        const analysis = await service.generateAnalysis(mockJournalPageId)

        expect(analysis.criticalAnalysis).toBeDefined()
        expect(analysis.suggestedSongs).toHaveLength(3)
        expect(analysis.quote).toBeDefined()
        expect(analysis.quoteAuthor).toBeDefined()
    })
})
```

---

## Performance Considerations

- **Async Processing**: AI analysis and metrics calculation run in background jobs
- **Caching**: Cache metrics to avoid recalculation on every view
- **Pagination**: Limit journal page queries with cursor-based pagination
- **Indexes**: Optimize queries on `userId`, `date`, `isActive`
- **Incremental Analysis**: Only regenerate analysis when content changes significantly
- **Rate Limiting**: Limit AI analysis regenerations to prevent abuse

---

## Privacy & Security

- All journal entries are private by default
- Soft delete preserves data for potential recovery
- AI analysis happens server-side, content never sent to client unnecessarily
- End-to-end encryption option for sensitive entries
- Export functionality for data portability

---

## Future Enhancements

1. **Voice Journaling**: Speech-to-text entry creation
2. **Image Attachments**: Add photos to entries
3. **Mood Prediction**: AI predicts mood based on content
4. **Writing Prompts**: Daily prompts based on past entries
5. **Connections**: Link entries with similar themes
6. **Collaborative Journals**: Share with trusted individuals
7. **Advanced Analytics**: ML-powered trend detection
8. **Integration**: Export to Spotify playlists, sync with calendar
