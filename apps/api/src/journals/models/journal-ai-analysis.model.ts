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

    @Field({ nullable: true })
    quote?: string

    @Field({ nullable: true })
    quoteAuthor?: string

    @Field()
    generatedAt: Date

    @Field()
    modelVersion: string
}
