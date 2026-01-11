import { Resolver, Mutation, Args, Query } from '@nestjs/graphql'
import { UseGuards } from '@nestjs/common'
import { GqlAuthGuard } from '../auth/guards/gql-auth.guard'
import {
    CurrentUser,
    CurrentUserType,
} from '../auth/decorators/current-user.decorator'
import { HabitsService } from './services/habits.service'
import { Habit, HabitCompletion, HabitStatsResponse } from './models'
import {
    CreateHabitInput,
    HabitFilters,
    CompleteHabitInput,
    GetHabitStatsInput,
} from './inputs'

@Resolver(() => Habit)
export class HabitsResolver {
    constructor(private readonly habitsService: HabitsService) {}

    @UseGuards(GqlAuthGuard)
    @Query(() => HabitStatsResponse)
    async habitStats(
        @Args('input') input: GetHabitStatsInput,
        @CurrentUser() user: CurrentUserType,
    ): Promise<HabitStatsResponse> {
        return this.habitsService.getHabitStats(input, user.userId)
    }

    @UseGuards(GqlAuthGuard)
    @Mutation(() => HabitCompletion)
    async completeHabit(
        @Args('input') input: CompleteHabitInput,
        @CurrentUser() user: CurrentUserType,
    ): Promise<HabitCompletion> {
        return this.habitsService.completeHabit(input, user.userId)
    }

    @UseGuards(GqlAuthGuard)
    @Query(() => [Habit])
    async habits(
        @Args('filters', { nullable: true }) filters: HabitFilters,
        @CurrentUser() user: CurrentUserType,
    ): Promise<Habit[]> {
        return this.habitsService.getHabits(user.userId, filters)
    }

    @UseGuards(GqlAuthGuard)
    @Mutation(() => Habit)
    async createHabit(
        @Args('input') input: CreateHabitInput,
        @CurrentUser() user: CurrentUserType,
    ): Promise<Habit> {
        return this.habitsService.createHabit(input, user)
    }
}
