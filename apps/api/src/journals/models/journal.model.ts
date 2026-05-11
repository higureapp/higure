import { Field, ID, Int, ObjectType } from '@nestjs/graphql'
import { JournalTag } from './journal-tag.model'
import { JournalAIAnalysis } from './journal-ai-analysis.model'
import { JournalMetrics } from './journal-metrics.model'

@ObjectType()
export class Journal {
    @Field(() => ID)
    id: string

    @Field(() => Date)
    date: Date

    @Field(() => Date, { nullable: true })
    time?: Date | null

    @Field(() => String, { nullable: true })
    location?: string | null

    @Field()
    content: string

    @Field(() => Int)
    mood: number

    @Field()
    isActive: boolean

    @Field(() => Date)
    lastModified: Date

    @Field(() => Date)
    createdAt: Date

    @Field(() => Date)
    updatedAt: Date

    // Relations
    @Field(() => [JournalTag])
    tags: JournalTag[]

    @Field(() => JournalMetrics, { nullable: true })
    metrics?: JournalMetrics | null

    @Field(() => JournalAIAnalysis, { nullable: true })
    aiAnalysis?: JournalAIAnalysis | null
}
