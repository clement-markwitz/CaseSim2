import { getFinalLeaderboardReward } from "@/api/leaderboard.api";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useRef } from "react";
import { useAuth } from "./useAuth";

export const usePendingLeaderboardReward = () => {
    const { user } = useAuth();
    const queryClient = useQueryClient();
    const lastSyncedRewardKey = useRef<string | null>(null);

    const query = useQuery({
        queryKey: ['leaderboard-reward', user?.id],
        queryFn: () => getFinalLeaderboardReward({ userId: user?.id! }),
        enabled: !!user?.id,
        refetchInterval: 1000 * 60 * 20,
        refetchOnMount: true,
        refetchOnWindowFocus: true,
    });

    useEffect(() => {
        if (!user?.id || !query.data) return;

        const rewardKey = `${query.data.leaderboard_id}-${query.data.final_rank}`;
        if (lastSyncedRewardKey.current === rewardKey) return;

        lastSyncedRewardKey.current = rewardKey;
        queryClient.invalidateQueries({ queryKey: ['profile', user.id] });
        queryClient.invalidateQueries({ queryKey: ['leaderboard', user.id] });
    }, [query.data, queryClient, user?.id]);

    return query;
};
