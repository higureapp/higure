import { sdk } from "@/lib/graphql-client";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getAccessToken, clearAccessToken } from "@/lib/auth-store";

export function useMe() {
    const queryClient = useQueryClient();
    const token = getAccessToken();

    const { data, isLoading, isError, error } = useQuery({
        queryKey: ['me'],
        queryFn: async () => {
            const result = await sdk.GetMe();
            return result.me;
        },
        enabled: !!token,
    });

    const logout = () => {
        clearAccessToken();
        queryClient.setQueryData(['me'], null);
    };

    return {
        user: data,
        isLoading,
        isError,
        error,
        isLoggedIn: !!data,
        logout
    };
}
