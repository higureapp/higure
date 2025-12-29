import { Field, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class SignUpOutput {

    @Field()
    access_token: string;

}