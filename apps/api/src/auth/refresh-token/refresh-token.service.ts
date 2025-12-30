import { Injectable } from '@nestjs/common'
import { PrismaService } from '../../database/prisma.service'
import * as bcrypt from 'bcrypt'
import { RefreshToken } from 'src/generated/prisma/client'

@Injectable()
export class RefreshTokenService {
    constructor(private prisma: PrismaService) {}

    /**
     * Returns a valid refresh token
     * @param userId User
     * @param token Access Token
     * @param expiresInDays (default: 7)
     * @returns
     */
    async createRefreshToken(userId: string, token: string, expiresInDays = 7) {
        const hashedToken = await bcrypt.hash(token, 10)
        const expireAt = new Date()
        expireAt.setDate(expireAt.getDate() + expiresInDays)

        return this.prisma.refreshToken.create({
            data: {
                hashedToken,
                userId,
                expireAt,
            },
        })
    }

    async findValidToken(token: string) {
        const hashedToken = await this.hashToken(token)

        const tokens = await this.prisma.refreshToken.findMany({
            where: {
                revoked: false,
                expireAt: {
                    gt: new Date(),
                },
            },
            include: {
                User: true,
            },
        })

        /* Verify token hash */
        for (const tokenRecord of tokens) {
            const isValid = await bcrypt.compare(token, tokenRecord.hashedToken)
            if (isValid) {
                return tokenRecord
            }
        }

        return null
    }

    async revokeToken(token: string) {
        const tokenRecord = await this.findValidToken(token)

        if (!tokenRecord) {
            return null
        }

        return this.prisma.refreshToken.update({
            where: { id: tokenRecord.id },
            data: { revoked: true },
        })
    }

    async revokeAllUserTokens(userId: string) {
        return this.prisma.refreshToken.updateMany({
            where: {
                userId,
                revoked: false,
            },
            data: {
                revoked: true,
            },
        })
    }

    async deleteExpiredTokens() {
        return this.prisma.refreshToken.deleteMany({
            where: {
                expireAt: {
                    lt: new Date(),
                },
            },
        })
    }

    async getUserActiveTokensCount(userId: string) {
        return this.prisma.refreshToken.count({
            where: {
                userId,
                revoked: false,
                expireAt: {
                    gt: new Date(),
                },
            },
        })
    }

    private async hashToken(token: string): Promise<string> {
        return bcrypt.hash(token, 10)
    }
}
