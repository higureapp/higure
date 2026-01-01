import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { UsersRepository } from '../users.repository';
import { RefreshTokenService } from '../../auth/refresh-token/refresh-token.service';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { ConflictException, NotFoundException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { UsersMapper } from '../mappers/users.mapper';
import { CacheKeys } from '../../cache/cache.keys';
import { User } from '@/src/generated/prisma/client';

describe('UsersService', () => {
    let service: UsersService;
    let usersRepository: Partial<UsersRepository>;
    let refreshTokenService: Partial<RefreshTokenService>;
    let cacheManager: any;

    const mockUser = {
        id: '1',
        email: 'test@example.com',
        firstname: 'John',
        lastname: 'Doe',
        password: 'hashed',
        status: 'active',
        timezone: 'US',
        locale: 'en',
        phone: '3333333333',
        avatarUrl: 'https://example.com/image.png',
        emailVerified: true,
        phoneVerified: true,
        lastLoginAt: new Date('2023-11-19'),
        createdAt: new Date('2023-10-19'),
        updatedAt: null,
        deletedAt: null,
    };

    const mockPublicUser = UsersMapper.toPublic(mockUser as User);

    beforeEach(async () => {
        usersRepository = {
            findOneByEmail: jest.fn().mockResolvedValue(null),
            create: jest.fn().mockResolvedValue(mockUser),
            findUnique: jest.fn().mockResolvedValue(mockUser),
            findFirst: jest.fn().mockResolvedValue(mockUser),
            findAll: jest.fn().mockResolvedValue([mockUser]),
            update: jest.fn().mockResolvedValue(mockUser),
            softDelete: jest.fn().mockResolvedValue(undefined),
        };

        refreshTokenService = {
            revokeAllUserTokens: jest.fn().mockResolvedValue(undefined),
        };

        cacheManager = {
            get: jest.fn().mockResolvedValue(null),
            set: jest.fn().mockResolvedValue(undefined),
        };

        //jest.spyOn(bcrypt, 'hash').mockImplementation('hashed');
        

        const module: TestingModule = await Test.createTestingModule({
            providers: [
                UsersService,
                { provide: UsersRepository, useValue: usersRepository },
                { provide: RefreshTokenService, useValue: refreshTokenService },
                { provide: CACHE_MANAGER, useValue: cacheManager },
            ],
        }).compile();

        service = module.get<UsersService>(UsersService);
    });


    it('should be defined', () => {
        expect(service).toBeDefined();
    });

    describe('create', () => {
        it('should create a user if email is not taken', async () => {
            (usersRepository.findOneByEmail as jest.Mock).mockResolvedValue(null);
            (usersRepository.create as jest.Mock).mockResolvedValue(mockUser);
            jest.spyOn(bcrypt, 'hash').mockResolvedValue('hashed' as never);

            const result = await service.create({ email: 'test@example.com', password: 'Password123!' } as any);
            expect(result).toEqual(mockPublicUser);
            expect(usersRepository.create).toHaveBeenCalled();
        });

        it('should throw ConflictException if email already exists', async () => {
            (usersRepository.findOneByEmail as jest.Mock).mockResolvedValue(mockUser);
            await expect(service.create({ email: 'test@example.com', password: 'Password123!' } as any))
                .rejects.toThrow(ConflictException);
        });
    });

    describe('findUnique', () => {
        it('should return public user if found and active', async () => {
            (usersRepository.findUnique as jest.Mock).mockResolvedValue(mockUser);
            const result = await service.findUnique({ id: '1' });
            expect(result).toEqual(mockPublicUser);
        });

        it('should throw NotFoundException if user not found', async () => {
            (usersRepository.findUnique as jest.Mock).mockResolvedValue(null);
            await expect(service.findUnique({ id: '1' })).rejects.toThrow(NotFoundException);
        });

        it('should throw NotFoundException if user is not active', async () => {
            (usersRepository.findUnique as jest.Mock).mockResolvedValue({ ...mockUser, status: 'deleted' });
            await expect(service.findUnique({ id: '1' })).rejects.toThrow(NotFoundException);
        });
    });

    describe('findFirst', () => {
        it('should return public user if found and active', async () => {
            (usersRepository.findFirst as jest.Mock).mockResolvedValue(mockUser);
            const result = await service.findFirst({ email: 'test@example.com' });
            expect(result).toEqual(mockPublicUser);
        });

        it('should throw NotFoundException if user not found or deleted', async () => {
            (usersRepository.findFirst as jest.Mock).mockResolvedValue(null);
            await expect(service.findFirst({ email: 'test@example.com' })).rejects.toThrow(NotFoundException);
        });
    });

    describe('findOne & findOneByEmail', () => {
        it('findOne should call findUnique', async () => {
            jest.spyOn(service, 'findUnique').mockResolvedValue(mockPublicUser);
            const result = await service.findOne('1');
            expect(result).toEqual(mockPublicUser);
            expect(service.findUnique).toHaveBeenCalledWith({ id: '1' });
        });

        it('findOneByEmail should call findUnique', async () => {
            jest.spyOn(service, 'findUnique').mockResolvedValue(mockPublicUser);
            const result = await service.findOneByEmail('test@example.com');
            expect(result).toEqual(mockPublicUser);
            expect(service.findUnique).toHaveBeenCalledWith({ email: 'test@example.com' });
        });
    });

    describe('findOneByEmailWithPassword', () => {
        it('should return user with password', async () => {
            (usersRepository.findUnique as jest.Mock).mockResolvedValue(mockUser);
            const result = await service.findOneByEmailWithPassword('test@example.com');
            expect(result).toEqual(mockUser);
        });
    });

    describe('findAll', () => {
        it('should return cached users if available', async () => {
            (cacheManager.get as jest.Mock).mockResolvedValue([mockPublicUser]);
            const result = await service.findAll();
            expect(result).toEqual([mockPublicUser]);
            expect(usersRepository.findAll).not.toHaveBeenCalled();
        });

        it('should fetch from repository and cache if not cached', async () => {
            (cacheManager.get as jest.Mock).mockResolvedValue(null);
            (usersRepository.findAll as jest.Mock).mockResolvedValue([mockUser]);
            const result = await service.findAll();
            expect(result).toEqual([mockPublicUser]);
            expect(cacheManager.set).toHaveBeenCalledWith(CacheKeys.users.getAll(), [mockPublicUser], 120);
        });
    });

    describe('update', () => {
        it('should update a user', async () => {
            jest.spyOn(service, 'findOne').mockResolvedValue(mockPublicUser);
            (usersRepository.update as jest.Mock).mockResolvedValue(mockUser);
            const result = await service.update('1', { email: 'new@example.com' } as any);
            expect(result).toEqual(mockPublicUser);
        });
    });

    describe('delete', () => {
        it('should delete user and revoke tokens', async () => {
            jest.spyOn(service, 'findOne').mockResolvedValue(mockPublicUser);
            await service.delete('1');
            expect(usersRepository.softDelete).toHaveBeenCalledWith('1');
            expect(refreshTokenService.revokeAllUserTokens).toHaveBeenCalledWith('1');
        });
    });
});
