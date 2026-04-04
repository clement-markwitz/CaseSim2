// CaseList.tsx
import { Case } from "@/constants/case";
import { useAppTheme } from "@/hooks/useAppTheme";
import { useCases } from "@/hooks/useCases";
import { useDemoStore } from "@/stores/demoStore";
import { getSearchStats, searchCases } from "@/utils/searchUtils";
import { ChevronRight, Package, Star, Sticker } from "lucide-react-native";
import CaseView from "./Case";

// Import de Tamagui
import { ScrollView, Text, XStack, YStack } from "tamagui";

interface CategorySectionProps {
    title: string;
    icon: React.ReactNode;
    cases: Case[];
    accentColor: string;
}

const CategorySection = ({ title, icon, cases, accentColor }: CategorySectionProps) => {
    const colors = useAppTheme();
    if (cases.length === 0) return null;

    return (
        <YStack gap={16}>
            {/* Header de la section */}
            <XStack alignItems="center" justifyContent="space-between" paddingHorizontal={16}>
                <XStack alignItems="center" gap={12}>
                    {/* Icône */}
                    <YStack
                        width={40} height={40} borderRadius={12}
                        alignItems="center" justifyContent="center"
                        backgroundColor={`${accentColor}20`}
                    >
                        {icon}
                    </YStack>

                    {/* Titre et Compteur */}
                    <YStack>
                        <Text fontSize={18} fontWeight="700" color={colors.text}>
                            {title}
                        </Text>
                        <Text fontSize={12} color={colors.text_muted} marginTop={2}>
                            {cases.length} caisse{cases.length > 1 ? 's' : ''} disponible{cases.length > 1 ? 's' : ''}
                        </Text>
                    </YStack>
                </XStack>

                {/* Bouton "Voir tout" */}
                <XStack
                    alignItems="center" gap={4}
                    pressStyle={{ opacity: 0.5 }}
                >
                    <Text fontSize={13} color={colors.tint} fontWeight="600">Voir tout</Text>
                    <ChevronRight size={16} color={colors.tint} />
                </XStack>
            </XStack>

            {/* Liste horizontale des caisses */}
            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{ paddingHorizontal: 16, gap: 12 }}
            >
                {cases.map((c) => (
                    <CaseView key={c.id} caseItem={c} />
                ))}
            </ScrollView>
        </YStack>
    );
};

const CaseList = () => {
    const searchQuery = useDemoStore(state => state.searchQuery);
    const { data: cases } = useCases();
    const colors = useAppTheme();
    const filteredCases = searchCases(cases || [], searchQuery);
    const stats = getSearchStats(cases || [], searchQuery);

    const basiqueCases = filteredCases.filter((c) => c.type === 'basique');
    const souvenirCases = filteredCases.filter((c) => c.type === 'souvenir');
    const stickerCases = filteredCases.filter((c) => c.type === 'sticker');

    // Message si aucun résultat
    if (searchQuery && filteredCases.length === 0) {
        return (
            <YStack flex={1} alignItems="center" justifyContent="center" paddingVertical={60} paddingHorizontal={32}>
                <Text fontSize={18} fontWeight="700" color={colors.text} marginBottom={8}>
                    Aucun résultat
                </Text>
                <Text fontSize={14} color={colors.text_muted} textAlign="center">
                    Essaie avec "AK-47", "AWP" ou "Kilowatt"
                </Text>
            </YStack>
        );
    }

    // Affiche le nombre de résultats si recherche active
    const showResultsCount = searchQuery && filteredCases.length > 0;

    return (
        <YStack width="100%" marginTop={24} gap={32} paddingBottom={40}>

            {showResultsCount && (
                <YStack paddingHorizontal={16} marginBottom={-16}>
                    <Text fontSize={14} color={colors.text_secondary} fontWeight="600">
                        {stats.total} résultat{stats.total > 1 ? 's' : ''} trouvé{stats.total > 1 ? 's' : ''}
                    </Text>
                </YStack>
            )}

            <CategorySection
                title="Caisses Classiques"
                icon={<Package size={20} color={colors.tint} />}
                cases={basiqueCases}
                accentColor={colors.tint}
            />

            <CategorySection
                title="Caisses Souvenir"
                icon={<Star size={20} color="#8847FF" />}
                cases={souvenirCases}
                accentColor="#8847FF"
            />

            <CategorySection
                title="Capsules de Stickers"
                icon={<Sticker size={20} color="#4B69FF" />}
                cases={stickerCases}
                accentColor="#4B69FF"
            />
        </YStack>
    );
};

export default CaseList;