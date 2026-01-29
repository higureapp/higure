import { Field, ID, Int, NumberScalarMode, ObjectType } from '@nestjs/graphql'
import { Expose } from 'class-transformer'
import { JournalTag } from './journal-tag.model'
import { JournalAIAnalysis } from './journal-ai-analysis.model'
import { JournalMetrics } from './journal-metrics.model'

@ObjectType()
export class Journal {
    @Field(() => ID)
    id: string

    @Field()
    date: Date

    @Field({ nullable: true })
    time?: Date

    @Field({ nullable: true })
    location?: string

    @Field()
    content: string

    @Field(() => Int)
    mood: number

    @Field()
    isActive: boolean

    @Field()
    lastModified: Date

    @Field()
    createdAt: Date

    @Field()
    updatedAt: Date

    // Relations
    @Field(() => [JournalTag])
    tags: JournalTag[]

    @Field(() => JournalMetrics, { nullable: true })
    metrics?: JournalMetrics

    @Field(() => JournalAIAnalysis, { nullable: true })
    aiAnalysis?: JournalAIAnalysis
}
