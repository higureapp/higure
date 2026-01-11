import { Field, InputType } from '@nestjs/graphql';
import { IsBoolean, IsOptional } from 'class-validator';

@InputType()
export class HabitFilters {
    @Field({ nullable: true })
    @IsOptional()
    @IsBoolean()
    isActive?: boolean;
}
