import { Module } from '@nestjs/common'
import { UserResolver } from './users.resolver'
import { UsersService } from './users.service'
import { PrismaService } from 'src/database/prisma.service'

@Module({
    providers: [UserResolver, UsersService, PrismaService],
    exports: [UsersService],
})
export class UsersModule {}
