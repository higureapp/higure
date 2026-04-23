import { Injectable, UnauthorizedException } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import * as bcrypt from 'bcrypt'
import { UsersService } from '../users/services/users.service'
import { RefreshTokenService } from './refresh-token/refresh-token.service'
import { SignInInput } from './inputs/sign-in.input'
import { AuthConfiguration } from './config/auth.config'
import { SignUpInput } from './inputs/sign-up.input'
import { User } from '@/users/models/user.model'

@Injectable()
export class AuthService {
    constructor(
        private jwtService: JwtService,
        private authConfig: AuthConfiguration,
        private userService: UsersService,
        private refreshTokenService: RefreshTokenService,
    ) {}

    async signIn(signInInput: SignInInput): Promise<{
        access_token: string
        refresh_token: string
    }> {
        const user = await this.userService.findOneByEmailWithPassword(
            signInInput.email,
        )

        if (!user) {
            throw new UnauthorizedException('Invalid credentials')
        }

        if (user.status !== 'active') throw new UnauthorizedException()

        const isPasswordValid = await bcrypt.compare(
            signInInput.password,
            user.password,
        )

        if (!isPasswordValid) {
            throw new UnauthorizedException('Invalid credentials')
        }

        const tokens = await this.getTokens(user.id, user.email)

        await this.refreshTokenService.createRefreshToken(
            user.id,
            tokens.refresh_token,
        )

        return tokens
    }

    async signUp(signUpInput: SignUpInput): Promise<{
        access_token: string
        refresh_token: string
        user: User
    }> {
        const user = await this.userService.create({
            ...signUpInput,
            timezone: 'US',
            locale: 'en',
        })

        const tokens = await this.getTokens(user.id, user.email)
        await this.refreshTokenService.createRefreshToken(
            user.id,
            tokens.refresh_token,
        )

        return {
            ...tokens,
            user,
        }
    }

    async getTokens(userId: string, email: string) {
        const payload = { sub: userId, email }

        const [access_token, refresh_token] = await Promise.all([
            this.jwtService.signAsync(payload, {
                secret: this.authConfig.jwtSecret,
                expiresIn: this.authConfig.jwtExpiresIn,
            }),
            this.jwtService.signAsync(payload, {
                secret: this.authConfig.jwtRefreshSecret,
                expiresIn: '7d',
            }),
        ])

        return { access_token, refresh_token }
    }

    async refreshTokens(refreshToken: string) {
        const tokenRecord =
            await this.refreshTokenService.findValidToken(refreshToken)

        if (!tokenRecord) {
            throw new UnauthorizedException('Invalid refresh token')
        }

        try {
            const payload = await this.jwtService.verifyAsync(refreshToken, {
                secret: this.authConfig.jwtRefreshSecret,
            })

            const tokens = await this.getTokens(
                tokenRecord.userId,
                tokenRecord.User.email,
            )

            // revoke the old refresh token (rotation)
            await this.refreshTokenService.revokeToken(refreshToken)

            // create the new refresh token
            await this.refreshTokenService.createRefreshToken(
                tokenRecord.userId,
                tokens.refresh_token,
            )

            return tokens
        } catch (error) {
            throw new UnauthorizedException('Invalid or expired refresh token')
        }
    }

    async logout(userId: string, refreshToken?: string) {
        if (refreshToken) {
            // revoke the current token only (logout from device)
            await this.refreshTokenService.revokeToken(refreshToken)
        } else {
            // revoke all the user tokens (logout from all devices)
            await this.refreshTokenService.revokeAllUserTokens(userId)
        }

        return { message: 'Logout successful' }
    }

    async logoutAllDevices(userId: string) {
        await this.refreshTokenService.revokeAllUserTokens(userId)
        return { message: 'Logged out from all devices' }
    }

    async validateUser(userId: string) {
        return this.userService.findOne(userId)
    }
}
