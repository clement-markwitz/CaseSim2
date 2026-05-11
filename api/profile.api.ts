import { Profile } from "@/constants/user";
import { supabase } from "@/utils/supabase";

export const fetchProfile = async (userId: string): Promise<Profile> => {
    const { data, error } = await supabase
        .rpc('get_profile_with_balances', { p_user_id: userId });

    if (error) {
        console.error("Erreur récupération profil RPC:", error);
        throw error;
    }

    if (!data) {
        throw new Error("Profil introuvable");
    }

    return data as Profile;
};