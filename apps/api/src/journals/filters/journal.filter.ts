import { InputType, Field, Int } from '@nestjs/graphql'
import {
    IsOptional,
    IsInt,
    Min,
    Max,
    IsString,
    IsArray,
    IsDate,
} from 'class-validator'
import { Type } from 'class-transformer'

@InputType()
export class JournalPageFilters {
    @Field({ nullable: true })
    @IsOptional()
    @Type(() => Date)
    @IsDate()
    dateFrom?: Date

    @Field({ nullable: true })
    @IsOptional()
    @Type(() => Date)
    @IsDate()
    dateTo?: Date

    @Field(() => Int, { nullable: true })
    @IsOptional()
    @IsInt()
    @Min(1)
    @Max(10)
    moodMin?: number

    @Field(() => Int, { nullable: true })
    @IsOptional()
    @IsInt()
    @Min(1)
    @Max(10)
    moodMax?: number

    @Field({ nullable: true })
    @IsOptional()
    @IsString()
    location?: string

    @Field(() => [String], { nullable: true })
    @IsOptional()
    @IsArray()
    @IsString({ each: true })
    tags?: string[]

    @Field({ nullable: true })
    @IsOptional()
    @IsString()
    searchTerm?: string

    @Field({ nullable: true })
    @IsOptional()
    isActive?: boolean
}
