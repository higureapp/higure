import { registerAs } from '@nestjs/config'
import z from 'zod/v4'
import { AppConfig } from './app-config.type'

const nodeEnv = ['development', 'production', 'test'] as const
export type NodeEnvironment = (typeof nodeEnv)[number]

const environmentVariableValidator = z.object({
    NODE_ENV: z.enum(nodeEnv).optional(),
    DATABASE_URL: z.string(),
})

export default registerAs<AppConfig>('app', () => {
    const env = environmentVariableValidator.parse(process.env)

    return {
        nodeEnv: env.NODE_ENV || 'development',
        databaseUrl: env.DATABASE_URL,
    }
})
