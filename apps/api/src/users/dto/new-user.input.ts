import { Field, InputType } from '@nestjs/graphql'
import {
    IsEmail,
    IsLocale,
    IsOptional,
    IsPhoneNumber,
    IsPositive,
    IsString,
    IsTimeZone,
    MaxLength,
    MinLength,
} from 'class-validator'

@InputType()
export class NewUserInput {
    @Field()
    @IsEmail()
    email: string

    @Field()
    @MinLength(8)
    @MaxLength(120)
    password: string

    @Field()
    @IsString()
    @MinLength(4)
    @MaxLength(40)
    firstname: string

    @Field()
    @IsString()
    @MinLength(4)
    @MaxLength(40)
    lastname: string

    @Field()
    @IsPhoneNumber()
    @IsOptional()
    phone?: string

    @Field()
    @IsTimeZone()
    @IsOptional()
    timezone?: string

    @Field()
    @IsLocale()
    @IsOptional()
    locale?: string
}
