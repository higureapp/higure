import { Journal } from '../models/journal.model'

export class JournalsMapper {
    public static toPublic(journal: Journal): Journal {
        return {
            id: journal.id,
            userId: journal.userId,
            date: journal.date,
            time: journal.time,
            location: journal.location,
            content: journal.content,
            mood: journal.mood,
            lastModified: journal.lastModified,
            createdAt: journal.createdAt,
            updatedAt: journal.updatedAt,
        }
    }

    public static toPublicArray(journals: Journal[]): Journal[] {
        return journals.map(this.toPublic)
    }
}
