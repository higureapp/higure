import { Field, InputType } from '@nestjs/graphql'
import { IsNotEmpty, IsString } from 'class-validator'

@InputType()
export class RefreshTokenInput {
    @Field(() => String, {
        description: 'The refresh token to use for re-authentication',
    })
    @IsString()
    @IsNotEmpty()
    refreshToken: string
}
