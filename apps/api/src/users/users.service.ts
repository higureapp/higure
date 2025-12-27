import { Injectable } from '@nestjs/common';
import { NewUserInput } from './dto/new-user.input';
import { User } from './models/user.model';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class UsersService {
    constructor(private readonly prismaService: PrismaService) {}

    async create(data: NewUserInput): Promise<User> {
        const user = await this.prismaService.user.create({
            data: {
                ...data,
                timezone: '',
                locale: ''
            }
        })

        return user;
    }
}
