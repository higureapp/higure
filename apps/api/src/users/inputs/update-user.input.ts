import { Field, InputType } from '@nestjs/graphql'
import {
    IsEmail,
    IsEnum,
    IsLocale,
    IsOptional,
    IsString,
    IsTimeZone,
    MaxLength,
    MinLength,
} from 'class-validator'
import { LanguageEnum, Theme } from '../models/user.model'

@InputType()
export class UpdateUserInput {
    @Field({ nullable: true })
    @IsOptional()
    @IsString()
    @MinLength(4)
    @MaxLength(40)
    firstname?: string

    @Field({ nullable: true })
    @IsOptional()
    @IsString()
    @MinLength(4)
    @MaxLength(40)
    lastname?: string

    @Field({ nullable: true })
    @IsOptional()
    @IsEmail()
    email?: string

    @Field({ nullable: true })
    @IsOptional()
    @IsTimeZone()
    timezone?: string

    @Field({ nullable: true })
    @IsOptional()
    @IsLocale()
    locale?: string

    @Field(() => LanguageEnum, { nullable: true })
    @IsOptional()
    @IsEnum(LanguageEnum)
    language?: LanguageEnum

    @Field(() => Theme, { nullable: true })
    @IsOptional()
    @IsEnum(Theme)
    theme?: Theme
}
