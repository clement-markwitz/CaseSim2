import { Leaderboard, ProfileLeaderboard, Reward } from "@/constants/leaderboard";
import { supabase } from "@/utils/supabase";

export interface FinalLeaderboardReward {
    prices: number;
    days_premium: number;
    pool_id: string;
    final_rank: number;
    leaderboard_id: number;
}

export const getFinalLeaderboardReward = async ({ userId }: { userId: string }): Promise<FinalLeaderboardReward | null> => {
    const { data, error } = await supabase.rpc('get_final_reward_leaderboards', { p_user_id: userId });

    if (error) {
        console.error("Erreur lors de la récupération de la récompense finale:", error);
        throw error;
    }

    if (!data) {
        return null;
    }

    return {
        prices: Number(data.prices),
        days_premium: Number(data.days_premium),
        pool_id: data.pool_id,
        final_rank: Number(data.final_rank),
        leaderboard_id: Number(data.leaderboard_id),
    };
};

export const getLeaderboard = async ({ id }: { id: string }): Promise<Leaderboard[] | null> => {
    const { data, error } = await supabase
        .rpc('get_leaderboards_for_user', { p_user_id: id, p_reward_pool: "classic_30" })
        .select(`
            id,
            created_at,
            start_date,
            end_date,
            title,
            is_active,
            max_players,
            current_players,
            reward_pools (
                rewards (
                    id, rank_start, rank_end, prices, days_premium
                )
            ),
            leaderboards_users (
                score,
                balance,
                profiles (
                    id, username, avatar, is_premium
                )
            )
        `);

    if (error) {
        console.error("Erreur lors de la récupération des leaderboards:", error);
        throw error;
    }
    // 🔄 Formatage des données renvoyées par Supabase pour coller à tes interfaces
    const rows = data as any[];
    const formattedLeaderboards: Leaderboard[] = rows.map((lb: any) => {
        // 1. Aplatir les récompenses (Supabase les met dans un tableau imbriqué à cause de reward_pools)
        const rawRewards = lb.reward_pools?.rewards || [];
        const rewards: Reward[] = rawRewards.map((r: any) => ({
            id: r.id.toString(),
            rank_start: r.rank_start,
            rank_end: r.rank_end,
            price: r.prices, // 👈 Attention: c'est "prices" en DB mais "price" dans ton TS
            days_premium: r.days_premium
        }));

        const rawUsers = lb.leaderboards_users || [];
        const profiles: ProfileLeaderboard[] = rawUsers.map((lu: any) => ({
            ...lu.profiles, // On récupère toutes les infos du profil (username, avatar...)
            score: Number(lu.score), // On y ajoute le score depuis la table de liaison
            balance: Number(lu.balance)
        })).sort((a: ProfileLeaderboard, b: ProfileLeaderboard) => (b.score || 0) - (a.score || 0)); // 🏆 On trie les joueurs du 1er au dernier !

        // 3. On retourne l'objet final propre
        return {
            id: lb.id.toString(),
            created_at: lb.created_at,
            start_date: lb.start_date,
            end_date: lb.end_date,
            title: lb.title,
            max_players: lb.max_players,
            current_players: lb.current_players,
            rewards,
            profiles
        };
    });

    return formattedLeaderboards;
};