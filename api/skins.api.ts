import { InventoryFilters } from "@/components/ui/AccordionFilter";
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
interface FetchInventoryParams {
    userId: string;
    pageParam: number;
    filters: InventoryFilters;
}

export const fetchInventory = async ({ userId, pageParam, filters }: FetchInventoryParams): Promise<InventorySkin[]> => {
    const limit = 25;
    const from = pageParam * limit;
    const to = from + limit - 1;

    // 1. La base de la requête (On utilise !inner pour pouvoir filtrer sur le nom du skin)
    let query = supabase
        .from('inventory_items')
        .select('id, skins!inner(id, name, image, rarity, min_float, max_float, prices), wear, price, float_value, is_stattrak, is_souvenir, type, status')
        .eq('owner_id', userId)
        .eq('status', 'inventory');

    // 2. Application des filtres DYNAMIQUES
    if (filters.search) {
        query = query.ilike('skins.name', `%${filters.search}%`);
    }
    if (filters.minPrice) {
        query = query.gte('price', parseFloat(filters.minPrice));
    }
    if (filters.maxPrice) {
        query = query.lte('price', parseFloat(filters.maxPrice));
    }

    if (filters.category === 'stattrak') query = query.eq('is_stattrak', true);
    else if (filters.category === 'souvenir') query = query.eq('is_souvenir', true);
    else if (filters.category === 'normal') {
        query = query.eq('is_stattrak', false).eq('is_souvenir', false);
    }

    // 3. Application du tri
    if (filters.sortBy === 'price_desc') query = query.order('price', { ascending: false });
    else if (filters.sortBy === 'price_asc') query = query.order('price', { ascending: true });
    else query = query.order('id', { ascending: false }); // Plus récents

    // 4. On demande seulement les 50 de cette page
    query = query.range(from, to);

    const { data, error } = await query;
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


