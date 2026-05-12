import { fetchSkinsByIds } from '@/api/skins.api';
import { useSuspenseQuery } from '@tanstack/react-query';

export const useSkins = (caseId: string, skinIds: string[]) => {
    return useSuspenseQuery({
        // ✅ On inclut skinIds dans la clé de cache pour respecter les règles de React Query
        queryKey: ['skins', caseId, skinIds],
        queryFn: () => fetchSkinsByIds(skinIds),
        staleTime: Infinity,
    });
};
