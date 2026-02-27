import { Configuration, Value } from '@itgorillaz/configify'
import { IsEnum, IsInt, IsNotEmpty, IsString } from 'class-validator'

const nodeEnv = ['development', 'production', 'test'] as const
export type NodeEnvironment = (typeof nodeEnv)[number]

@Configuration()
export class AppConfiguration {
    @IsEnum(nodeEnv)
    @IsNotEmpty()
    @Value('NODE_ENV')
    nodeEnv: string

    @IsString()
    @IsNotEmpty()
    @Value('DATABASE_URL')
    databaseUrl: string

    @IsString()
    @IsNotEmpty()
    @Value('REDIS_URL')
    redisUrl: string

    @Value('REDIS_DEFAULT_TTL_MS', {
        parse: (value: any) => parseInt(value),
        default: 60000,
    })
    redisDefaultTtlMs: number

    @IsString()
    @IsNotEmpty()
    @Value('GOOGLE_GENERATIVE_AI_API_KEY')
    googleGenerativeAiApiKey: string
}
