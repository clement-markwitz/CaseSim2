import Colors, { colorRarity, colorRarityBar } from '@/constants/Colors';
import { LinearGradient } from 'expo-linear-gradient';
import { Image, StyleSheet, View } from 'react-native';

// Largeur standard d'une card dans une roulette (ajuste selon tes besoins)
const CARD_WIDTH = 150;
const CARD_HEIGHT = CARD_WIDTH * 0.78;

interface SkinCardProps {
    imageUri: string;
    rarity: string;
    isWinningItem?: boolean;
}
const SkinCard = ({ imageUri, rarity }: SkinCardProps) => {
    const rarityColor: string = colorRarity[rarity]
    const rarityColorBar: string = colorRarityBar[rarity]
    return (
        <View style={[styles.container]}>
            <Image
                source={{ uri: imageUri }}
                style={styles.weaponImage}
                resizeMode="contain"
            />

            <View style={[styles.rarityBar, { backgroundColor: rarityColorBar }]} />

            <LinearGradient
                colors={[rarityColor, 'transparent']}
                start={{ x: 0.5, y: 1 }}
                end={{ x: 0.5, y: 0.7 }}
                style={styles.rarityGlow}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: CARD_WIDTH,
        height: CARD_HEIGHT,
        marginBottom: 30,
        marginTop: 30,
        marginHorizontal: 4, // Espace entre les items de la roulette
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Colors.light.text_secondary, // Fallback color
        overflow: 'hidden',
        // Bordure subtile pour le style "Tactical"

    },

    background: {
        ...StyleSheet.absoluteFillObject,
    },
    sheen: {
        position: 'absolute',
        left: 0,
        top: 0,
        bottom: 0,
        width: '40%', // La brillance prend 40% de la gauche
    },
    weaponImage: {
        width: '85%',
        height: '60%',
        zIndex: 10, // S'assure que l'image est au dessus du fond
    },
    weaponName: {
        position: 'absolute',
        top: 10,
        left: 10,
        color: '#9EA1A6',
        fontSize: 10,
        fontFamily: 'System', // Ou ta font custom 'Rajdhani'
        fontWeight: 'bold',
        zIndex: 10,
    },
    rarityBar: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: 6, // Épaisseur du trait de couleur
        zIndex: 20,
    },
    rarityGlow: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: 60, // La lueur remonte un peu sur l'arme
        opacity: 10, // Très subtil
    },
});

export default SkinCard;