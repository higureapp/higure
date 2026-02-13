import { ObjectType, Field } from "@nestjs/graphql";
import { SongsModel } from "./songs.model";

@ObjectType()
export class AnalysisModel {
    @Field(() => String)
    id: string;

    @Field(() => String)
    journalPageId: string;

    @Field(() => String)
    criticalAnalysis: string;

    @Field(() => [SongsModel])
    suggestedSongs: SongsModel[];

    @Field(() => String, { nullable: true })
    quote: string | null;

    @Field(() => String, { nullable: true })
    quoteAuthor: string | null;

    @Field(() => Date)
    generatedAt: Date;

    @Field(() => String)
    modelVersion: string;
}