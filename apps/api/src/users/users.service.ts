import {
    ConflictException,
    Injectable,
    NotFoundException,
} from '@nestjs/common'
import { Prisma, User } from 'src/generated/prisma/client'
import { PrismaService } from 'src/database/prisma.service'
import * as bcrypt from 'bcrypt'
import { UsersRepository } from './users.repository'

type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
type UserWithoutPassword = Omit<User, 'password'>;

@Injectable()
export class UsersService {
    constructor(
        private readonly prismaService: PrismaService,
        private readonly usersRepository: UsersRepository
    ) { }

    /**
     * Data filtering is processed by services, so 
     * this simple utility delete the attribute `password`
     * from a given user entity.
     * @param user 
     * @returns 
     */
    private excludePassword(user: User): UserWithoutPassword {
        const { password, ...userWithoutPassword } = user;
        return userWithoutPassword;
    }

    private excludeSensitiveFields(user: User): UserWithoutPassword {
        const { password, ...safeUser } = user;
        return safeUser;
    }

    private exclude<T, Key extends keyof T>(
        entity: T,
        ...keys: Key[]
    ): Omit<T, Key> {
        for (const key of keys) {
            delete entity[key];
        }
        return entity;
    }


    public async create(data: Prisma.UserCreateInput) {
        const existingUser = await this.usersRepository.findOneByEmail(data.email);

        if (existingUser) {
            throw new ConflictException('Email already registered')
        }

        const hashedPassword = await bcrypt.hash(data.password, 10)

        const newUser = await this.usersRepository.create({
            ...data,
            password: hashedPassword,
        });

        return this.excludePassword(newUser);
    }

    public async findUnique(where: Prisma.UserWhereUniqueInput) {
        const user = await this.prismaService.user.findUnique({
            where,
        })

        if (!user) {
            throw new NotFoundException('User not found')
        }

        return this.excludePassword(user);
    }

    public async findFirst(where: Prisma.UserWhereInput) {
        const user = await this.prismaService.user.findFirst({
            where,
        })

        if (!user) {
            throw new NotFoundException('User not found')
        }

        return this.excludePassword(user);
    }

    public async findOne(id: string) {
        return await this.findUnique({
            id,
        })
    }

    public async findOneByEmail(email: string) {
        return await this.findUnique({
            email,
        })
    }

    /**
     * !! ATTENTION !!
     * You should not use this method outside authentication
     * purposes. This method could be return security-sensitive data.
     * @param email 
     */
    public async findOneByEmailWithPassword(email: string) {
        return await this.usersRepository.findUnique({
            email
        })
    }

    public async findAll() {
        const users = await this.usersRepository.findAll();

        return users.map(u => this.excludePassword(u));
    }

    public async update(id: string, data: Prisma.UserUpdateInput) {
        await this.findOne(id);
        const updatedUser = await this.usersRepository.update(id, data);

        return this.excludePassword(updatedUser);
    }

    public async delete(id: string) {
        await this.findOne(id);
        await this.usersRepository.delete(id);
    }
}
