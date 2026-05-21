import { ReflectionModel, GraphQlReflectionType } from '../models/reflection.model'
import { JournalReflection, ReflectionType as PrismaReflectionType } from '../../generated/prisma/client'

const prismaToGraphQlTypeMap: Record<PrismaReflectionType, GraphQlReflectionType> = {
    [PrismaReflectionType.pragmatic]: GraphQlReflectionType.PRAGMATIC,
    [PrismaReflectionType.psychological]: GraphQlReflectionType.PSYCHOLOGICAL,
    [PrismaReflectionType.cynical]: GraphQlReflectionType.CYNICAL,
    [PrismaReflectionType.philosophical]: GraphQlReflectionType.PHILOSOPHICAL,
    [PrismaReflectionType.empathetic]: GraphQlReflectionType.EMPATHETIC,
    [PrismaReflectionType.stoic]: GraphQlReflectionType.STOIC,
    [PrismaReflectionType.romantic]: GraphQlReflectionType.ROMANTIC,
    [PrismaReflectionType.critical]: GraphQlReflectionType.CRITICAL,
    [PrismaReflectionType.playful]: GraphQlReflectionType.PLAYFUL,
    [PrismaReflectionType.spiritual]: GraphQlReflectionType.SPIRITUAL,
    [PrismaReflectionType.narrative]: GraphQlReflectionType.NARRATIVE,
    [PrismaReflectionType.future_oriented]: GraphQlReflectionType.FUTURE_ORIENTED,
    [PrismaReflectionType.past_oriented]: GraphQlReflectionType.PAST_ORIENTED,
    [PrismaReflectionType.social]: GraphQlReflectionType.SOCIAL,
    [PrismaReflectionType.existential]: GraphQlReflectionType.EXISTENTIAL,
    [PrismaReflectionType.mindful]: GraphQlReflectionType.MINDFUL,
    [PrismaReflectionType.ambition_focused]: GraphQlReflectionType.AMBITION_FOCUSED,
    [PrismaReflectionType.contentment_focused]: GraphQlReflectionType.CONTENTMENT_FOCUSED,
    [PrismaReflectionType.shadow_focused]: GraphQlReflectionType.SHADOW_FOCUSED,
    [PrismaReflectionType.integration_focused]: GraphQlReflectionType.INTEGRATION_FOCUSED,
}

export const graphQlToPrismaTypeMap: Record<GraphQlReflectionType, PrismaReflectionType> = {
    [GraphQlReflectionType.PRAGMATIC]: PrismaReflectionType.pragmatic,
    [GraphQlReflectionType.PSYCHOLOGICAL]: PrismaReflectionType.psychological,
    [GraphQlReflectionType.CYNICAL]: PrismaReflectionType.cynical,
    [GraphQlReflectionType.PHILOSOPHICAL]: PrismaReflectionType.philosophical,
    [GraphQlReflectionType.EMPATHETIC]: PrismaReflectionType.empathetic,
    [GraphQlReflectionType.STOIC]: PrismaReflectionType.stoic,
    [GraphQlReflectionType.ROMANTIC]: PrismaReflectionType.romantic,
    [GraphQlReflectionType.CRITICAL]: PrismaReflectionType.critical,
    [GraphQlReflectionType.PLAYFUL]: PrismaReflectionType.playful,
    [GraphQlReflectionType.SPIRITUAL]: PrismaReflectionType.spiritual,
    [GraphQlReflectionType.NARRATIVE]: PrismaReflectionType.narrative,
    [GraphQlReflectionType.FUTURE_ORIENTED]: PrismaReflectionType.future_oriented,
    [GraphQlReflectionType.PAST_ORIENTED]: PrismaReflectionType.past_oriented,
    [GraphQlReflectionType.SOCIAL]: PrismaReflectionType.social,
    [GraphQlReflectionType.EXISTENTIAL]: PrismaReflectionType.existential,
    [GraphQlReflectionType.MINDFUL]: PrismaReflectionType.mindful,
    [GraphQlReflectionType.AMBITION_FOCUSED]: PrismaReflectionType.ambition_focused,
    [GraphQlReflectionType.CONTENTMENT_FOCUSED]: PrismaReflectionType.contentment_focused,
    [GraphQlReflectionType.SHADOW_FOCUSED]: PrismaReflectionType.shadow_focused,
    [GraphQlReflectionType.INTEGRATION_FOCUSED]: PrismaReflectionType.integration_focused,
}

export class ReflectionMapper {
    static toModel(entity: JournalReflection): ReflectionModel {
        const model = new ReflectionModel()

        model.id = entity.id
        model.journalPageId = entity.journalPageId
        const graphQlType = prismaToGraphQlTypeMap[entity.type]
        if (!graphQlType) {
            model.type = GraphQlReflectionType.PRAGMATIC
        } else {
            model.type = graphQlType
        }
        model.content = entity.content
        model.keyInsights = Array.isArray(entity.keyInsights) ? entity.keyInsights as string[] : []
        model.suggestedQuestion = entity.suggestedQuestion
        model.generatedAt = entity.generatedAt
        model.modelVersion = entity.modelVersion

        return model
    }

    static toModelArray(entities: JournalReflection[]): ReflectionModel[] {
        return entities.map((entity) => this.toModel(entity))
    }
}
