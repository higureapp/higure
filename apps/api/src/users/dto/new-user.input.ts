import { Field, InputType } from "@nestjs/graphql";
import { IsEmail, IsOptional, IsPhoneNumber, IsString, MaxLength, MinLength } from 'class-validator';

@InputType()
export class NewUserInput {
    
    @Field()
    @IsEmail()
    email: string;

    @Field()
    @MinLength(8)
    @MaxLength(120)
    password: string;

    @Field()
    @IsString()
    @MinLength(4)
    @MaxLength(40)
    @IsOptional()
    firstname: string;

    @Field()
    @IsString()
    @MinLength(4)
    @MaxLength(40)
    @IsOptional()
    lastname: string;

    @Field()
    @IsPhoneNumber()
    @IsOptional()
    phone?: string;
}