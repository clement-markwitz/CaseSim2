// SkinCard.tsx
import { colorRarity, colorRarityBar } from '@/constants/Colors';
import { LinearGradient } from 'expo-linear-gradient';
import { useEffect, useRef } from 'react';
// On importe Image et Animated de React Native
import { Animated, Image } from 'react-native';
// On importe YStack de Tamagui
import { useAppTheme } from '@/hooks/useAppTheme';
import { YStack } from 'tamagui';

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
    const colors = useAppTheme();
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
    }, [isWinningItem, scaleAnim, glowAnim]);

    return (
        <Animated.View
            style={{
                width: CARD_WIDTH,
                height: CARD_HEIGHT,
                marginHorizontal: 4,
                borderRadius: 8,
                overflow: 'hidden',
                position: 'relative',
                borderWidth: isWinningItem ? 0 : 1,
                borderColor: colors.border,
                transform: [{ scale: scaleAnim }],
            }}
        >
            {/* Glow effect pour le gagnant (Nécessite Animated.View pour l'opacité) */}
            {isWinningItem && (
                <Animated.View
                    style={{
                        position: 'absolute',
                        top: -20, left: -20, right: -20, bottom: -20,
                        borderRadius: 20,
                        opacity: glowAnim,
                        backgroundColor: rarityColorBar,
                    }}
                />
            )}

            {/* Background avec gradient subtil */}
            <LinearGradient
                colors={[colors.background_elevated, colors.background_card]}
                style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }}
            />

            {/* Accent de coin supérieur */}
            <YStack
                position="absolute"
                top={0}
                left={0}
                width={24}
                height={3}
                borderBottomRightRadius={2}
                backgroundColor={rarityColorBar}
            />

            {/* Image du skin (Centrée avec YStack) */}
            <YStack flex={1} alignItems="center" justifyContent="center" zIndex={10}>
                <Image
                    source={{ uri: imageUri }}
                    style={{ width: '85%', height: '65%' }}
                    resizeMode="contain"
                />
            </YStack>

            {/* Barre de rareté */}
            <YStack
                position="absolute"
                bottom={0}
                left={0}
                right={0}
                height={4}
                zIndex={20}
                backgroundColor={rarityColorBar}
            />

            {/* Glow de rareté */}
            <LinearGradient
                colors={[rarityColor, 'transparent']}
                start={{ x: 0.5, y: 1 }}
                end={{ x: 0.5, y: 0.5 }}
                style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 50, opacity: 0.6 }}
            />

            {/* Bordure si gagnant */}
            {isWinningItem && (
                <YStack
                    position="absolute"
                    top={0} left={0} right={0} bottom={0}
                    borderWidth={2}
                    borderRadius={8}
                    borderColor={rarityColorBar}
                    pointerEvents="none"
                />
            )}
        </Animated.View>
    );
};

export default SkinCard;