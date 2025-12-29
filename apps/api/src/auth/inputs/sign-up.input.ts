import { Field, InputType } from '@nestjs/graphql'
import {
    IsEmail,
    IsOptional,
    IsPhoneNumber,
    IsString,
    Matches,
    MaxLength,
    MinLength,
} from 'class-validator'

@InputType()
export class SignUpInput {
    @Field()
    @IsEmail({}, { message: 'Please provide a valid email address' })
    email: string

    @Field()
    @IsString()
    @MinLength(8, { message: 'Password must be at least 8 characters long' })
    @MaxLength(32, { message: 'Password must not exceed 32 characters' })
    @Matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/,
        {
            message: 'Password must contain at least one uppercase letter, one lowercase letter, one number and one special character',
        },
    )
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

    @Field({ nullable: true })
    @IsPhoneNumber()
    @IsOptional()
    phone?: string
}
