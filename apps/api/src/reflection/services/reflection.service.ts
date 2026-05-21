import { Injectable } from '@nestjs/common'
import { ReflectionModel, GraphQlReflectionType, ReflectionTypeInfo } from '../models/reflection.model'
import { ReflectionRepository } from '../reflection.repository'
import { ReflectionGenerator, ReflectionType } from '@higure/ai'
import { JournalsService } from '@/journals/services/journals.service'
import { Journal } from '@/journals/models/journal.model'
import { ReflectionMapper, graphQlToPrismaTypeMap } from '../mappers/reflection.mapper'

const graphQlToAiTypeMap: Record<GraphQlReflectionType, ReflectionType> = {
    [GraphQlReflectionType.PRAGMATIC]: ReflectionType.PRAGMATIC,
    [GraphQlReflectionType.PSYCHOLOGICAL]: ReflectionType.PSYCHOLOGICAL,
    [GraphQlReflectionType.CYNICAL]: ReflectionType.CYNICAL,
    [GraphQlReflectionType.PHILOSOPHICAL]: ReflectionType.PHILOSOPHICAL,
    [GraphQlReflectionType.EMPATHETIC]: ReflectionType.EMPATHETIC,
    [GraphQlReflectionType.STOIC]: ReflectionType.STOIC,
    [GraphQlReflectionType.ROMANTIC]: ReflectionType.ROMANTIC,
    [GraphQlReflectionType.CRITICAL]: ReflectionType.CRITICAL,
    [GraphQlReflectionType.PLAYFUL]: ReflectionType.PLAYFUL,
    [GraphQlReflectionType.SPIRITUAL]: ReflectionType.SPIRITUAL,
    [GraphQlReflectionType.NARRATIVE]: ReflectionType.NARRATIVE,
    [GraphQlReflectionType.FUTURE_ORIENTED]: ReflectionType.FUTURE_ORIENTED,
    [GraphQlReflectionType.PAST_ORIENTED]: ReflectionType.PAST_ORIENTED,
    [GraphQlReflectionType.SOCIAL]: ReflectionType.SOCIAL,
    [GraphQlReflectionType.EXISTENTIAL]: ReflectionType.EXISTENTIAL,
    [GraphQlReflectionType.MINDFUL]: ReflectionType.MINDFUL,
    [GraphQlReflectionType.AMBITION_FOCUSED]: ReflectionType.AMBITION_FOCUSED,
    [GraphQlReflectionType.CONTENTMENT_FOCUSED]: ReflectionType.CONTENTMENT_FOCUSED,
    [GraphQlReflectionType.SHADOW_FOCUSED]: ReflectionType.SHADOW_FOCUSED,
    [GraphQlReflectionType.INTEGRATION_FOCUSED]: ReflectionType.INTEGRATION_FOCUSED,
}

@Injectable()
export class ReflectionService {
    constructor(
        private readonly journalService: JournalsService,
        private readonly reflectionRepository: ReflectionRepository,
    ) {}

    getAvailableReflectionTypes(): ReflectionTypeInfo[] {
        const types = ReflectionGenerator.getAvailableTypes()
        return types.map((type) => {
            const info = ReflectionGenerator.getTypeInfo(type)
            const graphQlType = this.convertAiToGraphQlType(type)
            return {
                type: graphQlType,
                label: info.label,
                description: info.description,
                icon: info.icon,
            }
        })
    }

    private convertAiToGraphQlType(type: ReflectionType): GraphQlReflectionType {
        const entry = Object.entries(graphQlToAiTypeMap).find(
            ([, value]) => value === type,
        )
        if (!entry) {
            return GraphQlReflectionType.PRAGMATIC
        }
        return entry[0] as GraphQlReflectionType
    }

    async createReflection(
        userId: string,
        journalPageId: string,
        type: GraphQlReflectionType,
    ): Promise<ReflectionModel> {
        const prismaType = graphQlToPrismaTypeMap[type]

        const journal = await this.journalService.getJournalPage(
            journalPageId,
            userId,
        )

        const reflection = await this.generateReflection(journal, type)

        const newReflection = await this.reflectionRepository.createReflection(
            journalPageId,
            prismaType,
            reflection.content,
            reflection.keyInsights,
            reflection.suggestedQuestion,
        )

        return ReflectionMapper.toModel(newReflection)
    }

    async getReflectionByJournalPageAndType(
        journalPageId: string,
        type: GraphQlReflectionType,
    ): Promise<ReflectionModel | null> {
        const prismaType = graphQlToPrismaTypeMap[type]
        const reflection =
            await this.reflectionRepository.getReflectionByJournalPageAndType(
                journalPageId,
                prismaType,
            )
        return reflection ? ReflectionMapper.toModel(reflection) : null
    }

    async getAllReflectionsByJournalPage(
        journalPageId: string,
    ): Promise<ReflectionModel[]> {
        const reflections =
            await this.reflectionRepository.getAllReflectionsByJournalPage(
                journalPageId,
            )
        return ReflectionMapper.toModelArray(reflections)
    }

    private async generateReflection(
        journal: Journal,
        type: GraphQlReflectionType,
    ) {
        const aiType = graphQlToAiTypeMap[type]!

        return ReflectionGenerator.generateReflection(
            {
                content: journal.content,
                date: journal.date,
                location: journal.location ?? undefined,
                mood: journal.mood,
            },
            aiType,
        )
    }

    async deleteReflection(id: string): Promise<ReflectionModel | null> {
        const reflection = await this.reflectionRepository.deleteReflection(id)
        return reflection ? ReflectionMapper.toModel(reflection) : null
    }
}
