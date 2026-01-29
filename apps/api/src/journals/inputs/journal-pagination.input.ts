import { InputType, Field, Int } from '@nestjs/graphql'
import { IsOptional, IsInt, Min, Max } from 'class-validator'
import { Type } from 'class-transformer'

@InputType()
export class JournalPaginationInput {
    @Field(() => Int, { nullable: true, defaultValue: 1 })
    @IsOptional()
    @Type(() => Number)
    @IsInt()
    @Min(1)
    page?: number = 1

    @Field(() => Int, { nullable: true, defaultValue: 10 })
    @IsOptional()
    @Type(() => Number)
    @IsInt()
    @Min(1)
    @Max(100)
    limit?: number = 10
}
