// Case.tsx
import { Case } from "@/constants/case";
import Colors, { colorRaritySolid } from "@/constants/Colors";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

const CaseView = ({ caseItem }: { caseItem: Case }) => {
    const router = useRouter();

    // Déterminer la rareté maximale dans la caisse pour le style
    const maxRarity = 'gold';
    const accentColor = colorRaritySolid[maxRarity] || Colors.light.tint;

    return (
        <TouchableOpacity
            style={styles.container}
            activeOpacity={0.85}
            onPress={() => {
                router.push({
                    pathname: '/(public)/case/[id]',
                    params: { id: caseItem.id }
                });
            }}
        >
            {/* Glow effect background */}
            <LinearGradient
                colors={[`${accentColor}20`, 'transparent']}
                style={styles.glowEffect}
            />

            {/* Card content */}
            <View style={styles.cardInner}>
                {/* Case image */}
                <View style={styles.imageContainer}>
                    <Image
                        source={{ uri: caseItem.image }}
                        style={styles.image}
                        resizeMode="contain"
                    />
                </View>

                {/* Case info */}
                <View style={styles.infoContainer}>
                    <Text style={styles.name} numberOfLines={2}>
                        {caseItem.name}
                    </Text>

                    <View style={styles.priceContainer}>
                        <Text style={styles.priceLabel}>Prix</Text>
                        <View style={styles.priceTag}>
                            <Text style={styles.price}>${caseItem.price.toFixed(2)}</Text>
                        </View>
                    </View>
                </View>

                {/* Bottom accent line */}
                <LinearGradient
                    colors={['transparent', accentColor, 'transparent']}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                    style={styles.accentLine}
                />
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        width: 165,
        height: 220,
        position: 'relative',
    },
    glowEffect: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        width: 120,
        height: 120,
        borderRadius: 60,
        transform: [{ translateX: -60 }, { translateY: -60 }],
    },
    cardInner: {
        flex: 1,
        backgroundColor: Colors.light.background_card,
        borderRadius: 16,
        borderWidth: 1,
        borderColor: Colors.light.border,
        overflow: 'hidden',
        padding: 12,
    },
    popularBadge: {
        position: 'absolute',
        top: 8,
        right: 8,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 3,
        backgroundColor: Colors.light.tint,
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 8,
        zIndex: 10,
    },
    popularText: {
        fontSize: 9,
        fontWeight: '800',
        color: '#000',
        letterSpacing: 0.5,
    },
    imageContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 8,
    },
    image: {
        width: 100,
        height: 80,
    },
    infoContainer: {
        gap: 8,
    },
    name: {
        fontSize: 13,
        fontWeight: '700',
        color: Colors.light.text,
        textAlign: 'center',
        lineHeight: 16,
    },
    priceContainer: {
        alignItems: 'center',
        gap: 4,
    },
    priceLabel: {
        fontSize: 10,
        color: Colors.light.text_muted,
        textTransform: 'uppercase',
        letterSpacing: 1,
    },
    priceTag: {
        backgroundColor: Colors.light.background_elevated,
        paddingHorizontal: 16,
        paddingVertical: 6,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: Colors.light.border,
    },
    price: {
        fontSize: 14,
        fontWeight: '800',
        color: Colors.light.success,
    },
    accentLine: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: 2,
    },
});

export default CaseView;
