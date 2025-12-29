export interface JwtPayload {
    sub: string // userId
    email: string
    iat?: number // issued at
    exp?: number // expiration
}
