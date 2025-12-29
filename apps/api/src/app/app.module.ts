import { Module } from '@nestjs/common'
import { AppService } from './app.service'
import { AppController } from './app.controller'
import { GraphQLModule } from '@nestjs/graphql'
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo'
import { join } from 'path'
import { UsersModule } from '../users/users.module'
import { AuthModule } from '../auth/auth.module'
import { APP_GUARD } from '@nestjs/core'
import { GqlAuthGuard } from 'src/auth/guards/gql-auth.guard'
import { ConfigifyModule } from '@itgorillaz/configify'

@Module({
    imports: [
        ConfigifyModule.forRootAsync({}),
        GraphQLModule.forRoot<ApolloDriverConfig>({
            driver: ApolloDriver,
            playground: true,
            autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
        }),
        UsersModule,
        AuthModule,
    ],
    controllers: [AppController],
    providers: [
        AppService,
        {
            provide: APP_GUARD,
            useClass: GqlAuthGuard,
        },
    ],
})
export class AppModule {}
