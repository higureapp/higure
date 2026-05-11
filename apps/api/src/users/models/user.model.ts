import { Field, ID, ObjectType } from '@nestjs/graphql'
import { Expose } from 'class-transformer'
import { Sensitive } from '../../utils/decorators/sensitive.decorator'

@ObjectType()
export class User {
    @Field((type) => ID)
    @Expose()
    id: string

    @Field()
    @Expose()
    firstname: string

    @Field()
    @Expose()
    lastname: string

    @Field()
    @Expose()
    email: string

    @Field((type) => String, { nullable: true })
    @Sensitive()
    phone?: string | null

    @Field()
    @Expose()
    timezone: string

    @Field()
    @Expose()
    locale: string

    @Field()
    @Expose()
    emailVerified: boolean

    @Field()
    @Expose()
    phoneVerified: boolean

    @Field({ nullable: true })
    @Expose()
    lastLoginAt?: Date | null

    @Field()
    @Expose()
    createdAt: Date

    @Field()
    @Expose()
    updatedAt: Date

    @Field({ nullable: true })
    @Expose()
    deletedAt?: Date | null

    @Field({ nullable: true })
    @Expose()
    avatarUrl?: string | null

    // Relations
    // @Field(type => [Task], { nullable: true })
    // tasks?: Task[];

    // @Field(type => [TaskCategory], { nullable: true })
    // taskCategories?: TaskCategory[];

    // @Field(type => [Event], { nullable: true })
    // events?: Event[];

    // @Field(type => [Habit], { nullable: true })
    // habits?: Habit[];

    // @Field(type => [Sleep], { nullable: true })
    // sleeps?: Sleep[];
}
