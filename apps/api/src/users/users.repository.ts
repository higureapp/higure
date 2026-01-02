import { Injectable, Logger } from '@nestjs/common'
import { PrismaService } from '../database/prisma.service'
import { Prisma, User } from '../generated/prisma/client'
import { IUsersRepository } from './interfaces/users-repository.interface'

@Injectable()
export class UsersRepository implements IUsersRepository {
    private logger = new Logger('UsersRepository')

    constructor(private readonly prismaService: PrismaService) {
        this.logger.log('UsersRepository initialized: ' + !!this.prismaService)
    }

    public async create(data: Prisma.UserCreateInput): Promise<User> {
        return await this.prismaService.user.create({
            data,
        })
    }

    public async findUnique(
        where: Prisma.UserWhereUniqueInput,
    ): Promise<User | null> {
        const user = await this.prismaService.user.findUnique({
            where,
        })

        return user
    }

    public async findFirst(where: Prisma.UserWhereInput): Promise<User | null> {
        const user = await this.prismaService.user.findFirst({
            where,
        })

        return user
    }

    public async findMany(where: Prisma.UserWhereInput): Promise<User[]> {
        return await this.prismaService.user.findMany({
            where,
        })
    }

    public async findOne(id: string): Promise<User | null> {
        return await this.findUnique({
            id,
        })
    }

    public async findOneByEmail(email: string): Promise<User | null> {
        return await this.findUnique({
            email,
        })
    }

    public async findAll(): Promise<User[]> {
        return await this.prismaService.user.findMany()
    }

    public async update(
        id: string,
        data: Prisma.UserUpdateInput,
    ): Promise<User> {
        return await this.prismaService.user.update({
            where: {
                id,
            },
            data,
        })
    }

    public async delete(id: string): Promise<void> {
        await this.prismaService.user.delete({
            where: {
                id,
            },
        })
    }

    public async softDelete(id: string): Promise<void> {
        await this.update(id, {
            status: 'deleted',
            deletedAt: new Date(),
        })
    }

    public async getAllSoftDeletedUsers(lte: Date): Promise<User[]> {
        return await this.findMany({
            status: 'deleted',
            deletedAt: lte,
        })
    }
}
