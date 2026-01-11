import { sdk } from '@/lib/graphql-client';
import { useQuery } from '@tanstack/react-query';
import { StatsPeriod } from '@/gql_generated/graphql';

export function useGetHabitStatsQuery(habitId: string, period: StatsPeriod) {
    const { data, isLoading, isError, error } = useQuery({
        queryKey: ['habitStats', habitId, period],
        queryFn: async () => {
            const result = await sdk.GetHabitStats({ habitId, period });
            return result;
        },
        enabled: !!habitId,
    });

    return {
        data,
        loading: isLoading,
        error,
        isError,
    };
}
