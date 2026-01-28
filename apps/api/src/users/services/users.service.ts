import {
    ConflictException,
    Inject,
    Injectable,
    NotFoundException,
} from '@nestjs/common'
import { Prisma } from 'src/generated/prisma/client'
import * as bcrypt from 'bcrypt'
import { UsersRepository } from '../users.repository'
import { UsersMapper } from '../mappers/users.mapper'
import { Cache, CACHE_MANAGER } from '@nestjs/cache-manager'
import { CacheKeys } from '../../cache/cache.keys'
import { User as UserModel } from '../models/user.model'
import { RefreshTokenService } from '../../auth/refresh-token/refresh-token.service'

@Injectable()
export class UsersService {
    constructor(
        private readonly usersRepository: UsersRepository,
        private readonly refreshTokenService: RefreshTokenService,

        @Inject(CACHE_MANAGER)
        private readonly cacheManager: Cache,
    ) {}

    public async create(data: Prisma.UserCreateInput) {
        const existingUser = await this.usersRepository.findOneByEmail(
            data.email,
        )

        if (existingUser) {
            throw new ConflictException('Email already registered')
        }

        const hashedPassword = await bcrypt.hash(data.password, 10)

        const newUser = await this.usersRepository.create({
            ...data,
            password: hashedPassword,
        })

        return UsersMapper.toPublic(newUser)
    }

    public async findUnique(where: Prisma.UserWhereUniqueInput) {
        const user = await this.usersRepository.findUnique({
            ...where,
        })

        if (!user || user.status !== 'active') {
            throw new NotFoundException('User not found')
        }

        return UsersMapper.toPublic(user)
    }

    public async findFirst(where: Prisma.UserWhereInput) {
        const user = await this.usersRepository.findFirst({
            ...where,
        })

        if (!user || user.status !== 'active') {
            throw new NotFoundException('User not found')
        }

        return UsersMapper.toPublic(user)
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
            email,
        })
    }

    public async findAll() {
        const cachedUsers = await this.cacheManager.get<UserModel[]>(
            CacheKeys.users.getAll(),
        )

        if (cachedUsers) return cachedUsers

        const users = await this.usersRepository.findAll()
        const dto = UsersMapper.toPublicArray(users)

        await this.cacheManager.set(CacheKeys.users.getAll(), dto, 120)
        return dto
    }

    public async update(id: string, data: Prisma.UserUpdateInput) {
        await this.findOne(id)
        const updatedUser = await this.usersRepository.update(id, data)

        return UsersMapper.toPublic(updatedUser)
    }

    public async delete(id: string) {
        await this.findOne(id)
        await this.usersRepository.softDelete(id)
        await this.refreshTokenService.revokeAllUserTokens(id)
    }
}
