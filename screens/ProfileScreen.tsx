import AccordionFilter, { InventoryFilters } from '@/components/ui/AccordionFilter';
import ItemInventory from '@/components/ui/ItemInventory';
import { useAppTheme } from "@/hooks/useAppTheme";
import { useInventory } from "@/hooks/useInventory"; // 👈 On l'importe ici maintenant !
import { useProfileMe } from "@/hooks/useProfileMe";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { ArrowLeft, Edit3, PackageOpen, Settings } from "lucide-react-native";
import { useMemo, useState } from "react";
import { ActivityIndicator, FlatList } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Avatar, Button, Spinner, Text, XStack, YStack } from "tamagui";

export default function ProfileScreen() {
    const { data: profile } = useProfileMe();
    const colors = useAppTheme();
    const router = useRouter();
    const insets = useSafeAreaInsets();

    // 1. GESTION DES ONGLETS FAÇON "MAISON"
    const [activeTab, setActiveTab] = useState<'inventory' | 'collections'>('inventory');

    // 2. GESTION DE L'INVENTAIRE (On a remonté la logique ici)
    const [idsDelete, setIdsDelete] = useState<number[]>([]);
    const [filters, setFilters] = useState<InventoryFilters>({
        search: '', minPrice: '', maxPrice: '', category: 'all', sortBy: 'price_desc'
    });

    const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } = useInventory(filters);

    const toggleSelection = (id: number) => {
        setIdsDelete(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]);
    };

    const allSkins = useMemo(() => {
        return data?.pages.flatMap(page => page) || [];
    }, [data]);

    // 3. 🚀 LE MÉGA-HEADER (Profil + Onglets + Filtres)
    const renderHeader = () => (
        <YStack paddingBottom={15}>
            {/* --- LA CARTE PROFIL (Ton code existant) --- */}
            <YStack marginHorizontal={20} backgroundColor={colors.background_card} borderRadius={16} padding={20} borderWidth={1} borderColor={colors.border} gap={20}>
                {/* Ligne 1 : Avatar & Pseudo */}
                <XStack alignItems="center" justifyContent="space-between">
                    <XStack alignItems="center" gap={15}>
                        <Avatar size="$7" circular>
                            <Avatar.Image src={profile?.avatar} />
                            <Avatar.Fallback backgroundColor={colors.background_elevated} alignItems="center" justifyContent="center">
                                <Text color={colors.text_muted} fontSize={20} fontWeight="bold">{profile?.username?.charAt(0).toUpperCase() || '?'}</Text>
                            </Avatar.Fallback>
                        </Avatar>
                        <YStack gap={2}>
                            <Text fontSize={22} fontWeight="900" color={colors.text}>{profile?.username}</Text>
                            <Text fontSize={14} color={colors.text_secondary} fontWeight="600">Joueur</Text>
                        </YStack>
                    </XStack>
                    <Button icon={<Edit3 size={18} color={colors.text} />} circular backgroundColor={colors.background_elevated} />
                </XStack>

                {/* Ligne 2 : Monnaies */}
                <XStack gap={10}>
                    {/* (Je raccourcis le code des widgets pour la lisibilité, mets tes widgets Balance/Boutique ici) */}
                    <YStack flex={1} backgroundColor={colors.background_elevated} borderRadius={12} padding={12} alignItems="center">
                        <Text fontSize={20} fontWeight="900" color={colors.success}>{profile?.balance} $</Text>
                    </YStack>
                    <YStack flex={1} backgroundColor={colors.background_elevated} borderRadius={12} padding={12} alignItems="center">
                        <Text fontSize={20} fontWeight="900" color={colors.tint}>{profile?.shop_balance} 💎</Text>
                    </YStack>
                </XStack>
            </YStack>

            {/* --- LES BOUTONS D'ONGLETS CUSTOM --- */}
            <XStack marginHorizontal={20} marginTop={30} backgroundColor={colors.background_card} borderRadius={12} padding={4} borderWidth={1} borderColor={colors.border}>
                <Button flex={1} borderRadius={8} backgroundColor={activeTab === 'inventory' ? colors.tint : 'transparent'} onPress={() => setActiveTab('inventory')}>
                    <Text color={activeTab === 'inventory' ? 'black' : colors.text} fontWeight="bold">Inventaire</Text>
                </Button>
                <Button flex={1} borderRadius={8} backgroundColor={activeTab === 'collections' ? colors.tint : 'transparent'} onPress={() => setActiveTab('collections')}>
                    <Text color={activeTab === 'collections' ? 'black' : colors.text} fontWeight="bold">Collections</Text>
                </Button>
            </XStack>

            {/* --- LES FILTRES (Seulement si on est sur l'onglet inventaire) --- */}
            {activeTab === 'inventory' && (
                <YStack marginTop={20}>
                    <AccordionFilter filters={filters} setFilters={setFilters} />
                    <Text color={colors.text_muted} fontSize={14} fontWeight="600" paddingHorizontal={20} marginTop={10}>
                        Skins trouvés (Scroll pour charger plus)
                    </Text>
                </YStack>
            )}
        </YStack>
    );

    // --- LE RENDU GLOBAL DE L'ÉCRAN ---
    return (
        <YStack flex={1} backgroundColor={colors.background} paddingTop={insets.top + 10}>

            {/* Header fixe (Bouton retour, Profil, Settings) */}
            <XStack alignItems="center" justifyContent="space-between" paddingHorizontal={20} paddingBottom={20}>
                <Button icon={<ArrowLeft size={20} color={colors.text} />} onPress={() => router.back()} circular backgroundColor={colors.background_elevated} />
                <Text fontSize={20} fontWeight="bold" color={colors.text} letterSpacing={1}>PROFIL</Text>
                <Button icon={<Settings size={20} color={colors.text} />} circular backgroundColor={colors.background_elevated} />
            </XStack>

            <LinearGradient colors={['transparent', colors.tint, 'transparent']} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} style={{ height: 1, opacity: 0.3, marginBottom: 20 }} />

            {/* 🚀 LA MASTER FLATLIST */}
            {activeTab === 'collections' ? (
                <FlatList
                    key="tab-collections" // 👈 AJOUTE CECI
                    data={[]}
                    renderItem={() => null}
                    ListHeaderComponent={renderHeader}
                    ListEmptyComponent={<Text textAlign="center" marginTop={40} color={colors.text_muted}>Le Pokédex de tes skins apparaîtra ici.</Text>}
                />
            ) : (
                <FlatList
                    key="tab-inventory" // 👈 AJOUTE CECI
                    data={allSkins}
                    keyExtractor={(item) => item.id.toString()}
                    numColumns={2}
                    columnWrapperStyle={{ justifyContent: 'space-between', paddingHorizontal: 20 }}
                    showsVerticalScrollIndicator={false}

                    ListHeaderComponent={renderHeader}

                    onEndReachedThreshold={0.5}
                    onEndReached={() => {
                        if (hasNextPage) fetchNextPage();
                    }}
                    ListFooterComponent={() =>
                        isFetchingNextPage ? <ActivityIndicator size="small" color={colors.tint} style={{ margin: 20 }} /> : null
                    }
                    ListEmptyComponent={() => (
                        isLoading ? <Spinner size="large" color={colors.tint} marginTop={40} /> :
                            <YStack alignItems="center" justifyContent="center" gap={10} opacity={0.5} paddingVertical={40}>
                                <PackageOpen size={48} color={colors.text_muted} />
                                <Text color={colors.text_muted} fontSize={16} fontWeight="bold">Ton inventaire est vide</Text>
                            </YStack>
                    )}
                    renderItem={({ item }) => (
                        <ItemInventory item={item} toggleSelection={toggleSelection} idsDelete={idsDelete} />
                    )}
                    contentContainerStyle={{ paddingBottom: 100 }}
                />
            )}
        </YStack>
    );
}