// SkinCard.tsx
import Colors, { colorRarity, colorRarityBar } from '@/constants/Colors';
import { LinearGradient } from 'expo-linear-gradient';
import { useEffect, useRef } from 'react';
import { Animated, Image, StyleSheet, View } from 'react-native';

const CARD_WIDTH = 150;
const CARD_HEIGHT = CARD_WIDTH * 0.78;

interface SkinCardProps {
    imageUri: string;
    rarity: string;
    isWinningItem?: boolean;
}

const SkinCard = ({ imageUri, rarity, isWinningItem = false }: SkinCardProps) => {
    const rarityColor: string = colorRarity[rarity] || colorRarity['mil-spec'];
    const rarityColorBar: string = colorRarityBar[rarity] || colorRarityBar['mil-spec'];

    const scaleAnim = useRef(new Animated.Value(1)).current;
    const glowAnim = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        if (isWinningItem) {
            // Animation de victoire
            Animated.parallel([
                Animated.spring(scaleAnim, {
                    toValue: 1.05,
                    friction: 3,
                    tension: 100,
                    useNativeDriver: true,
                }),
                Animated.loop(
                    Animated.sequence([
                        Animated.timing(glowAnim, {
                            toValue: 1,
                            duration: 500,
                            useNativeDriver: true,
                        }),
                        Animated.timing(glowAnim, {
                            toValue: 0.5,
                            duration: 500,
                            useNativeDriver: true,
                        }),
                    ])
                ),
            ]).start();
        } else {
            scaleAnim.setValue(1);
            glowAnim.setValue(0);
        }
    }, [isWinningItem]);

    return (
        <Animated.View
            style={[
                styles.container,
                { transform: [{ scale: scaleAnim }] },
                isWinningItem && styles.winnerContainer,
            ]}
        >
            {/* Glow effect pour le gagnant */}
            {isWinningItem && (
                <Animated.View
                    style={[
                        styles.winnerGlow,
                        {
                            opacity: glowAnim,
                            backgroundColor: rarityColorBar,
                        }
                    ]}
                />
            )}

            {/* Background avec gradient subtil */}
            <LinearGradient
                colors={[Colors.light.background_elevated, Colors.light.background_card]}
                style={styles.background}
            />

            {/* Accent de coin supérieur */}
            <View style={[styles.cornerAccent, { backgroundColor: rarityColorBar }]} />

            {/* Image du skin */}
            <Image
                source={{ uri: imageUri }}
                style={styles.weaponImage}
                resizeMode="contain"
            />

            {/* Barre de rareté */}
            <View style={[styles.rarityBar, { backgroundColor: rarityColorBar }]} />

            {/* Glow de rareté */}
            <LinearGradient
                colors={[rarityColor, 'transparent']}
                start={{ x: 0.5, y: 1 }}
                end={{ x: 0.5, y: 0.5 }}
                style={styles.rarityGlow}
            />

            {/* Bordure si gagnant */}
            {isWinningItem && (
                <View style={[styles.winnerBorder, { borderColor: rarityColorBar }]} />
            )}
        </Animated.View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: CARD_WIDTH,
        height: CARD_HEIGHT,
        marginHorizontal: 4,
        borderRadius: 8,
        overflow: 'hidden',
        position: 'relative',
        borderWidth: 1,
        borderColor: Colors.light.border,
    },
    winnerContainer: {
        borderWidth: 0,
    },
    winnerGlow: {
        position: 'absolute',
        top: -20,
        left: -20,
        right: -20,
        bottom: -20,
        borderRadius: 20,
        opacity: 0.3,
    },
    winnerBorder: {
        ...StyleSheet.absoluteFillObject,
        borderWidth: 2,
        borderRadius: 8,
    },
    background: {
        ...StyleSheet.absoluteFillObject,
    },
    cornerAccent: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: 24,
        height: 3,
        borderBottomRightRadius: 2,
    },
    weaponImage: {
        width: '85%',
        height: '65%',
        alignSelf: 'center',
        marginTop: 'auto',
        marginBottom: 'auto',
        zIndex: 10,
    },
    rarityBar: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: 4,
        zIndex: 20,
    },
    rarityGlow: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: 50,
        opacity: 0.6,
    },
});

export default SkinCard;
