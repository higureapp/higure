import { registerEnumType } from '@nestjs/graphql';
import { DifficultyLevel, FrequencyType } from '../../generated/prisma/enums';

registerEnumType(DifficultyLevel, {
    name: 'DifficultyLevel',
    description: 'The difficulty level of a habit.',
});

registerEnumType(FrequencyType, {
    name: 'FrequencyType',
    description: 'The frequency type of a habit.',
});

export enum StatsPeriod {
    WEEK,
    MONTH,
    YEAR,
}

registerEnumType(StatsPeriod, { name: 'StatsPeriod' });


export { DifficultyLevel, FrequencyType };
