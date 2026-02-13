import { Case } from "@/constants/case";
import Colors from "@/constants/Colors";
import { useDemoStore } from "@/stores/demoStore";
import { getSearchStats, searchCases } from "@/utils/searchUtils";
import { ChevronRight, Package, Star, Sticker } from "lucide-react-native";
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import CaseView from "./Case";

interface CategorySectionProps {
    title: string;
    icon: React.ReactNode;
    cases: Case[];
    accentColor: string;
}

const CategorySection = ({ title, icon, cases, accentColor }: CategorySectionProps) => {
    if (cases.length === 0) return null;

    return (
        <View style={styles.section}>
            <View style={styles.sectionHeader}>
                <View style={styles.titleRow}>
                    <View style={[styles.iconContainer, { backgroundColor: `${accentColor}20` }]}>
                        {icon}
                    </View>
                    <View>
                        <Text style={styles.sectionTitle}>{title}</Text>
                        <Text style={styles.sectionCount}>
                            {cases.length} caisse{cases.length > 1 ? 's' : ''} disponible{cases.length > 1 ? 's' : ''}
                        </Text>
                    </View>
                </View>
                <TouchableOpacity style={styles.seeAllButton}>
                    <Text style={styles.seeAllText}>Voir tout</Text>
                    <ChevronRight size={16} color={Colors.light.tint} />
                </TouchableOpacity>
            </View>

            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.casesRow}
            >
                {cases.map((c) => (
                    <CaseView key={c.id} caseItem={c} />
                ))}
            </ScrollView>
        </View>
    );
};

const CaseList = () => {
    const searchQuery = useDemoStore(state => state.searchQuery);

    // 🔍 Filtre les caisses selon la recherche
    const filteredCases = searchCases(searchQuery);
    const stats = getSearchStats(searchQuery);

    const basiqueCases = filteredCases.filter((c) => c.type === 'basique');
    const souvenirCases = filteredCases.filter((c) => c.type === 'souvenir');
    const stickerCases = filteredCases.filter((c) => c.type === 'sticker');

    // Message si aucun résultat
    if (searchQuery && filteredCases.length === 0) {
        return (
            <View style={styles.noResultsContainer}>
                <Text style={styles.noResultsTitle}>Aucun résultat</Text>
                <Text style={styles.noResultsText}>
                    Essaie avec "AK-47", "AWP" ou "Kilowatt"
                </Text>
            </View>
        );
    }

    // Affiche le nombre de résultats si recherche active
    const showResultsCount = searchQuery && filteredCases.length > 0;

    return (
        <View style={styles.container}>
            {showResultsCount && (
                <View style={styles.resultsHeader}>
                    <Text style={styles.resultsCount}>
                        {stats.total} résultat{stats.total > 1 ? 's' : ''} trouvé{stats.total > 1 ? 's' : ''}
                    </Text>
                </View>
            )}

            <CategorySection
                title="Caisses Classiques"
                icon={<Package size={20} color={Colors.light.tint} />}
                cases={basiqueCases}
                accentColor={Colors.light.tint}
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
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: '100%',
        marginTop: 24,
        gap: 32,
        paddingBottom: 40,
    },
    section: {
        gap: 16,
    },
    sectionHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
    },
    titleRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
    },
    iconContainer: {
        width: 40,
        height: 40,
        borderRadius: 12,
        alignItems: 'center',
        justifyContent: 'center',
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: '700',
        color: Colors.light.text,
    },
    sectionCount: {
        fontSize: 12,
        color: Colors.light.text_muted,
        marginTop: 2,
    },
    seeAllButton: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
    },
    seeAllText: {
        fontSize: 13,
        color: Colors.light.tint,
        fontWeight: '600',
    },
    casesRow: {
        paddingHorizontal: 16,
        gap: 12,
    },
    // Résultats de recherche
    resultsHeader: {
        paddingHorizontal: 16,
        marginBottom: -16,
    },
    resultsCount: {
        fontSize: 14,
        color: Colors.light.text_secondary,
        fontWeight: '600',
    },
    // Aucun résultat
    noResultsContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 60,
        paddingHorizontal: 32,
    },
    noResultsTitle: {
        fontSize: 18,
        fontWeight: '700',
        color: Colors.light.text,
        marginBottom: 8,
    },
    noResultsText: {
        fontSize: 14,
        color: Colors.light.text_muted,
        textAlign: 'center',
    },
});

export default CaseList;
