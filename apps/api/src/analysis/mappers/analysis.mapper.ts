import { JournalAIAnalysis } from '@/src/generated/prisma/client'
import { AnalysisModel } from '../models/analysis.model'
import { SongsModel } from '../models/songs.model'

export class AnalysisMapper {
    static toModel(entity: JournalAIAnalysis): AnalysisModel {
        const model = new AnalysisModel()

        model.id = entity.id
        model.journalPageId = entity.journalPageId
        model.criticalAnalysis = entity.criticalAnalysis
        model.quote = entity.quote
        model.quoteAuthor = entity.quoteAuthor
        model.generatedAt = entity.generatedAt
        model.modelVersion = entity.modelVersion

        model.suggestedSongs = this.mapSuggestedSongs(entity.suggestedSongs)

        return model
    }

    private static mapSuggestedSongs(jsonValue: any): SongsModel[] {
        if (!Array.isArray(jsonValue)) {
            return []
        }

        return jsonValue.map((song: any) => {
            const songModel = new SongsModel()
            songModel.spotifyUrl = song.spotifyUrl || ''
            songModel.title = song.title || ''
            songModel.album = song.album || ''
            songModel.author = song.artist || song.author || ''
            songModel.minutes = song.minutes || 0
            songModel.coverUrl = song.coverUrl || null
            songModel.reason = song.reason || ''
            return songModel
        })
    }

    static toModelArray(entities: JournalAIAnalysis[]): AnalysisModel[] {
        return entities.map((entity) => this.toModel(entity))
    }
}
