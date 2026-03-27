import { Module } from '@nestjs/common'
import { AnalysisResolver } from './analysis.resolver'
import { AnalysisService } from './services/analysis.service'
import { AnalysisRepository } from './analysis.repository'
import { PrismaService } from '../database/prisma.service'
import { AnalysisMapper } from './mappers/analysis.mapper'
import { JournalsModule } from '../journals/journals.module'

@Module({
    imports: [JournalsModule],
    providers: [
        AnalysisResolver,
        AnalysisMapper,
        AnalysisService,
        AnalysisRepository,
        PrismaService,
    ],
})
export class AnalysisModule {}
