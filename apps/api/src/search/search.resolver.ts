import { Args, ID, Mutation, Query, Resolver } from '@nestjs/graphql'
import {
    SearchResponseModel,
    SearchHistoryItemModel,
} from './models/search.model'
import {
    CurrentUser,
    CurrentUserType,
} from '../auth/decorators/current-user.decorator'
import { SearchService } from './services/search.service'

@Resolver()
export class SearchResolver {
    constructor(private readonly searchService: SearchService) {}

    @Query(() => SearchResponseModel)
    async searchJournals(
        @Args('query') query: string,
        @Args('saveToHistory', {
            type: () => Boolean,
            nullable: true,
            defaultValue: true,
        })
        saveToHistory: boolean,
        @CurrentUser() user: CurrentUserType,
    ): Promise<SearchResponseModel> {
        return this.searchService.search(user.userId, query, saveToHistory)
    }

    @Query(() => [SearchHistoryItemModel])
    async searchHistory(
        @CurrentUser() user: CurrentUserType,
    ): Promise<SearchHistoryItemModel[]> {
        return this.searchService.getSearchHistory(user.userId)
    }

    @Mutation(() => SearchHistoryItemModel, { nullable: true })
    async deleteSearchHistoryItem(
        @Args('id', { type: () => ID }) id: string,
        @CurrentUser() user: CurrentUserType,
    ): Promise<SearchHistoryItemModel | null> {
        return this.searchService.deleteSearch(user.userId, id)
    }

    @Mutation(() => Number)
    async clearSearchHistory(
        @CurrentUser() user: CurrentUserType,
    ): Promise<number> {
        return this.searchService.clearSearchHistory(user.userId)
    }
}
