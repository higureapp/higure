import { Field, InputType } from '@nestjs/graphql'
import { IsEnum, IsUUID } from 'class-validator'
import { StatsPeriod } from '../models/enums'

@InputType()
export class GetHabitStatsInput {
    @Field()
    @IsUUID()
    habitId: string

    @Field(() => StatsPeriod)
    @IsEnum(StatsPeriod)
    period: StatsPeriod
}
