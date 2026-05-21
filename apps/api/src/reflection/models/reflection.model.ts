import { ObjectType, Field, registerEnumType } from '@nestjs/graphql'

export enum GraphQlReflectionType {
    PRAGMATIC = 'pragmatic',
    PSYCHOLOGICAL = 'psychological',
    CYNICAL = 'cynical',
    PHILOSOPHICAL = 'philosophical',
    EMPATHETIC = 'empathetic',
    STOIC = 'stoic',
    ROMANTIC = 'romantic',
    CRITICAL = 'critical',
    PLAYFUL = 'playful',
    SPIRITUAL = 'spiritual',
    NARRATIVE = 'narrative',
    FUTURE_ORIENTED = 'future_oriented',
    PAST_ORIENTED = 'past_oriented',
    SOCIAL = 'social',
    EXISTENTIAL = 'existential',
    MINDFUL = 'mindful',
    AMBITION_FOCUSED = 'ambition_focused',
    CONTENTMENT_FOCUSED = 'contentment_focused',
    SHADOW_FOCUSED = 'shadow_focused',
    INTEGRATION_FOCUSED = 'integration_focused',
}

registerEnumType(GraphQlReflectionType, {
    name: 'ReflectionType',
    description: 'The type/style of reflection to generate',
})

@ObjectType()
export class ReflectionTypeInfo {
    @Field(() => GraphQlReflectionType)
    type: GraphQlReflectionType

    @Field(() => String)
    label: string

    @Field(() => String)
    description: string

    @Field(() => String)
    icon: string
}

@ObjectType()
export class ReflectionModel {
    @Field(() => String)
    id: string

    @Field(() => String)
    journalPageId: string

    @Field(() => GraphQlReflectionType)
    type: GraphQlReflectionType

    @Field(() => String)
    content: string

    @Field(() => [String])
    keyInsights: string[]

    @Field(() => String)
    suggestedQuestion: string

    @Field(() => Date)
    generatedAt: Date

    @Field(() => String)
    modelVersion: string
}
