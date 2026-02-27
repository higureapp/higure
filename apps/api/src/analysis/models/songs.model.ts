import { ObjectType, Field, Int, Float } from '@nestjs/graphql'
import { IsOptional } from 'class-validator'

@ObjectType()
export class SongsModel {
    @Field(() => String)
    spotifyUrl: string

    @Field(() => String)
    title: string

    @Field(() => String)
    album: string

    @Field(() => String)
    author: string

    @Field(() => Float)
    minutes: number

    @Field(() => String, { nullable: true })
    @IsOptional()
    coverUrl?: string | null

    @Field(() => String)
    reason: string
}
