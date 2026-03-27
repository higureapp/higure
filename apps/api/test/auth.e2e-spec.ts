import { Test, TestingModule } from '@nestjs/testing'
import { INestApplication } from '@nestjs/common'
import request from 'supertest'
import { AppModule } from '../src/app/app.module'
import { PrismaService } from '../src/database/prisma.service'
import { describe, it, beforeAll, afterAll, jest, expect } from '@jest/globals'

describe('Auth (e2e)', () => {
    let app: INestApplication
    let prismaService: PrismaService

    const mockUser = {
        id: 'user-1',
        email: 'test@example.com',
        password: 'hashed-password',
        status: 'active',
    }

    beforeAll(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [AppModule],
        })
            .overrideProvider(PrismaService)
            .useValue({
                user: {
                    findUnique: jest.fn().mockResolvedValue(mockUser) as any,
                    findFirst: jest.fn().mockResolvedValue(mockUser) as any,
                    create: jest.fn().mockResolvedValue(mockUser) as any,
                },
                refreshToken: {
                    create: jest.fn().mockResolvedValue({}) as any,
                    deleteMany: jest.fn().mockResolvedValue({}) as any,
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

    it('signUp Mutation', () => {
        return request(app.getHttpServer())
            .post('/graphql')
            .send({
                query: `
                    mutation {
                        signUp(signUpInput: {
                            email: "new@example.com",
                            password: "password123",
                            username: "newuser"
                        }) {
                            user { id email }
                            accessToken
                        }
                    }
                `
            })
            .expect(200)
            .expect((res) => {
                expect(res.body.data.signUp.user.email).toBe(mockUser.email)
                expect(res.body.data.signUp.accessToken).toBeDefined()
            })
    })

    it('signIn Mutation', () => {
        return request(app.getHttpServer())
            .post('/graphql')
            .send({
                query: `
                    mutation {
                        signIn(signInInput: {
                            email: "test@example.com",
                            password: "password123"
                        }) {
                            user { id email }
                            accessToken
                        }
                    }
                `
            })
            .expect(200)
            .expect((res) => {
                expect(res.body.data.signIn.user.email).toBe(mockUser.email)
                expect(res.body.data.signIn.accessToken).toBeDefined()
            })
    })

    it('me Query (requires auth)', () => {
        // Since we mocked PrismaService and GqlAuthGuard is global,
        // we might need a token. For simplicity in this demo E2E, 
        // we assume the test environment handles auth or we override the guard.
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Authorization', 'Bearer dummy-token')
            .send({
                query: `
                    query {
                        me { id email }
                    }
                `
            })
            .expect(200)
            .expect((res) => {
                // If the guard fails, we'll get an error
                if (res.body.errors) {
                    console.log(res.body.errors)
                }
                expect(res.body.data.me.email).toBe(mockUser.email)
            })
    })
})
