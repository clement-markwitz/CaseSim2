// Hero.tsx
import Colors from '@/constants/Colors';
import { useAuth } from '@/hooks/useAuth';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { ChevronRight, Sparkles, Trophy } from 'lucide-react-native';
import { Dimensions, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const { width } = Dimensions.get('window');

const Hero = () => {
    const { isAuthenticated, isLoading } = useAuth();
    const router = useRouter();
    return (
        <View style={styles.heroContainer}>
            {/* Main Card */}
            <LinearGradient
                colors={[Colors.light.background_elevated, Colors.light.background_secondary]}
                style={styles.mainCard}
            >
                {/* Decorative elements */}
                <View style={styles.decorativeCircle} />
                <View style={styles.decorativeCircle2} />

                {/* Content */}
                <View style={styles.cardContent}>
                    <View style={styles.badge}>
                        <Sparkles size={14} color={Colors.light.tint} />
                        <Text style={styles.badgeText}>SIMULATEUR CS2</Text>
                    </View>

                    <Text style={styles.mainTitle}>
                        Ouvrez des caisses{'\n'}
                        <Text style={styles.titleHighlight}>sans limites</Text>
                    </Text>

                    <Text style={styles.description}>
                        Testez votre chance et découvrez les skins les plus rares du jeu.
                        Aucun risque, que du fun !
                    </Text>

                    {/* Stats row */}
                    <View style={styles.statsRow}>
                        <View style={styles.statItem}>
                            <Trophy size={16} color={Colors.light.tint} />
                            <Text style={styles.statValue}>1.2M+</Text>
                            <Text style={styles.statLabel}>Cases ouvertes</Text>
                        </View>
                        <View style={styles.statDivider} />
                        {/* <View style={styles.statItem}>
                            <Zap size={16} color={Colors.light.success} />
                            <Text style={styles.statValue}>5K+</Text>
                            <Text style={styles.statLabel}>Joueurs actifs</Text>
                        </View> */}
                    </View>
                </View>
            </LinearGradient>

            {/* Auth Section */}
            {isLoading ? (
                <Text>Loading...</Text>
            ) : (!isAuthenticated && (
                <View style={styles.authSection}>
                    <Text style={styles.authTitle}>Débloquez toutes les fonctionnalités</Text>

                    <TouchableOpacity style={styles.primaryButton} activeOpacity={0.8}>
                        <LinearGradient
                            colors={[Colors.light.tint, '#D4910A']}
                            start={{ x: 0, y: 0 }}
                            end={{ x: 1, y: 1 }}
                            style={styles.buttonGradient}
                        >
                            <Text style={styles.primaryButtonText}>Créer un compte</Text>
                            <ChevronRight size={20} color="#000" />
                        </LinearGradient>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.secondaryButton} activeOpacity={0.7} onPress={() => router.push("/(auth)/login")}>
                        <Text style={styles.secondaryButtonText}>J'ai déjà un compte</Text>
                    </TouchableOpacity>
                </View>
            ))}
        </View>
    );
};

const styles = StyleSheet.create({
    heroContainer: {
        width: width - 32,
        marginTop: 20,
        gap: 20,
    },
    mainCard: {
        borderRadius: 20,
        overflow: 'hidden',
        borderWidth: 1,
        borderColor: Colors.light.border,
        position: 'relative',
    },
    decorativeCircle: {
        position: 'absolute',
        top: -50,
        right: -50,
        width: 150,
        height: 150,
        borderRadius: 75,
        backgroundColor: Colors.light.tint_glow,
        opacity: 0.5,
    },
    decorativeCircle2: {
        position: 'absolute',
        bottom: -30,
        left: -30,
        width: 100,
        height: 100,
        borderRadius: 50,
        backgroundColor: 'rgba(136, 71, 255, 0.2)',
        opacity: 0.5,
    },
    cardContent: {
        padding: 24,
        gap: 16,
    },
    badge: {
        flexDirection: 'row',
        alignItems: 'center',
        alignSelf: 'flex-start',
        gap: 6,
        backgroundColor: 'rgba(245, 166, 35, 0.15)',
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: 'rgba(245, 166, 35, 0.3)',
    },
    badgeText: {
        fontSize: 11,
        fontWeight: '700',
        color: Colors.light.tint,
        letterSpacing: 1,
    },
    mainTitle: {
        fontSize: 28,
        fontWeight: '800',
        color: Colors.light.text,
        lineHeight: 36,
    },
    titleHighlight: {
        color: Colors.light.tint,
    },
    description: {
        fontSize: 15,
        color: Colors.light.text_secondary,
        lineHeight: 22,
    },
    statsRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: Colors.light.background,
        borderRadius: 12,
        padding: 16,
        marginTop: 8,
    },
    statItem: {
        flex: 1,
        alignItems: 'center',
        gap: 4,
    },
    statValue: {
        fontSize: 20,
        fontWeight: '800',
        color: Colors.light.text,
    },
    statLabel: {
        fontSize: 12,
        color: Colors.light.text_muted,
    },
    statDivider: {
        width: 1,
        height: 40,
        backgroundColor: Colors.light.border,
    },
    authSection: {
        alignItems: 'center',
        gap: 12,
    },
    authTitle: {
        fontSize: 14,
        color: Colors.light.text_secondary,
        marginBottom: 4,
    },
    primaryButton: {
        width: '100%',
        borderRadius: 14,
        overflow: 'hidden',
        // Shadow
        shadowColor: Colors.light.tint,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 8,
    },
    buttonGradient: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 16,
        gap: 8,
    },
    primaryButtonText: {
        fontSize: 16,
        fontWeight: '700',
        color: '#000',
    },
    secondaryButton: {
        paddingVertical: 12,
        paddingHorizontal: 24,
    },
    secondaryButtonText: {
        fontSize: 14,
        color: Colors.light.text_secondary,
        textDecorationLine: 'underline',
    },
});

export default Hero;
