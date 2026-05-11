import { useAppTheme } from "@/hooks/useAppTheme";
import { useGrantReward } from "@/hooks/useGrantReward";
import { useProfileMe } from "@/hooks/useProfileMe";
import { useDemoStore } from "@/stores/demoStore";
import { checkCanClaimDaily, checkCanClaimWeekly } from "@/utils/rewardLogics";
import { useRouter } from "expo-router";
import { Calendar, Check, Clock, Gift, PackageOpen } from "lucide-react-native";
import { useState } from "react";
import { Button, Spinner, Text, XStack, YStack } from "tamagui";

export default function RewardList() {
    const router = useRouter();
    const { data: profile } = useProfileMe();
    const { mode } = useDemoStore();
    const colors = useAppTheme();

    const { mutate: grantReward, isPending } = useGrantReward();
    const [claimingType, setClaimingType] = useState<'daily' | 'weekly' | null>(null);

    const canClaimDaily = checkCanClaimDaily(profile?.date_daily_reward);
    const canClaimWeekly = checkCanClaimWeekly(profile?.date_weekly_reward);

    if (mode === "demo") {
        return null;
    }

    const handleClaim = (type: 'daily' | 'weekly') => {
        setClaimingType(type);
        grantReward(
            { type },
            { onSettled: () => setClaimingType(null) }
        );
    };

    // 🎯 CAS SPÉCIAL : Nouveau joueur sans balance (null)
    const isNewPlayer = profile?.balance === null;

    return (
        <YStack
            marginHorizontal={16}
            marginTop={16}
            backgroundColor={colors.background_card}
            borderRadius={16}
            padding={16}
            borderWidth={1}
            borderColor={isNewPlayer ? colors.tint : colors.border}
            transition={{ type: "spring", damping: 20, stiffness: 100 }}
            enterStyle={{ opacity: 0, scale: 0.95 }}
            gap={15}
        >
            <XStack alignItems="center" gap={10} paddingBottom={5} borderBottomWidth={1} borderBottomColor={colors.border}>
                <Gift size={20} color={isNewPlayer ? colors.tint : colors.tint} />
                <Text fontSize={18} fontWeight="bold" color={colors.text}>
                    {isNewPlayer ? "Bienvenue !" : "Cadeaux du jour"}
                </Text>
            </XStack>

            {isNewPlayer ? (
                /* ===== ÉTAT : NOUVEAU JOUEUR ===== */
                <YStack alignItems="center" gap={16} paddingVertical={20}>
                    <YStack
                        backgroundColor={`${colors.tint}15`}
                        padding={20}
                        borderRadius={20}
                        alignItems="center"
                        justifyContent="center"
                    >
                        <PackageOpen size={40} color={colors.tint} />
                    </YStack>

                    <YStack alignItems="center" gap={8}>
                        <Text fontSize={20} fontWeight="900" color={colors.text} textAlign="center">
                            Ouvre ta première caisse
                        </Text>
                        <Text
                            fontSize={14}
                            color={colors.text_muted}
                            textAlign="center"
                            lineHeight={20}
                            paddingHorizontal={20}
                        >
                            Pour débloquer tes récompenses quotidiennes et hebdomadaires, ouvre d'abord ta caisse de départ gratuite !
                        </Text>
                    </YStack>

                    <Button
                        size="$4"
                        backgroundColor={colors.tint}
                        height={52}
                        borderRadius={14}
                        width="100%"
                        pressStyle={{ scale: 0.97, opacity: 0.9 }}
                        hoverStyle={{ scale: 1.02 }}
                        transition={{ duration: 300, type: 'spring', stiffness: 100 }}
                        onPress={() => router.push('/case/X_Ray_P250_Package')}
                        iconAfter={<Gift size={18} color="white" />}
                    >
                        <Text color="white" fontWeight="bold" fontSize={16}>Ouvrir ma caisse gratuite</Text>
                    </Button>
                </YStack>
            ) : (
                /* ===== ÉTAT : JOUEUR EXISTANT (Rewards normales) ===== */
                <>
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
                </>
            )}
        </YStack>
    );
}