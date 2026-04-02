// Home.tsx
import CaseList from '@/components/CaseList';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import SearchBar from '@/components/ui/SearchBar';
import { colorRarityBar } from '@/constants/Colors';
import { useDemoStore } from '@/stores/demoStore';
import { Ionicons } from '@expo/vector-icons';
import { RefreshCcw } from '@tamagui/lucide-icons-2';
import { useQueryErrorResetBoundary } from '@tanstack/react-query';
import { LinearGradient } from 'expo-linear-gradient';
import React, { Suspense, useEffect, useRef } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
// On importe Image et Animated depuis React Native
import { Animated, Image } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
// On importe toute la structure depuis Tamagui
import { useAppTheme } from '@/hooks/useAppTheme';
import { Button, ScrollView, Spinner, Text, XStack, YStack } from 'tamagui';
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
    const colors = useAppTheme();
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
    }, [delay, scaleAnim, opacityAnim]);

    return (
        <Animated.View
            style={{
                flex: 1,
                backgroundColor: colors.background_secondary,
                borderRadius: 16,
                padding: 16,
                alignItems: 'center',
                borderWidth: 1,
                borderColor: colors.border,
                position: 'relative',
                overflow: 'hidden',
                opacity: opacityAnim,
                transform: [{ scale: scaleAnim }],
            }}
        >
            {/* Icône avec fond coloré */}
            <YStack
                width={40}
                height={40}
                borderRadius={12}
                alignItems="center"
                justifyContent="center"
                marginBottom={12}
                backgroundColor={`${color}20`}
            >
                <Ionicons name={icon} size={20} color={color} />
            </YStack>

            {/* Valeur */}
            <Text fontSize={20} fontWeight="800" marginBottom={4} color={color}>
                {value}
            </Text>

            {/* Label */}
            <Text
                fontSize={11}
                color={colors.text_muted}
                textAlign="center"
                fontWeight="500"
                textTransform="uppercase"
                letterSpacing={0.5}
            >
                {label}
            </Text>

            {/* Accent décoratif */}
            <YStack
                position="absolute"
                bottom={0} left={0} right={0} height={3}
                borderBottomLeftRadius={16}
                borderBottomRightRadius={16}
                backgroundColor={color}
            />
        </Animated.View>
    );
};

// Composant pour le meilleur drop
const BestDropCard = ({ drop }: { drop: any }) => {
    const slideAnim = useRef(new Animated.Value(30)).current;
    const opacityAnim = useRef(new Animated.Value(0)).current;
    const glowAnim = useRef(new Animated.Value(0.3)).current;
    const colors = useAppTheme();
    const rarityColor = colorRarityBar[drop.rarity] || colors.tint;

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
    }, [slideAnim, opacityAnim, glowAnim]);

    return (
        <Animated.View
            style={{
                marginTop: 8,
                opacity: opacityAnim,
                transform: [{ translateY: slideAnim }],
            }}
        >
            {/* Header du meilleur drop */}
            <XStack alignItems="center" justifyContent="space-between" marginBottom={12}>
                <XStack alignItems="center" gap={8} paddingVertical={6} paddingHorizontal={12} borderRadius={8} overflow="hidden" position="relative">
                    <LinearGradient
                        colors={[`${rarityColor}40`, 'transparent']}
                        start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
                        style={{ position: 'absolute', top: 0, bottom: 0, left: 0, right: 0 }}
                    />
                    <Ionicons name="trophy" size={18} color={rarityColor} />
                    <Text fontSize={14} fontWeight="700" color={colors.text} letterSpacing={0.5}>
                        Meilleur Drop
                    </Text>
                </XStack>
                <YStack paddingHorizontal={10} paddingVertical={4} borderRadius={6} backgroundColor={`${rarityColor}30`}>
                    <Text fontSize={10} fontWeight="700" letterSpacing={1} color={rarityColor}>
                        {drop.rarity?.toUpperCase() || 'RARE'}
                    </Text>
                </YStack>
            </XStack>

            {/* Card principale */}
            <YStack
                backgroundColor={colors.background_secondary}
                borderRadius={16}
                overflow="hidden"
                borderWidth={1}
                borderColor={colors.border}
                position="relative"
            >
                {/* Glow effect */}
                <Animated.View
                    style={{
                        position: 'absolute', top: -50, left: '50%', marginLeft: -100, width: 200, height: 65,
                        borderRadius: 100,
                        backgroundColor: rarityColor,
                        opacity: glowAnim,
                    }}
                />

                {/* Bordure colorée gauche */}
                <LinearGradient
                    colors={[rarityColor, `${rarityColor}50`, 'transparent']}
                    start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}
                    style={{ position: 'absolute', top: 0, left: 0, width: 4, height: '100%' }}
                />

                {/* Contenu */}
                <XStack padding={16} gap={16}>
                    {/* Image de l'arme */}
                    <YStack
                        width={120} height={90} borderRadius={12} marginTop={10}
                        overflow="hidden" position="relative" backgroundColor={colors.background}
                    >
                        <LinearGradient
                            colors={[`${rarityColor}20`, 'transparent']}
                            style={{ position: 'absolute', top: 0, bottom: 0, left: 0, right: 0 }}
                        />
                        <Image
                            source={{ uri: drop.image }}
                            style={{ width: '100%', height: '100%' }}
                            resizeMode="contain"
                        />
                        <YStack position="absolute" bottom={0} left={0} right={0} height={3} backgroundColor={rarityColor} />
                    </YStack>

                    {/* Infos */}
                    <YStack flex={1} justifyContent="center">
                        <Text fontSize={15} fontWeight="700" color={colors.text} marginTop={5} marginBottom={6} lineHeight={20} numberOfLines={2}>
                            {drop.name}
                        </Text>

                        {drop.wear && (
                            <XStack alignItems="center" gap={4} marginBottom={10}>
                                <Ionicons name="sparkles" size={12} color={colors.text_muted} />
                                <Text fontSize={12} color={colors.text_muted} fontWeight="500">
                                    {drop.wear} {drop.statTrak && '| ST'}
                                </Text>
                            </XStack>
                        )}

                        <YStack backgroundColor={colors.background} paddingHorizontal={12} paddingVertical={8} borderRadius={8} alignSelf="flex-start">
                            <Text fontSize={10} color={colors.text_muted} fontWeight="500" textTransform="uppercase" letterSpacing={0.5} marginBottom={2}>
                                Valeur
                            </Text>
                            <Text fontSize={18} fontWeight="800" color={rarityColor}>
                                {drop.price.toFixed(2)}€
                            </Text>
                        </YStack>
                    </YStack>
                </XStack>
            </YStack>
        </Animated.View>
    );
};

const Home = () => {
    const { totalOpened, totalValue, bestDrop, getProfit } = useDemoStore();
    const { reset } = useQueryErrorResetBoundary();
    const displayColor = getProfit() >= 0 ? '#00B894' : '#E74C3C';
    const profitIcon = getProfit() >= 0 ? 'trending-up' : 'trending-down';
    const colors = useAppTheme();
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
    }, [totalOpened, containerAnim]);

    return (
        <SafeAreaProvider>
            <ScrollView flex={1} backgroundColor={colors.background} showsVerticalScrollIndicator={false}>
                <YStack flex={1} backgroundColor={colors.background} alignItems="center" justifyContent="flex-start" paddingBottom={40}>
                    <Header />
                    <Hero />

                    {/* Section Statistiques */}
                    {totalOpened > 0 && (
                        <Animated.View
                            style={{
                                width: '100%',
                                paddingHorizontal: 16,
                                marginTop: 24,
                                marginBottom: 8,
                                opacity: containerAnim,
                                transform: [
                                    {
                                        translateY: containerAnim.interpolate({
                                            inputRange: [0, 1],
                                            outputRange: [20, 0],
                                        }),
                                    },
                                ],
                            }}
                        >
                            {/* Header de section */}
                            <YStack marginBottom={16}>
                                <XStack alignItems="center" gap={10} marginBottom={12}>
                                    <Ionicons name="stats-chart" size={20} color={colors.tint} />
                                    <Text fontSize={18} fontWeight="700" color={colors.text} letterSpacing={0.5}>
                                        Tes Statistiques
                                    </Text>

                                    {/* Bouton Reset poussé à droite grâce à marginLeft="auto" */}
                                    <Text
                                        fontSize={12} fontWeight="500" color={colors.text_muted} letterSpacing={0.5} marginLeft="auto"
                                        onPress={() => useDemoStore.getState().resetStats()}
                                        pressStyle={{ opacity: 0.5 }}
                                    >
                                        Reset
                                    </Text>
                                </XStack>
                                <YStack height={2} backgroundColor={colors.border} borderRadius={1} opacity={0.5} />
                            </YStack>

                            {/* Grille de stats */}
                            <XStack gap={12} marginBottom={20}>
                                <StatCard
                                    icon="cube-outline"
                                    value={totalOpened.toString()}
                                    label="Cases"
                                    color="#6C5CE7"
                                    delay={100}
                                />
                                <StatCard
                                    icon="wallet-outline"
                                    value={`${totalValue.toFixed(2)}€`}
                                    label="Valeur"
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
                            </XStack>

                            {/* Meilleur drop */}
                            {bestDrop && <BestDropCard drop={bestDrop} />}
                        </Animated.View>
                    )}

                    <ErrorBoundary
                        onReset={reset}
                        fallbackRender={({ error, resetErrorBoundary }) => <Button icon={RefreshCcw} size="$5" onPress={resetErrorBoundary} />}
                    >
                        <Suspense fallback={<Spinner size="large" color="$yellow" marginTop={20} />}>
                            <SearchBar />
                            <CaseList />
                        </Suspense>
                    </ErrorBoundary>
                </YStack>
            </ScrollView>
        </SafeAreaProvider>
    );
};

export default Home;