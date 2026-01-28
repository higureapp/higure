import { Field, NumberScalarMode, ObjectType } from '@nestjs/graphql'
import { Expose } from 'class-transformer'

@ObjectType()
export class Journal {
    @Field()
    @Expose()
    id: string

    @Field()
    @Expose()
    userId: string

    @Field()
    @Expose()
    date: Date

    @Field({ nullable: true })
    @Expose()
    time?: Date

    @Field({ nullable: true })
    @Expose()
    location?: string

    @Field()
    @Expose()
    content: string

    @Field()
    @Expose()
    mood: number

    @Field()
    @Expose()
    lastModified: Date

    @Field()
    @Expose()
    createdAt: Date
    updatedAt: Date
}
