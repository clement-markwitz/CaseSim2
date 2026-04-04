import { useAppTheme } from "@/hooks/useAppTheme";
import { useProfileMe } from "@/hooks/useProfileMe";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { ArrowLeft, DollarSign, Edit3, Settings, ShoppingCart } from "lucide-react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Avatar, Button, Tabs, Text, XStack, YStack } from "tamagui";

export default function ProfileScreen() {
    const { data: profile } = useProfileMe();
    const router = useRouter();
    const colors = useAppTheme();
    const insets = useSafeAreaInsets(); // Pour gérer l'encoche de l'écran

    return (
        <YStack
            flex={1} // Prend tout l'écran
            backgroundColor={colors.background}
            paddingTop={insets.top + 10} // Padding dynamique selon le téléphone
        >
            {/* --- HEADER --- */}
            <YStack gap={15} paddingHorizontal={20} paddingBottom={20}>
                <XStack alignItems="center" justifyContent="space-between">
                    <Button
                        icon={<ArrowLeft size={20} color={colors.text} />}
                        onPress={() => router.back()}
                        circular
                        backgroundColor={colors.background_elevated}
                    />
                    <Text fontSize={20} fontWeight="bold" color={colors.text} letterSpacing={1}>
                        PROFIL
                    </Text>
                    <Button
                        icon={<Settings size={20} color={colors.text} />}
                        circular
                        backgroundColor={colors.background_elevated}
                    />
                </XStack>
            </YStack>

            {/* Ligne de séparation stylée */}
            <LinearGradient
                colors={['transparent', colors.tint, 'transparent']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={{ height: 1, opacity: 0.3, marginBottom: 20 }}
            />

            {/* --- PROFILE CARD --- */}
            <YStack
                marginHorizontal={20}
                backgroundColor={colors.background_card}
                borderRadius={16}
                padding={20}
                borderWidth={1}
                borderColor={colors.border}
                gap={20}
            >
                {/* Ligne 1 : Avatar, Pseudo & Bouton Edit */}
                <XStack alignItems="center" justifyContent="space-between">
                    <XStack alignItems="center" gap={15}>
                        <Avatar size="$7" circular>
                            <Avatar.Image src={profile?.avatar} />
                            <Avatar.Fallback
                                backgroundColor={colors.background_elevated}
                                alignItems="center"
                                justifyContent="center"
                            >
                                <Text color={colors.text_muted} fontSize={20} fontWeight="bold">
                                    {profile?.username?.charAt(0).toUpperCase() || '?'}
                                </Text>
                            </Avatar.Fallback>
                        </Avatar>

                        <YStack gap={2}>
                            <Text fontSize={22} fontWeight="900" color={colors.text}>
                                {profile?.username}
                            </Text>
                            <Text fontSize={14} color={colors.text_secondary} fontWeight="600">
                                Joueur
                            </Text>
                        </YStack>
                    </XStack>

                    <Button
                        icon={<Edit3 size={18} color={colors.text} />}
                        circular
                        backgroundColor={colors.background_elevated}
                    />
                </XStack>

                {/* Ligne 2 : Les "Widgets" de monnaie */}
                <XStack gap={10}>
                    {/* Widget Balance Principale */}
                    <YStack
                        flex={1}
                        backgroundColor={colors.background_elevated}
                        borderRadius={12}
                        padding={12}
                        alignItems="center"
                    >
                        <XStack alignItems="center" gap={5}>
                            <DollarSign size={14} color={colors.success} />
                            <Text fontSize={12} color={colors.text_muted} textTransform="uppercase" fontWeight="bold">
                                Balance
                            </Text>
                        </XStack>
                        <Text fontSize={20} fontWeight="900" color={colors.success} marginTop={5}>
                            {profile?.balance} $
                        </Text>
                    </YStack>

                    {/* Widget Monnaie Boutique */}
                    <YStack
                        flex={1}
                        backgroundColor={colors.background_elevated}
                        borderRadius={12}
                        padding={12}
                        alignItems="center"
                    >
                        <XStack alignItems="center" gap={5}>
                            <ShoppingCart size={14} color={colors.tint} />
                            <Text fontSize={12} color={colors.text_muted} textTransform="uppercase" fontWeight="bold">
                                Boutique
                            </Text>
                        </XStack>
                        <Text fontSize={20} fontWeight="900" color={colors.tint} marginTop={5}>
                            {profile?.shop_balance} 💎
                        </Text>
                    </YStack>
                </XStack>
            </YStack>

            {/* --- TABS (Inventaire / Collection) --- */}
            <Tabs defaultValue="week" flexDirection="column" flex={1} marginTop={30}>

                {/* Le conteneur des boutons d'onglets */}
                <Tabs.List
                    marginHorizontal={20}
                    backgroundColor={colors.background_card}
                    borderRadius={12}
                    padding={4}
                    borderWidth={1}
                    borderColor={colors.border}
                >
                    <Tabs.Tab value="week" flex={1} borderRadius={8} activeStyle={{ backgroundColor: colors.tint }}>
                        <Text color={colors.text} fontWeight="bold">Inventaire Semaine</Text>
                    </Tabs.Tab>
                    <Tabs.Tab value="collections" flex={1} borderRadius={8} activeStyle={{ backgroundColor: colors.tint }}>
                        <Text color={colors.text} fontWeight="bold">Collections</Text>
                    </Tabs.Tab>
                </Tabs.List>

                {/* Le contenu des onglets */}
                <Tabs.Content value="week" flex={1} padding={20} alignItems="center" justifyContent="center">
                    <Text color={colors.text_muted}>Ton inventaire hebdomadaire apparaîtra ici.</Text>
                </Tabs.Content>

                <Tabs.Content value="collections" flex={1} padding={20} alignItems="center" justifyContent="center">
                    <Text color={colors.text_muted}>Le Pokédex de tes skins apparaîtra ici.</Text>
                </Tabs.Content>

            </Tabs>

        </YStack>
    );
}