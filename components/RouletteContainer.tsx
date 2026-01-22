import Colors from '@/constants/Colors';
import { WINNER_INDEX, WonItem } from '@/utils/gameLogic';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useEffect, useRef, useState } from 'react';
import { Animated, Easing, FlatList, LayoutChangeEvent, StyleSheet, Text, View } from 'react-native';
import SkinCard from './SkinCard';

// CONFIGURATION
const CARD_WIDTH = 150;
const MARGIN = 4;
const ITEM_WIDTH = CARD_WIDTH + (MARGIN * 2);

const RouletteContainer = ({ skins }: { skins: WonItem[] | null }) => {
    const flatListRef = useRef<FlatList>(null);
    const scrollX = useRef(new Animated.Value(0)).current;

    // États
    const [isRolling, setIsRolling] = useState(false);
    const [containerWidth, setContainerWidth] = useState(0);

    const startRoll = () => {
        // Si largeur inconnue ou déjà en train de rouler, on stop
        if (containerWidth === 0 || isRolling) return;

        setIsRolling(true);

        // 1. On remet tout à zéro proprement
        scrollX.stopAnimation();
        scrollX.setValue(ITEM_WIDTH * 9 + ITEM_WIDTH / 2);

        // Petit hack : on force le scroll à 0 immédiatement via la ref si elle existe
        if (flatListRef.current) {
            flatListRef.current.scrollToOffset({ offset: ITEM_WIDTH * 10 + ITEM_WIDTH / 2, animated: false });
        }

        // 2. Calcul de la destination
        const targetOffset = ((WINNER_INDEX - 1) * ITEM_WIDTH) + ITEM_WIDTH / 2 + 4;
        const randomOffset = Math.floor(Math.random() * 180);
        const finalDestination = targetOffset + randomOffset;

        // 3. Animation
        Animated.timing(scrollX, {
            toValue: finalDestination,
            duration: 5000,
            easing: Easing.bezier(0.1, 0.7, 0.1, 1),
            useNativeDriver: false, // OBLIGATOIRE à false pour contrôler le scroll
        }).start(({ finished }) => {
            if (finished) {

                setIsRolling(false);
            }
        });
    };

    // LISTENER : C'est lui qui fait bouger la liste quand scrollX change
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

    // TRIGGER : Se lance quand les skins changent OU quand la largeur est trouvée
    useEffect(() => {
        if (skins && skins.length > 0) {
            // On attend un tout petit peu que le rendu visuel soit fini

            startRoll();

        }
    }, [skins]);

    // OnLayout : Capture la largeur de l'écran
    const onLayout = (event: LayoutChangeEvent) => {
        const { width } = event.nativeEvent.layout;
        if (width !== containerWidth && width > 0) {
            setContainerWidth(width);
        }
    };

    // --- LE RENDU ---
    return (
        <View style={styles.container} onLayout={onLayout}>

            <View style={styles.centerLine} />

            {/* MESSAGE D'ATTENTE (affiché par dessus si besoin) */}
            {(!skins || skins.length === 0) && (
                <View style={styles.waitingMessage}>
                    <Text style={{ color: 'white', opacity: 0.5 }}>En attente...</Text>
                </View>
            )}

            {/* CORRECTION MAJEURE ICI :
               On affiche TOUJOURS la FlatList, mais on joue sur l'opacité.
               Si containerWidth est 0, opacity = 0 (invisible mais présent).
               Cela permet à "ref={flatListRef}" de s'attacher correctement.
            */}
            <FlatList
                ref={flatListRef}
                data={skins || []} // Tableau vide si null pour éviter le crash
                horizontal
                showsHorizontalScrollIndicator={false}
                scrollEnabled={false}
                style={{ opacity: (containerWidth > 0 && skins) ? 1 : 0 }} // <--- L'ASTUCE EST ICI

                getItemLayout={(data, index) => ({
                    length: ITEM_WIDTH,
                    offset: ITEM_WIDTH * index,
                    index,
                })}
                renderItem={({ item, index }) => (
                    <SkinCard
                        imageUri={item.image}
                        rarity={item.rarity}
                    />
                )}
                keyExtractor={(item, index) => index.toString()}

                // Le padding dépend de la largeur. Si largeur 0, padding 0 (pas grave car invisible)
                contentContainerStyle={{
                    paddingHorizontal: containerWidth > 0 ? (containerWidth / 2) - (ITEM_WIDTH / 2) : 0
                }}
            />

            <LinearGradient
                colors={['#131519', 'transparent']}
                start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
                style={[styles.gradientOverlay, { left: 0 }]}
            />
            <LinearGradient
                colors={['transparent', '#131519']}
                start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
                style={[styles.gradientOverlay, { right: 0 }]}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {

        width: '100%',
        justifyContent: 'center',
        backgroundColor: Colors.light.tabIconDefault,
        position: 'relative',
        overflow: 'hidden',
    },
    waitingMessage: {
        position: 'absolute',
        zIndex: 10,
        alignSelf: 'center',
    },
    centerLine: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: '50%',
        width: 2,
        backgroundColor: '#EEB400',
        zIndex: 50,
        transform: [{ translateX: -1 }],
        shadowColor: '#EEB400',
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 1,
        shadowRadius: 10,
        elevation: 5,
    },
    gradientOverlay: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        width: 60,
        zIndex: 20,
    },
});

export default RouletteContainer;