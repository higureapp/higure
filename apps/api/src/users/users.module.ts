import { Module } from '@nestjs/common'
import { UsersResolver } from './users.resolver'
import { UsersService } from './services/users.service'
import { PrismaService } from '@/database/prisma.service'
import { UsersRepository } from './users.repository'
import { ScheduleModule } from '@nestjs/schedule'
import { RetentionService } from './services/users-retention.service'
import { RefreshTokenModule } from '../auth/refresh-token/refresh-token.module'

@Module({
    imports: [ScheduleModule.forRoot(), RefreshTokenModule],
    providers: [
        UsersResolver,
        UsersService,
        UsersRepository,
        RetentionService,
        PrismaService,
    ],
    exports: [UsersService, UsersRepository],
})
export class UsersModule {}
