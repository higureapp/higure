import { AuthConfiguration } from 'src/auth/config/auth.config'
import { AppConfiguration } from './app.config'

export type AllConfigType = {
    app: AppConfiguration
    auth: AuthConfiguration
}
