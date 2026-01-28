import { Module } from '@nestjs/common'
import { JournalsService } from './services/journals.service'
import { JournalsResolver } from './journals.resolver'
import { JournalsRepository } from './journals.repository'
import { UsersService } from '../users/services/users.service'
import { UsersModule } from '../users/users.module'
import { PrismaService } from '../database/prisma.service'

@Module({
    imports: [UsersModule],
    providers: [
        JournalsService,
        JournalsResolver,
        JournalsRepository,
        PrismaService,
    ],
    exports: [JournalsRepository],
})
export class JournalsModule {}
