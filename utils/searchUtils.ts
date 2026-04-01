import { Case, CASES } from '@/constants/case';
import { SKINS } from '@/constants/skin';

/**
 * Normalise une chaîne pour la recherche (enlève accents, lowercase)
 */
const normalizeString = (str: string): string => {
    return str
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '');
};

/**
 * Vérifie si une caisse contient un skin avec le terme recherché
 */
const caseContainsSkin = (caseItem: Case, searchTerm: string): boolean => {
    if (!caseItem.skinIds || caseItem.skinIds.length === 0) return false;

    const normalizedSearch = normalizeString(searchTerm);

    return caseItem.skinIds.some(skinId => {
        const skin = SKINS[skinId];
        if (!skin) return false;

        // Cherche dans le nom complet du skin (ex: "AK-47 | Inheritance")
        const skinName = normalizeString(skin.name);
        if (skinName.includes(normalizedSearch)) return true;

        return false;
    });
};

/**
 * Filtre les caisses selon le terme de recherche
 * Recherche dans :
 * - Le nom de la caisse
 * - Le nom des skins contenus
 * - Le nom des armes (ex: "AK-47", "AWP")
 */
export const searchCases = (cases: Case[], searchQuery: string): Case[] => {
    if (!cases) return [];
    if (!searchQuery || searchQuery.trim() === '') {
        return cases;
    }

    const normalizedQuery = normalizeString(searchQuery.trim());

    return cases.filter(caseItem => {
        // 1️⃣ Recherche dans le nom de la caisse
        const caseName = normalizeString(caseItem.name);
        if (caseName.includes(normalizedQuery)) {
            return true;
        }

        // 2️⃣ Recherche dans les skins de la caisse
        if (caseContainsSkin(caseItem, normalizedQuery)) {
            return true;
        }

        return false;
    });
};

/**
 * Compte le nombre de résultats par catégorie
 */
export const getSearchStats = (cases: Case[], searchQuery: string) => {
    const results = searchCases(cases, searchQuery);

    return {
        total: results.length,
        basique: results.filter(c => c.type === 'basique').length,
        souvenir: results.filter(c => c.type === 'souvenir').length,
        sticker: results.filter(c => c.type === 'sticker').length,
    };
};

/**
 * Retourne les suggestions de recherche basées sur les skins populaires
 */
export const getSearchSuggestions = (searchQuery: string, limit: number = 5): string[] => {
    if (!searchQuery || searchQuery.trim().length < 2) return [];

    const normalizedQuery = normalizeString(searchQuery.trim());
    const suggestions = new Set<string>();

    // Collecte les noms de skins qui matchent
    CASES.forEach(caseItem => {
        caseItem.skinIds.forEach(skinId => {
            const skin = SKINS[skinId];
            if (skin) {
                const skinName = normalizeString(skin.name);
                if (skinName.includes(normalizedQuery)) {
                    // Extrait le nom de l'arme (avant le |)
                    const weaponName = skin.name.split('|')[0].trim();
                    suggestions.add(weaponName);

                    // Ajoute aussi le nom complet
                    suggestions.add(skin.name);
                }
            }
        });
    });

    return Array.from(suggestions).slice(0, limit);
};
