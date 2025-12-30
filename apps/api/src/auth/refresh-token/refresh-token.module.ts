import { Module } from '@nestjs/common'
import { RefreshTokenService } from './refresh-token.service'
import { PrismaService } from 'src/database/prisma.service'
import { RefreshTokenCron } from './refresh-token.cron'

@Module({
    imports: [PrismaService],
    providers: [RefreshTokenService, RefreshTokenCron],
    exports: [RefreshTokenService],
})
export class RefreshTokenModule {}
