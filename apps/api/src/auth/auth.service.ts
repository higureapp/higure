import { Injectable, UnauthorizedException } from '@nestjs/common'
import { SignInDto } from './dto/sign-in.dto'
import { UsersService } from 'src/users/users.service'
import { SignUpDto } from './dto/sign-up.dto'
import { JwtService } from '@nestjs/jwt'
import * as bcrypt from 'bcrypt'

@Injectable()
export class AuthService {
    constructor(
        private readonly userService: UsersService,
        private readonly jwtService: JwtService,
    ) {}

    async signIn(data: SignInDto): Promise<{ access_token: string }> {
        const user = await this.userService.findOneByEmail(data.email)

        const isPasswordValid = await bcrypt.compare(
            data.password,
            user.password,
        )

        if (!isPasswordValid) {
            throw new UnauthorizedException('Invalid credentials provided')
        }

        const payload = { sub: user.id, email: user.email }

        return {
            access_token: await this.jwtService.signAsync(payload),
        }
    }

    async signUp(data: SignUpDto): Promise<{ access_token: string }> {
        const existingUser = await this.userService.findOneByEmail(data.email)
        if (existingUser) {
            throw new UnauthorizedException('Email already in use')
        }

        const hashedPassword = await bcrypt.hash(data.password, 10)

        const user = await this.userService.create({
            ...data,
            password: hashedPassword,
            timezone: '',
            locale: '',
        })

        const payload = { sub: user.id, email: user.email }
        return {
            access_token: await this.jwtService.signAsync(payload),
        }
    }
}
