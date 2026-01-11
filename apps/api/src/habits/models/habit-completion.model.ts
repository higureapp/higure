import { Field, ID, ObjectType } from '@nestjs/graphql'
import { Expose } from 'class-transformer'
import { Habit } from './habit.model'

@ObjectType()
export class HabitCompletion {
    @Field(() => ID)
    @Expose()
    id: string

    @Field()
    @Expose()
    completedAt: Date

    @Field({ nullable: true })
    @Expose()
    notes?: string

    @Field(() => Habit)
    @Expose()
    habit: Habit
}
