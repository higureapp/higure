import { Configuration, Value } from '@itgorillaz/configify'
import { IsInt, IsNotEmpty, IsString } from 'class-validator'

@Configuration()
export class AuthConfiguration {
    @Value('JWT_SECRET')
    @IsString()
    @IsNotEmpty()
    jwtSecret: string

    @Value('JWT_EXPIRES_IN', {
        parse: (value: any) => parseInt(value),
    })
    @IsInt()
    jwtExpiresIn: number
}
