import { Prisma, User } from '@/generated/prisma/client'

export interface IUsersRepository {
    create(data: Prisma.UserCreateInput): Promise<User>
    findUnique(where: Prisma.UserWhereUniqueInput): Promise<User | null>
    findFirst(where: Prisma.UserWhereInput): Promise<User | null>
    findOne(id: string): Promise<User | null>
    findOneByEmail(email: string): Promise<User | null>
    findAll(): Promise<User[]>
    update(id: string, data: Prisma.UserUpdateInput): Promise<User>
    delete(id: string): Promise<void>
}
