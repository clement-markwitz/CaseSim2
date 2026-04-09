// components/Inventory.tsx
import { useAppTheme } from '@/hooks/useAppTheme';
import { useInventory } from '@/hooks/useInventory';
import { PackageOpen } from 'lucide-react-native';
import { useMemo, useState } from 'react';
import { Text, XStack, YStack } from 'tamagui';
import AccordionFilter, { InventoryFilters } from './ui/AccordionFilter';
import ItemInventory from './ui/ItemInventory';

const Inventory = () => {
    const { data: inventory } = useInventory();
    const colors = useAppTheme();

    // 1. Notre état central (Source de vérité de ce que le joueur veut voir)
    const [filters, setFilters] = useState<InventoryFilters>({
        search: '',
        minPrice: '',
        maxPrice: '',
        category: 'all',
        sortBy: 'price_desc' // On affiche les objets les plus rares/chers en premier par défaut
    });

    // 2. Le calcul du filtre (instantané grâce à useMemo)
    const filteredAndSortedInventory = useMemo(() => {
        if (!inventory) return [];

        return inventory
            // ÉTAPE A : Le Filtrage
            .filter((item) => {
                const name = item.skins?.name || '';

                // Recherche
                if (filters.search && !name.toLowerCase().includes(filters.search.toLowerCase())) return false;

                // Prix
                if (filters.minPrice && item.price < parseFloat(filters.minPrice)) return false;
                if (filters.maxPrice && item.price > parseFloat(filters.maxPrice)) return false;

                // Catégorie stricte
                if (filters.category === 'stattrak' && !item.isStatTrak) return false;
                if (filters.category === 'souvenir' && !item.isSouvenir) return false;
                if (filters.category === 'normal' && (item.isStatTrak || item.isSouvenir)) return false;

                return true;
            })
            // ÉTAPE B : Le Tri
            .sort((a, b) => {
                if (filters.sortBy === 'price_desc') return b.price - a.price;
                if (filters.sortBy === 'price_asc') return a.price - b.price;
                // Par défaut (newest), on suppose que les IDs les plus grands sont les plus récents
                return b.id - a.id;
            });
    }, [inventory, filters]); // 👈 Ne se recalcule que si l'inventaire de la BDD change, ou si le joueur modifie un filtre

    // 3. Gestion de l'état vide complet (Rien en base de données)
    if (!inventory || inventory.length === 0) {
        return (
            <YStack flex={1} alignItems="center" justifyContent="center" gap={10} opacity={0.5} paddingVertical={40}>
                <PackageOpen size={48} color={colors.text_muted} />
                <Text color={colors.text_muted} fontSize={16} fontWeight="bold">Ton inventaire est vide</Text>
                <Text color={colors.text_muted} fontSize={12}>Ouvre des caisses pour le remplir !</Text>
            </YStack>
        );
    }

    return (
        <YStack width="100%">

            {/* Notre tout nouveau menu Accordion qui pilote l'état "filters" */}
            <AccordionFilter filters={filters} setFilters={setFilters} />

            <XStack justifyContent="space-between" alignItems="center" width="100%" paddingBottom={15} paddingHorizontal={5}>
                <Text color={colors.text_muted} fontSize={14} fontWeight="600">
                    {filteredAndSortedInventory.length} objet{filteredAndSortedInventory.length !== 1 ? 's' : ''} trouvé{filteredAndSortedInventory.length !== 1 ? 's' : ''}
                </Text>
            </XStack>

            {/* Affichage de la grille avec le résultat calculé */}
            <XStack flexWrap="wrap" justifyContent="space-between" width="100%">
                {filteredAndSortedInventory.length === 0 ? (
                    <YStack width="100%" alignItems="center" paddingVertical={40}>
                        <Text color={colors.text_secondary}>Aucun skin ne correspond à tes critères.</Text>
                    </YStack>
                ) : (
                    filteredAndSortedInventory.map((item) => (
                        <ItemInventory key={item.id} item={item} />
                    ))
                )}
            </XStack>

        </YStack>
    );
};

export default Inventory;