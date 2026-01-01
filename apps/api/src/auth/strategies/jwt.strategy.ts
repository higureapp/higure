import { Inject, Injectable, UnauthorizedException } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { ExtractJwt, Strategy } from 'passport-jwt'
import { AuthService } from '../auth.service'
import { JwtPayload } from '../interfaces/jwt-payload.interface'
import { CurrentUserType } from '../decorators/current-user.decorator'
import { AuthConfiguration } from '../config/auth.config'

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(
        @Inject(AuthConfiguration)
        private readonly authConfig: AuthConfiguration,
        private readonly authService: AuthService,
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: authConfig.jwtSecret,
        })
    }

    async validate(payload: JwtPayload): Promise<CurrentUserType> {
        const user = await this.authService.validateUser(payload.sub)

        if (!user) {
            throw new UnauthorizedException('User not found')
        }

        return {
            userId: payload.sub,
            email: payload.email,
        }
    }
}
