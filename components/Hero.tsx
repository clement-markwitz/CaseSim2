// Hero.tsx
import { useAuth } from '@/hooks/useAuth';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { ChevronRight, Sparkles, Trophy } from 'lucide-react-native';
import { Dimensions } from 'react-native';
// On importe tout depuis Tamagui
import { useAppTheme } from '@/hooks/useAppTheme';
import { Text, XStack, YStack } from 'tamagui';

const { width } = Dimensions.get('window');

const Hero = () => {
    const { isAuthenticated, isLoading } = useAuth();
    const router = useRouter();
    const colors = useAppTheme();
    return (
        <YStack width={width - 32} marginTop={20} gap="$4">

            {/* Main Card */}
            <YStack
                borderRadius={20}
                overflow="hidden"
                borderWidth={1}
                borderColor={colors.border}
                position="relative"
            >
                {/* Background Gradient (Absolute) */}
                <LinearGradient
                    colors={[colors.background_elevated, colors.background_secondary]}
                    style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }}
                />

                {/* Decorative elements */}
                <YStack
                    position="absolute"
                    top={-50}
                    right={-50}
                    width={150}
                    height={150}
                    borderRadius={75}
                    backgroundColor={colors.tint_glow}
                    opacity={0.5}
                />
                <YStack
                    position="absolute"
                    bottom={-30}
                    left={-30}
                    width={100}
                    height={100}
                    borderRadius={50}
                    backgroundColor="rgba(136, 71, 255, 0.2)"
                    opacity={0.5}
                />

                {/* Content */}
                <YStack padding={24} gap="$4">

                    {/* Badge */}
                    <XStack
                        alignItems="center"
                        alignSelf="flex-start"
                        gap="$2"
                        backgroundColor="rgba(245, 166, 35, 0.15)"
                        paddingHorizontal={12}
                        paddingVertical={6}
                        borderRadius={20}
                        borderWidth={1}
                        borderColor="rgba(245, 166, 35, 0.3)"
                    >
                        <Sparkles size={14} color={colors.tint} />
                        <Text fontSize={11} fontWeight="700" color={colors.tint} letterSpacing={1}>
                            SIMULATEUR CS2
                        </Text>
                    </XStack>

                    {/* Main Title */}
                    <Text fontSize={28} fontWeight="800" color={colors.text} lineHeight={36}>
                        Ouvrez des caisses{'\n'}
                        <Text color={colors.tint}>sans limites</Text>
                    </Text>

                    {/* Description */}
                    <Text fontSize={15} color={colors.text_secondary} lineHeight={22}>
                        Testez votre chance et découvrez les skins les plus rares du jeu.
                        Aucun risque, que du fun !
                    </Text>

                    {/* Stats row */}
                    <XStack
                        alignItems="center"
                        justifyContent="center"
                        backgroundColor={colors.background}
                        borderRadius={12}
                        padding={16}
                        marginTop={8}
                    >
                        <YStack flex={1} alignItems="center" gap={4}>
                            <Trophy size={16} color={colors.tint} />
                            <Text fontSize={20} fontWeight="800" color={colors.text}>
                                1.2M+
                            </Text>
                            <Text fontSize={12} color={colors.text_muted}>
                                Cases ouvertes
                            </Text>
                        </YStack>
                    </XStack>

                </YStack>
            </YStack>

            {/* Auth Section */}
            {isLoading ? (
                <Text textAlign="center">Loading...</Text>
            ) : (!isAuthenticated && (
                <YStack alignItems="center" gap="$3">

                    <Text fontSize={14} color={colors.text_secondary} marginBottom={4}>
                        Débloquez toutes les fonctionnalités
                    </Text>

                    {/* Primary Button */}
                    <YStack
                        width="100%"
                        borderRadius={14}
                        overflow="hidden"
                        shadowColor={colors.tint}
                        shadowOffset={{ width: 0, height: 4 }}
                        shadowOpacity={0.3}
                        shadowRadius={8}
                        elevation={8}
                        onPress={() => router.push("/register")}
                        pressStyle={{ scale: 0.97, opacity: 0.8 }} // Remplace TouchableOpacity !
                    >
                        <LinearGradient
                            colors={[colors.tint, '#D4910A']}
                            start={{ x: 0, y: 0 }}
                            end={{ x: 1, y: 1 }}
                        >
                            <XStack alignItems="center" justifyContent="center" paddingVertical={16} gap={8}>
                                <Text fontSize={16} fontWeight="700" color="#000">
                                    Créer un compte
                                </Text>
                                <ChevronRight size={20} color="#000" />
                            </XStack>
                        </LinearGradient>
                    </YStack>

                    {/* Secondary Button */}
                    <YStack
                        paddingVertical={12}
                        paddingHorizontal={24}
                        onPress={() => router.push("/(auth)/login")}
                        pressStyle={{ opacity: 0.5 }} // Remplace TouchableOpacity !
                    >
                        <Text fontSize={14} color={colors.text_secondary} textDecorationLine="underline">
                            J'ai déjà un compte
                        </Text>
                    </YStack>

                </YStack>
            ))}
        </YStack>
    );
};

export default Hero;