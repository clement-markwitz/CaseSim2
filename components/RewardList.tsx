import { useAppTheme } from "@/hooks/useAppTheme";
import { useGrantReward } from "@/hooks/useGrantReward";
import { useProfileMe } from "@/hooks/useProfileMe";
import { useDemoStore } from "@/stores/demoStore"; // Ton store
import { checkCanClaimDaily, checkCanClaimWeekly } from "@/utils/rewardLogics";
import { Calendar, Check, Clock, Gift } from "lucide-react-native";
import { useState } from "react";
import { Button, Spinner, Text, XStack, YStack } from "tamagui";

export default function RewardList() {
    const { data: profile } = useProfileMe();
    const { mode } = useDemoStore();
    const colors = useAppTheme();

    // 🚀 Le hook de mutation
    const { mutate: grantReward, isPending } = useGrantReward();

    // État pour savoir quel bouton est en train de charger (pour ne pas faire tourner les deux en même temps)
    const [claimingType, setClaimingType] = useState<'daily' | 'weekly' | null>(null);

    const canClaimDaily = checkCanClaimDaily(profile?.date_daily_reward);
    const canClaimWeekly = checkCanClaimWeekly(profile?.date_weekly_reward);

    if (mode === "demo") {
        return null; // Retourner null est plus propre qu'un XStack vide
    }

    const handleClaim = (type: 'daily' | 'weekly') => {
        setClaimingType(type);
        grantReward(
            { type },
            {
                onSettled: () => setClaimingType(null), // On arrête le spinner quand c'est fini
            }
        );
    };

    return (
        <YStack
            marginHorizontal={16}
            marginTop={16}
            backgroundColor={colors.background_card}
            borderRadius={16}
            padding={16}
            borderWidth={1}
            borderColor={colors.border}
            gap={15}
        >
            <XStack alignItems="center" gap={10} paddingBottom={5} borderBottomWidth={1} borderBottomColor={colors.border}>
                <Gift size={20} color={colors.tint} />
                <Text fontSize={18} fontWeight="bold" color={colors.text}>
                    Cadeaux du jour
                </Text>
            </XStack>

            {/* --- LIGNE : QUOTIDIENNE --- */}
            <XStack alignItems="center" justifyContent="space-between">
                <XStack alignItems="center" gap={12}>
                    <YStack backgroundColor={colors.background_elevated} padding={10} borderRadius={12}>
                        <Gift size={20} color={canClaimDaily ? colors.success : colors.text_muted} />
                    </YStack>
                    <YStack>
                        <Text fontSize={16} fontWeight="bold" color={canClaimDaily ? colors.text : colors.text_muted}>
                            Quotidienne
                        </Text>
                        <Text fontSize={13} color={colors.text_muted} fontWeight="600">
                            +10.00 $
                        </Text>
                    </YStack>
                </XStack>

                {canClaimDaily ? (
                    <Button
                        size="$3"
                        backgroundColor={colors.success}
                        pressStyle={{ scale: 0.95 }}
                        disabled={isPending}
                        onPress={() => handleClaim('daily')}
                    >
                        {isPending && claimingType === 'daily' ? (
                            <Spinner color="white" />
                        ) : (
                            <Text color="white" fontWeight="bold">Récupérer</Text>
                        )}
                    </Button>
                ) : (
                    <XStack alignItems="center" gap={8} opacity={0.6}>
                        <Check size={16} color={colors.success} />
                        <YStack alignItems="flex-end">
                            <Text fontSize={14} color={colors.text_muted} fontWeight="bold">Récupéré</Text>
                            <XStack alignItems="center" gap={4}>
                                <Clock size={10} color={colors.text_muted} />
                                <Text fontSize={11} color={colors.text_muted}>Dispo demain</Text>
                            </XStack>
                        </YStack>
                    </XStack>
                )}
            </XStack>

            {/* --- LIGNE : HEBDOMADAIRE --- */}
            <XStack alignItems="center" justifyContent="space-between">
                <XStack alignItems="center" gap={12}>
                    <YStack backgroundColor={colors.background_elevated} padding={10} borderRadius={12}>
                        <Calendar size={20} color={canClaimWeekly ? colors.tint : colors.text_muted} />
                    </YStack>
                    <YStack>
                        <Text fontSize={16} fontWeight="bold" color={canClaimWeekly ? colors.text : colors.text_muted}>
                            Hebdomadaire
                        </Text>
                        <Text fontSize={13} color={colors.text_muted} fontWeight="600">
                            +100.00 $
                        </Text>
                    </YStack>
                </XStack>

                {canClaimWeekly ? (
                    <Button
                        size="$3"
                        backgroundColor={colors.tint}
                        pressStyle={{ scale: 0.95 }}
                        disabled={isPending}
                        onPress={() => handleClaim('weekly')}
                    >
                        {isPending && claimingType === 'weekly' ? (
                            <Spinner color="white" />
                        ) : (
                            <Text color="white" fontWeight="bold">Récupérer</Text>
                        )}
                    </Button>
                ) : (
                    <XStack alignItems="center" gap={8} opacity={0.6}>
                        <Check size={16} color={colors.success} />
                        <YStack alignItems="flex-end">
                            <Text fontSize={14} color={colors.text_muted} fontWeight="bold">Récupéré</Text>
                            <XStack alignItems="center" gap={4}>
                                <Clock size={10} color={colors.text_muted} />
                                <Text fontSize={11} color={colors.text_muted}>Dispo lundi</Text>
                            </XStack>
                        </YStack>
                    </XStack>
                )}
            </XStack>
        </YStack>
    );
}