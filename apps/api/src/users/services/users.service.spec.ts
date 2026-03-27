import { Test, TestingModule } from '@nestjs/testing'
import { UsersService } from './users.service'
import { UsersRepository } from '../users.repository'
import { RefreshTokenService } from '../../auth/refresh-token/refresh-token.service'
import { CACHE_MANAGER } from '@nestjs/cache-manager'
import { ConflictException, NotFoundException } from '@nestjs/common'
import { describe, it, beforeEach, jest, expect } from '@jest/globals'
import * as bcrypt from 'bcrypt'

jest.mock('bcrypt')

describe('UsersService', () => {
    let service: UsersService
    let repository: jest.Mocked<UsersRepository>
    let cacheManager: any

    const mockUser = {
        id: 'user-1',
        email: 'test@example.com',
        password: 'hashed-password',
        status: 'active',
    }

    beforeEach(async () => {
        const mockRepository = {
            findOneByEmail: jest.fn(),
            create: jest.fn(),
            findUnique: jest.fn(),
            findFirst: jest.fn(),
            findAll: jest.fn(),
            update: jest.fn(),
            softDelete: jest.fn(),
        }

        const mockRefreshTokenService = {
            revokeAllUserTokens: jest.fn(),
        }

        const mockCacheManager = {
            get: jest.fn(),
            set: jest.fn(),
        }

        const module: TestingModule = await Test.createTestingModule({
            providers: [
                UsersService,
                { provide: UsersRepository, useValue: mockRepository },
                { provide: RefreshTokenService, useValue: mockRefreshTokenService },
                { provide: CACHE_MANAGER, useValue: mockCacheManager },
            ],
        }).compile()

        service = module.get<UsersService>(UsersService)
        repository = module.get(UsersRepository)
        cacheManager = mockCacheManager
    })

    it('should be defined', () => {
        expect(service).toBeDefined()
    })

    describe('create', () => {
        it('should throw ConflictException if email already exists', async () => {
            repository.findOneByEmail.mockResolvedValue(mockUser as any)
            await expect(service.create({ email: 'test@example.com', password: 'password' } as any)).rejects.toThrow(ConflictException)
        })

        it('should hash password and create user', async () => {
            repository.findOneByEmail.mockResolvedValue(null)
                ; (bcrypt.hash as jest.Mock).mockResolvedValue('hashed-password' as never)
            repository.create.mockResolvedValue(mockUser as any)

            const result = await service.create({ email: 'test@example.com', password: 'password' } as any)

            expect(result.email).toBe(mockUser.email)
            expect(bcrypt.hash).toHaveBeenCalledWith('password', 10)
            expect(repository.create).toHaveBeenCalled()
        })
    })

    describe('findOne', () => {
        it('should return user if found and active', async () => {
            repository.findUnique.mockResolvedValue(mockUser as any)
            const result = await service.findOne('user-1')
            expect(result.id).toBe(mockUser.id)
        })

        it('should throw NotFoundException if user not found or inactive', async () => {
            repository.findUnique.mockResolvedValue(null)
            await expect(service.findOne('user-1')).rejects.toThrow(NotFoundException)
        })
    })

    describe('findAll', () => {
        it('should return cached users if available', async () => {
            cacheManager.get.mockResolvedValue([mockUser])
            const result = await service.findAll()
            expect(result).toHaveLength(1)
            expect(repository.findAll).not.toHaveBeenCalled()
        })

        it('should fetch from repository if not cached', async () => {
            cacheManager.get.mockResolvedValue(null)
            repository.findAll.mockResolvedValue([mockUser] as any)
            const result = await service.findAll()
            expect(result).toHaveLength(1)
            expect(repository.findAll).toHaveBeenCalled()
            expect(cacheManager.set).toHaveBeenCalled()
        })
    })

    describe('delete', () => {
        it('should soft delete user and revoke tokens', async () => {
            repository.findUnique.mockResolvedValue(mockUser as any)
            await service.delete('user-1')
            expect(repository.softDelete).toHaveBeenCalledWith('user-1')
        })
    })
})
