import { Field, Float, Int, ObjectType } from '@nestjs/graphql';
import { Expose } from 'class-transformer';

@ObjectType()
export class CompletionByDay {
    @Field()
    @Expose()
    date: Date;

    @Field()
    @Expose()
    completed: boolean;
}

@ObjectType()
export class HabitStatsResponse {
    @Field(() => Float)
    @Expose()
    completionRate: number;

    @Field(() => Int)
    @Expose()
    currentStreak: number;

    @Field(() => Int)
    @Expose()
    longestStreak: number;

    @Field(() => Int)
    @Expose()
    totalCompletions: number;

    @Field(() => [CompletionByDay])
    @Expose()
    completionsByDay: CompletionByDay[];
}
