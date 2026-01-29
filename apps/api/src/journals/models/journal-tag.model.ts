import { ObjectType, Field, ID } from '@nestjs/graphql'

@ObjectType()
export class JournalTag {
    @Field(() => ID)
    id: string

    @Field()
    name: string

    @Field({ nullable: true })
    color?: string
}
