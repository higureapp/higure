import { Transform } from 'class-transformer'
import {
    IsEmail,
    IsNotEmpty,
    IsOptional,
    IsPhoneNumber,
    IsString,
    MaxLength,
    MinLength,
} from 'class-validator'
import { lowerCaseTransformer } from 'src/utils/transformers/lower-case.transformer'

export class SignInDto {
    @IsEmail()
    @Transform(lowerCaseTransformer)
    @IsNotEmpty()
    email: string

    @MinLength(8)
    @MaxLength(120)
    @IsNotEmpty()
    password: string
}
