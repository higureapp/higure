import { Module } from '@nestjs/common'
import { RefreshTokenService } from './refresh-token.service'
import { PrismaService } from '@/database/prisma.service'
import { RefreshTokenCron } from './refresh-token.cron'
import { JwtRefreshAuthGuard } from './refresh-token.guard'
import { JwtRefreshStrategy } from './refresh-token.strategy'

@Module({
    providers: [
        RefreshTokenService,
        RefreshTokenCron,
        JwtRefreshStrategy,
        JwtRefreshAuthGuard,
        PrismaService,
    ],
    exports: [
        RefreshTokenService,
        RefreshTokenCron,
        JwtRefreshAuthGuard,
        JwtRefreshStrategy,
    ],
})
export class RefreshTokenModule {}
