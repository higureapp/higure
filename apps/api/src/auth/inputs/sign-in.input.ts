import { Field, InputType } from '@nestjs/graphql'
import { Transform } from 'class-transformer'
import { IsEmail, IsNotEmpty, MaxLength, MinLength } from 'class-validator'
import { lowerCaseTransformer } from '@/utils/transformers/lower-case.transformer'

@InputType()
export class SignInInput {
    @Field()
    @IsEmail()
    @Transform(lowerCaseTransformer)
    @IsNotEmpty()
    email: string

    @Field()
    @MinLength(8)
    @MaxLength(120)
    @IsNotEmpty()
    password: string
}
