import { Module } from '@nestjs/common'

import { AppService } from './app.service'
import { AppController } from './app.controller'
import { ConfigModule } from '@nestjs/config'
import { GraphQLModule } from '@nestjs/graphql'
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo'
import { join } from 'path'
import { UsersModule } from './users/users.module';

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            envFilePath: '.env',
        }),
        GraphQLModule.forRoot<ApolloDriverConfig>({
          driver: ApolloDriver,
          playground: true,
          autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
        }),
        UsersModule
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
