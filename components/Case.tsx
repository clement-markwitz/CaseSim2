// Case.tsx
import { Case } from "@/constants/case";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
// Import de Tamagui
import { useAppTheme } from "@/hooks/useAppTheme";
import { Image } from "react-native";
import { Text, YStack } from "tamagui";

const CaseView = ({ caseItem }: { caseItem: Case }) => {
    const router = useRouter();
    const colors = useAppTheme();
    // Déterminer la rareté maximale dans la caisse pour le style
    const maxRarity = 'gold';
    return (
        <YStack
            width={165}
            height={220}
            position="relative"
            // 👇 Remplace TouchableOpacity par des animations natives Tamagui
            onPress={() => {
                router.push({
                    pathname: '/(public)/case/[id]',
                    params: { id: caseItem.id }
                });
            }}
            pressStyle={{ scale: 0.96, opacity: 0.9 }}
        >
            {/* Glow effect background (Expo LinearGradient est parfait ici) */}
            <LinearGradient
                colors={[`${colors.tint}20`, 'transparent']}
                style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    width: 120,
                    height: 120,
                    borderRadius: 60,
                    transform: [{ translateX: -60 }, { translateY: -60 }],
                }}
            />

            {/* Card inner */}
            <YStack
                flex={1}
                backgroundColor={colors.background_card}
                borderRadius={16}
                borderWidth={1}
                borderColor={colors.border}
                overflow="hidden"
                padding={12}
            >
                {/* Case image */}
                <YStack flex={1} alignItems="center" justifyContent="center" paddingVertical={8}>
                    <Image
                        source={{ uri: caseItem.image }}
                        style={{ width: 100, height: 80 }} // <-- On remet width et height dans style
                        resizeMode="contain"
                    />
                </YStack>

                {/* Case info */}
                <YStack gap={8}>
                    <Text
                        fontSize={13}
                        fontWeight="700"
                        color={colors.text}
                        textAlign="center"
                        lineHeight={16}
                        numberOfLines={2}
                    >
                        {caseItem.name}
                    </Text>

                    {/* Price Section */}
                    <YStack alignItems="center" gap={4}>
                        <Text
                            fontSize={10}
                            color={colors.text_muted}
                            textTransform="uppercase"
                            letterSpacing={1}
                        >
                            Prix
                        </Text>
                        <YStack
                            backgroundColor={colors.background_elevated}
                            paddingHorizontal={16}
                            paddingVertical={6}
                            borderRadius={8}
                            borderWidth={1}
                            borderColor={colors.border}
                        >
                            <Text fontSize={14} fontWeight="800" color={colors.success}>
                                ${caseItem.price.toFixed(2)}
                            </Text>
                        </YStack>
                    </YStack>
                </YStack>

                {/* Bottom accent line */}
                <LinearGradient
                    colors={['transparent', colors.tint, 'transparent']}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                    style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 2 }}
                />
            </YStack>
        </YStack>
    );
};

export default CaseView;