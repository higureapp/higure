import { Prisma } from '@/src/generated/prisma/client'
import { Journal } from '../models/journal.model'

export interface IJournalsRepository {
    create(data: Prisma.JournalPageCreateInput): Promise<Journal>
}
