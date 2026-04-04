// InformationAccount.tsx
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import React, { useEffect, useRef } from 'react';
// On garde Animated et ScrollView de React Native
import { Animated } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
// On importe Tamagui
import { useAppTheme } from '@/hooks/useAppTheme';
import { ScrollView, Text, XStack, YStack } from 'tamagui';
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

const PerkRow = ({ perk, index }: { perk: (typeof perks)[0]; index: number; }) => {
    const slideAnim = useRef(new Animated.Value(40)).current;
    const opacityAnim = useRef(new Animated.Value(0)).current;
    const colors = useAppTheme();
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
    }, [index, slideAnim, opacityAnim]);

    return (
        <Animated.View
            style={{
                flexDirection: 'row',
                alignItems: 'center',
                gap: 16,
                backgroundColor: colors.background_secondary,
                borderRadius: 16,
                padding: 16,
                borderWidth: 1,
                borderColor: colors.border,
                opacity: opacityAnim,
                transform: [{ translateX: slideAnim }],
            }}
        >
            <YStack
                width={52} height={52} borderRadius={14}
                alignItems="center" justifyContent="center" position="relative"
                flexShrink={0} backgroundColor={`${perk.color}18`}
            >
                <Ionicons name={perk.icon} size={22} color={perk.color} />
                <YStack position="absolute" bottom={0} left={8} right={8} height={2} borderRadius={1} opacity={0.7} backgroundColor={perk.color} />
            </YStack>

            <YStack flex={1}>
                <Text fontSize={14} fontWeight="700" color={colors.text} marginBottom={3} letterSpacing={0.2}>
                    {perk.title}
                </Text>
                <Text fontSize={12} color={colors.text_muted} lineHeight={18} fontWeight="400">
                    {perk.description}
                </Text>
            </YStack>
        </Animated.View>
    );
};

const InformationAccount = () => {
    const heroScale = useRef(new Animated.Value(0.85)).current;
    const heroOpacity = useRef(new Animated.Value(0)).current;
    const glowAnim = useRef(new Animated.Value(0.4)).current;
    const colors = useAppTheme();
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
    }, [heroScale, heroOpacity, glowAnim]);

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
            <ScrollView flex={1} contentContainerStyle={{ paddingBottom: 48, paddingHorizontal: 20 }} showsVerticalScrollIndicator={false}>

                {/* Hero */}
                <Animated.View
                    style={{
                        alignItems: 'center', marginTop: 32, marginBottom: 36,
                        borderRadius: 24, overflow: 'hidden', padding: 32, position: 'relative',
                        backgroundColor: colors.background_secondary,
                        borderWidth: 1, borderColor: colors.border,
                        opacity: heroOpacity, transform: [{ scale: heroScale }],
                    }}
                >
                    {/* Glow derrière l'icône */}
                    <Animated.View
                        style={{
                            position: 'absolute', top: -60, width: 200, height: 200, borderRadius: 100,
                            backgroundColor: ACCENT, opacity: glowAnim
                        }}
                    />

                    <LinearGradient
                        colors={[`${ACCENT}30`, `${GREEN}20`, 'transparent']}
                        start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}
                        style={{ position: 'absolute', top: 0, bottom: 0, left: 0, right: 0 }}
                    />

                    <YStack
                        width={80} height={80} borderRadius={24} marginBottom={20}
                        shadowColor={ACCENT} shadowOffset={{ width: 0, height: 8 }} shadowOpacity={0.5} shadowRadius={16} elevation={12}
                    >
                        <LinearGradient
                            colors={[ACCENT, GREEN]}
                            start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}
                            style={{ flex: 1, borderRadius: 24, alignItems: 'center', justifyContent: 'center' }}
                        >
                            <Ionicons name="checkmark-done" size={34} color="#fff" />
                        </LinearGradient>
                    </YStack>

                    <Text fontSize={22} fontWeight="800" color={colors.text} textAlign="center" letterSpacing={0.3} marginBottom={10}>
                        Compte créé avec succès !
                    </Text>
                    <Text fontSize={14} color={colors.text_muted} textAlign="center" lineHeight={22} fontWeight="500">
                        Bienvenue dans l'arène. Tout est prêt — voici ce qui t'attend.
                    </Text>
                </Animated.View>

                {/* Section avantages */}
                <YStack marginBottom={32}>
                    <XStack alignItems="center" gap={12} marginBottom={20}>
                        <YStack flex={1} height={1} backgroundColor={colors.border} opacity={0.6} />
                        <Text fontSize={11} fontWeight="700" color={colors.text_muted} textTransform="uppercase" letterSpacing={1.5}>
                            Tes avantages
                        </Text>
                        <YStack flex={1} height={1} backgroundColor={colors.border} opacity={0.6} />
                    </XStack>

                    <YStack gap={12}>
                        {perks.map((perk, i) => (
                            <PerkRow key={perk.title} perk={perk} index={i} />
                        ))}
                    </YStack>
                </YStack>

                {/* CTA */}
                <YStack
                    borderRadius={16}
                    overflow="hidden"
                    shadowColor={ACCENT} shadowOffset={{ width: 0, height: 6 }} shadowOpacity={0.4} shadowRadius={12} elevation={10}
                    onPress={() => router.replace('/')}
                    pressStyle={{ scale: 0.96, opacity: 0.9 }}
                >
                    <LinearGradient
                        colors={[ACCENT, '#A29BFE']}
                        start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
                        style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 10, paddingVertical: 18, paddingHorizontal: 32 }}
                    >
                        <Text fontSize={16} fontWeight="800" color="#fff" letterSpacing={0.5}>
                            Commencer à jouer
                        </Text>
                        <Ionicons name="arrow-forward" size={18} color="#fff" />
                    </LinearGradient>
                </YStack>

            </ScrollView>
        </SafeAreaView>
    );
};

export default InformationAccount;