import { Module } from '@nestjs/common'
import { AuthService } from './auth.service'
import { AuthResolver } from './auth.resolver'
import { JwtModule } from '@nestjs/jwt'
import { AuthConfiguration } from './config/auth.config'
import { UsersModule } from '../users/users.module'
import { PassportModule } from '@nestjs/passport'
import { RefreshTokenService } from './refresh-token/refresh-token.service'
import { PrismaService } from 'src/database/prisma.service'
import { JwtStrategy } from './strategies/jwt.strategy'

@Module({
    imports: [
        UsersModule,
        PassportModule.register({
            defaultStrategy: 'jwt',
            session: false,
        }),
        JwtModule.registerAsync({
            global: true,
            useFactory: (config: AuthConfiguration) => ({
                secret: config.jwtSecret,
                signOptions: {
                    expiresIn: config.jwtExpiresIn,
                },
            }),
            inject: [AuthConfiguration],
        }),
    ],
    providers: [
        AuthService,
        AuthResolver,
        RefreshTokenService,
        JwtStrategy,
        PrismaService,
    ],
    exports: [AuthService],
})
export class AuthModule {}
