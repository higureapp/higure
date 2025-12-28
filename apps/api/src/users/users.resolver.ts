import { Mutation, Query, Resolver } from '@nestjs/graphql';
import { User } from './models/user.model';
import { UsersService } from './users.service';
import { plainToInstance } from 'class-transformer';
import { Public } from 'src/auth/decorators/public.decorator';
import { AppConfiguration } from 'src/config/app.config';

@Resolver(of => User)
export class UsersResolver {
    constructor(
        private readonly userService: UsersService,
        private readonly config: AppConfiguration
    ) { }

    @Public()
    @Query(returns => String)
    chad() {
        return 'Chad!';
    }

    @Public()
    @Mutation(returns => User)
    async hello(): Promise<User> {
        console.log(this.config.databaseUrl)
        return await this.userService.create({
            firstname: 'Davide',
            lastname: 'usberti',
            email: 'usbertibox@gmail.com',
            password: 'abc',
            timezone: 'US',
            locale: 'IT',
        })
    }

    @Public()
    @Query(returns => [User])
    async users() {
        const users = await this.userService.findAll();

        return users.map(u => plainToInstance(User, u, {
            excludeExtraneousValues: true
        }))
    }
}
