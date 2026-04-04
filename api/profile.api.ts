import { Profile } from "@/constants/user";
import { supabase } from "@/utils/supabase";

export const fetchProfile = async (userId: string): Promise<Profile> => {
    const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single();

    if (error) throw error;
    return data;
}