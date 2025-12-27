import { Field, ID, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class User {
    @Field(type => ID)
    id: string;

    @Field()
    firstname: string;

    @Field()
    lastname: string;

    @Field()
    email: string;

    @Field({ nullable: true })
    phone?: string;

    @Field()
    timezone: string;

    @Field()
    locale: string;

    @Field()
    emailVerified: boolean;

    @Field()
    phoneVerified: boolean;

    @Field({ nullable: true })
    lastLoginAt?: Date;

    @Field()
    createdAt: Date;

    @Field()
    updatedAt: Date;

    @Field({ nullable: true })
    deletedAt?: Date;

    @Field({ nullable: true })
    avatarUrl?: string;

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