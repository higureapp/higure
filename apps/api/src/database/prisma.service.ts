import {
    Injectable,
    Logger,
    OnModuleDestroy,
    OnModuleInit,
} from '@nestjs/common'
import { PrismaClient } from '../generated/prisma/client'
import { PrismaMariaDb } from '@prisma/adapter-mariadb'
import { AppConfiguration } from 'src/config/app.config'

@Injectable()
export class PrismaService
    extends PrismaClient
    implements OnModuleInit, OnModuleDestroy {
    private logger = new Logger('PrismaService');

    constructor(private readonly appConfig: AppConfiguration) {
        //const adapter = new PrismaPg({ url: appConfig.databaseUrl })

        const connectionString = appConfig.databaseUrl
        const url = new URL(connectionString)
        const adapter = new PrismaMariaDb({
            host: url.hostname,
            port: Number.parseInt(url.port) || 3306,
            user: url.username,
            password: url.password,
            database: url.pathname.replace(/^\//, ''),
        })
        super({ adapter })
    }

    async onModuleInit() {
        try {
            this.logger.log('Connected to database');
            await this.$connect()
        } catch (error) {
            this.logger.error('Database connection failed', error);
        }
    }

    async onModuleDestroy() {
        try {
            await this.$disconnect()
        } catch (error) {
            this.logger.error('Error disconnecting from database', error);
        }
    }
}
