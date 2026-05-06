import { Leaderboard } from '@/constants/leaderboard'; // 🎯 NOUVEAU: Import de ton type
import { InventorySkin } from '@/constants/skin';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/utils/supabase';
import { InfiniteData, useMutation, useQueryClient } from '@tanstack/react-query';

export const useSellSkins = () => {
    const queryClient = useQueryClient();
    const { user } = useAuth();

    return useMutation({
        // 1. L'APPEL AU SERVEUR
        // 🎯 NOUVEAU : On ajoute leaderboardId en paramètre
        mutationFn: async ({ ids, price, leaderboardId }: { ids: string[], price: number, leaderboardId: number | null }) => {
            const { data, error } = await supabase.functions.invoke('sell_skins_inventory', {
                // 🎯 NOUVEAU : On l'envoie dans le body
                body: { ids, leaderboardId },
            });

            if (error) {
                const errorDetails = await error.context?.json().catch(() => null);
                throw new Error(errorDetails?.error || "Erreur lors de la vente");
            }

            return data?.message;
        },

        // 2. L'OPTIMISTIC UPDATE
        onMutate: async ({ ids, price }) => {
            const profileKey = ['profile', user?.id];
            const inventoryKeyPrefix = ['inventory', user?.id];
            const leaderboardsKey = ['leaderboard', user?.id]; // 🎯 NOUVEAU : Clé du classement

            await queryClient.cancelQueries({ queryKey: profileKey });
            await queryClient.cancelQueries({ queryKey: inventoryKeyPrefix });
            await queryClient.cancelQueries({ queryKey: leaderboardsKey });

            // On sauvegarde l'état actuel (pour le rollback)
            const previousProfile = queryClient.getQueryData<any>(profileKey);
            const previousInventories = queryClient.getQueriesData({ queryKey: inventoryKeyPrefix });
            const previousLeaderboards = queryClient.getQueryData<Leaderboard[]>(leaderboardsKey);

            // 👉 Mise à jour du Profil (L'argent augmente)
            if (previousProfile) {
                queryClient.setQueryData(profileKey, {
                    ...previousProfile,
                    balance: (previousProfile.balance || 0) + price,
                });
            }

            // 👉 🎯 NOUVEAU : Mise à jour du Classement (Le score baisse !)
            queryClient.setQueryData<Leaderboard[]>(leaderboardsKey, (oldLeaderboards) => {
                if (!oldLeaderboards) return oldLeaderboards;

                return oldLeaderboards.map((leaderboard, index) => {
                    if (index === 0) { // Si c'est le classement actif affiché
                        const updatedProfiles = leaderboard.profiles.map((profile) => {
                            if (profile.id === user?.id) {
                                return {
                                    ...profile,
                                    // On retire les points (avec un arrondi propre)
                                    score: Math.max(0, Math.round((profile.score - price) * 1000) / 1000),
                                };
                            }
                            return profile;
                        });

                        // On retrie le classement car il a peut-être perdu des places !
                        updatedProfiles.sort((a, b) => b.score - a.score);

                        return { ...leaderboard, profiles: updatedProfiles };
                    }
                    return leaderboard;
                });
            });

            // 👉 Mise à jour de l'Inventaire (Retrait visuel)
            queryClient.setQueriesData(
                { queryKey: inventoryKeyPrefix },
                (oldData: InfiniteData<InventorySkin[]> | undefined) => {
                    if (!oldData || !oldData.pages) return oldData;
                    return {
                        ...oldData,
                        pages: oldData.pages.map(page =>
                            page.filter(item => !ids.includes(item.id))
                        )
                    };
                }
            );

            return { previousProfile, profileKey, previousInventories, previousLeaderboards, leaderboardsKey };
        },

        // 3. EN CAS D'ERREUR (Le rollback)
        onError: (err, variables, context) => {
            console.error("Échec de la vente :", err.message);

            if (context?.previousProfile) {
                queryClient.setQueryData(context.profileKey, context.previousProfile);
            }
            if (context?.previousInventories) {
                context.previousInventories.forEach(([queryKey, data]) => {
                    queryClient.setQueryData(queryKey, data);
                });
            }
            // 🎯 NOUVEAU : On remet le classement initial
            if (context?.previousLeaderboards) {
                queryClient.setQueryData(context.leaderboardsKey, context.previousLeaderboards);
            }
        },

        // 4. À LA FIN (La sécurité)
        onSettled: () => {
            queryClient.invalidateQueries({ queryKey: ['profile', user?.id] });
            queryClient.invalidateQueries({ queryKey: ['inventory', user?.id] });
            // 🎯 NOUVEAU : On rafraîchit la base de données globale du classement
            queryClient.invalidateQueries({ queryKey: ['leaderboard'] });
        },
    });
};