import { NestFactory } from '@nestjs/core'

import { AppModule } from './app/app.module'
import { ValidationPipe } from '@nestjs/common'

async function bootstrap() {
    const app = await NestFactory.create(AppModule)
    app.enableCors({
        origin: ['http://localhost:5173', 'http://localhost:3000'],
        credentials: true,
        methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
        allowedHeaders: [
            'Content-Type',
            'Authorization',
            'Apollo-Require-Preflight',
        ],
    })
        ; (app.useGlobalPipes(
            new ValidationPipe({
                whitelist: true,
                forbidNonWhitelisted: true,
                transform: true,
            }),
        ),
            await app.listen(3000))
}

void bootstrap()
