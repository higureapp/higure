import { Field, InputType } from '@nestjs/graphql'
import { IsString, IsOptional, IsUUID } from 'class-validator'

@InputType()
export class CompleteHabitInput {
    @Field()
    @IsUUID()
    habitId: string

    @Field({ nullable: true })
    @IsOptional()
    @IsString()
    notes?: string
}
