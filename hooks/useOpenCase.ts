import { Leaderboard } from '@/constants/leaderboard';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/utils/supabase';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const useOpenCase = () => {
    const queryClient = useQueryClient();
    const { user } = useAuth();

    return useMutation({
        // 1. L'APPEL AU SERVEUR
        // 🎯 NOUVEAU : On ajoute "poolId" (ex: 'classic_week') pour le matchmaking si leaderboardId est null
        mutationFn: async ({ caseId, casePrice, leaderboardId }: { caseId?: string, casePrice: number, leaderboardId: number | null }) => {
            const { data, error } = await supabase.functions.invoke('open-case', {
                // 🎯 NOUVEAU : On l'envoie dans le body
                body: { caseId, leaderboardId },
            });

            if (error) {
                const errorDetails = await error.context?.json().catch(() => null);
                throw new Error(errorDetails?.error || "Erreur lors de l'ouverture");
            }

            return data.item;
        },

        // 2. L'OPTIMISTIC UPDATE
        onMutate: async ({ casePrice }) => {
            const profileKey = ['profile', user?.id];

            await queryClient.cancelQueries({ queryKey: profileKey });
            const previousProfile = queryClient.getQueryData<any>(profileKey);

            if (previousProfile) {
                // 🎯 NOUVEAU : Si la balance est null (1ère caisse), il part virtuellement de 10$ !
                const currentBalance = previousProfile.balance === null ? 10 : previousProfile.balance;

                queryClient.setQueryData(profileKey, {
                    ...previousProfile,
                    balance: currentBalance - casePrice,
                });
            }

            return { previousProfile, profileKey };
        },

        // 3. EN CAS D'ERREUR
        onError: (err, variables, context) => {
            console.error("Échec :", err.message);
            if (context?.previousProfile) {
                queryClient.setQueryData(context.profileKey, context.previousProfile);
            }
        },

        // 4. EN CAS DE SUCCÈS
        onSuccess: (wonSkin, { casePrice }) => {
            let priceToAdd = wonSkin.price;

            if (casePrice >= 5) {
                // 🎯 CORRECTION CRITIQUE : C'est +=, on AJOUTE le bonus au prix du skin !
                priceToAdd += (casePrice / 2);
            }

            const leaderboardsKey = ['leaderboard', user?.id]; // (ou la clé que tu utilises)

            queryClient.setQueryData<Leaderboard[]>(leaderboardsKey, (oldLeaderboards) => {
                if (!oldLeaderboards) return oldLeaderboards;

                return oldLeaderboards.map((leaderboard, index) => {
                    if (index === 0) {
                        const updatedProfiles = leaderboard.profiles.map((profile) => {
                            if (profile.id === user?.id) {
                                return {
                                    ...profile,
                                    score: Math.round((profile.score + priceToAdd) * 1000) / 1000,
                                };
                            }
                            return profile;
                        });

                        // On retrie
                        updatedProfiles.sort((a, b) => b.score - a.score);

                        return {
                            ...leaderboard,
                            profiles: updatedProfiles,
                        };
                    }
                    return leaderboard;
                });
            });
        },

        // 5. À LA FIN (La sécurité absolue)
        onSettled: () => {
            queryClient.invalidateQueries({ queryKey: ['profile', user?.id] });
            queryClient.invalidateQueries({ queryKey: ['inventory', user?.id] });
            // 🎯 NOUVEAU : On s'assure que le classement entier se rafraîchisse
            // Si le joueur vient d'être inséré pour la première fois, il doit apparaître !
            queryClient.invalidateQueries({ queryKey: ['leaderboard'] });
        },
    });
};