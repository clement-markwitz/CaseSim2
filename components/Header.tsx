// Header.tsx
import { useAuth } from '@/hooks/useAuth';
import { useProfileMe } from '@/hooks/useProfileMe';
import { LinearGradient } from 'expo-linear-gradient';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
// On importe tout depuis tamagui !
import { useAppTheme } from '@/hooks/useAppTheme';
import { useDemoStore } from '@/stores/demoStore';
import { useRouter } from 'expo-router';
import { Image } from 'react-native';
import { Avatar, Switch, Text, XStack, YStack } from 'tamagui';

const Header = () => {
    const insets = useSafeAreaInsets();
    const { signOut, isAuthenticated } = useAuth();
    const { data: profile } = useProfileMe();
    const colors = useAppTheme();
    const { setMode, mode } = useDemoStore();
    const router = useRouter();
    return (
        <YStack
            backgroundColor={colors.background}
            position="relative"
            width="100%"
            paddingHorizontal={20}
            paddingTop={insets.top}
        >
            {/* Background Gradient (Expo LinearGradient est parfait ici) */}
            <LinearGradient
                colors={[colors.background_secondary, 'transparent']}
                style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 120 }}
            />

            {/* Container principal (XStack = flexDirection: 'row') */}
            <XStack
                alignItems="center"
                justifyContent="space-between"
                paddingHorizontal={10}
                paddingVertical={12}
            >

                {/* GAUCHE : Logo & Titre */
                    mode === 'demo' && (
                        <XStack alignItems="center" gap="$2">
                            <YStack
                                borderRadius={12}
                                backgroundColor={colors.tint_glow}
                            >
                                <Image
                                    source={require('@/assets/images/logo.png')}
                                    style={{
                                        width: 36,
                                        height: 36,
                                        borderRadius: 10
                                    }}
                                />
                            </YStack>

                            <XStack alignItems="baseline" gap={4} >
                                <Text fontSize={18} fontWeight="800" color={colors.text} letterSpacing={2}>
                                    CASE
                                </Text>
                                <Text fontSize={18} fontWeight="800" color={colors.tint} letterSpacing={2}>
                                    SIMULATOR
                                </Text>
                            </XStack>
                        </XStack>
                    )}
                {mode === 'real' && profile && (
                    <XStack alignItems="center" gap="$2">

                        {/* Gestion de l'avatar : s'il y a une URL, on l'affiche, sinon on met un carré de remplacement */}

                        <Avatar
                            onPress={() => router.push('/(auth)/profileMe')}
                            size={36}
                            borderRadius={10}
                            backgroundColor={colors.background_elevated}
                        >
                            <Avatar.Image
                                src={profile.avatar}
                            />
                            <Avatar.Fallback
                                backgroundColor={colors.background_elevated}
                                alignItems="center"
                                justifyContent="center"
                                borderRadius={100}
                            >
                                <Text color={colors.text_muted} fontSize={16} fontWeight="bold">
                                    {profile.username.charAt(0).toUpperCase() || '?'}
                                </Text>
                            </Avatar.Fallback>
                        </Avatar>


                        {/* Pseudo */}
                        <Text fontSize={18} fontWeight="800" color={colors.text} letterSpacing={2}>
                            {profile.username}
                        </Text>

                        {/* Balance */}
                        <Text fontSize={18} fontWeight="800" color={colors.tint} letterSpacing={2}>
                            {profile.balance} $
                        </Text>

                    </XStack>
                )}
                {/* DROITE : Changer de mode */}
                {isAuthenticated && (
                    <XStack alignItems="center" gap="$2">
                        <Text
                            fontSize={12}
                            fontWeight="700"
                            color={colors.text}
                            opacity={0.6}
                            textTransform="uppercase"
                        >
                            Mode
                        </Text>
                        <Switch
                            size="$3"
                            backgroundColor={colors.background_elevated}
                            checked={mode === 'demo'}
                            transition="quick"
                            // 👇 On utilise onCheckedChange, qui renvoie directement le nouveau statut (true/false)
                            onCheckedChange={(isChecked) => setMode(isChecked ? 'demo' : 'real')}
                        >
                            <Switch.Thumb backgroundColor={colors.tint} transition="quick" />
                        </Switch>
                    </XStack>
                )}

            </XStack>

            {/* Bottom separator */}
            <LinearGradient
                colors={['transparent', colors.tint, 'transparent']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={{ height: 1, opacity: 0.3 }}
            />
        </YStack>
    );
};

export default Header;