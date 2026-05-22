import { Module } from '@nestjs/common'
import { SearchResolver } from './search.resolver'
import { SearchService } from './services/search.service'
import { SearchRepository } from './search.repository'
import { PrismaService } from '../database/prisma.service'
import { SearchMapper } from './mappers/search.mapper'
import { JournalsModule } from '../journals/journals.module'

@Module({
    imports: [JournalsModule],
    providers: [
        SearchResolver,
        SearchMapper,
        SearchService,
        SearchRepository,
        PrismaService,
    ],
})
export class SearchModule {}
