import { Module } from '@nestjs/common';
import { HabitsResolver } from './habits.resolver';
import { HabitsService } from './services/habits.service';
import { HabitsRepository } from './habits.repository';
import { PrismaService } from 'src/database/prisma.service';

@Module({
    providers: [
        HabitsResolver,
        HabitsService,
        HabitsRepository,
        PrismaService,
    ],
    exports: [HabitsService, HabitsRepository],
})
export class HabitsModule {}
