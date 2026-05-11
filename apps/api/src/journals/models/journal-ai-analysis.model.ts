import { ObjectType, Field } from '@nestjs/graphql'

@ObjectType()
export class SuggestedSong {
    @Field()
    title: string

    @Field()
    artist: string

    @Field()
    reason: string
}

@ObjectType()
export class JournalAIAnalysis {
    @Field()
    criticalAnalysis: string

    @Field(() => [SuggestedSong])
    suggestedSongs: SuggestedSong[]

    @Field(() => String, { nullable: true })
    quote?: string

    @Field(() => String, { nullable: true })
    quoteAuthor?: string

    @Field(() => Date)
    generatedAt: Date

    @Field()
    modelVersion: string
}
