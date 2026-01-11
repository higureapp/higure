import { Field, ID, Int, ObjectType } from '@nestjs/graphql';
import { Expose } from 'class-transformer';
import { GraphQLJSONObject } from 'graphql-type-json';
import { DifficultyLevel, FrequencyType } from './enums';
import { HabitCategory } from './habit-category.model';
import { HabitCompletion } from './habit-completion.model';

@ObjectType()
export class Habit {
    @Field(() => ID)
    @Expose()
    id: string;

    @Field()
    @Expose()
    title: string;

    @Field({ nullable: true })
    @Expose()
    description?: string;

    @Field(() => FrequencyType)
    @Expose()
    frequency: FrequencyType;

    @Field(() => GraphQLJSONObject)
    @Expose()
    frequencyConfig: object;

    @Field(() => Int)
    @Expose()
    dailyRepetitions: number;

    @Field({ nullable: true })
    @Expose()
    scheduledTime?: Date;

    @Field({ nullable: true })
    @Expose()
    reminderTime?: Date;

    @Field(() => DifficultyLevel)
    @Expose()
    difficulty: DifficultyLevel;

    @Field({ nullable: true })
    @Expose()
    dueDate?: Date;

    @Field()
    @Expose()
    isActive: boolean;

    @Field(() => Int)
    @Expose()
    streakCount: number;

    @Field(() => HabitCategory, { nullable: true })
    @Expose()
    category?: HabitCategory;

    @Field(() => [HabitCompletion], { nullable: 'itemsAndList' })
    @Expose()
    completions?: HabitCompletion[];

    @Field()
    @Expose()
    createdAt: Date;

    @Field()
    @Expose()
    updatedAt: Date;
}
