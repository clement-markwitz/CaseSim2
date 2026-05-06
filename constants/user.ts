export interface Profile {
    id: string;
    username: string;
    email: string;
    avatar: string;
    is_premium: boolean;
    balance: number | null;
    balance_event: number | null;
    active_weekly_leaderboard_id: number | null;
    active_event_leaderboard_id: number | null;
    shop_balance: number;
    date_daily_reward: string;
    date_weekly_reward: string;
}