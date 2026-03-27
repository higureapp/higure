import { Test, TestingModule } from '@nestjs/testing'
import { INestApplication } from '@nestjs/common'
import request from 'supertest'
import { AppModule } from '../src/app/app.module'
import { PrismaService } from '../src/database/prisma.service'
import { describe, it, beforeAll, afterAll, jest, expect } from '@jest/globals'
import { GqlAuthGuard } from '../src/auth/guards/gql-auth.guard'
import { ExecutionContext } from '@nestjs/common'

describe('Journals (e2e)', () => {
    let app: INestApplication
    let prismaService: PrismaService

    const mockUserId = 'user-1'
    const mockJournalId = 'journal-1'
    const mockJournal = {
        id: mockJournalId,
        userId: mockUserId,
        content: 'Journal content',
        mood: 'happy',
        date: new Date(),
        time: '12:00',
        location: 'Italy',
        isActive: true,
        lastModified: new Date(),
        createdAt: new Date(),
        updatedAt: new Date(),
        tags: [],
        metrics: null,
        aiAnalysis: null,
    }

    beforeAll(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [AppModule],
        })
            .overrideGuard(GqlAuthGuard)
            .useValue({
                canActivate: (context: ExecutionContext) => {
                    const ctx = context.switchToHttp().getRequest()
                    ctx.user = { userId: mockUserId }
                    return true
                },
            })
            .overrideProvider(PrismaService)
            .useValue({
                journalPage: {
                    findMany: jest.fn().mockResolvedValue([mockJournal]),
                    findUnique: jest.fn().mockResolvedValue(mockJournal),
                    create: jest.fn().mockResolvedValue(mockJournal),
                    update: jest
                        .fn()
                        .mockResolvedValue({
                            ...mockJournal,
                            content: 'Updated',
                        }),
                    delete: jest.fn().mockResolvedValue(true),
                    count: jest.fn().mockResolvedValue(1),
                },
                $connect: jest.fn(),
                $disconnect: jest.fn(),
            })
            .compile()

        app = moduleFixture.createNestApplication()
        await app.init()
        prismaService = moduleFixture.get<PrismaService>(PrismaService)
    })

    afterAll(async () => {
        await app.close()
    })

    it('getJournalPages Query', () => {
        return request(app.getHttpServer())
            .post('/graphql')
            .send({
                query: `
                    query {
                        journalPages {
                            pages { id content }
                            totalCount
                        }
                    }
                `,
            })
            .expect(200)
            .expect((res) => {
                expect(res.body.data.journalPages.pages[0].id).toBe(
                    mockJournalId,
                )
                expect(res.body.data.journalPages.totalCount).toBe(1)
            })
    })

    it('createJournalPage Mutation', () => {
        return request(app.getHttpServer())
            .post('/graphql')
            .send({
                query: `
                    mutation {
                        createJournalPage(input: {
                            content: "New journal entry",
                            date: "${new Date().toISOString()}",
                            mood: "happy"
                        }) {
                            id content
                        }
                    }
                `,
            })
            .expect(200)
            .expect((res) => {
                expect(res.body.data.createJournalPage.id).toBe(mockJournalId)
            })
    })

    it('getJournalPage Query', () => {
        return request(app.getHttpServer())
            .post('/graphql')
            .send({
                query: `
                    query {
                        journalPage(id: "${mockJournalId}") {
                            id content
                        }
                    }
                `,
            })
            .expect(200)
            .expect((res) => {
                expect(res.body.data.journalPage.id).toBe(mockJournalId)
            })
    })
})
