// components/ui/AccordionFilter.tsx
import { useAppTheme } from '@/hooks/useAppTheme';
import { ArrowDownAZ, ArrowUpAZ, ListFilter } from 'lucide-react-native';
import { useState } from 'react';
import { Accordion, Button, Input, Label, ScrollView, Square, Text, XStack, YStack } from 'tamagui';
// Définition de notre état de filtre global
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
            <Text
                color={active ? 'black' : colors.text}
                fontWeight={active ? "bold" : "normal"} // Petit bonus UI : on le met en gras quand c'est actif !
            >
                {label}
            </Text>
        </Button>
    );
};

export default function AccordionFilter({ filters, setFilters }: AccordionFilterProps) {
    const colors = useAppTheme();

    // Petite fonction utilitaire pour modifier un seul filtre à la fois
    const updateFilter = <K extends keyof InventoryFilters>(key: K, value: InventoryFilters[K]) => {
        setFilters(prev => ({ ...prev, [key]: value }));
    };

    // Composant stylé pour les boutons de sélection (Chips)

    const [activeValues, setActiveValues] = useState<string[]>([]);

    // On sait que c'est ouvert si notre tableau contient 'filters'
    const isOpen = activeValues.includes('filters');


    return (
        <YStack overflow="hidden" width="100%" marginBottom={15}>
            <Accordion
                type="multiple"
                value={activeValues}
                onValueChange={setActiveValues} // Tamagui gère l'ouverture tout seul !
            >
                <Accordion.Item value="filters">

                    {/* --- HEADER DE L'ACCORDION --- */}
                    <Accordion.Trigger
                        backgroundColor={colors.background_card}
                        flexDirection="row"
                        justifyContent="space-between"
                        padding={15}
                        borderTopLeftRadius={12}
                        borderTopRightRadius={12}
                        borderBottomLeftRadius={isOpen ? 0 : 12} // On utilise notre variable propre
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

                    {/* --- CONTENU DE L'ACCORDION --- */}
                    <Accordion.HeightAnimator transition={{ duration: 200 }}>
                        <Accordion.Content
                            transition={{ duration: 200 }}
                            exitStyle={{ opacity: 0 }}
                            borderWidth={1}
                            borderTopWidth={0} // Évite la double bordure
                            borderColor={colors.border}
                            borderBottomLeftRadius={12}
                            borderBottomRightRadius={12}
                            backgroundColor={colors.background_card}
                            padding={15}
                        >
                            <YStack gap={20}>

                                {/* 1. Recherche par nom */}
                                <YStack gap={5}>
                                    <Label color={colors.text_muted} fontSize={12}>Recherche de skin</Label>
                                    <Input
                                        placeholder="Nom de l'arme (ex: Asiimov, Redline...)"
                                        placeholderTextColor={colors.text_muted as any}
                                        value={filters.search}
                                        onChangeText={(t) => updateFilter('search', t)}
                                        backgroundColor={colors.background_elevated}
                                        borderColor={colors.border}
                                        color={colors.text}
                                    />
                                </YStack>

                                {/* 2. Prix Min & Max */}
                                <XStack gap={10}>
                                    <YStack flex={1} gap={5}>
                                        <Label color={colors.text_muted} fontSize={12}>Prix Min ($)</Label>
                                        <Input
                                            keyboardType="numeric"
                                            placeholder="0"
                                            value={filters.minPrice}
                                            onChangeText={(t) => updateFilter('minPrice', t)}
                                            backgroundColor={colors.background_elevated}
                                            placeholderTextColor={colors.text_muted as any}
                                            borderColor={colors.border}
                                            color={colors.text}
                                        />
                                    </YStack>
                                    <YStack flex={1} gap={5}>
                                        <Label color={colors.text_muted} fontSize={12}>Prix Max ($)</Label>
                                        <Input
                                            keyboardType="numeric"
                                            placeholder="1000"
                                            value={filters.maxPrice}
                                            onChangeText={(t) => updateFilter('maxPrice', t)}
                                            backgroundColor={colors.background_elevated}
                                            placeholderTextColor={colors.text_muted as any}
                                            borderColor={colors.border}
                                            color={colors.text}
                                        />
                                    </YStack>
                                </XStack>

                                {/* 3. Catégorie (StatTrak / Souvenir / Normal) */}
                                <YStack gap={5}>
                                    <Label color={colors.text_muted} fontSize={12}>Catégorie</Label>
                                    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                                        <XStack gap={10}>
                                            <FilterChip label="Tout" active={filters.category === 'all'} onPress={() => updateFilter('category', 'all')} />
                                            <FilterChip label="Normal" active={filters.category === 'normal'} onPress={() => updateFilter('category', 'normal')} />
                                            <FilterChip label="StatTrak™" active={filters.category === 'stattrak'} onPress={() => updateFilter('category', 'stattrak')} />
                                            <FilterChip label="Souvenir" active={filters.category === 'souvenir'} onPress={() => updateFilter('category', 'souvenir')} />
                                        </XStack>
                                    </ScrollView>
                                </YStack>

                                {/* 4. Tri (Sort By) */}
                                <YStack gap={5}>
                                    <Label color={colors.text_muted} fontSize={12}>Trier par</Label>
                                    <XStack gap={10} flexWrap="wrap">
                                        <FilterChip
                                            label="Plus chers"
                                            icon={<ArrowDownAZ size={14} color={filters.sortBy === 'price_desc' ? 'black' : colors.text} />}
                                            active={filters.sortBy === 'price_desc'}
                                            onPress={() => updateFilter('sortBy', 'price_desc')}
                                        />
                                        <FilterChip
                                            label="Moins chers"
                                            icon={<ArrowUpAZ size={14} color={filters.sortBy === 'price_asc' ? 'black' : colors.text} />}
                                            active={filters.sortBy === 'price_asc'}
                                            onPress={() => updateFilter('sortBy', 'price_asc')}
                                        />
                                        <FilterChip
                                            label="Plus récents"
                                            active={filters.sortBy === 'newest'}
                                            onPress={() => updateFilter('sortBy', 'newest')}
                                        />
                                    </XStack>
                                </YStack>

                            </YStack>
                        </Accordion.Content>
                    </Accordion.HeightAnimator>
                </Accordion.Item>
            </Accordion>
        </YStack>
    );
}