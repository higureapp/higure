import { sdk } from "@/lib/graphql-client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { setAccessToken } from "@/lib/auth-store";
import { SignUpInput } from "@/gql_generated/graphql";

export function useSignUp() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (variables: { input: SignUpInput }) => {
            return sdk.SignUp(variables);
        },
        onSuccess: (data) => {
            if (data.signUp.access_token) {
                setAccessToken(data.signUp.access_token);
                queryClient.invalidateQueries({ queryKey: ['me'] });
            }
        },
    });
}
