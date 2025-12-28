import { Controller, Get, Inject } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { Public } from 'src/auth/decorators/public.decorator';

@Controller('users')
export class UsersController {
    
    @Get()
    @Public()
    hello(): string {
        return 'User!';
    }
}
