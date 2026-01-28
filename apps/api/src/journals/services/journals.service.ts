import { Injectable } from '@nestjs/common'
import { Journal } from '../models/journal.model'
import { JournalsRepository } from '../journals.repository'
import { JournalsMapper } from '../mappers/journals.mapper'
import { CreateJournalInput } from '../inputs/create-journal.input'
import { UsersService } from '@/src/users/services/users.service'

@Injectable()
export class JournalsService {
    constructor(
        private readonly journalsRepository: JournalsRepository,
        private readonly usersService: UsersService,
    ) {}

    public async create(
        userId: string,
        input: CreateJournalInput,
    ): Promise<Journal> {
        const { date, time, location, content, mood, tagIds } = input
        const journal = await this.journalsRepository.create({
            date,
            time,
            location,
            content,
            mood,
            user: {
                connect: { id: userId },
            },
        })

        return JournalsMapper.toPublic(journal)
    }
}
