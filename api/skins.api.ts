import { InventorySkin, Skin } from "@/constants/skin";
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

export const fetchInventory = async (userId: string): Promise<InventorySkin[]> => {
    const { data, error } = await supabase
        .from('inventory_items')
        .select('id, skins (id, name, image, rarity, min_float, max_float, prices), wear, price, float_value, is_stattrak, is_souvenir, type, status')
        .eq('owner_id', userId);

    if (error) throw new Error(error.message);

    return (data as any[]).map((s) => ({
        id: s.id,
        owner_id: s.owner_id,
        skins: s.skins,
        wear: s.wear,
        price: s.price,
        float_value: s.float_value,
        isStatTrak: s.is_stattrak,
        isSouvenir: s.is_souvenir,
        type: s.type,
        status: s.status,
    }));
};



