import { Field, ObjectType } from '@nestjs/graphql'
import { User } from '@/users/models/user.model'

@ObjectType()
export class SignUpResponse {
    @Field()
    access_token: string

    @Field()
    refresh_token: string

    @Field(() => User)
    user: User
}
