// components/ui/AccordionFilter.tsx
import { useAppTheme } from '@/hooks/useAppTheme';
import { ArrowDownAZ, ArrowUpAZ, Check, ListFilter, RotateCcw } from 'lucide-react-native';
import { useEffect, useState } from 'react';
import { Accordion, Button, Input, Label, ScrollView, Square, Text, XStack, YStack } from 'tamagui';

export interface InventoryFilters {
    search: string;
    minPrice: string;
    maxPrice: string;
    category: 'all' | 'normal' | 'stattrak' | 'souvenir';
    sortBy: 'price_desc' | 'price_asc' | 'newest';
}

interface AccordionFilterProps {
    filters: InventoryFilters;
    setFilters: (filters: InventoryFilters | ((prev: InventoryFilters) => InventoryFilters)) => void;
}

const FilterChip = ({ label, active, onPress, icon }: { label: string, active: boolean, onPress: () => void, icon?: any }) => {
    const colors = useAppTheme();
    return (
        <Button
            size="$3"
            backgroundColor={active ? colors.tint : colors.background_elevated}
            borderColor={active ? colors.tint : colors.border}
            borderWidth={1}
            onPress={onPress}
            icon={icon}
            borderRadius={8}
        >
            <Text color={active ? 'black' : colors.text} fontWeight={active ? "bold" : "normal"}>
                {label}
            </Text>
        </Button>
    );
};

export default function AccordionFilter({ filters, setFilters }: AccordionFilterProps) {
    const colors = useAppTheme();
    const [activeValues, setActiveValues] = useState<string[]>([]);
    const isOpen = activeValues.includes('filters');

    // 🚀 1. L'ÉTAT TEMPORAIRE (Le "brouillon" des filtres)
    const [tempFilters, setTempFilters] = useState<InventoryFilters>(filters);

    // Si on ouvre le menu, on s'assure que le brouillon correspond aux filtres actuellement appliqués
    useEffect(() => {
        if (isOpen) {
            setTempFilters(filters);
        }
    }, [isOpen, filters]);

    // Cette fonction modifie uniquement le brouillon, PAS la base de données
    const updateTempFilter = <K extends keyof InventoryFilters>(key: K, value: InventoryFilters[K]) => {
        setTempFilters(prev => ({ ...prev, [key]: value }));
    };

    // 🚀 2. LA FONCTION POUR APPLIQUER
    const applyFilters = () => {
        setFilters(tempFilters); // On envoie le brouillon au parent (ce qui déclenche Supabase)
        setActiveValues([]); // On ferme l'Accordion
    };

    // 🚀 3. LA FONCTION POUR RÉINITIALISER
    const resetFilters = () => {
        const defaultFilters: InventoryFilters = {
            search: '', minPrice: '', maxPrice: '', category: 'all', sortBy: 'price_desc'
        };
        setTempFilters(defaultFilters);
        setFilters(defaultFilters);
        setActiveValues([]);
    };

    return (
        <YStack overflow="hidden" width="100%" marginBottom={15}>
            <Accordion type="multiple" value={activeValues} onValueChange={setActiveValues}>
                <Accordion.Item value="filters">

                    {/* --- HEADER --- */}
                    <Accordion.Trigger
                        backgroundColor={colors.background_card}
                        flexDirection="row"
                        justifyContent="space-between"
                        padding={15}
                        borderTopLeftRadius={12}
                        borderTopRightRadius={12}
                        borderBottomLeftRadius={isOpen ? 0 : 12}
                        borderBottomRightRadius={isOpen ? 0 : 12}
                        borderWidth={1}
                        borderBottomWidth={isOpen ? 0 : 1}
                        borderColor={colors.border}
                    >
                        {({ open }: { open: boolean }) => (
                            <>
                                <XStack alignItems="center" gap={10}>
                                    <ListFilter size={18} color={colors.text} />
                                    <Text color={colors.text} fontWeight="bold" fontSize={16}>
                                        Filtres & Tri
                                    </Text>
                                </XStack>
                                <Square transition={{ duration: 200 }} rotate={open ? '180deg' : '0deg'}>
                                    <Text color={colors.text_muted}>▼</Text>
                                </Square>
                            </>
                        )}
                    </Accordion.Trigger>

                    {/* --- CONTENU --- */}
                    <Accordion.HeightAnimator transition={{ duration: 200 }}>
                        <Accordion.Content
                            transition={{ duration: 200 }}
                            exitStyle={{ opacity: 0 }}
                            borderWidth={1}
                            borderTopWidth={0}
                            borderColor={colors.border}
                            borderBottomLeftRadius={12}
                            borderBottomRightRadius={12}
                            backgroundColor={colors.background_card}
                            padding={15}
                        >
                            <YStack gap={20}>

                                {/* 1. Recherche par nom (Utilise tempFilters) */}
                                <YStack gap={5}>
                                    <Label color={colors.text_muted} fontSize={12}>Recherche de skin</Label>
                                    <Input
                                        placeholder="Nom de l'arme (ex: Asiimov...)"
                                        placeholderTextColor={colors.text_muted as any}
                                        value={tempFilters.search}
                                        onChangeText={(t) => updateTempFilter('search', t)}
                                        backgroundColor={colors.background_elevated}
                                        borderColor={colors.border}
                                        color={colors.text}
                                    />
                                </YStack>

                                {/* 2. Prix Min & Max (Utilise tempFilters) */}
                                <XStack gap={10}>
                                    <YStack flex={1} gap={5}>
                                        <Label color={colors.text_muted} fontSize={12}>Prix Min ($)</Label>
                                        <Input
                                            keyboardType="numeric" placeholder="0"
                                            value={tempFilters.minPrice}
                                            onChangeText={(t) => updateTempFilter('minPrice', t)}
                                            backgroundColor={colors.background_elevated}
                                            borderColor={colors.border} color={colors.text}
                                        />
                                    </YStack>
                                    <YStack flex={1} gap={5}>
                                        <Label color={colors.text_muted} fontSize={12}>Prix Max ($)</Label>
                                        <Input
                                            keyboardType="numeric" placeholder="1000"
                                            value={tempFilters.maxPrice}
                                            onChangeText={(t) => updateTempFilter('maxPrice', t)}
                                            backgroundColor={colors.background_elevated}
                                            borderColor={colors.border} color={colors.text}
                                        />
                                    </YStack>
                                </XStack>

                                {/* 3. Catégorie */}
                                <YStack gap={5}>
                                    <Label color={colors.text_muted} fontSize={12}>Catégorie</Label>
                                    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                                        <XStack gap={10}>
                                            <FilterChip label="Tout" active={tempFilters.category === 'all'} onPress={() => updateTempFilter('category', 'all')} />
                                            <FilterChip label="Normal" active={tempFilters.category === 'normal'} onPress={() => updateTempFilter('category', 'normal')} />
                                            <FilterChip label="StatTrak™" active={tempFilters.category === 'stattrak'} onPress={() => updateTempFilter('category', 'stattrak')} />
                                            <FilterChip label="Souvenir" active={tempFilters.category === 'souvenir'} onPress={() => updateTempFilter('category', 'souvenir')} />
                                        </XStack>
                                    </ScrollView>
                                </YStack>

                                {/* 4. Tri */}
                                <YStack gap={5}>
                                    <Label color={colors.text_muted} fontSize={12}>Trier par</Label>
                                    <XStack gap={10} flexWrap="wrap">
                                        <FilterChip label="Plus chers" icon={<ArrowDownAZ size={14} color={tempFilters.sortBy === 'price_desc' ? 'black' : colors.text} />} active={tempFilters.sortBy === 'price_desc'} onPress={() => updateTempFilter('sortBy', 'price_desc')} />
                                        <FilterChip label="Moins chers" icon={<ArrowUpAZ size={14} color={tempFilters.sortBy === 'price_asc' ? 'black' : colors.text} />} active={tempFilters.sortBy === 'price_asc'} onPress={() => updateTempFilter('sortBy', 'price_asc')} />
                                        <FilterChip label="Plus récents" active={tempFilters.sortBy === 'newest'} onPress={() => updateTempFilter('sortBy', 'newest')} />
                                    </XStack>
                                </YStack>

                                {/* 🚀 5. LES BOUTONS D'ACTION (Nouveau) */}
                                <XStack gap={10} paddingTop={10} borderTopWidth={1} borderColor={colors.border}>
                                    <Button
                                        flex={1}
                                        backgroundColor={colors.background_elevated}
                                        borderColor={colors.border}
                                        borderWidth={1}
                                        onPress={resetFilters}
                                        icon={<RotateCcw size={16} color={colors.text} />}
                                    >
                                        <Text color={colors.text}>Réinitialiser</Text>
                                    </Button>

                                    <Button
                                        flex={2}
                                        backgroundColor={colors.tint}
                                        onPress={applyFilters}
                                        icon={<Check size={18} color="black" />}
                                    >
                                        <Text color="black" fontWeight="bold">Appliquer</Text>
                                    </Button>
                                </XStack>

                            </YStack>
                        </Accordion.Content>
                    </Accordion.HeightAnimator>
                </Accordion.Item>
            </Accordion>
        </YStack>
    );
}