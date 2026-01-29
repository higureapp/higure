import { Module } from '@nestjs/common'
import { JournalsService } from './services/journals.service'
import { JournalsResolver } from './journals.resolver'
import { JournalsRepository } from './journals.repository'
import { UsersModule } from '../users/users.module'
import { PrismaService } from '../database/prisma.service'
import { JournalPageMapper } from './mappers/journals.mapper'

@Module({
    imports: [UsersModule],
    providers: [
        JournalsService,
        JournalsResolver,
        JournalsRepository,
        JournalPageMapper,
        PrismaService,
    ],
    exports: [JournalsRepository],
})
export class JournalsModule {}
