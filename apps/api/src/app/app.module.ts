import { Module } from '@nestjs/common'
import { AppService } from './app.service'
import { GraphQLModule } from '@nestjs/graphql'
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo'
import { join } from 'path'
import { UsersModule } from '../users/users.module'
import { AuthModule } from '../auth/auth.module'
import { APP_GUARD } from '@nestjs/core'
import { GqlAuthGuard } from '@/auth/guards/gql-auth.guard'
import { ConfigifyModule } from '@itgorillaz/configify'
import KeyvRedis from '@keyv/redis'
import { Keyv } from 'keyv'
import { CacheableMemory } from 'cacheable'
import { CacheModule } from '@nestjs/cache-manager'
import { AppConfiguration } from '../config/app.config'
import { JournalsModule } from '../journals/journals.module'
import { AnalysisModule } from '../analysis/analysis.module'

@Module({
    imports: [
        ConfigifyModule.forRootAsync({}),
        CacheModule.registerAsync({
            inject: [AppConfiguration],
            isGlobal: true,
            useFactory: async (config: AppConfiguration) => {
                return {
                    stores: [
                        new Keyv({
                            store: new CacheableMemory({
                                ttl: config.redisDefaultTtlMs,
                                lruSize: 5000,
                            }),
                        }),
                        new KeyvRedis(config.redisUrl),
                    ],
                }
            },
        }),
        GraphQLModule.forRoot<ApolloDriverConfig>({
            driver: ApolloDriver,
            playground: true,
            autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
        }),
        UsersModule,
        AuthModule,
        JournalsModule,
        AnalysisModule,
    ],
    providers: [
        AppService,
        {
            provide: APP_GUARD,
            useClass: GqlAuthGuard,
        },
    ],
})
export class AppModule {}
