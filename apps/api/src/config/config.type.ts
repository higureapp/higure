import { AuthConfig } from 'src/auth/config/auth-config.type'
import { AppConfig } from './app-config.type'

export type AllConfigType = {
    app: AppConfig,
    auth: AuthConfig
}
