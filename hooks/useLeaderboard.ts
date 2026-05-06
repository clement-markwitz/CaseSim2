import { useQuery } from "@tanstack/react-query";
import { getLeaderboard } from "../api/leaderboard.api";
import { useAuth } from "./useAuth";

export const useLeaderboard = () => {
    const { user } = useAuth();
    return useQuery({
        queryKey: ['leaderboard', user?.id],
        queryFn: () => getLeaderboard({ id: user?.id! }),
        staleTime: 1000 * 10,
        refetchInterval: 1000 * 30,
        refetchOnWindowFocus: true,
    });
}