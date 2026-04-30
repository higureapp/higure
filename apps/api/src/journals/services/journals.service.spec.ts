import { Test, TestingModule } from '@nestjs/testing'
import { JournalsService } from './journals.service'
import { JournalsRepository } from '../journals.repository'
import { UsersService } from '@/users/services/users.service'
import { JournalPageMapper } from '../mappers/journals.mapper'
import { NotFoundException } from '@nestjs/common'
import { describe, it, beforeEach, jest, expect } from '@jest/globals'

describe('JournalsService', () => {
    let service: JournalsService
    let repository: jest.Mocked<JournalsRepository>
    let usersService: jest.Mocked<UsersService>
    let mapper: JournalPageMapper

    const mockUserId = 'user-1'
    const mockJournalId = 'journal-1'

    const mockPrismaPage = {
        id: mockJournalId,
        userId: mockUserId,
        content: 'Test content',
        date: new Date(),
        time: '12:00',
        location: 'Italy',
        mood: 'happy',
        isActive: true,
        lastModified: new Date(),
        createdAt: new Date(),
        updatedAt: new Date(),
        tags: [],
        metrics: null,
        aiAnalysis: null,
    }

    beforeEach(async () => {
        const mockRepository = {
            findMany: jest.fn(),
            count: jest.fn(),
            findById: jest.fn(),
            create: jest.fn(),
            update: jest.fn(),
            softDelete: jest.fn(),
            delete: jest.fn(),
        }

        const mockUsersService = {
            findOne: jest.fn(),
        }

        const module: TestingModule = await Test.createTestingModule({
            providers: [
                JournalsService,
                { provide: JournalsRepository, useValue: mockRepository },
                { provide: UsersService, useValue: mockUsersService },
                JournalPageMapper,
            ],
        }).compile()

        service = module.get<JournalsService>(JournalsService)
        repository = module.get(JournalsRepository)
        usersService = module.get(UsersService)
        mapper = module.get<JournalPageMapper>(JournalPageMapper)
    })

    it('should be defined', () => {
        expect(service).toBeDefined()
    })

    describe('getJournalPage', () => {
        it('should return a journal page if found', async () => {
            repository.findById.mockResolvedValue(mockPrismaPage as any)
            const result = await service.getJournalPage(
                mockJournalId,
                mockUserId,
            )
            expect(result.id).toEqual(mockJournalId)
            expect(repository.findById).toHaveBeenCalledWith(
                mockJournalId,
                mockUserId,
            )
        })

        it('should throw NotFoundException if not found', async () => {
            repository.findById.mockResolvedValue(null)
            await expect(
                service.getJournalPage(mockJournalId, mockUserId),
            ).rejects.toThrow(NotFoundException)
        })
    })

    describe('createJournalPage', () => {
        it('should create and return a new journal page', async () => {
            const input = { content: 'New content', date: new Date() }
            repository.create.mockResolvedValue({
                ...mockPrismaPage,
                ...input,
            } as any)

            const result = await service.createJournalPage(
                mockUserId,
                input as any,
            )

            expect(result.content).toEqual(input.content)
            expect(repository.create).toHaveBeenCalledWith(mockUserId, input)
        })
    })

    describe('getJournalPages', () => {
        it('should return paginated journal pages', async () => {
            repository.findMany.mockResolvedValue([mockPrismaPage] as any)
            repository.count.mockResolvedValue(1)

            const result = await service.getJournalPages(mockUserId)

            expect(result.pages).toHaveLength(1)
            expect(result.totalCount).toBe(1)
            expect(result.totalPages).toBe(1)
            expect(result.hasMore).toBe(false)
        })
    })

    describe('softDeleteJournalPage', () => {
        it('should soft delete and return the page', async () => {
            repository.softDelete.mockResolvedValue({
                ...mockPrismaPage,
                isActive: false,
            } as any)
            const result = await service.softDeleteJournalPage(
                mockJournalId,
                mockUserId,
            )
            expect(result.isActive).toBe(false)
            expect(repository.softDelete).toHaveBeenCalledWith(
                mockJournalId,
                mockUserId,
            )
        })
    })

    describe('deleteJournalPage', () => {
        it('should permanently delete and return true', async () => {
            repository.delete.mockResolvedValue(undefined as any)
            const result = await service.deleteJournalPage(
                mockJournalId,
                mockUserId,
            )
            expect(result).toBe(true)
            expect(repository.delete).toHaveBeenCalledWith(
                mockJournalId,
                mockUserId,
            )
        })
    })
})
