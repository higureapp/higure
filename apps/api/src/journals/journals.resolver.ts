import { Args, ID, Mutation, Query, Resolver } from '@nestjs/graphql'
import { Journal } from './models/journal.model'
import { CreateJournalInput } from './inputs/create-journal.input'
import { JournalsService } from './services/journals.service'
import {
    CurrentUser,
    CurrentUserType,
} from '../auth/decorators/current-user.decorator'
import { UpdateJournalInput } from './inputs/update-journal.input'
import { JournalPageFilters } from './filters/journal.filter'
import { JournalPaginationInput } from './inputs/journal-pagination.input'
import { GetJournalPagesOutput } from './outputs/get-journals.output'

@Resolver(() => Journal)
export class JournalsResolver {
    constructor(private readonly journalPageService: JournalsService) {}

    // ==================== QUERIES ====================

    @Query(() => Journal, {
        name: 'journalPage',
        description: 'Get a single journal page by ID',
    })
    async getJournalPage(
        @Args('id', { type: () => ID }) id: string,
        @CurrentUser() user: CurrentUserType,
    ): Promise<Journal> {
        return this.journalPageService.getJournalPage(id, user.userId)
    }

    @Query(() => GetJournalPagesOutput, {
        name: 'journalPages',
        description: 'Get journal pages with filters and pagination',
    })
    async getJournalPages(
        @CurrentUser() user: CurrentUserType,
        @Args('filters', { type: () => JournalPageFilters, nullable: true })
        filters?: JournalPageFilters,
        @Args('pagination', {
            type: () => JournalPaginationInput,
            nullable: true,
        })
        pagination?: JournalPaginationInput,
    ): Promise<GetJournalPagesOutput> {
        return this.journalPageService.getJournalPages(
            user.userId,
            filters,
            pagination,
        )
    }

    // ==================== MUTATIONS ====================

    @Mutation(() => Journal, {
        name: 'createJournalPage',
        description: 'Create a new journal page',
    })
    async createJournalPage(
        @CurrentUser() user: CurrentUserType,
        @Args('input') input: CreateJournalInput,
    ): Promise<Journal> {
        return this.journalPageService.createJournalPage(user.userId, input)
    }

    @Mutation(() => Journal, {
        name: 'updateJournalPage',
        description: 'Update an existing journal page',
    })
    async updateJournalPage(
        @Args('id', { type: () => ID }) id: string,
        @CurrentUser() user: CurrentUserType,
        @Args('input') input: UpdateJournalInput,
    ): Promise<Journal> {
        return this.journalPageService.updateJournalPage(id, user.userId, input)
    }

    @Mutation(() => Journal, {
        name: 'softDeleteJournalPage',
        description: 'Soft delete a journal page (set isActive to false)',
    })
    async softDeleteJournalPage(
        @Args('id', { type: () => ID }) id: string,
        @CurrentUser() user: CurrentUserType,
    ): Promise<Journal> {
        return this.journalPageService.softDeleteJournalPage(id, user.userId)
    }

    @Mutation(() => Boolean, {
        name: 'deleteJournalPage',
        description: 'Permanently delete a journal page',
    })
    async deleteJournalPage(
        @Args('id', { type: () => ID }) id: string,
        @CurrentUser() user: CurrentUserType,
    ): Promise<boolean> {
        return this.journalPageService.deleteJournalPage(id, user.userId)
    }

    @Mutation(() => Journal, {
        name: 'restoreJournalPage',
        description: 'Restore a soft-deleted journal page',
    })
    async restoreJournalPage(
        @Args('id', { type: () => ID }) id: string,
        @CurrentUser() user: CurrentUserType,
    ): Promise<Journal> {
        return this.journalPageService.restoreJournalPage(id, user.userId)
    }
}
