import AccordionFilter, { InventoryFilters } from '@/components/ui/AccordionFilter';
import ItemInventory from '@/components/ui/ItemInventory';
import SheetInventory from "@/components/ui/SheetInventory";
import { useAppTheme } from "@/hooks/useAppTheme";
import { useInventory } from "@/hooks/useInventory";
import { useProfileMe } from "@/hooks/useProfileMe";
import { useSellSkins } from "@/hooks/useSellSkins";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { ArrowLeft, Edit3, PackageOpen, Settings, Trash2, X } from "lucide-react-native";
import { useMemo, useState } from "react";
import { ActivityIndicator, FlatList } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Avatar, Button, Spinner, Text, XStack, YStack } from "tamagui";

export default function ProfileScreen() {
    const { data: profile } = useProfileMe();
    const colors = useAppTheme();
    const router = useRouter();
    const insets = useSafeAreaInsets();

    // 🚀 INJECTION DU HOOK DE VENTE
    const { mutate: sellSkins, isPending: isSelling } = useSellSkins();

    const [activeTab, setActiveTab] = useState<'inventory' | 'collections'>('inventory');

    const [idsDelete, setIdsDelete] = useState<string[]>([]);
    const [actionItemId, setActionItemId] = useState<string | null>(null);
    const [totalPrice, setTotalPrice] = useState<number>(0);
    const [filters, setFilters] = useState<InventoryFilters>({
        search: '', minPrice: '', maxPrice: '', category: 'all', sortBy: 'price_desc'
    });

    const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } = useInventory(filters);

    // 🐛 CORRECTION DU BUG DE PRIX : On ajoute ou on soustrait intelligemment
    const toggleSelection = (id: string, price: number) => {
        setIdsDelete(prev => {
            if (prev.includes(id)) {
                setTotalPrice(p => p - price); // On retire le prix
                return prev.filter(i => i !== id);
            } else {
                setTotalPrice(p => p + price); // On ajoute le prix
                return [...prev, id];
            }
        });
    };

    // 🧹 Fonction pour annuler la sélection proprement
    const cancelSelection = () => {
        setIdsDelete([]);
        setTotalPrice(0);
    };

    // 💰 Fonction pour déclencher la vente
    const handleSell = () => {
        if (idsDelete.length === 0) return;
        const price = totalPrice
        const ids = idsDelete
        sellSkins(
            { ids, price },
            {
                onSuccess: () => {
                    // Si la vente réussit, on vide la sélection
                    cancelSelection();
                }
            }
        );
    };

    const allSkins = useMemo(() => {
        return data?.pages.flatMap(page => page) || [];
    }, [data]);

    const renderHeader = () => (
        <YStack paddingBottom={15}>
            {/* ... TON HEADER EXISTANT (Profil + Boutons) RESTE ICI ... */}
            <YStack marginHorizontal={20} backgroundColor={colors.background_card} borderRadius={16} padding={20} borderWidth={1} borderColor={colors.border} gap={20}>
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

                <XStack gap={10}>
                    <YStack flex={1} backgroundColor={colors.background_elevated} borderRadius={12} padding={12} alignItems="center">
                        <Text fontSize={20} fontWeight="900" color={colors.success}>{profile?.balance?.toFixed(2)} $</Text>
                    </YStack>
                    <YStack flex={1} backgroundColor={colors.background_elevated} borderRadius={12} padding={12} alignItems="center">
                        <Text fontSize={20} fontWeight="900" color={colors.tint}>{profile?.shop_balance} 💎</Text>
                    </YStack>
                </XStack>
            </YStack>

            <XStack marginHorizontal={20} marginTop={30} backgroundColor={colors.background_card} borderRadius={12} padding={4} borderWidth={1} borderColor={colors.border}>
                <Button flex={1} borderRadius={8} backgroundColor={activeTab === 'inventory' ? colors.tint : 'transparent'} onPress={() => setActiveTab('inventory')}>
                    <Text color={activeTab === 'inventory' ? 'black' : colors.text} fontWeight="bold">Inventaire</Text>
                </Button>
                <Button flex={1} borderRadius={8} backgroundColor={activeTab === 'collections' ? colors.tint : 'transparent'} onPress={() => setActiveTab('collections')}>
                    <Text color={activeTab === 'collections' ? 'black' : colors.text} fontWeight="bold">Collections</Text>
                </Button>
            </XStack>

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

    return (
        <YStack flex={1} backgroundColor={colors.background} paddingTop={insets.top + 10}>

            <XStack alignItems="center" justifyContent="space-between" paddingHorizontal={20} paddingBottom={20}>
                <Button icon={<ArrowLeft size={20} color={colors.text} />} onPress={() => router.back()} circular backgroundColor={colors.background_elevated} />
                <Text fontSize={20} fontWeight="bold" color={colors.text} letterSpacing={1}>PROFIL</Text>
                <Button icon={<Settings size={20} color={colors.text} />} circular backgroundColor={colors.background_elevated} />
            </XStack>

            <LinearGradient colors={['transparent', colors.tint, 'transparent']} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} style={{ height: 1, opacity: 0.3, marginBottom: 20 }} />

            {activeTab === 'collections' ? (
                <FlatList
                    key="tab-collections"
                    data={[]}
                    renderItem={() => null}
                    ListHeaderComponent={renderHeader}
                    ListEmptyComponent={<Text textAlign="center" marginTop={40} color={colors.text_muted}>Le Pokédex de tes skins apparaîtra ici.</Text>}
                />
            ) : (
                <FlatList
                    key="tab-inventory"
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
                        <ItemInventory item={item} toggleSelection={toggleSelection} idsDelete={idsDelete} onOpenSheet={() => setActionItemId(item.id)} />
                    )}
                    // On laisse un gros espace en bas pour que la Flatlist ne soit pas cachée par la barre d'action
                    contentContainerStyle={{ paddingBottom: idsDelete.length > 0 ? 120 : 40 }}
                />
            )}
            <SheetInventory
                open={actionItemId !== null}
                setOpen={(isOpen) => !isOpen && setActionItemId(null)}
                id={actionItemId || ''}
                toggleSelection={(id) => {
                    // Petite fonction pour trouver le prix avant de le passer à toggleSelection
                    const selectedItem = allSkins.find(s => s.id === id);
                    if (selectedItem) toggleSelection(id, selectedItem.price);
                }}

            />

            {/* 🚀 LA BARRE D'ACTION FLOTTANTE (S'affiche uniquement s'il y a des objets sélectionnés) */}
            {idsDelete.length > 0 && (
                <XStack
                    position="absolute"
                    bottom={insets.bottom > 0 ? insets.bottom + 10 : 30} // Gère l'encoche de l'iPhone en bas
                    left={20}
                    right={20}
                    backgroundColor={colors.background_card}
                    padding={15}
                    borderRadius={16}
                    borderWidth={1}
                    borderColor={colors.border}
                    justifyContent="space-between"
                    alignItems="center"
                    elevation={5} // Ombre Android
                    shadowColor="#000" // Ombre iOS
                    shadowOpacity={0.3}
                    shadowRadius={5}
                    shadowOffset={{ width: 0, height: 2 }}
                    transition={{ type: "spring", damping: 20, stiffness: 200 }} // Si tu as configuré les animations Tamagui
                    enterStyle={{ opacity: 0, y: 20 }}
                    exitStyle={{ opacity: 0, y: 20 }}
                >
                    {/* Bouton Annuler */}
                    <Button unstyled onPress={cancelSelection} icon={<X size={20} color={colors.text} />} disabled={isSelling}>
                    </Button>

                    <Text color={colors.text_muted} fontSize={12} fontWeight="bold">
                        {idsDelete.length} item{idsDelete.length > 1 ? 's' : ''}
                    </Text>

                    {/* Bouton Vendre */}
                    <Button
                        size="$3"
                        backgroundColor="$red8"
                        onPress={handleSell}
                        icon={isSelling ? <Spinner color="white" /> : <Trash2 size={16} color="white" />}
                        disabled={isSelling}
                        pressStyle={{ scale: 0.95 }}
                    >
                        <Text color="white" fontWeight="bold">
                            Vendre (+{Math.abs(totalPrice).toFixed(2)}$)
                        </Text>
                    </Button>
                </XStack>
            )}
        </YStack>
    );
}