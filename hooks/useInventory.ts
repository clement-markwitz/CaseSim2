import { fetchInventory } from "@/api/skins.api";
import { InventoryFilters } from "@/components/ui/AccordionFilter";
import { useAuth } from "@/hooks/useAuth";
import { useInfiniteQuery } from "@tanstack/react-query";

export const useInventory = (filters: InventoryFilters) => {
    const { user } = useAuth();

    return useInfiniteQuery({
        // La queryKey inclut les filtres ! Si un filtre change, React Query vide le cache et refait une recherche depuis la page 0.
        queryKey: ['inventory', user?.id, filters],
        queryFn: async ({ pageParam = 0 }) => {
            if (!user) return [];
            return fetchInventory({ userId: user.id, pageParam, filters });
        },
        initialPageParam: 0,
        getNextPageParam: (lastPage, allPages) => {
            // Si la dernière page reçue a 50 éléments, c'est qu'il y a potentiellement une page suivante.
            // On retourne le numéro de la page suivante. Sinon, on retourne undefined (fin).
            return lastPage.length === 25 ? allPages.length : undefined;
        },
        staleTime: 1000 * 60 * 5,
    });
};