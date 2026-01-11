// apps/web/components/Habits/DifficultyBadge.tsx
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { DifficultyLevel } from '@/gql_generated/graphql';

interface DifficultyBadgeProps {
  level: DifficultyLevel;
}

export function DifficultyBadge({ level }: DifficultyBadgeProps) {
  let colorClass = '';
  switch (level) {
    case DifficultyLevel.Easy:
      colorClass = 'bg-green-500';
      break;
    case DifficultyLevel.Normal:
      colorClass = 'bg-blue-500';
      break;
    case DifficultyLevel.Hard:
      colorClass = 'bg-yellow-500';
      break;
    case DifficultyLevel.Demanding:
      colorClass = 'bg-orange-500';
      break;
    case DifficultyLevel.Challenging:
      colorClass = 'bg-red-500';
      break;
    default:
      colorClass = 'bg-gray-500';
  }

  return (
    <Badge className={cn(colorClass, 'text-white')}>{level.toString()}</Badge>
  );
}
