import { Field, ObjectType, Int } from '@nestjs/graphql'
import { Journal } from '../models/journal.model'
import { Expose } from 'class-transformer'

@ObjectType()
export class GetJournalPagesOutput {
    @Field(() => [Journal])
    @Expose()
    pages: Journal[]

    @Field(() => Int)
    @Expose()
    totalCount: number

    @Field(() => Boolean)
    @Expose()
    hasMore: boolean

    @Field(() => Int)
    @Expose()
    currentPage: number

    @Field(() => Int)
    @Expose()
    totalPages: number
}
