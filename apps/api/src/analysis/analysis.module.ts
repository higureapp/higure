import { Module } from '@nestjs/common'
import { AnalysisResolver } from './analysis.resolver'
import { AnalisysService } from './services/analysis.service'
import { AnalysisRepository } from './analysis.repository'
import { PrismaService } from '../database/prisma.service'
import { AnalysisMapper } from './mappers/analysis.mapper'
import { JournalsModule } from '../journals/journals.module'

@Module({
    imports: [JournalsModule],
    providers: [
        AnalysisResolver,
        AnalysisMapper,
        AnalisysService,
        AnalysisRepository,
        PrismaService,
    ],
})
export class AnalysisModule {}
