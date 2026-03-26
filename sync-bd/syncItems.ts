// scripts/seed_database.ts
import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
import * as fs from 'fs';
// Charge les variables d'environnement depuis le fichier .env (à la racine)
dotenv.config();

const SUPABASE_URL = process.env.EXPO_PUBLIC_SUPABASE_URL
const SUPABASE_SERVICE_ROLE_KEY = process.env.EXPO_SECRET_SUPABASE_KEY;
const API_KEY = process.env.API_KEY_CSMARKET;

if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY || !API_KEY) {
    console.error("❌ Erreur : Variables d'environnement manquantes dans le .env");
    process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);
const BATCH_SIZE = 500;

type Wear = 'FN' | 'MW' | 'FT' | 'WW' | 'BS';

const EXTERIOR_TO_WEAR: Record<string, Wear> = {
    'Factory New': 'FN',
    'Minimal Wear': 'MW',
    'Field-Tested': 'FT',
    'Well-Worn': 'WW',
    'Battle-Scarred': 'BS',
};

const emptyPrices = () => ({
    normal: { FN: 0, MW: 0, FT: 0, WW: 0, BS: 0 },
    stattrak: { FN: 0, MW: 0, FT: 0, WW: 0, BS: 0 },
    souvenir: { FN: 0, MW: 0, FT: 0, WW: 0, BS: 0 },
});

const detectCaseType = (item: any): string => {
    const name = item.market_hash_name.toLowerCase();
    if (name.includes('souvenir')) return 'souvenir';
    if (name.includes('sticker') || item.sticker_collection !== null) return 'sticker';
    return 'basique';
};

const formatToId = (name: string): string => {
    return name
        .replace(/ \| /g, '_')
        .replace(/[- ]/g, '_')
        .replace(/_+/g, '_');
};
const getCleanWeaponName = (rawName: string): string => {
    return rawName
        .replace('StatTrak™ ', '') // Enlève le StatTrak (attention au ™, copie-colle bien)
        .replace('Souvenir ', '')  // Enlève le Souvenir
        .trim();                   // Enlève les espaces en trop au cas où
};
const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

const putGoldKinfeAndFloves = (item: any) => {
    if (item.hash_name.includes("★")) return 'gold'
    return item.quality
}
const upsertInBatches = async (table: string, items: any[], conflict: string, maxRetries = 3) => {
    for (let i = 0; i < items.length; i += BATCH_SIZE) {
        const batch = items.slice(i, i + BATCH_SIZE);
        let attempts = 0;
        let success = false;

        while (attempts < maxRetries && !success) {
            attempts++;
            const { error } = await supabase.from(table).upsert(batch, { onConflict: conflict });

            if (error) {
                console.warn(`⚠️ [${table}] batch ${Math.floor(i / BATCH_SIZE) + 1} échoué (Essai ${attempts}/${maxRetries}):`, error.message);
                if (attempts < maxRetries) await sleep(2000);
                else console.error(`❌ [${table}] Échec DÉFINITIF du batch ${Math.floor(i / BATCH_SIZE) + 1}.`);
            } else {
                success = true;
                console.log(`✅ [${table}] ${Math.min(i + BATCH_SIZE, items.length)}/${items.length}`);
            }
        }
    }
};

const main = async () => {
    try {
        console.log('🔄 Fetching CSMarketAPI...');
        const res = await fetch(`https://api.csmarketapi.com/v1/items?key=${API_KEY}`);
        if (!res.ok) throw new Error(`API ${res.status}: ${res.statusText}`);

        const items: any[] = await res.json();
        console.log(`📦 Total reçu de l'API: ${items.length} items`);

        const weaponItems = items.filter(item => (item.exterior !== null && item.weapon !== null &&
            item.hash_name) || (item.type == "Gloves"));
        const containerItems = items.filter(item =>
            item.type === 'Container' &&
            item.exterior === null &&
            item.collection !== null &&
            item.sticker_collection === null &&
            item.graffiti_collection === null &&
            item.patch_collection === null &&
            item.hash_name
        );

        console.log(`🔫 Skins trouvés: ${weaponItems.length}`);
        console.log(`📦 Caisses trouvées: ${containerItems.length}`);

        // 3. Map des caisses
        const caseMap = new Map<string, any>();
        for (const item of containerItems) {
            const mapKey = item.collection || item.market_hash_name;
            caseMap.set(mapKey, {
                id: formatToId(item.market_hash_name), // J'ai ajouté formatToId ici pour avoir de beaux ID de caisses
                name: item.hash_name,
                image: item.cloudflare_icon_url,
                price: null,
                type: detectCaseType(item),
                collection: item.collection || item.sticker_collection,
                updated_at: new Date().toISOString(),
            });
        }

        // 4. Map des skins
        const skinMap = new Map<string, any>();
        const getCategory = (category: string) => {
            if (category === "Normal" || category == "★") return 'normal';
            if (category === "Souvenir") return 'souvenir';
            return 'stattrak';
        }
        const Case_SkinsMap = new Map<string, any>();
        for (const item of weaponItems) {
            const wear = EXTERIOR_TO_WEAR[item.exterior];
            const state = getCategory(item.category);
            const cleanName = getCleanWeaponName(item.hash_name)
            const quality = putGoldKinfeAndFloves(item)
            if (!wear) continue;

            if (!skinMap.has(cleanName)) {
                if (state !== 'souvenir' && item.collection && caseMap.has(item.collection)) {
                    const caseItem = caseMap.get(item.collection);
                    Case_SkinsMap.set(cleanName + caseItem.id, {
                        case_id: caseItem.id,
                        skin_id: formatToId(cleanName)
                    })
                }

                skinMap.set(cleanName, {
                    id: formatToId(cleanName),
                    name: cleanName,
                    image: item.cloudflare_icon_url,
                    rarity: quality,
                    min_float: item.min_float ?? 0,
                    max_float: item.max_float ?? 1,
                    prices: emptyPrices(),
                    collection: item.collection,
                    type: item.type,
                    updated_at: new Date().toISOString(),
                });
            }

            const skin = skinMap.get(cleanName)!;
            skin.prices[state][wear] = 1;

            if (state == 'souvenir') {
                if (item.collection && caseMap.has(item.collection)) {
                    const caseItem = caseMap.get(item.collection);
                    if (!Case_SkinsMap.has(cleanName + caseItem.id))
                        Case_SkinsMap.set(cleanName + caseItem.id, {
                            case_id: caseItem.id,
                            skin_id: formatToId(cleanName)
                        })
                }
            }
        }
        const goldItemsRaw = fs.readFileSync('./sync-bd/skinsApi.json', 'utf-8');
        const goldItems = JSON.parse(goldItemsRaw);

        for (const gold of goldItems) {
            const finalSkinId = gold.id;

            for (const caseId of gold.cases_id) {
                // On s'assure que l'ID de la caisse est bien formaté
                const formattedCaseId = formatToId(caseId);

                const relationKey = formattedCaseId + finalSkinId;

                // On ajoute la relation dans notre Map globale !
                if (!Case_SkinsMap.has(relationKey)) {
                    Case_SkinsMap.set(relationKey, {
                        case_id: formattedCaseId,
                        skin_id: finalSkinId
                    });
                }
            }
        }
        const skins = Array.from(skinMap.values());
        const cases = Array.from(caseMap.values());
        const case_skins = Array.from(Case_SkinsMap.values());

        console.log(`🎨 Skins uniques à insérer: ${skins.length}`);
        console.log(`🧰 Caisses uniques à insérer: ${cases.length}`);

        // 5. Upsert caisses (attention au onConflict)
        console.log('🚀 Début de l\'insertion des caisses...');
        await upsertInBatches('cases', cases, 'id');

        // 6. Upsert skins (attention au onConflict)
        console.log('🚀 Début de l\'insertion des skins...');
        await upsertInBatches('skins', skins, 'id');

        console.log('🚀 Début de l\'insertion des case_skin...');
        await upsertInBatches('case_skins', case_skins, 'case_id, skin_id');

        console.log('🎉 Terminé avec succès !');

    } catch (err) {
        console.error('💥 Erreur fatale:', err);
    }
};

// Déclenchement manuel
main();