import { Query, Resolver } from '@nestjs/graphql';
import { User } from './models/user.model';

@Resolver(of => User)
export class UsersResolver {

    @Query(returns => String)
    hello(): string {
        return "User!";
    }
}
