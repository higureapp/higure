import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { User } from './models/user.model';
import { UsersService } from './users.service';
import { plainToInstance } from 'class-transformer';
import { Public } from 'src/auth/decorators/public.decorator';
import { AppConfiguration } from 'src/config/app.config';
import { NotFoundException } from '@nestjs/common';

@Resolver(of => User)
export class UsersResolver {
    constructor(
        private readonly userService: UsersService,
        private readonly config: AppConfiguration
    ) { }

    @Public()
    @Query(() => User)
    async findUser(@Args('id', { type: () => String }) id: string) {
        const user = await this.userService.findOne(id);

        if (!user)
            throw new NotFoundException('User not found');

        return user;
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
