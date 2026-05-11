
export interface Reward {
    id: string;
    rank_start: number;
    rank_end: number;
    price: number;
    days_premium: number;
}

export interface ProfileLeaderboard {
    id: string;
    username: string;
    avatar: string;
    balance: number;
    is_premium: boolean;
    score: number;
}

export interface Leaderboard {
    id: string;
    created_at: string;
    start_date: string;
    end_date: string;
    title: string;
    max_players: number;
    current_players: number;
    rewards: Reward[];
    profiles: ProfileLeaderboard[];
};