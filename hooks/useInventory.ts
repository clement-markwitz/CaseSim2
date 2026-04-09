import { fetchInventory } from "@/api/skins.api";
import { useAuth } from "@/hooks/useAuth";
import { useSuspenseQuery } from "@tanstack/react-query";

export const useInventory = () => {
    const { user } = useAuth();

    return useSuspenseQuery({
        queryKey: ['inventory', user?.id],
        queryFn: async () => {
            if (!user) return null;
            return fetchInventory(user.id);
        },
        staleTime: 1000 * 60 * 5,
    });
}