import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { Journal } from './models/journal.model'
import { UseGuards } from '@nestjs/common'
import { GqlAuthGuard } from '../auth/guards/gql-auth.guard'
import { CreateJournalInput } from './inputs/create-journal.input'
import { JournalsService } from './services/journals.service'
import {
    CurrentUser,
    CurrentUserType,
} from '../auth/decorators/current-user.decorator'

@Resolver(() => Journal)
export class JournalsResolver {
    constructor(private readonly journalsService: JournalsService) {}

    @UseGuards(GqlAuthGuard)
    @Mutation(() => Journal)
    async createJournalPage(
        @CurrentUser() user: CurrentUserType,
        @Args('createJournalInput') createJournalInput: CreateJournalInput,
    ): Promise<Journal> {
        return this.journalsService.create(user.userId, createJournalInput)
    }
}
