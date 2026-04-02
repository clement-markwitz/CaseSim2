// RouletteContainer.tsx
import { colorRarityBar } from '@/constants/Colors';
import { WonItem } from '@/utils/gameLogic';
import { LinearGradient } from 'expo-linear-gradient';
import { useEffect, useRef, useState } from 'react';
// On garde les imports natifs pour la liste et les animations
import { Animated, Easing, FlatList, LayoutChangeEvent } from 'react-native';
// On importe Tamagui pour la structure UI
import { useAppTheme } from '@/hooks/useAppTheme';
import { Text, XStack, YStack } from 'tamagui';
import SkinCard from './SkinCard';
// --- CONSTANTES ---
const ITEM_WIDTH = 158; // Largeur d'un item (150) + margins (8)
const WINNER_INDEX = 45; // L'index du gagnant dans le tableau

interface RouletteContainerProps {
    skins: WonItem[] | null;
    onComplete?: () => void;
}

const RouletteContainer = ({ skins, onComplete }: RouletteContainerProps) => {
    const flatListRef = useRef<FlatList>(null);
    const scrollX = useRef(new Animated.Value(0)).current;
    const pulseAnim = useRef(new Animated.Value(1)).current;
    const glowAnim = useRef(new Animated.Value(0.3)).current;

    const [containerWidth, setContainerWidth] = useState(0);
    const [isRolling, setIsRolling] = useState(false);
    const [showWinEffect, setShowWinEffect] = useState(false);
    const [revealedWinnerColor, setRevealedWinnerColor] = useState<string | null>(null);
    const colors = useAppTheme();
    // Animation du curseur central (pulse)
    useEffect(() => {
        const pulse = Animated.loop(
            Animated.sequence([
                Animated.timing(pulseAnim, {
                    toValue: 1.2,
                    duration: 600,
                    useNativeDriver: true,
                }),
                Animated.timing(pulseAnim, {
                    toValue: 1,
                    duration: 600,
                    useNativeDriver: true,
                }),
            ])
        );

        if (!isRolling) {
            pulse.start();
        } else {
            pulse.stop();
            pulseAnim.setValue(1);
        }

        return () => pulse.stop();
    }, [isRolling, pulseAnim]);

    // Animation glow pendant le roll
    useEffect(() => {
        if (isRolling) {
            Animated.loop(
                Animated.sequence([
                    Animated.timing(glowAnim, {
                        toValue: 0.8,
                        duration: 300,
                        useNativeDriver: true,
                    }),
                    Animated.timing(glowAnim, {
                        toValue: 0.3,
                        duration: 300,
                        useNativeDriver: true,
                    }),
                ])
            ).start();
        }
    }, [isRolling, glowAnim]);

    // Fonction principale de lancement
    const startRoll = () => {
        if (containerWidth === 0 || !skins || skins.length === 0) return;
        setRevealedWinnerColor(null);
        setIsRolling(true);
        setShowWinEffect(false);
        scrollX.stopAnimation();
        scrollX.setValue(0);

        // Calcul de la destination
        const targetOffset = ((WINNER_INDEX - 1) * ITEM_WIDTH) + ITEM_WIDTH / 2 + 4;
        const randomOffset = Math.floor(Math.random() * (ITEM_WIDTH - 4));
        const finalDestination = targetOffset + randomOffset;

        // Animation avec easing personnalisé pour effet "casino"
        Animated.timing(scrollX, {
            toValue: finalDestination,
            duration: 6000,
            easing: Easing.bezier(0.15, 0.85, 0.1, 1),
            useNativeDriver: false,
        }).start(({ finished }) => {
            if (finished) {
                setIsRolling(false);
                setShowWinEffect(true);
                const winnerSkin = skins?.[WINNER_INDEX];
                if (winnerSkin) {
                    setRevealedWinnerColor(colorRarityBar[winnerSkin.rarity]);
                }

                if (onComplete) {
                    onComplete();
                }
            }
        });
    };

    // Listener pour synchroniser le scroll
    useEffect(() => {
        const listener = scrollX.addListener(({ value }) => {
            if (flatListRef.current) {
                flatListRef.current.scrollToOffset({
                    offset: value,
                    animated: false,
                });
            }
        });
        return () => scrollX.removeListener(listener);
    }, [scrollX]);

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

    // Capture de la largeur
    const onLayout = (event: LayoutChangeEvent) => {
        const { width } = event.nativeEvent.layout;
        if (width !== containerWidth && width > 0) {
            setContainerWidth(width);
        }
    };

    const winnerColor = revealedWinnerColor || colors.tint;

    return (
        <YStack width="100%" alignItems="center">

            {/* Ligne décorative au dessus de la roulette */}
            <XStack alignItems="center" gap={12} marginBottom={16} paddingHorizontal={20} width="100%">
                <YStack flex={1} height={1} backgroundColor={colors.border} />
            </XStack>

            {/* Container principal */}
            <YStack width="100%" justifyContent="center" onLayout={onLayout} position="relative">

                {/* Background décoratif */}
                <LinearGradient
                    colors={[
                        colors.background,
                        colors.background_elevated,
                        colors.background,
                    ]}
                    style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }}
                />

                {/* Bordures lumineuses (Haut et Bas) */}
                <Animated.View
                    style={{
                        position: 'absolute', top: 0, left: 0, right: 0, height: 2, zIndex: 20,
                        opacity: glowAnim,
                        backgroundColor: isRolling ? colors.tint : winnerColor
                    }}
                />
                <Animated.View
                    style={{
                        position: 'absolute', bottom: 0, left: 0, right: 0, height: 2, zIndex: 20,
                        opacity: glowAnim,
                        backgroundColor: isRolling ? colors.tint : winnerColor
                    }}
                />

                {/* Curseur central animé */}
                <YStack
                    position="absolute" top={0} bottom={0} left="50%"
                    width={2} marginLeft={-1} zIndex={15} alignItems="center"
                >
                    <Animated.View
                        style={{
                            position: 'absolute', top: 0, bottom: 0, width: 3, borderRadius: 2,
                            transform: [{ scaleY: pulseAnim }],
                            backgroundColor: showWinEffect ? winnerColor : colors.tint,
                        }}
                    />
                    <Animated.View
                        style={{
                            position: 'absolute', top: 12, bottom: 12, width: 1, borderRadius: 6,
                            opacity: pulseAnim,
                            backgroundColor: showWinEffect ? winnerColor : colors.tint,
                        }}
                    />
                </YStack>

                {/* Message d'attente (Affiché uniquement si pas de skins) */}
                {(!skins || skins.length === 0) && (
                    <YStack
                        position="absolute" top={0} left={0} right={0} bottom={0}
                        alignItems="center" justifyContent="center"
                        backgroundColor={colors.background_elevated} zIndex={10}
                    >
                        <XStack gap={8} marginBottom={12}>
                            {[1, 2, 3].map((key) => (
                                <Animated.View
                                    key={key}
                                    style={{ width: 8, height: 8, borderRadius: 4, backgroundColor: colors.tint, opacity: glowAnim }}
                                />
                            ))}
                        </XStack>
                        <Text fontSize={14} color={colors.text_muted}>Préparation...</Text>
                    </YStack>
                )}

                {/* FlatList avec les items */}
                <FlatList
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

                {/* Gradients de fondu sur les côtés */}
                <LinearGradient
                    colors={[colors.background, 'transparent']}
                    start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
                    style={{ position: 'absolute', top: 0, bottom: 0, left: 0, width: 80, zIndex: 15 }}
                    pointerEvents="none"
                />
                <LinearGradient
                    colors={['transparent', colors.background]}
                    start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
                    style={{ position: 'absolute', top: 0, bottom: 0, right: 0, width: 80, zIndex: 15 }}
                    pointerEvents="none"
                />

                {/* Effet de victoire (Flash coloré de fond) */}
                {showWinEffect && winnerColor && (
                    <Animated.View
                        style={{
                            position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
                            zIndex: 5,
                            backgroundColor: `${winnerColor}20`
                        }}
                    />
                )}

            </YStack>
        </YStack>
    );
};

export default RouletteContainer;