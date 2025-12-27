import { registerAs } from "@nestjs/config";
import z from "zod/v4";
import { AuthConfig } from "./auth-config.type";

export const environmentVariableValidator = z.object({
    JWT_SECRET: z.string(),
    JWT_EXPIRES_IN: z.string()
})

export default registerAs<AuthConfig>('auth', () => {
    const env = environmentVariableValidator.parse(process.env);

    return {
        jwtSecret: env.JWT_SECRET,
        jwtExpiresIn: +env.JWT_EXPIRES_IN
    }
})