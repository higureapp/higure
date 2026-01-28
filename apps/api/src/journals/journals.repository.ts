import { Injectable } from '@nestjs/common'
import { PrismaService } from '../database/prisma.service'
import { Prisma } from '../generated/prisma/client'
import { IJournalsRepository } from './interfaces/journals-repository.interface'
import { Journal } from './models/journal.model'

@Injectable()
export class JournalsRepository implements IJournalsRepository {
    constructor(private readonly prismaService: PrismaService) {}

    async create(data: Prisma.JournalPageCreateInput) {
        return await this.prismaService.journalPage.create({
            data,
        })
    }
}
