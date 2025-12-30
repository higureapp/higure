import { Module } from '@nestjs/common'
import { RefreshTokenService } from './refresh-token.service'
import { PrismaService } from 'src/database/prisma.service'
import { RefreshTokenCron } from './refresh-token.cron'
import { JwtRefreshAuthGuard } from './refresh-token.guard'
import { JwtRefreshStrategy } from './refresh-token.strategy'

@Module({
    imports: [PrismaService],
    providers: [RefreshTokenService, RefreshTokenCron, JwtRefreshStrategy],
    exports: [RefreshTokenService, RefreshTokenCron, JwtRefreshAuthGuard, JwtRefreshStrategy],
})
export class RefreshTokenModule {}
