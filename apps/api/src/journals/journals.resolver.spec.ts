import { Test, TestingModule } from '@nestjs/testing'
import { JournalsResolver } from './journals.resolver'
import { JournalsService } from './services/journals.service'
import { describe, it, beforeEach, jest, expect } from '@jest/globals'
import { GetJournalPagesOutput } from './outputs/get-journals.output'
import { Journal } from './models/journal.model'

describe('JournalsResolver', () => {
    let resolver: JournalsResolver
    let service: jest.Mocked<JournalsService>

    const mockUser = { userId: 'user-1' } as any
    const mockJournalId = 'journal-1'
    const mockJournal = {
        id: mockJournalId,
        content: 'Test content',
    } as Journal

    beforeEach(async () => {
        const mockService = {
            getJournalPage: jest.fn(),
            getJournalPages: jest.fn(),
            createJournalPage: jest.fn(),
            updateJournalPage: jest.fn(),
            softDeleteJournalPage: jest.fn(),
            deleteJournalPage: jest.fn(),
            restoreJournalPage: jest.fn(),
        }

        const module: TestingModule = await Test.createTestingModule({
            providers: [
                JournalsResolver,
                { provide: JournalsService, useValue: mockService },
            ],
        }).compile()

        resolver = module.get<JournalsResolver>(JournalsResolver)
        service = module.get(JournalsService)
    })

    it('should be defined', () => {
        expect(resolver).toBeDefined()
    })

    describe('getJournalPage', () => {
        it('should call service.getJournalPage and return the result', async () => {
            service.getJournalPage.mockResolvedValue(mockJournal)
            const result = await resolver.getJournalPage(
                mockJournalId,
                mockUser,
            )
            expect(result).toEqual(mockJournal)
            expect(service.getJournalPage).toHaveBeenCalledWith(
                mockJournalId,
                mockUser.userId,
            )
        })
    })

    describe('getJournalPages', () => {
        it('should call service.getJournalPages and return the result', async () => {
            const paginationOutput: GetJournalPagesOutput = {
                pages: [mockJournal],
                totalCount: 1,
                currentPage: 1,
                totalPages: 1,
                hasMore: false,
            }
            service.getJournalPages.mockResolvedValue(paginationOutput)
            const result = await resolver.getJournalPages(mockUser)
            expect(result).toEqual(paginationOutput)
            expect(service.getJournalPages).toHaveBeenCalledWith(
                mockUser.userId,
                undefined,
                undefined,
            )
        })
    })

    describe('createJournalPage', () => {
        it('should call service.createJournalPage and return the result', async () => {
            const input = { content: 'New content', date: new Date() } as any
            service.createJournalPage.mockResolvedValue({
                ...mockJournal,
                ...input,
            })
            const result = await resolver.createJournalPage(mockUser, input)
            expect(result.content).toBe(input.content)
            expect(service.createJournalPage).toHaveBeenCalledWith(
                mockUser.userId,
                input,
            )
        })
    })

    describe('deleteJournalPage', () => {
        it('should call service.deleteJournalPage and return true', async () => {
            service.deleteJournalPage.mockResolvedValue(true)
            const result = await resolver.deleteJournalPage(
                mockJournalId,
                mockUser,
            )
            expect(result).toBe(true)
            expect(service.deleteJournalPage).toHaveBeenCalledWith(
                mockJournalId,
                mockUser.userId,
            )
        })
    })
})
