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
    constructor(private readonly prismaService: PrismaService) { }

    public async create(data: Prisma.UserCreateInput) {
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

    public async findUnique(where: Prisma.UserWhereUniqueInput) {
        const user = await this.prismaService.user.findUnique({
            where
        })

        if (!user) {
            throw new NotFoundException('User not found');
        }

        return user;
    }

    public async findFirst(where: Prisma.UserWhereInput) {
        const user = await this.prismaService.user.findFirst({
            where
        })

        if (!user) {
            throw new NotFoundException('User not found');
        }

        return user;
    }

    public async findOne(id: string) {
        return await this.findUnique({
            id
        })
    }

    public async findOneByEmail(email: string) {
        return await this.findUnique({
            email
        })
    }

    public async findAll() {
        return this.prismaService.user.findMany()
    }

    public async delete(id: string) {
        return this.prismaService.user.delete({
            where: {
                id,
            },
        })
    }
}
