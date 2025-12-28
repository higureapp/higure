import {
    IsEmail,
    IsOptional,
    IsPhoneNumber,
    IsPositive,
    IsString,
    MaxLength,
    MinLength,
} from 'class-validator'

export class SignUpDto {
    @IsEmail()
    email: string

    @MinLength(8)
    @MaxLength(120)
    password: string

    @IsString()
    @MinLength(4)
    @MaxLength(40)
    firstname: string

    @IsString()
    @MinLength(4)
    @MaxLength(40)
    lastname: string

    @IsPhoneNumber()
    @IsOptional()
    phone?: string
}
