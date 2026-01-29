import { ObjectType, Field, Float, Int } from '@nestjs/graphql'

@ObjectType()
export class JournalMetrics {
    // Structural
    @Field(() => Int)
    wordCount: number

    @Field(() => Int)
    sentenceCount: number

    @Field(() => Float)
    averageSentenceLength: number

    @Field(() => Int)
    paragraphCount: number

    @Field(() => Float)
    textDensity: number

    // Temporal
    @Field(() => Int)
    estimatedWritingTime: number

    @Field(() => Int)
    temporalReferencesCount: number

    @Field(() => Float)
    temporalFocus: number

    // Emotional
    @Field(() => Float)
    emotionalValence: number

    @Field(() => Float)
    emotionalIntensity: number

    @Field(() => Float)
    emotionalVariability: number

    @Field(() => Int)
    emotionalWordsCount: number

    // Cognitive
    @Field(() => Float)
    introspectionIndex: number

    @Field(() => Int)
    questionsCount: number

    @Field(() => Int)
    causeEffectCount: number

    // Narrative
    @Field(() => Int)
    eventsCount: number

    @Field(() => Int)
    charactersCount: number

    @Field(() => Float)
    firstPersonUsage: number

    @Field(() => Float)
    narrativeSequentiality: number

    // Stylistic
    @Field(() => Float)
    lexicalRichness: number

    @Field(() => Int)
    keyRepetitionsCount: number

    @Field(() => Int)
    metaphorsCount: number

    @Field(() => Float)
    formality: number
}
