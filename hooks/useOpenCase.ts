import { useAuth } from '@/hooks/useAuth'; // Ou la façon dont tu récupères ton user
import { supabase } from '@/utils/supabase'; // Ton fichier de config Supabase
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const useOpenCase = () => {
    const queryClient = useQueryClient();
    const { user } = useAuth();

    return useMutation({
        // 1. L'APPEL AU SERVEUR
        // On demande l'id de la caisse ET son prix (pour le mensonge visuel)
        mutationFn: async ({ caseId, casePrice }: { caseId?: string, casePrice: number }) => {
            const { data, error } = await supabase.functions.invoke('open-case', {
                body: { caseId },
            });

            // Si le serveur renvoie 400 (ex: pas d'argent), Supabase lève une erreur spéciale
            if (error) {
                // On extrait le "vrai" message d'erreur JSON qu'on a codé dans le backend
                const errorDetails = await error.context?.json().catch(() => null);
                throw new Error(errorDetails?.error || "Erreur lors de l'ouverture");
            }

            return data.item; // C'est ton objet "wonSkin" !
        },

        // 2. L'OPTIMISTIC UPDATE (Le mensonge visuel à 0 ms de latence)
        onMutate: async ({ casePrice }) => {
            const profileKey = ['profile', user?.id];

            // On gèle les rechargements automatiques pour ne pas écraser notre animation
            await queryClient.cancelQueries({ queryKey: profileKey });

            // On sauvegarde le vrai profil actuel en cas de crash
            const previousProfile = queryClient.getQueryData<any>(profileKey);

            // On retire l'argent tout de suite à l'écran !
            if (previousProfile) {
                queryClient.setQueryData(profileKey, {
                    ...previousProfile,
                    balance: previousProfile.balance - casePrice,
                });
            }

            return { previousProfile, profileKey };
        },

        // 3. EN CAS D'ERREUR (Le rollback)
        onError: (err, variables, context) => {
            console.error("Échec :", err.message);
            // Oups, pas d'internet ou pas assez d'argent ! On remet l'ancien solde.
            if (context?.previousProfile) {
                queryClient.setQueryData(context.profileKey, context.previousProfile);
            }

            // 💡 Ici tu peux aussi déclencher un Toast/Alerte pour l'utilisateur
            // alert(err.message); 
        },

        // 4. EN CAS DE SUCCÈS
        onSuccess: (wonSkin) => {
            // Ici, tu pourrais optionnellement ajouter le skin dans le cache de l'inventaire 
            // pour qu'il y soit déjà quand le joueur cliquera sur son sac à dos.
        },

        // 5. À LA FIN (La sécurité absolue)
        onSettled: () => {
            // Qu'il y ait eu une victoire ou un crash, on force React Query
            // à aller relire la vraie base de données PostgreSQL pour être sûr à 100%
            queryClient.invalidateQueries({ queryKey: ['profile', user?.id] });
            queryClient.invalidateQueries({ queryKey: ['inventory', user?.id] });
        },
    });
};