import { Module } from '@nestjs/common'
import { ReflectionResolver } from './reflection.resolver'
import { ReflectionService } from './services/reflection.service'
import { ReflectionRepository } from './reflection.repository'
import { PrismaService } from '../database/prisma.service'
import { ReflectionMapper } from './mappers/reflection.mapper'
import { JournalsModule } from '../journals/journals.module'

@Module({
    imports: [JournalsModule],
    providers: [
        ReflectionResolver,
        ReflectionMapper,
        ReflectionService,
        ReflectionRepository,
        PrismaService,
    ],
})
export class ReflectionModule {}
