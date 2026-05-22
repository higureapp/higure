import { Resolver, Query, Mutation, Args } from '@nestjs/graphql'
import { UseGuards } from '@nestjs/common'
import { GqlAuthGuard } from '../auth/guards/gql-auth.guard'
import {
    CurrentUser,
    CurrentUserType,
} from '../auth/decorators/current-user.decorator'
import { User } from './models/user.model'
import { UsersService } from './services/users.service'
import { UpdateUserInput } from './inputs/update-user.input'

@Resolver(() => User)
export class UsersResolver {
    constructor(private usersService: UsersService) {}

    @UseGuards(GqlAuthGuard)
    @Query(() => User, { name: 'me' })
    async getCurrentUser(@CurrentUser() user: CurrentUserType): Promise<User> {
        return this.usersService.findOne(user.userId)
    }

    @UseGuards(GqlAuthGuard)
    @Mutation(() => User)
    async updateSettings(
        @CurrentUser() user: CurrentUserType,
        @Args('input') input: UpdateUserInput,
    ): Promise<User> {
        return this.usersService.update(user.userId, input)
    }

    @UseGuards(GqlAuthGuard)
    @Mutation(() => String)
    async deleteAccount(@CurrentUser() user: CurrentUserType): Promise<string> {
        await this.usersService.delete(user.userId)
        return 'Account deleted successfully'
    }
}
