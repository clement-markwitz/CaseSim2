// RouletteContainer.tsx
import { colorRarityBar } from '@/constants/Colors';
import { WonItem } from '@/utils/gameLogic';
import { LinearGradient } from 'expo-linear-gradient';
import { useEffect, useState } from 'react';
import { FlatList, LayoutChangeEvent } from 'react-native';
// 🎯 1. Nouveaux imports Reanimated
import { useAppTheme } from '@/hooks/useAppTheme';
import Animated, {
    Easing,
    scrollTo,
    useAnimatedReaction,
    useAnimatedRef,
    useAnimatedStyle,
    useSharedValue,
    withRepeat,
    withTiming
} from 'react-native-reanimated';
import { Text, XStack, YStack } from 'tamagui';
import SkinCard from './SkinCard';
// Retire runOnJS de l'import de 'react-native-reanimated'
import { scheduleOnRN } from 'react-native-worklets';

// --- CONSTANTES ---
const ITEM_WIDTH = 158; // Largeur d'un item (150) + margins (8)
const WINNER_INDEX = 45; // L'index du gagnant dans le tableau

interface RouletteContainerProps {
    skins: WonItem[] | null;
    onComplete?: () => void;
}

const RouletteContainer = ({ skins, onComplete }: RouletteContainerProps) => {
    // 🎯 2. Création de la référence animée pour la FlatList
    const flatListRef = useAnimatedRef<FlatList>();

    // 🎯 3. Remplacement des Animated.Value par des useSharedValue (très léger et rapide)
    const scrollX = useSharedValue(0);
    const pulseAnim = useSharedValue(1);
    const glowAnim = useSharedValue(0.3);

    const [containerWidth, setContainerWidth] = useState(0);
    const [isRolling, setIsRolling] = useState(false);
    const [showWinEffect, setShowWinEffect] = useState(false);
    const [revealedWinnerColor, setRevealedWinnerColor] = useState<string | null>(null);
    const colors = useAppTheme();

    // 🎯 4. Logique de synchronisation : FlatList "écoute" le scrollX sur le thread UI
    useAnimatedReaction(
        () => scrollX.value,
        (value) => {
            // scrollTo(ref, x, y, animated)
            scrollTo(flatListRef, value, 0, false);
        }
    );

    // Animation glow pendant le roll
    useEffect(() => {
        if (isRolling) {
            glowAnim.value = withRepeat(
                withTiming(0.8, { duration: 300 }),
                -1,
                true
            );
        } else {
            glowAnim.value = withTiming(0.3, { duration: 300 });
        }
    }, [isRolling]);

    // 🎯 5. Création d'une fonction encapsulée pour appeler le setState depuis le Worklet
    const onRollComplete = () => {
        setIsRolling(false);
        setShowWinEffect(true);
        const winnerSkin = skins?.[WINNER_INDEX];
        if (winnerSkin) {
            setRevealedWinnerColor(colorRarityBar[winnerSkin.rarity]);
        }
        if (onComplete) {
            onComplete();
        }
    };

    // Fonction principale de lancement
    const startRoll = () => {
        if (containerWidth === 0 || !skins || skins.length === 0) return;
        setRevealedWinnerColor(null);
        setIsRolling(true);
        setShowWinEffect(false);
        
        // Reset 
        scrollX.value = 0;

        // Calcul de la destination
        const targetOffset = ((WINNER_INDEX - 1) * ITEM_WIDTH) + ITEM_WIDTH / 2 + 4;
        const randomOffset = Math.floor(Math.random() * (ITEM_WIDTH - 4));
        const finalDestination = targetOffset + randomOffset;

        // 🎯 6. Animation du rouleau
        scrollX.value = withTiming(
            finalDestination,
            {
                duration: 6000,
                easing: Easing.bezier(0.15, 0.85, 0.1, 1),
            },
            (finished) => {
                if (finished) {
                    // scheduleOnRN permet d'exécuter des fonctions React classiques (setState) à la fin d'une animation native
                    scheduleOnRN(onRollComplete);                }
            }
        );
    };

    // Trigger au changement de skins
    useEffect(() => {
        if (skins && skins.length > 0 && containerWidth > 0) {
            setRevealedWinnerColor(null);
            setShowWinEffect(false);

            const timer = setTimeout(() => {
                startRoll();
            }, 0);
            return () => clearTimeout(timer);
        }
    }, [skins, containerWidth]);

    const onLayout = (event: LayoutChangeEvent) => {
        const { width } = event.nativeEvent.layout;
        if (width !== containerWidth && width > 0) {
            setContainerWidth(width);
        }
    };

    const winnerColor = revealedWinnerColor || colors.tint;

    // 🎯 7. Déclaration des styles animés (obligatoire avec Reanimated)
    const glowStyle = useAnimatedStyle(() => ({
        opacity: glowAnim.value,
        backgroundColor: isRolling ? colors.tint : winnerColor
    }));

    const cursorScaleStyle = useAnimatedStyle(() => ({
        transform: [{ scaleY: pulseAnim.value }],
        backgroundColor: showWinEffect ? winnerColor : colors.tint,
    }));

    const cursorOpacityStyle = useAnimatedStyle(() => ({
        opacity: pulseAnim.value,
        backgroundColor: showWinEffect ? winnerColor : colors.tint,
    }));

    const dotGlowStyle = useAnimatedStyle(() => ({
        opacity: glowAnim.value,
        backgroundColor: colors.tint
    }));

    return (
        <YStack width="100%" alignItems="center">
            <XStack alignItems="center" gap={12} marginBottom={16} paddingHorizontal={20} width="100%">
                <YStack flex={1} height={1} backgroundColor={colors.border} />
            </XStack>

            <YStack width="100%" justifyContent="center" onLayout={onLayout} position="relative">
                <LinearGradient
                    colors={[colors.background, colors.background_elevated, colors.background]}
                    style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }}
                />

                {/* Bordures lumineuses */}
                <Animated.View style={[{ position: 'absolute', top: 0, left: 0, right: 0, height: 2, zIndex: 20 }, glowStyle]} />
                <Animated.View style={[{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 2, zIndex: 20 }, glowStyle]} />

                {/* Curseur central animé */}
                <YStack position="absolute" top={0} bottom={0} left="50%" width={2} marginLeft={-1} zIndex={15} alignItems="center">
                    <Animated.View style={[{ position: 'absolute', top: 0, bottom: 0, width: 3, borderRadius: 2 }, cursorScaleStyle]} />
                    <Animated.View style={[{ position: 'absolute', top: 12, bottom: 12, width: 1, borderRadius: 6 }, cursorOpacityStyle]} />
                </YStack>

                {/* Message d'attente */}
                {(!skins || skins.length === 0) && (
                    <YStack position="absolute" top={0} left={0} right={0} bottom={0} alignItems="center" justifyContent="center" backgroundColor={colors.background_elevated} zIndex={10}>
                        <XStack gap={8} marginBottom={12}>
                            {[1, 2, 3].map((key) => (
                                <Animated.View key={key} style={[{ width: 8, height: 8, borderRadius: 4 }, dotGlowStyle]} />
                            ))}
                        </XStack>
                        <Text fontSize={14} color={colors.text_muted}>Préparation...</Text>
                    </YStack>
                )}

                {/* 🎯 8. FlatList transformée en Animated.FlatList */}
                <Animated.FlatList
                    ref={flatListRef}
                    data={skins || []}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    scrollEnabled={false}
                    style={{ opacity: (containerWidth > 0 && skins) ? 1 : 0 }}
                    getItemLayout={(data, index) => ({
                        length: ITEM_WIDTH,
                        offset: ITEM_WIDTH * index,
                        index,
                    })}
                    renderItem={({ item, index }) => (
                        <YStack marginVertical={30}>
                            <SkinCard
                                imageUri={item.image}
                                rarity={item.rarity}
                                isWinningItem={showWinEffect && index === WINNER_INDEX}
                            />
                        </YStack>
                    )}
                    keyExtractor={(item, index) => index.toString()}
                    contentContainerStyle={{
                        paddingHorizontal: containerWidth > 0
                            ? (containerWidth / 2) - (ITEM_WIDTH / 2)
                            : 0
                    }}
                />

                <LinearGradient colors={[colors.background, 'transparent']} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} style={{ position: 'absolute', top: 0, bottom: 0, left: 0, width: 80, zIndex: 15 }} pointerEvents="none" />
                <LinearGradient colors={['transparent', colors.background]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} style={{ position: 'absolute', top: 0, bottom: 0, right: 0, width: 80, zIndex: 15 }} pointerEvents="none" />

                {/* Effet de victoire */}
                {showWinEffect && winnerColor && (
                    <Animated.View style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, zIndex: 5, backgroundColor: `${winnerColor}20` }} />
                )}
            </YStack>
        </YStack>
    );
};

export default RouletteContainer;