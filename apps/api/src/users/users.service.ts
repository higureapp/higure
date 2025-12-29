import {
    ConflictException,
    Injectable,
    NotFoundException,
} from '@nestjs/common'
import { Prisma } from 'src/generated/prisma/client'
import { PrismaService } from 'src/database/prisma.service'
import * as bcrypt from 'bcrypt'

@Injectable()
export class UsersService {
    constructor(private readonly prismaService: PrismaService) {}

    async create(data: Prisma.UserCreateInput) {
        const existingUser = await this.prismaService.user.findUnique({
            where: {
                email: data.email,
            },
        })

        if (existingUser) {
            throw new ConflictException('Email already registered')
        }

        const hashedPassword = await bcrypt.hash(data.password, 10)

        return this.prismaService.user.create({
            data: {
                ...data,
                password: hashedPassword,
            },
        })
    }

    async findOne(id: string) {
        const user = await this.prismaService.user.findUnique({
            where: {
                id,
            },
        })

        if (!user) {
            throw new NotFoundException('User not found')
        }

        return user
    }

    async findOneByEmail(email: string) {
        const user = await this.prismaService.user.findUnique({
            where: {
                email,
            },
        })

        if (!user) {
            throw new NotFoundException('User not found')
        }

        return user
    }

    async findAll() {
        return this.prismaService.user.findMany()
    }

    async delete(id: string) {
        return this.prismaService.user.delete({
            where: {
                id,
            },
        })
    }
}
