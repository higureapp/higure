import { Module } from '@nestjs/common'

import { AppService } from './app.service'
import { AppController } from './app.controller'
import { ConfigModule, ConfigType } from '@nestjs/config'
import { GraphQLModule } from '@nestjs/graphql'
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo'
import { join } from 'path'
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import appConfig from './config/app.config'
import authConfig from './auth/config/auth.config'
import { JwtModule } from '@nestjs/jwt'
import { AllConfigType } from './config/config.type'
import { AuthConfig } from './auth/config/auth-config.type'
import { APP_GUARD } from '@nestjs/core'
import { AuthGuard } from './auth/auth.guard'

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            envFilePath: '.env',
            load: [
                appConfig,
                authConfig
            ]
        }),
        GraphQLModule.forRoot<ApolloDriverConfig>({
          driver: ApolloDriver,
          playground: true,
          autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
        }),
        UsersModule,
        AuthModule
    ],
    controllers: [AppController],
    providers: [AppService, {
        provide: APP_GUARD,
        useClass: AuthGuard
    }],
})
export class AppModule {}
