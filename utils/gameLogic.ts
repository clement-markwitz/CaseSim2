import { CASES } from "@/constants/case";
import { Skin, SKINS, Wear } from "@/constants/skin";
export const WINNER_INDEX = 45;
export const TOTAL_ITEMS = 55;
export interface WonItem {
    uid: string; // ID unique de CETTE instance (pour l'inventaire)
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
}
const generateFloat = (float: number): Wear => {
    if (float <= 0.07) return 'FN';
    if (float <= 0.15) return 'MW';
    if (float <= 0.38) return 'FT';
    if (float <= 0.45) return 'WW';
    return 'BS';
}

const isStatTrak = (skin: Skin): boolean => {
    if (skin.name.includes('gants')) return false;
    const stattrakPourcentage: number = getSecureRandom() * 100;
    return stattrakPourcentage <= 10;
}

export const skinDrop = (caseId: string): WonItem => {
    const caseToOpen = CASES.find((c) => c.id === caseId);
    if (!caseToOpen) {
        throw new Error('Case not found');
    }
    const rarityPourcentage: number = getSecureRandom() * 100;
    let rarity: string;
    if (rarityPourcentage <= 0.26) {
        rarity = 'gold';
    } else if (rarityPourcentage <= 0.90) {
        rarity = 'covert';
    } else if (rarityPourcentage <= 4.10) {
        rarity = 'classified';
    } else if (rarityPourcentage <= 20.08) {
        rarity = 'restricted';
    } else {
        rarity = 'mil-spec';
    }
    let possibleSkins: Skin[] = caseToOpen.skinIds.map((skinId) => SKINS[skinId])
        .filter((skin) => skin.rarity === rarity);
    if (possibleSkins.length === 0) {
        possibleSkins = caseToOpen.skinIds.map((id) => SKINS[id])
            .filter(s => s.rarity === 'mil-spec');
    }
    const skin = possibleSkins[Math.floor(getSecureRandom() * possibleSkins.length)];
    const float = getSecureRandom() * (skin.maxFloat - skin.minFloat) + skin.minFloat;
    const wear = generateFloat(float);
    const statTrak: boolean = isStatTrak(skin);
    let price: number;
    if (statTrak) {
        price = skin.prices.stattrak[wear];
    } else {
        price = skin.prices.normal[wear];
    }
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
    }
}
export const generateRouletteTab = (caseId: string, winningItem: WonItem): WonItem[] => {
    const tab: WonItem[] = [];

    for (let i = 0; i < TOTAL_ITEMS; i++) {
        // C'EST ICI QUE LA MAGIE OPÈRE :
        if (i === WINNER_INDEX) {
            // À l'index précis où la roulette va s'arrêter, on force l'insertion du skin gagnant
            tab.push(winningItem);
        } else {
            // Partout ailleurs, on met des skins de "remplissage" (fillers)
            // Ce sont juste des visuels pour l'animation
            tab.push(skinDrop(caseId));
        }
    }

    return tab;
}