import { supabase } from "@/utils/supabase";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useAuth } from "./useAuth";

export const useGrantReward = () => {
    const queryClient = useQueryClient();
    const { user } = useAuth();
    return useMutation({
        mutationFn: async ({ type }: { type: 'daily' | 'weekly' }) => {
            const { data, error } = await supabase.functions.invoke('get_reward', { body: { type_reward: type } });
            if (error) throw error;
            return data;
        },
        onError: (error) => {
            console.error('Error granting reward:', error);
        },
        onMutate: async ({ type }) => {
            const profileKey = ['profile', user?.id];

            await queryClient.cancelQueries({ queryKey: profileKey });
            const previousProfile = queryClient.getQueryData(profileKey);
            queryClient.setQueryData(profileKey, (old: any) => ({
                ...old,
                balance: old.balance + (type === 'daily' ? 10 : 100),
                date_daily_reward: type === 'daily' ? new Date().toISOString() : old.date_daily_reward,
                date_weekly_reward: type === 'weekly' ? new Date().toISOString() : old.date_weekly_reward,
            }));
            return { previousProfile };
        },
        onSettled: () => {
            queryClient.invalidateQueries({ queryKey: ['profile'] });
        }
    })
}
