import { Test, TestingModule } from '@nestjs/testing'
import { AnalysisService } from './analysis.service'
import { JournalsService } from '@/src/journals/services/journals.service'
import { AnalysisRepository } from '../analysis.repository'
import { AnalysisMapper } from '../mappers/analysis.mapper'
import { AiAnalysis } from '@higure/ai'
import { describe, it, beforeEach, jest, expect } from '@jest/globals'

jest.mock('@higure/ai', () => ({
    AiAnalysis: {
        generateAnalysis: jest.fn().mockResolvedValue({
            criticalAnalysis: 'Test analysis',
            suggestedSongs: [],
            metrics: {},
            quote: 'Test quote',
            quoteAuthor: 'Author'
        }) as any
    }
}))

describe('AnalysisService', () => {
    let service: AnalysisService
    let journalService: jest.Mocked<JournalsService>
    let repository: jest.Mocked<AnalysisRepository>

    const mockUserId = 'user-1'
    const mockJournalId = 'journal-1'
    const mockAnalysisId = 'analysis-1'

    const mockJournal = {
        id: mockJournalId,
        content: 'Test content',
        date: new Date(),
        location: 'Italy',
        mood: 'happy'
    } as any

    const mockPrismaAnalysis = {
        id: mockAnalysisId,
        journalPageId: mockJournalId,
        criticalAnalysis: 'Test analysis',
        suggestedSongs: [],
        metrics: {},
        quote: 'Test quote',
        quoteAuthor: 'Author',
        generatedAt: new Date(),
        modelVersion: '1.0'
    }

    beforeEach(async () => {
        const mockJournalService = {
            getJournalPage: jest.fn(),
        }

        const mockRepository = {
            getAnalysisByJournalPageId: jest.fn(),
            createAnalysis: jest.fn(),
            updateAnalysis: jest.fn(),
            deleteAnalysis: jest.fn(),
        }

        const module: TestingModule = await Test.createTestingModule({
            providers: [
                AnalysisService,
                { provide: JournalsService, useValue: mockJournalService },
                { provide: AnalysisRepository, useValue: mockRepository },
            ],
        }).compile()

        service = module.get<AnalysisService>(AnalysisService)
        journalService = module.get(JournalsService)
        repository = module.get(AnalysisRepository)
    })

    it('should be defined', () => {
        expect(service).toBeDefined()
    })

    describe('createAnalysis', () => {
        it('should return existing analysis if found', async () => {
            repository.getAnalysisByJournalPageId.mockResolvedValue(mockPrismaAnalysis as any)

            const result = await service.createAnalysis(mockUserId, mockJournalId)

            expect(result.id).toBe(mockAnalysisId)
            expect(journalService.getJournalPage).not.toHaveBeenCalled()
        })

        it('should generate and create new analysis if not found', async () => {
            repository.getAnalysisByJournalPageId.mockResolvedValue(null)
            journalService.getJournalPage.mockResolvedValue(mockJournal)
            repository.createAnalysis.mockResolvedValue(mockPrismaAnalysis as any)

            const result = await service.createAnalysis(mockUserId, mockJournalId)

            expect(result.id).toBe(mockAnalysisId)
            expect(AiAnalysis.generateAnalysis).toHaveBeenCalled()
            expect(repository.createAnalysis).toHaveBeenCalled()
        })
    })

    describe('getAnalysisByJournalPageId', () => {
        it('should return analysis model if found', async () => {
            repository.getAnalysisByJournalPageId.mockResolvedValue(mockPrismaAnalysis as any)
            const result = await service.getAnalysisByJournalPageId(mockJournalId)
            expect(result?.id).toBe(mockAnalysisId)
        })

        it('should return null if not found', async () => {
            repository.getAnalysisByJournalPageId.mockResolvedValue(null)
            const result = await service.getAnalysisByJournalPageId(mockJournalId)
            expect(result).toBeNull()
        })
    })
})
