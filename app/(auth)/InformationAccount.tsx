import Colors from '@/constants/Colors';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import React, { useEffect, useRef } from 'react';
import {
    Animated,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const ACCENT = '#6C5CE7';
const GOLD = '#F9CA24';
const GREEN = '#00B894';

const perks = [
    {
        icon: 'cash-outline' as const,
        color: GOLD,
        title: 'Monnaie virtuelle',
        description: 'Un portefeuille dédié pour toutes tes transactions in-game.',
    },
    {
        icon: 'briefcase-outline' as const,
        color: '#74B9FF',
        title: 'Inventaire personnel',
        description: 'Retrouve tous tes drops au même endroit, classés et filtrables.',
    },
    {
        icon: 'podium-outline' as const,
        color: '#FD79A8',
        title: 'Classement des joueurs',
        description: 'Grimpe dans le leaderboard et prouve ta valeur face à la communauté.',
    },
    {
        icon: 'sunny-outline' as const,
        color: GREEN,
        title: '+10€ chaque jour',
        description: 'Une récompense quotidienne déposée automatiquement sur ton compte.',
    },
    {
        icon: 'gift-outline' as const,
        color: ACCENT,
        title: 'Bonus hebdomadaire',
        description: 'Entre 100€ et 300€ virtuels + une caisse mystère chaque semaine.',
    },
];

const PerkRow = ({
    perk,
    index,
}: {
    perk: (typeof perks)[0];
    index: number;
}) => {
    const slideAnim = useRef(new Animated.Value(40)).current;
    const opacityAnim = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        Animated.sequence([
            Animated.delay(300 + index * 100),
            Animated.parallel([
                Animated.spring(slideAnim, {
                    toValue: 0,
                    friction: 8,
                    tension: 40,
                    useNativeDriver: true,
                }),
                Animated.timing(opacityAnim, {
                    toValue: 1,
                    duration: 350,
                    useNativeDriver: true,
                }),
            ]),
        ]).start();
    }, []);

    return (
        <Animated.View
            style={[
                styles.perkRow,
                {
                    opacity: opacityAnim,
                    transform: [{ translateX: slideAnim }],
                },
            ]}
        >
            <View style={[styles.perkIconWrap, { backgroundColor: `${perk.color}18` }]}>
                <Ionicons name={perk.icon} size={22} color={perk.color} />
                <View style={[styles.perkIconAccent, { backgroundColor: perk.color }]} />
            </View>

            <View style={styles.perkText}>
                <Text style={styles.perkTitle}>{perk.title}</Text>
                <Text style={styles.perkDescription}>{perk.description}</Text>
            </View>
        </Animated.View>
    );
};

const InformationAccount = () => {
    const heroScale = useRef(new Animated.Value(0.85)).current;
    const heroOpacity = useRef(new Animated.Value(0)).current;
    const glowAnim = useRef(new Animated.Value(0.4)).current;

    useEffect(() => {
        Animated.parallel([
            Animated.spring(heroScale, {
                toValue: 1,
                friction: 7,
                tension: 35,
                useNativeDriver: true,
            }),
            Animated.timing(heroOpacity, {
                toValue: 1,
                duration: 500,
                useNativeDriver: true,
            }),
        ]).start();

        Animated.loop(
            Animated.sequence([
                Animated.timing(glowAnim, {
                    toValue: 0.75,
                    duration: 2000,
                    useNativeDriver: true,
                }),
                Animated.timing(glowAnim, {
                    toValue: 0.4,
                    duration: 2000,
                    useNativeDriver: true,
                }),
            ])
        ).start();
    }, []);

    return (
        <SafeAreaView style={styles.safe}>
            <ScrollView
                style={styles.scroll}
                contentContainerStyle={styles.scrollContent}
                showsVerticalScrollIndicator={false}
            >
                {/* Hero */}
                <Animated.View
                    style={[
                        styles.heroContainer,
                        { opacity: heroOpacity, transform: [{ scale: heroScale }] },
                    ]}
                >
                    {/* Glow derrière l'icône */}
                    <Animated.View
                        style={[styles.heroGlow, { opacity: glowAnim }]}
                    />

                    <LinearGradient
                        colors={[`${ACCENT}30`, `${GREEN}20`, 'transparent']}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 1 }}
                        style={styles.heroBg}
                    />

                    <View style={styles.heroIconRing}>
                        <LinearGradient
                            colors={[ACCENT, GREEN]}
                            start={{ x: 0, y: 0 }}
                            end={{ x: 1, y: 1 }}
                            style={styles.heroIconGradient}
                        >
                            <Ionicons name="checkmark-done" size={34} color="#fff" />
                        </LinearGradient>
                    </View>

                    <Text style={styles.heroTitle}>Compte créé avec succès !</Text>
                    <Text style={styles.heroSubtitle}>
                        Bienvenue dans l'arène. Tout est prêt — voici ce qui t'attend.
                    </Text>
                </Animated.View>

                {/* Section avantages */}
                <View style={styles.section}>
                    <View style={styles.sectionHeader}>
                        <View style={styles.sectionLine} />
                        <Text style={styles.sectionLabel}>Tes avantages</Text>
                        <View style={styles.sectionLine} />
                    </View>

                    <View style={styles.perkList}>
                        {perks.map((perk, i) => (
                            <PerkRow key={perk.title} perk={perk} index={i} />
                        ))}
                    </View>
                </View>

                {/* CTA */}
                <TouchableOpacity
                    style={styles.ctaWrapper}
                    activeOpacity={0.85}
                    onPress={() => router.replace('/')}
                >
                    <LinearGradient
                        colors={[ACCENT, '#A29BFE']}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 0 }}
                        style={styles.ctaGradient}
                    >
                        <Text style={styles.ctaText}>Commencer à jouer</Text>
                        <Ionicons name="arrow-forward" size={18} color="#fff" />
                    </LinearGradient>
                </TouchableOpacity>
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    safe: {
        flex: 1,
        backgroundColor: Colors.light.background,
    },
    scroll: {
        flex: 1,
    },
    scrollContent: {
        paddingBottom: 48,
        paddingHorizontal: 20,
    },

    // === HERO ===
    heroContainer: {
        alignItems: 'center',
        marginTop: 32,
        marginBottom: 36,
        borderRadius: 24,
        overflow: 'hidden',
        padding: 32,
        position: 'relative',
        backgroundColor: Colors.light.background_secondary,
        borderWidth: 1,
        borderColor: Colors.light.border,
    },
    heroBg: {
        ...StyleSheet.absoluteFillObject,
    },
    heroGlow: {
        position: 'absolute',
        top: -60,
        width: 200,
        height: 200,
        borderRadius: 100,
        backgroundColor: ACCENT,
        opacity: 0.4,
    },
    heroIconRing: {
        width: 80,
        height: 80,
        borderRadius: 24,
        marginBottom: 20,
        shadowColor: ACCENT,
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.5,
        shadowRadius: 16,
        elevation: 12,
    },
    heroIconGradient: {
        flex: 1,
        borderRadius: 24,
        alignItems: 'center',
        justifyContent: 'center',
    },
    heroTitle: {
        fontSize: 22,
        fontWeight: '800',
        color: Colors.light.text,
        textAlign: 'center',
        letterSpacing: 0.3,
        marginBottom: 10,
    },
    heroSubtitle: {
        fontSize: 14,
        color: Colors.light.text_muted,
        textAlign: 'center',
        lineHeight: 22,
        fontWeight: '500',
    },

    // === SECTION ===
    section: {
        marginBottom: 32,
    },
    sectionHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
        marginBottom: 20,
    },
    sectionLine: {
        flex: 1,
        height: 1,
        backgroundColor: Colors.light.border,
        opacity: 0.6,
    },
    sectionLabel: {
        fontSize: 11,
        fontWeight: '700',
        color: Colors.light.text_muted,
        textTransform: 'uppercase',
        letterSpacing: 1.5,
    },

    // === PERKS ===
    perkList: {
        gap: 12,
    },
    perkRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 16,
        backgroundColor: Colors.light.background_secondary,
        borderRadius: 16,
        padding: 16,
        borderWidth: 1,
        borderColor: Colors.light.border,
    },
    perkIconWrap: {
        width: 52,
        height: 52,
        borderRadius: 14,
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        flexShrink: 0,
    },
    perkIconAccent: {
        position: 'absolute',
        bottom: 0,
        left: 8,
        right: 8,
        height: 2,
        borderRadius: 1,
        opacity: 0.7,
    },
    perkText: {
        flex: 1,
    },
    perkTitle: {
        fontSize: 14,
        fontWeight: '700',
        color: Colors.light.text,
        marginBottom: 3,
        letterSpacing: 0.2,
    },
    perkDescription: {
        fontSize: 12,
        color: Colors.light.text_muted,
        lineHeight: 18,
        fontWeight: '400',
    },

    // === CTA ===
    ctaWrapper: {
        borderRadius: 16,
        overflow: 'hidden',
        shadowColor: ACCENT,
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.4,
        shadowRadius: 12,
        elevation: 10,
    },
    ctaGradient: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 10,
        paddingVertical: 18,
        paddingHorizontal: 32,
    },
    ctaText: {
        fontSize: 16,
        fontWeight: '800',
        color: '#fff',
        letterSpacing: 0.5,
    },
});

export default InformationAccount;