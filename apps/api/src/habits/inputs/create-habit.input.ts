import { Field, InputType, Int } from '@nestjs/graphql';
import {
    IsString,
    IsOptional,
    IsUUID,
    IsEnum,
    IsInt,
    Min,
    IsDate,
    IsObject,
} from 'class-validator';
import { DifficultyLevel, FrequencyType } from '../models';
import { GraphQLJSONObject } from 'graphql-type-json';

@InputType()
export class CreateHabitInput {
    @Field()
    @IsString()
    title: string;

    @Field({ nullable: true })
    @IsOptional()
    @IsString()
    description?: string;

    @Field({ nullable: true })
    @IsOptional()
    @IsUUID()
    categoryId?: string;

    @Field(() => FrequencyType)
    @IsEnum(FrequencyType)
    frequency: FrequencyType;

    @Field(() => GraphQLJSONObject)
    @IsObject()
    frequencyConfig: object;

    @Field(() => Int, { defaultValue: 1 })
    @IsOptional()
    @IsInt()
    @Min(1)
    dailyRepetitions: number = 1;

    @Field({ nullable: true })
    @IsOptional()
    @IsDate()
    scheduledTime?: Date;

    @Field({ nullable: true })
    @IsOptional()
    @IsDate()
    reminderTime?: Date;

    @Field(() => DifficultyLevel, { defaultValue: DifficultyLevel.NORMAL })
    @IsOptional()
    @IsEnum(DifficultyLevel)
    difficulty: DifficultyLevel = DifficultyLevel.NORMAL;

    @Field({ nullable: true })
    @IsOptional()
    @IsDate()
    dueDate?: Date;
}
