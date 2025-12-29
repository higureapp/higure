import { Resolver, Mutation, Args, Query } from '@nestjs/graphql'
import { AuthService } from './auth.service'
import { SignInInput } from './inputs/sign-in.input'
import { SignUpInput } from './inputs/sign-up.input'
import { RefreshTokenInput } from './inputs/refresh-token.input'
import { AuthResponse } from './types/auth-response.type'
import { SignUpResponse } from './types/sign-up-response.type'
import {
    CurrentUser,
    CurrentUserType,
} from './decorators/current-user.decorator'
import { Public } from './decorators/public.decorator'
import { User } from '../users/models/user.model'

@Resolver()
export class AuthResolver {
    constructor(private authService: AuthService) {}

    @Public()
    @Mutation(() => SignUpResponse)
    async signUp(
        @Args('signUpInput') signUpInput: SignUpInput,
    ): Promise<SignUpResponse> {
        return this.authService.signUp(signUpInput)
    }

    @Public()
    @Mutation(() => AuthResponse)
    async signIn(
        @Args('signInInput') signInInput: SignInInput,
    ): Promise<AuthResponse> {
        return this.authService.signIn(signInInput)
    }

    @Public()
    @Mutation(() => AuthResponse)
    async refreshToken(
        @Args('refreshTokenInput') refreshTokenInput: RefreshTokenInput,
    ): Promise<AuthResponse> {
        return this.authService.refreshTokens(refreshTokenInput.refreshToken)
    }

    @Mutation(() => String)
    async logout(
        @CurrentUser() user: CurrentUserType,
        @Args('refreshToken', { nullable: true }) refreshToken?: string,
    ): Promise<string> {
        await this.authService.logout(user.userId, refreshToken)
        return 'Logout successful'
    }

    @Mutation(() => String)
    async logoutAllDevices(
        @CurrentUser() user: CurrentUserType,
    ): Promise<string> {
        await this.authService.logoutAllDevices(user.userId)
        return 'Logged out from all devices'
    }

    @Query(() => User)
    async me(@CurrentUser() user: CurrentUserType): Promise<User> {
        return this.authService.validateUser(user.userId)
    }
}
