import { Skin } from "@/constants/skin";
import { supabase } from "@/utils/supabase";

export const fetchSkinsByIds = async (skinIds: string[]): Promise<Skin[]> => {
    if (!skinIds || skinIds.length === 0) {
        return [];
    }
    const { data, error } = await supabase
        .from('skins')
        .select('id, name, image, rarity, min_float, max_float, prices')
        .in('id', skinIds);

    if (error) throw new Error(error.message);

    return (data as any[]).map((s) => ({
        id: s.id,
        name: s.name,
        image: s.image,
        rarity: s.rarity,
        minFloat: s.min_float,
        maxFloat: s.max_float,
        prices: s.prices,
    }));
};
