import { Field, ID, ObjectType, registerEnumType } from '@nestjs/graphql'
import { Expose } from 'class-transformer'
import { Sensitive } from '../../utils/decorators/sensitive.decorator'
import { LanguageEnum, Theme } from '../../generated/prisma/client'

registerEnumType(Theme, {
    name: 'Theme',
    description: 'User theme preference (dark or light)',
})

registerEnumType(LanguageEnum, {
    name: 'LanguageEnum',
    description: 'User language preference',
})

export { Theme, LanguageEnum }

@ObjectType()
export class User {
    @Field((type) => ID)
    @Expose()
    id: string

    @Field()
    @Expose()
    firstname: string

    @Field()
    @Expose()
    lastname: string

    @Field()
    @Expose()
    email: string

    @Field((type) => String, { nullable: true })
    @Sensitive()
    phone?: string | null

    @Field()
    @Expose()
    timezone: string

    @Field()
    @Expose()
    locale: string

    @Field(() => LanguageEnum)
    @Expose()
    language: LanguageEnum

    @Field(() => Theme)
    @Expose()
    theme: Theme

    @Field()
    @Expose()
    emailVerified: boolean

    @Field()
    @Expose()
    phoneVerified: boolean

    @Field(() => Date, { nullable: true })
    @Expose()
    lastLoginAt?: Date | null

    @Field(() => Date)
    @Expose()
    createdAt: Date

    @Field(() => Date)
    @Expose()
    updatedAt: Date

    @Field(() => Date, { nullable: true })
    @Expose()
    deletedAt?: Date | null

    @Field(() => String, { nullable: true })
    @Expose()
    avatarUrl?: string | null
}
