import { Controller, Get, Inject } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { Public } from 'src/auth/decorators/public.decorator';
import appConfig from 'src/config/app.config';

@Controller('users')
export class UsersController {
    //constructor(
    //    @Inject(appConfig.KEY)
    //    private readonly config: ConfigType<typeof appConfig>
    //) {}

    @Get()
    @Public()
    hello(): string {
        return 'User!';
    }
}
