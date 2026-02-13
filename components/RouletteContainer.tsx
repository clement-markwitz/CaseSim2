// RouletteContainer.tsx
import Colors, { colorRarityBar } from '@/constants/Colors';
import { WonItem } from '@/utils/gameLogic';
import { LinearGradient } from 'expo-linear-gradient';
import { useEffect, useRef, useState } from 'react';
import {
    Animated,
    Easing,
    FlatList,
    LayoutChangeEvent,
    StyleSheet,
    Text,
    View,
} from 'react-native';
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
    }, [isRolling]);

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
    }, [isRolling]);

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

                // Vibration feedback (si disponible)
                // Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);

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
    }, []);

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

    const winnerColor = revealedWinnerColor || Colors.light.tint;

    return (
        <View style={styles.wrapper}>
            {/* Titre de section */}
            <View style={styles.titleContainer}>
                <View style={styles.titleLine} />
            </View>

            {/* Container principal */}
            <View style={styles.container} onLayout={onLayout}>
                {/* Background décoratif */}
                <LinearGradient
                    colors={[
                        Colors.light.background,
                        Colors.light.background_elevated,
                        Colors.light.background,
                    ]}
                    style={styles.backgroundGradient}
                />

                {/* Bordure supérieure lumineuse */}
                <Animated.View
                    style={[
                        styles.topBorder,
                        {
                            opacity: glowAnim,
                            backgroundColor: isRolling ? Colors.light.tint : winnerColor
                        }
                    ]}
                />

                {/* Bordure inférieure lumineuse */}
                <Animated.View
                    style={[
                        styles.bottomBorder,
                        {
                            opacity: glowAnim,
                            backgroundColor: isRolling ? Colors.light.tint : winnerColor
                        }
                    ]}
                />

                {/* Curseur central animé */}
                <View style={styles.centerLineContainer}>
                    <Animated.View
                        style={[
                            styles.centerLine,
                            {
                                transform: [{ scaleY: pulseAnim }],
                                backgroundColor: showWinEffect ? winnerColor : Colors.light.tint,
                            }
                        ]}
                    />
                    <Animated.View
                        style={[
                            styles.centerLineGlow,
                            {
                                opacity: pulseAnim,
                                backgroundColor: showWinEffect ? winnerColor : Colors.light.tint,
                            }
                        ]}
                    />

                </View>

                {/* Message d'attente */}
                {(!skins || skins.length === 0) && (
                    <View style={styles.waitingMessage}>
                        <View style={styles.loadingDots}>
                            <Animated.View style={[styles.dot, { opacity: glowAnim }]} />
                            <Animated.View style={[styles.dot, { opacity: glowAnim }]} />
                            <Animated.View style={[styles.dot, { opacity: glowAnim }]} />
                        </View>
                        <Text style={styles.waitingText}>Préparation...</Text>
                    </View>
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
                        <View style={styles.cardWrapper}>
                            <SkinCard
                                imageUri={item.image}
                                rarity={item.rarity}
                                isWinningItem={showWinEffect && index === WINNER_INDEX}
                            />
                        </View>
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
                    colors={[Colors.light.background, 'transparent']}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                    style={[styles.gradientOverlay, styles.gradientLeft]}
                    pointerEvents="none"
                />
                <LinearGradient
                    colors={['transparent', Colors.light.background]}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                    style={[styles.gradientOverlay, styles.gradientRight]}
                    pointerEvents="none"
                />

                {/* Effet de victoire */}
                {showWinEffect && winnerColor && (
                    <Animated.View
                        style={[
                            styles.winGlow,
                            { backgroundColor: `${winnerColor}20` }
                        ]}
                    />
                )}
            </View>


        </View>
    );
};

const styles = StyleSheet.create({
    wrapper: {
        width: '100%',
        alignItems: 'center',
    },
    titleContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
        marginBottom: 16,
        paddingHorizontal: 20,
    },
    titleLine: {
        flex: 1,
        height: 1,
        backgroundColor: Colors.light.border,
    },
    title: {
        fontSize: 14,
        fontWeight: '600',
        color: Colors.light.text_secondary,
        textTransform: 'uppercase',
        letterSpacing: 1,
    },
    container: {
        width: '100%',

        justifyContent: 'center',
    },
    backgroundGradient: {
        ...StyleSheet.absoluteFillObject,
    },
    topBorder: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: 2,
        zIndex: 20,
    },
    bottomBorder: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: 2,
        zIndex: 20,
    },
    centerLineContainer: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: '50%',
        width: 2,
        marginLeft: -1,
        zIndex: 15,
        alignItems: 'center',
    },
    centerLine: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        width: 3,
        borderRadius: 2,
    },
    centerLineGlow: {
        position: 'absolute',
        top: 12,
        bottom: 12,
        width: 1,
        borderRadius: 6,
        opacity: 0.3,
    },
    cardWrapper: {
        marginVertical: 30,
    },
    waitingMessage: {
        ...StyleSheet.absoluteFillObject,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: Colors.light.background_elevated,
        zIndex: 10,
    },
    loadingDots: {
        flexDirection: 'row',
        gap: 8,
        marginBottom: 12,
    },
    dot: {
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: Colors.light.tint,
    },
    waitingText: {
        fontSize: 14,
        color: Colors.light.text_muted,
    },
    gradientOverlay: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        width: 80,
        zIndex: 15,
    },
    gradientLeft: {
        left: 0,
    },
    gradientRight: {
        right: 0,
    },
    winGlow: {
        ...StyleSheet.absoluteFillObject,
        zIndex: 5,
    },
    progressContainer: {
        width: '80%',
        marginTop: 12,
    },
    progressTrack: {
        height: 3,
        backgroundColor: Colors.light.background_elevated,
        borderRadius: 2,
        overflow: 'hidden',
    },
    progressBar: {
        height: '100%',
        backgroundColor: Colors.light.tint,
        borderRadius: 2,
    },
});

export default RouletteContainer;
