import { Field, InputType, Int, PartialType } from '@nestjs/graphql'
import {
    IsArray,
    IsBoolean,
    IsDate,
    IsInt,
    IsOptional,
    IsString,
    Max,
    Min,
} from 'class-validator'
import { Type } from 'class-transformer'

@InputType()
export class UpdateJournalInput {
    @Field({ nullable: true })
    @IsOptional()
    @IsDate()
    @Type(() => Date)
    date?: Date

    @Field({ nullable: true })
    @IsOptional()
    @IsDate()
    @Type(() => Date)
    time?: Date

    @Field({ nullable: true })
    @IsOptional()
    @IsString()
    location?: string

    @Field({ nullable: true })
    @IsOptional()
    @IsString()
    content?: string

    @Field(() => Int, { nullable: true })
    @IsOptional()
    @IsInt()
    @Min(1)
    @Max(10)
    mood?: number

    @Field({ nullable: true })
    @IsOptional()
    @IsBoolean()
    isActive?: boolean

    @Field(() => [String], { nullable: true })
    @IsOptional()
    @IsArray()
    @IsString({ each: true })
    tagIds?: string[]
}
