import { Args, ID, Mutation, Query, Resolver } from '@nestjs/graphql'
import { ReflectionModel, GraphQlReflectionType, ReflectionTypeInfo } from './models/reflection.model'
import {
    CurrentUser,
    CurrentUserType,
} from '../auth/decorators/current-user.decorator'
import { ReflectionService } from './services/reflection.service'

@Resolver(() => ReflectionModel)
export class ReflectionResolver {
    constructor(private readonly reflectionService: ReflectionService) {}

    @Query(() => [ReflectionTypeInfo])
    availableReflectionTypes(): ReflectionTypeInfo[] {
        return this.reflectionService.getAvailableReflectionTypes()
    }

    @Mutation(() => ReflectionModel)
    async createReflection(
        @Args('journalId', { type: () => ID }) journalId: string,
        @Args('type', { type: () => GraphQlReflectionType }) type: GraphQlReflectionType,
        @CurrentUser() user: CurrentUserType,
    ): Promise<ReflectionModel> {
        return this.reflectionService.createReflection(user.userId, journalId, type)
    }

    @Query(() => ReflectionModel, { nullable: true })
    async getReflection(
        @Args('journalPageId', { type: () => ID }) journalPageId: string,
        @Args('type', { type: () => GraphQlReflectionType }) type: GraphQlReflectionType,
        @CurrentUser() user: CurrentUserType,
    ): Promise<ReflectionModel | null> {
        return this.reflectionService.getReflectionByJournalPageAndType(journalPageId, type)
    }

    @Query(() => [ReflectionModel])
    async getAllReflections(
        @Args('journalPageId', { type: () => ID }) journalPageId: string,
        @CurrentUser() user: CurrentUserType,
    ): Promise<ReflectionModel[]> {
        return this.reflectionService.getAllReflectionsByJournalPage(journalPageId)
    }

    @Mutation(() => ReflectionModel, { nullable: true })
    async deleteReflection(
        @Args('id', { type: () => ID }) id: string,
        @CurrentUser() user: CurrentUserType,
    ): Promise<ReflectionModel | null> {
        return this.reflectionService.deleteReflection(id)
    }
}
