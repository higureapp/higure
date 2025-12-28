import { Configuration, Value } from '@itgorillaz/configify'
import { IsEnum, IsNotEmpty, IsString } from 'class-validator'

const nodeEnv = ['development', 'production', 'test'] as const
export type NodeEnvironment = (typeof nodeEnv)[number]

@Configuration()
export class AppConfiguration {
    @Value('NODE_ENV')
    @IsEnum(nodeEnv)
    @IsNotEmpty()
    nodeEnv: string

    @Value('DATABASE_URL')
    @IsString()
    @IsNotEmpty()
    databaseUrl: string
}
