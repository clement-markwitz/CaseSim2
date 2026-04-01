// utils/gameLogic.ts
import { Skin, Wear } from "@/constants/skin";

export const WINNER_INDEX = 45;
export const TOTAL_ITEMS = 55;

export interface WonItem {
    uid: string;
    skinId: string;
    name: string;
    image: string;
    rarity: string;
    wear: Wear;
    float: number;
    statTrak: boolean;
    price: number;
}

const getSecureRandom = (): number => {
    return Math.random();
};

const generateFloat = (float: number): Wear => {
    if (float <= 0.07) return 'FN';
    if (float <= 0.15) return 'MW';
    if (float <= 0.38) return 'FT';
    if (float <= 0.45) return 'WW';
    return 'BS';
};

const isStatTrak = (skin: Skin): boolean => {
    if (skin.name.includes('gants')) return false;
    const stattrakPourcentage: number = getSecureRandom() * 100;
    return stattrakPourcentage <= 10;
};

export const skinDrop = (skins: Skin[]): WonItem => {
    // 🛡️ Sécurité : on vérifie que le tableau n'est pas vide
    if (!skins || skins.length === 0) {
        throw new Error("Aucun skin n'a été fourni pour le drop");
    }

    // 1. Tirage du pourcentage de rareté
    const rarityPourcentage: number = getSecureRandom() * 100;
    let rarity: string;

    if (rarityPourcentage <= 0.26) {
        rarity = 'gold';
    } else if (rarityPourcentage <= 0.90) {
        rarity = 'Covert';
    } else if (rarityPourcentage <= 4.10) {
        rarity = 'Classified';
    } else if (rarityPourcentage <= 20.08) {
        rarity = 'Restricted';
    } else {
        rarity = 'Mil-Spec Grade';
    }

    // 2. On filtre DIRECTEMENT sur le tableau `skins` passé en paramètre
    let possibleSkins: Skin[] = skins.filter((skin) => skin.rarity === rarity);

    // 3. Fallback si la rareté tirée n'existe pas dans cette caisse (ex: une caisse sans gold)
    if (possibleSkins.length === 0) {
        possibleSkins = skins.filter((s) => s.rarity === 'Mil-Spec Grade');
    }

    // 4. On tire un skin au hasard parmi les possibles
    const skin = possibleSkins[Math.floor(getSecureRandom() * possibleSkins.length)];
    // 5. Génération du float et du wear
    const float = getSecureRandom() * (skin.maxFloat - skin.minFloat) + skin.minFloat;
    const wear = generateFloat(float); // J'imagine que tu as cette fonction ailleurs
    const statTrak: boolean = isStatTrak(skin); // Idem

    // 6. Calcul du prix
    let price: number;
    if (statTrak) {
        price = skin.prices.stattrak[wear];
    } else {
        price = skin.prices.normal[wear];
    }

    // 7. Retour de l'objet gagné
    return {
        uid: Math.random().toString(36).substring(2, 9),
        skinId: skin.id,
        name: skin.name,
        image: skin.image,
        rarity: skin.rarity,
        wear,
        float,
        statTrak,
        price,
    };
};

export const generateRouletteTab = (skins: Skin[], winningItem: WonItem): WonItem[] => {
    const tab: WonItem[] = [];



    for (let i = 0; i < TOTAL_ITEMS; i++) {
        if (i === WINNER_INDEX) {
            tab.push(winningItem);
        } else {
            tab.push(skinDrop(skins));
        }
    }

    return tab;
};


