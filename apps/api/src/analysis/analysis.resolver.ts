import { Args, ID, Mutation, Query, Resolver } from '@nestjs/graphql'
import { AnalysisModel } from './models/analysis.model'
import {
    CurrentUser,
    CurrentUserType,
} from '../auth/decorators/current-user.decorator'
import { AnalysisService } from './services/analysis.service'

@Resolver(() => AnalysisModel)
export class AnalysisResolver {
    constructor(private readonly analysisService: AnalysisService) {}

    @Mutation(() => AnalysisModel)
    async createAnalysis(
        @Args('journalId', { type: () => ID }) journalId: string,
        @CurrentUser() user: CurrentUserType,
    ): Promise<AnalysisModel> {
        return this.analysisService.createAnalysis(user.userId, journalId)
    }

    @Query(() => AnalysisModel, { nullable: true })
    async getAnalysisByJournalPage(
        @Args('journalPageId', { type: () => ID }) journalPageId: string,
        @CurrentUser() user: CurrentUserType,
    ): Promise<AnalysisModel | null> {
        return this.analysisService.getAnalysisByJournalPageId(journalPageId)
    }

    @Mutation(() => AnalysisModel)
    async regenerateAnalysis(
        @Args('analysisId', { type: () => ID }) analysisId: string,
        @CurrentUser() user: CurrentUserType,
    ): Promise<AnalysisModel> {
        return this.analysisService.regenerateAnalysis(user.userId, analysisId)
    }

    @Mutation(() => AnalysisModel)
    async deleteAnalysis(
        @Args('id', { type: () => ID }) id: string,
        @CurrentUser() user: CurrentUserType,
    ): Promise<AnalysisModel> {
        return this.analysisService.deleteAnalysis(id)
    }
}
