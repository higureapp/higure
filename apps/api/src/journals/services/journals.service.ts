import {
    ForbiddenException,
    Injectable,
    NotFoundException,
} from '@nestjs/common'
import { Journal } from '../models/journal.model'
import { JournalsRepository } from '../journals.repository'
import { JournalPageMapper } from '../mappers/journals.mapper'
import { CreateJournalInput } from '../inputs/create-journal.input'
import { UsersService } from '@/src/users/services/users.service'
import { UpdateJournalInput } from '../inputs/update-journal.input'
import { GetJournalInput } from '../inputs/get-journal.input'
import { JournalPageFilters } from '../filters/journal.filter'
import { JournalPaginationInput } from '../inputs/journal-pagination.input'
import { GetJournalPagesOutput } from '../outputs/get-journals.output'

@Injectable()
export class JournalsService {
    constructor(
        private readonly journalsRepository: JournalsRepository,
        private readonly usersService: UsersService,
        private readonly mapper: JournalPageMapper,
    ) {}

    async getJournalPages(
        userId: string,
        filters?: JournalPageFilters,
        pagination?: JournalPaginationInput,
    ): Promise<GetJournalPagesOutput> {
        const { page = 1, limit = 10 } = pagination || {}

        const [prismaPages, totalCount] = await Promise.all([
            this.journalsRepository.findMany(userId, filters, pagination),
            this.journalsRepository.count(userId, filters),
        ])

        const pages = this.mapper.toEntities(prismaPages)

        const totalPages = Math.ceil(totalCount / limit)
        const hasMore = page < totalPages

        return {
            pages,
            totalCount,
            hasMore,
            currentPage: page,
            totalPages,
        }
    }

    async getJournalPage(id: string, userId: string): Promise<Journal> {
        const prismaPage = await this.journalsRepository.findById(id, userId)

        if (!prismaPage) {
            throw new NotFoundException(`Journal page with ID ${id} not found`)
        }

        return this.mapper.toEntity(prismaPage)
    }

    async createJournalPage(
        userId: string,
        input: CreateJournalInput,
    ): Promise<Journal> {
        const prismaPage = await this.journalsRepository.create(userId, input)
        return this.mapper.toEntity(prismaPage)
    }

    async updateJournalPage(
        id: string,
        userId: string,
        input: UpdateJournalInput,
    ): Promise<Journal> {
        const prismaPage = await this.journalsRepository.update(
            id,
            userId,
            input,
        )
        return this.mapper.toEntity(prismaPage)
    }

    // DELETE (soft delete)
    async softDeleteJournalPage(id: string, userId: string): Promise<Journal> {
        const prismaPage = await this.journalsRepository.softDelete(id, userId)
        return this.mapper.toEntity(prismaPage)
    }

    // DELETE (hard delete)
    async deleteJournalPage(id: string, userId: string): Promise<boolean> {
        await this.journalsRepository.delete(id, userId)
        return true
    }

    // RESTORE (if soft deleted)
    async restoreJournalPage(id: string, userId: string): Promise<Journal> {
        const prismaPage = await this.journalsRepository.update(id, userId, {
            isActive: true,
        })
        return this.mapper.toEntity(prismaPage)
    }
}
