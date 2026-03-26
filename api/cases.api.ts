import { Case } from "@/constants/case";
import { supabase } from "@/utils/supabase";

export const fetchCasesWithSkinsId = async (): Promise<Case[]> => {
    const { data, error } = await supabase
        .from('cases')
        .select(`
            id, name, image, price, type,
            skins ( id )
        `);

    if (error) throw new Error(error.message);

    return data.map((caisse: any) => ({
        id: caisse.id,
        name: caisse.name,
        image: caisse.image,
        price: caisse.price || 2.35,
        type: caisse.type,
        skinIds: caisse.skins.map((skin: any) => skin.id)
    }));
};