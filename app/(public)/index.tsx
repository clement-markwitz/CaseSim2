// Home.tsx
import CaseList from '@/components/CaseList';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import SearchBar from '@/components/ui/SearchBar';
import Colors, { colorRarityBar } from '@/constants/Colors';
import { useDemoStore } from '@/stores/demoStore';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useEffect, useRef } from 'react';
import {
    Animated,
    Image,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

// Composant pour les statistiques individuelles avec animation
const StatCard = ({
    icon,
    value,
    label,
    color,
    delay = 0,
}: {
    icon: keyof typeof Ionicons.glyphMap;
    value: string;
    label: string;
    color: string;
    delay?: number;
}) => {
    const scaleAnim = useRef(new Animated.Value(0.8)).current;
    const opacityAnim = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        Animated.sequence([
            Animated.delay(delay),
            Animated.parallel([
                Animated.spring(scaleAnim, {
                    toValue: 1,
                    friction: 8,
                    tension: 40,
                    useNativeDriver: true,
                }),
                Animated.timing(opacityAnim, {
                    toValue: 1,
                    duration: 300,
                    useNativeDriver: true,
                }),
            ]),
        ]).start();
    }, []);

    return (
        <Animated.View
            style={[
                styles.statCard,
                {
                    opacity: opacityAnim,
                    transform: [{ scale: scaleAnim }],
                },
            ]}
        >
            {/* Icône avec fond coloré */}
            <View style={[styles.statIconContainer, { backgroundColor: `${color}20` }]}>
                <Ionicons name={icon} size={20} color={color} />
            </View>

            {/* Valeur */}
            <Text style={[styles.statValue, { color }]}>{value}</Text>

            {/* Label */}
            <Text style={styles.statLabel}>{label}</Text>

            {/* Accent décoratif */}
            <View style={[styles.statAccent, { backgroundColor: color }]} />
        </Animated.View>
    );
};

// Composant pour le meilleur drop
const BestDropCard = ({ drop }: { drop: any }) => {
    const slideAnim = useRef(new Animated.Value(30)).current;
    const opacityAnim = useRef(new Animated.Value(0)).current;
    const glowAnim = useRef(new Animated.Value(0.3)).current;

    const rarityColor = colorRarityBar[drop.rarity] || Colors.light.tint;

    useEffect(() => {
        // Animation d'entrée
        Animated.parallel([
            Animated.timing(slideAnim, {
                toValue: 0,
                duration: 500,
                delay: 400,
                useNativeDriver: true,
            }),
            Animated.timing(opacityAnim, {
                toValue: 1,
                duration: 500,
                delay: 400,
                useNativeDriver: true,
            }),
        ]).start();

        // Animation de glow continue
        Animated.loop(
            Animated.sequence([
                Animated.timing(glowAnim, {
                    toValue: 0.6,
                    duration: 1500,
                    useNativeDriver: true,
                }),
                Animated.timing(glowAnim, {
                    toValue: 0.3,
                    duration: 1500,
                    useNativeDriver: true,
                }),
            ])
        ).start();
    }, []);

    return (
        <Animated.View
            style={[
                styles.bestDropWrapper,
                {
                    opacity: opacityAnim,
                    transform: [{ translateY: slideAnim }],
                },
            ]}
        >
            {/* Header du meilleur drop */}
            <View style={styles.bestDropHeader}>
                <View style={styles.bestDropTitleContainer}>
                    <LinearGradient
                        colors={[`${rarityColor}40`, 'transparent']}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 0 }}
                        style={styles.bestDropTitleGradient}
                    />
                    <Ionicons name="trophy" size={18} color={rarityColor} />
                    <Text style={styles.bestDropTitle}>Meilleur Drop</Text>
                </View>
                <View style={[styles.rarityBadge, { backgroundColor: `${rarityColor}30` }]}>
                    <Text style={[styles.rarityBadgeText, { color: rarityColor }]}>
                        {drop.rarity?.toUpperCase() || 'RARE'}
                    </Text>
                </View>
            </View>

            {/* Card principale */}
            <View style={styles.bestDropCard}>
                {/* Glow effect */}
                <Animated.View
                    style={[
                        styles.bestDropGlow,
                        {
                            backgroundColor: rarityColor,
                            opacity: glowAnim,
                        },
                    ]}
                />

                {/* Bordure colorée */}
                <LinearGradient
                    colors={[rarityColor, `${rarityColor}50`, 'transparent']}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    style={styles.bestDropBorder}
                />

                {/* Contenu */}
                <View style={styles.bestDropContent}>
                    {/* Image de l'arme */}
                    <View style={styles.bestDropImageContainer}>
                        <LinearGradient
                            colors={[`${rarityColor}20`, 'transparent']}
                            style={styles.bestDropImageBg}
                        />
                        <Image
                            source={{ uri: drop.image }}
                            style={styles.bestDropImage}
                            resizeMode="contain"
                        />
                        {/* Rarity bar sous l'image */}
                        <View style={[styles.bestDropRarityBar, { backgroundColor: rarityColor }]} />
                    </View>

                    {/* Infos */}
                    <View style={styles.bestDropInfo}>
                        <Text style={styles.bestDropName} numberOfLines={2}>
                            {drop.name}
                        </Text>

                        {drop.wear && (
                            <View style={styles.wearContainer}>
                                <Ionicons name="sparkles" size={12} color={Colors.light.text_muted} />
                                <Text style={styles.bestDropWear}>{drop.wear} {drop.statTrak && '| ST'}</Text>
                            </View>
                        )}

                        <View style={styles.priceContainer}>
                            <Text style={styles.priceLabel}>Valeur</Text>
                            <Text style={[styles.bestDropPrice, { color: rarityColor }]}>
                                {drop.price.toFixed(2)}€
                            </Text>
                        </View>
                    </View>
                </View>
            </View>
        </Animated.View>
    );
};

const Home = () => {
    const { totalOpened, totalValue, bestDrop, getAverageValue, getProfit } = useDemoStore();
    const displayColor = getProfit() >= 0
        ? '#00B894'
        : '#E74C3C';

    const profitIcon = getProfit() >= 0
        ? 'trending-up'
        : 'trending-down';
    // Animation pour le container de stats
    const containerAnim = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        if (totalOpened > 0) {
            Animated.timing(containerAnim, {
                toValue: 1,
                duration: 400,
                useNativeDriver: true,
            }).start();
        }
    }, [totalOpened > 0]);

    return (
        <SafeAreaProvider>
            <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
                <View style={styles.container}>
                    <Header />
                    <Hero />

                    {/* Section Statistiques */}
                    {totalOpened > 0 && (
                        <Animated.View
                            style={[
                                styles.statsSection,
                                {
                                    opacity: containerAnim,
                                    transform: [
                                        {
                                            translateY: containerAnim.interpolate({
                                                inputRange: [0, 1],
                                                outputRange: [20, 0],
                                            }),
                                        },
                                    ],
                                },
                            ]}
                        >
                            {/* Header de section */}
                            <View style={styles.sectionHeader}>
                                <View style={styles.sectionTitleContainer}>
                                    <Ionicons
                                        name="stats-chart"
                                        size={20}
                                        color={Colors.light.tint}
                                    />
                                    <Text style={styles.sectionTitle}>Tes Statistiques</Text>
                                    <TouchableOpacity
                                        onPress={() => {
                                            useDemoStore.getState().resetStats();
                                        }}
                                    >
                                        <Text style={styles.sectionReset}>Reset</Text>
                                    </TouchableOpacity>
                                </View>
                                <View style={styles.sectionDivider} />
                            </View>

                            {/* Grille de stats */}
                            <View style={styles.statsGrid}>
                                <StatCard
                                    icon="cube-outline"
                                    value={totalOpened.toString()}
                                    label="Cases ouvertes"
                                    color="#6C5CE7"
                                    delay={100}
                                />
                                <StatCard
                                    icon="wallet-outline"
                                    value={`${totalValue.toFixed(2)}€`}
                                    label="Valeur totale"
                                    color="#a89805ff"
                                    delay={200}
                                />
                                <StatCard
                                    icon={profitIcon}
                                    value={`${getProfit().toFixed(2)}€`}
                                    label="Profit"
                                    color={displayColor}
                                    delay={300}
                                />
                            </View>

                            {/* Meilleur drop */}
                            {bestDrop && <BestDropCard drop={bestDrop} />}
                        </Animated.View>
                    )}

                    <SearchBar />
                    <CaseList />
                </View>
            </ScrollView>
        </SafeAreaProvider>
    );
};

const styles = StyleSheet.create({
    scrollView: {
        flex: 1,
        backgroundColor: Colors.light.background,
    },
    container: {
        flex: 1,
        backgroundColor: Colors.light.background,
        alignItems: 'center',
        justifyContent: 'flex-start',
        paddingBottom: 40,
    },

    // === SECTION STATS ===
    statsSection: {
        width: '100%',
        paddingHorizontal: 16,
        marginTop: 24,
        marginBottom: 8,
    },

    // Header de section
    sectionHeader: {
        marginBottom: 16,
    },
    sectionTitleContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
        marginBottom: 12,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: '700',
        color: Colors.light.text,
        letterSpacing: 0.5,
    },
    sectionDivider: {
        height: 2,
        backgroundColor: Colors.light.border,
        borderRadius: 1,
        opacity: 0.5,
    },

    // === GRILLE DE STATS ===
    statsGrid: {
        flexDirection: 'row',
        gap: 12,
        marginBottom: 20,
    },

    // Card de stat individuelle
    statCard: {
        flex: 1,
        backgroundColor: Colors.light.background_secondary,
        borderRadius: 16,
        padding: 16,
        alignItems: 'center',
        borderWidth: 1,
        borderColor: Colors.light.border,
        position: 'relative',
        overflow: 'hidden',
    },
    statIconContainer: {
        width: 40,
        height: 40,
        borderRadius: 12,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 12,
    },
    statValue: {
        fontSize: 20,
        fontWeight: '800',
        marginBottom: 4,
    },
    statLabel: {
        fontSize: 11,
        color: Colors.light.text_muted,
        textAlign: 'center',
        fontWeight: '500',
        textTransform: 'uppercase',
        letterSpacing: 0.5,
    },
    statAccent: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: 3,
        borderBottomLeftRadius: 16,
        borderBottomRightRadius: 16,
    },

    // === MEILLEUR DROP ===
    bestDropWrapper: {
        marginTop: 8,
    },
    bestDropHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 12,
    },
    bestDropTitleContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
        paddingVertical: 6,
        paddingHorizontal: 12,
        borderRadius: 8,
        overflow: 'hidden',
        position: 'relative',
    },
    bestDropTitleGradient: {
        ...StyleSheet.absoluteFillObject,
    },
    bestDropTitle: {
        fontSize: 14,
        fontWeight: '700',
        color: Colors.light.text,
        letterSpacing: 0.5,
    },
    rarityBadge: {
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 6,
    },
    rarityBadgeText: {
        fontSize: 10,
        fontWeight: '700',
        letterSpacing: 1,
    },

    // Card du meilleur drop
    bestDropCard: {
        backgroundColor: Colors.light.background_secondary,
        borderRadius: 16,
        overflow: 'hidden',
        borderWidth: 1,
        borderColor: Colors.light.border,
        position: 'relative',
    },
    bestDropGlow: {
        position: 'absolute',
        top: -50,
        left: '50%',
        marginLeft: -100,
        width: 200,
        height: 65,
        borderRadius: 100,
        opacity: 0.3,
    },
    bestDropBorder: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: 4,
        height: '100%',
    },
    bestDropContent: {
        flexDirection: 'row',
        padding: 16,
        gap: 16,
    },

    // Image du drop
    bestDropImageContainer: {
        width: 120,
        height: 90,
        borderRadius: 12,
        marginTop: 10,
        overflow: 'hidden',
        position: 'relative',
        backgroundColor: Colors.light.background,
    },
    bestDropImageBg: {
        ...StyleSheet.absoluteFillObject,
    },
    bestDropImage: {
        width: '100%',
        height: '100%',
    },
    bestDropRarityBar: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: 3,
    },

    // Infos du drop
    bestDropInfo: {
        flex: 1,
        justifyContent: 'center',
    },
    bestDropName: {
        fontSize: 15,
        fontWeight: '700',
        color: Colors.light.text,
        marginTop: 5,
        marginBottom: 6,
        lineHeight: 20,
    },
    wearContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
        marginBottom: 10,
    },
    bestDropWear: {
        fontSize: 12,
        color: Colors.light.text_muted,
        fontWeight: '500',
    },
    priceContainer: {
        backgroundColor: Colors.light.background,
        paddingHorizontal: 12,
        paddingVertical: 8,
        borderRadius: 8,
        alignSelf: 'flex-start',
    },
    priceLabel: {
        fontSize: 10,
        color: Colors.light.text_muted,
        fontWeight: '500',
        textTransform: 'uppercase',
        letterSpacing: 0.5,
        marginBottom: 2,
    },
    bestDropPrice: {
        fontSize: 18,
        fontWeight: '800',
    },
    sectionReset: {
        fontSize: 12,
        fontWeight: '500',
        color: Colors.light.text_muted,
        marginLeft: '50%',
        letterSpacing: 0.5,
    },
});

export default Home;
