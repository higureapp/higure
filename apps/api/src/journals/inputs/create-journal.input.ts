import { Field, InputType, Int } from '@nestjs/graphql'
import { Type } from 'class-transformer'
import {
    IsArray,
    IsDate,
    IsInt,
    IsNotEmpty,
    IsOptional,
    IsString,
    Max,
    Min,
} from 'class-validator'

@InputType()
export class CreateJournalInput {
    @Field(() => Date)
    @IsDate()
    @Type(() => Date)
    date: Date

    @Field(() => Date, { nullable: true })
    @IsOptional()
    @IsDate()
    @Type(() => Date)
    time?: Date

    @Field(() => String, { nullable: true })
    @IsOptional()
    @IsString()
    location?: string

    @Field()
    @IsString()
    @IsNotEmpty()
    content: string

    @Field(() => Int, { defaultValue: 5 })
    @IsOptional()
    @IsInt()
    @Min(1)
    @Max(10)
    mood?: number

    @Field(() => [String], { nullable: true })
    @IsOptional()
    @IsArray()
    @IsString({ each: true })
    tagIds?: string[]
}
