// Header.tsx
import { useAuth } from '@/hooks/useAuth';
import { LinearGradient } from 'expo-linear-gradient';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
// On importe tout depuis tamagui !
import { useAppTheme } from '@/hooks/useAppTheme';
import { useDemoStore } from '@/stores/demoStore';
import { Image, Switch, Text, XStack, YStack } from 'tamagui';

const Header = () => {
    const insets = useSafeAreaInsets();
    const { signOut, isAuthenticated } = useAuth();
    const colors = useAppTheme();
    const { setMode, mode } = useDemoStore();
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

                {/* GAUCHE : Logo & Titre */}
                <XStack alignItems="center" gap="$2">
                    <YStack
                        padding={2}
                        borderRadius={12}
                        backgroundColor={colors.tint_glow}
                        onPress={isAuthenticated ? signOut : () => { }}
                    >
                        {/* Image de Tamagui */}
                        <Image
                            source={require('@/assets/images/logo.png')}
                            width={36}
                            height={36}
                            borderRadius={10}
                        />
                    </YStack>

                    <XStack alignItems="baseline" gap={4}>
                        <Text fontSize={18} fontWeight="800" color={colors.text} letterSpacing={2}>
                            CASE
                        </Text>
                        <Text fontSize={18} fontWeight="800" color={colors.tint} letterSpacing={2}>
                            SIMULATOR
                        </Text>
                    </XStack>
                </XStack>

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
                            // 👇 On utilise onCheckedChange, qui renvoie directement le nouveau statut (true/false)
                            onCheckedChange={(isChecked) => setMode(isChecked ? 'demo' : 'real')}
                        >
                            <Switch.Thumb backgroundColor={colors.tint} />
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