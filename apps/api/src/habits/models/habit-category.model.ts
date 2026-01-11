import { Field, ID, ObjectType } from '@nestjs/graphql'
import { Expose } from 'class-transformer'
import { Habit } from './habit.model'

@ObjectType()
export class HabitCategory {
    @Field(() => ID)
    @Expose()
    id: string

    @Field()
    @Expose()
    name: string

    @Field({ nullable: true })
    @Expose()
    color?: string

    @Field({ nullable: true })
    @Expose()
    icon?: string

    @Field(() => [Habit], { nullable: 'itemsAndList' })
    @Expose()
    habits?: Habit[]
}
