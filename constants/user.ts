export interface Profile {
    id: string;
    username: string;
    email: string;
    avatar: string;
    balance: number;
    is_premium: boolean;
    shop_balance: number;
    date_daily_reward: string;
    date_weekly_reward: string;
}