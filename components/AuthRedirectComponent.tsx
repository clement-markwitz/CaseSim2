import { useAppTheme } from "@/hooks/useAppTheme";
import { useRouter } from "expo-router";
import { Lock } from "lucide-react-native";
import { Button, Text, YStack } from "tamagui";

export default function AuthRedirectComponent({ page }: { page: string }) {
    const router = useRouter();
    const colors = useAppTheme();

    return (
        <YStack
            flex={1}
            justifyContent="center"
            alignItems="center"
            padding="$5"
            backgroundColor={colors.background}
        >
            <YStack
                backgroundColor={colors.background_card}
                padding="$6"
                borderRadius="$6"
                alignItems="center"
                width="100%"
                maxWidth={400}
                gap="$4"
                borderWidth={1}
                borderColor={colors.border}
                shadowColor="#000"
                shadowRadius={10}
                shadowOpacity={0.2}
            >
                <YStack
                    width={64}
                    height={64}
                    borderRadius={32}
                    backgroundColor={colors.background_elevated}
                    justifyContent="center"
                    alignItems="center"
                    marginBottom="$2"
                >
                    <Lock color={colors.text} size={32} />
                </YStack>

                <Text
                    color={colors.text}
                    fontSize={24}
                    fontWeight="bold"
                    textAlign="center"
                >
                    Accès Restreint
                </Text>

                <Text
                    color={colors.text_secondary}
                    fontSize={16}
                    textAlign="center"
                    lineHeight={24}
                    marginBottom="$2"
                >
                    Pour accéder à <Text color={colors.tint} fontWeight="bold">{page}</Text>, vous devez être connecté.
                </Text>

                <YStack width="100%" gap="$3">
                    <Button
                        backgroundColor={colors.tint}
                        borderRadius="$4"
                        size="$4"
                        onPress={() => router.push('/(auth)/login')}
                    >
                        <Text color="#000" fontWeight="bold">Se connecter</Text>
                    </Button>
                    <Button
                        backgroundColor="transparent"
                        borderWidth={1}
                        borderColor={colors.border}
                        borderRadius="$4"
                        size="$4"
                        onPress={() => router.push('/(auth)/register')}
                    >
                        <Text color={colors.text} fontWeight="600">S'inscrire</Text>
                    </Button>
                </YStack>
            </YStack>
        </YStack>
    );
}
