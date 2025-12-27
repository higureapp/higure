import { Injectable } from '@nestjs/common';
import { NewUserInput } from './dto/new-user.input';
import { Prisma, User } from 'src/generated/prisma/client';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class UsersService {
    constructor(private readonly prismaService: PrismaService) { }

    async create(data: Prisma.UserCreateInput): Promise<User> {
        const user = await this.prismaService.user.create({
            data: {
                ...data,
                timezone: data.timezone || 'UTC',
                locale: data.locale || 'en',
            }
        })

        return user;
    }

    async findOne(id: string): Promise<User | null> {
        return await this.prismaService.user.findUnique({
            where: {
                id
            }
        })
    }

    async findOneByEmail(email: string): Promise<User | null> {
        return await this.prismaService.user.findUnique({
            where: {
                email
            }
        });
    }
}
