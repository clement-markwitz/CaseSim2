import { WonItem } from '@/utils/gameLogic';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';


/**
 * c'est le store qui va stocker les données de la simulation grâce à zustand
 * 
 */
interface DemoStore {
    // 📊 Statistiques
    totalOpened: number;
    totalValue: number;

    // 🎁 Historique des drops (max 50 pour ne pas surcharger)
    lastDrops: WonItem[];

    // 🏆 Meilleur drop
    bestDrop: WonItem | null;

    priceCase: number;

    // 🔍 Recherche
    searchQuery: string;
    setSearchQuery: (query: string) => void;

    // 🎮 Actions
    addDrop: (item: WonItem, priceCase: number) => void;
    resetStats: () => void;

    // 📈 Statistiques calculées
    getAverageValue: () => number;
    getTotalByRarity: () => Record<string, number>;
    getProfit: () => number;

    // mode
    mode: 'demo' | 'real';
    setMode: (mode: 'demo' | 'real') => void;
}

export const useDemoStore = create<DemoStore>()(
    persist(
        (set, get) => ({
            totalOpened: 0,
            totalValue: 0,
            lastDrops: [],
            bestDrop: null,
            priceCase: 0,

            // 🎁 Ajouter un drop
            addDrop: (item, priceCase) =>
                set((state) => {
                    const isBestDrop =
                        !state.bestDrop || item.price > state.bestDrop.price;

                    return {
                        totalOpened: state.totalOpened + 1,
                        totalValue: state.totalValue + item.price,
                        lastDrops: [item, ...state.lastDrops].slice(0, 50), // Garde les 50 derniers
                        bestDrop: isBestDrop ? item : state.bestDrop,
                        priceCase: state.priceCase + priceCase,
                    };
                }),

            // 🔄 Reset toutes les stats
            resetStats: () =>
                set({
                    totalOpened: 0,
                    totalValue: 0,
                    lastDrops: [],
                    bestDrop: null,
                    priceCase: 0,
                }),

            // 📊 Calculer la valeur moyenne
            getAverageValue: () => {
                const { totalOpened, totalValue } = get();
                return totalOpened > 0 ? totalValue / totalOpened : 0;
            },

            // 📈 Nombre de drops par rareté
            getTotalByRarity: () => {
                const { lastDrops } = get();
                return lastDrops.reduce((acc, item) => {
                    acc[item.rarity] = (acc[item.rarity] || 0) + 1;
                    return acc;
                }, {} as Record<string, number>);
            },
            getProfit: () => {
                const state = get();
                return state.totalValue - state.priceCase;
            },
            // 🔍 Recherche
            searchQuery: '',
            setSearchQuery: (query) => set({ searchQuery: query.toLowerCase() }),

            // mode
            mode: 'demo',
            setMode: (mode) => set({ mode }),
        }),

        {
            name: 'cs2-demo-storage-v2', // Nom de la clé dans AsyncStorage
            storage: createJSONStorage(() => AsyncStorage),
            partialize: (state) => ({
                totalOpened: state.totalOpened,
                totalValue: state.totalValue,
                lastDrops: state.lastDrops,
                bestDrop: state.bestDrop,
                priceCase: state.priceCase,
                mode: state.mode,
            }),
        }
    )
);
