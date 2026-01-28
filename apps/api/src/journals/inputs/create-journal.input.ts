import { Field, InputType } from '@nestjs/graphql'
import {
    IsDate,
    isDateString,
    IsDateString,
    IsNumber,
    IsString,
    IsTimeZone,
    Max,
    MaxLength,
    Min,
    MinLength,
} from 'class-validator'

@InputType()
export class CreateJournalInput {
    @Field()
    @IsDate()
    date: Date

    @Field()
    @IsDate()
    time: Date

    @Field()
    @IsString()
    @MinLength(4)
    @MaxLength(64)
    location: string

    @Field()
    @IsString()
    @MinLength(1)
    @MaxLength(5049)
    content: string

    @Field()
    @IsNumber()
    @Min(1)
    @Max(10)
    mood: number

    @Field()
    @IsString()
    tagIds: string
}
