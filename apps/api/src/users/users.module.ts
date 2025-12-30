import { Module } from '@nestjs/common'
import { UsersResolver } from './users.resolver'
import { UsersService } from './users.service'
import { PrismaService } from 'src/database/prisma.service'
import { UsersRepository } from './users.repository'

@Module({
    providers: [UsersResolver, UsersService, UsersRepository, PrismaService],
    exports: [UsersService, UsersRepository],
})
export class UsersModule {}
