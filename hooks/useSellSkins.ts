import { InventorySkin } from '@/constants/skin'; // Adapte l'import selon ton projet
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/utils/supabase';
import { InfiniteData, useMutation, useQueryClient } from '@tanstack/react-query';

export const useSellSkins = () => {
    const queryClient = useQueryClient();
    const { user } = useAuth();

    return useMutation({
        // 1. L'APPEL AU SERVEUR
        mutationFn: async ({ ids, price }: { ids: string[], price: number }) => {
            const { data, error } = await supabase.functions.invoke('sell_skins_inventory', {
                body: { ids },
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
            // On ne cible que le début de la clé pour l'inventaire
            const inventoryKeyPrefix = ['inventory', user?.id];

            await queryClient.cancelQueries({ queryKey: profileKey });
            await queryClient.cancelQueries({ queryKey: inventoryKeyPrefix });

            // On sauvegarde l'état actuel (pour le rollback)
            const previousProfile = queryClient.getQueryData<any>(profileKey);
            // On récupère TOUS les caches d'inventaire (avec n'importe quel filtre)
            const previousInventories = queryClient.getQueriesData({ queryKey: inventoryKeyPrefix });

            // 👉 Mise à jour du Profil (L'argent augmente instantanément)
            if (previousProfile) {
                queryClient.setQueryData(profileKey, {
                    ...previousProfile,
                    balance: previousProfile.balance + price,
                });
            }

            // 👉 Mise à jour de l'Inventaire Infinite (On retire les armes vendues visuellement)
            queryClient.setQueriesData(
                { queryKey: inventoryKeyPrefix },
                (oldData: InfiniteData<InventorySkin[]> | undefined) => {
                    if (!oldData || !oldData.pages) return oldData;

                    return {
                        ...oldData,
                        // On doit filtrer à l'intérieur de CHAQUE page chargée
                        pages: oldData.pages.map(page =>
                            page.filter(item => !ids.includes(item.id))
                        )
                    };
                }
            );

            return { previousProfile, profileKey, previousInventories };
        },

        // 3. EN CAS D'ERREUR (Le rollback)
        onError: (err, variables, context) => {
            console.error("Échec de la vente :", err.message);

            // On remet le profil
            if (context?.previousProfile) {
                queryClient.setQueryData(context.profileKey, context.previousProfile);
            }

            // On remet tous les inventaires comme ils étaient
            if (context?.previousInventories) {
                context.previousInventories.forEach(([queryKey, data]) => {
                    queryClient.setQueryData(queryKey, data);
                });
            }
        },

        // 4. À LA FIN (La sécurité)
        onSettled: () => {
            queryClient.invalidateQueries({ queryKey: ['profile', user?.id] });
            // InvalidateQueries marche avec des clés partielles, donc ça va rafraîchir tous les filtres !
            queryClient.invalidateQueries({ queryKey: ['inventory', user?.id] });
        },
    });
};