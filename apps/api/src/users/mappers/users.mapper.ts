import { User } from '@/src/generated/prisma/client'
import { User as UserModel } from '../models/user.model'

export class UsersMapper {
    public static toPublic(user: User): UserModel {
        return {
            id: user.id,
            firstname: user.firstname,
            lastname: user.lastname,
            email: user.email,
            phone: user.phone,
            timezone: user.timezone,
            locale: user.locale,
            emailVerified: user.emailVerified,
            phoneVerified: user.phoneVerified,
            lastLoginAt: user.lastLoginAt,
            createdAt: user.createdAt,
            updatedAt: user.updatedAt,
            deletedAt: user.deletedAt,
            avatarUrl: user.avatarUrl,
        }
    }

    public static toPublicArray(users: User[]): UserModel[] {
        return users.map(this.toPublic)
    }
}
