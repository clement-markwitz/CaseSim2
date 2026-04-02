// CaseFreeScreen.tsx
import RouletteContainer from '@/components/RouletteContainer';
import SkinsPreview from '@/components/ui/SkinsPreview';
import { colorRaritySolid } from '@/constants/Colors';
import { useCase } from '@/hooks/useCase';
import { useSkins } from '@/hooks/useSkins';
import { useDemoStore } from '@/stores/demoStore';
import { generateRouletteTab, skinDrop, WonItem } from '@/utils/gameLogic';
import { LinearGradient } from 'expo-linear-gradient';
import { router, useNavigation } from 'expo-router';
import { ArrowLeft, Box } from 'lucide-react-native';
import { useEffect, useState } from 'react';
import { BackHandler, Dimensions, Image, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
// Importation des composants Tamagui
import { useAppTheme } from '@/hooks/useAppTheme';
import { ScrollView, Text, XStack, YStack } from 'tamagui';

const { width } = Dimensions.get('window');

export default function CaseFreeScreen({ caseId }: { caseId: string }) {
  const [rouletteSkins, setRouletteSkins] = useState<WonItem[] | null>(null);

  const [isActive, setIsActive] = useState(false);
  const [isRolling, setIsRolling] = useState(false);
  const [finalResult, setFinalResult] = useState<WonItem | null>(null);
  const { data: caseItem } = useCase(caseId);
  const { data: skins } = useSkins(caseId, caseItem?.skinIds ?? []);
  const navigation = useNavigation();

  const colors = useAppTheme();
  // Gestion des interactions avec le système
  useEffect(() => {
    // iOS - désactive swipe
    navigation.setOptions({ gestureEnabled: !isRolling });

    // Android - désactive bouton retour
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      () => isRolling
    );

    return () => backHandler.remove();
  }, [isRolling, navigation]);

  // Gestion du bouton "ouvrir la caisse"
  const handleOpenCase = () => {
    if (isRolling) return;

    setIsActive(true);
    setIsRolling(true);
    const winner = skinDrop(skins);
    useDemoStore.getState().addDrop(winner, caseItem?.price || 0);
    setFinalResult(winner);

    if (!rouletteSkins) {
      const visualTab = generateRouletteTab(skins, winner);
      setRouletteSkins(visualTab);
    } else {
      const visualTab = generateRouletteTab(skins, winner);
      for (let i = 0; i < 19; i++) {
        visualTab[i] = rouletteSkins[rouletteSkins.length - 19 + i];
      }
      setRouletteSkins(visualTab);
    }
  };

  // Gestion de la fin de la roulette
  const handleRollComplete = () => {
    setIsRolling(false);
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
      {/* Background gradient */}
      <LinearGradient
        colors={[colors.background, colors.background_secondary]}
        style={StyleSheet.absoluteFill}
      />

      {/* Header */}
      <XStack alignItems="center" justifyContent="space-between" paddingHorizontal={16} paddingVertical={12}>
        {/* Bouton Retour Animé */}
        <YStack
          width={44}
          height={44}
          borderRadius={12}
          backgroundColor={colors.background_elevated}
          alignItems="center"
          justifyContent="center"
          borderWidth={1}
          borderColor={colors.border}
          onPress={() => router.back()}
          disabled={isRolling}
          opacity={isRolling ? 0.5 : 1}
          pressStyle={{ scale: 0.9 }}
        >
          <ArrowLeft size={22} color={colors.text} />
        </YStack>

        <YStack alignItems="center" gap={4}>
          <Text fontSize={18} fontWeight="700" color={colors.text}>
            {caseItem?.name}
          </Text>
          <YStack backgroundColor={colors.background_elevated} paddingHorizontal={12} paddingVertical={4} borderRadius={8}>
            <Text fontSize={13} fontWeight="600" color={colors.success}>
              ${caseItem?.price.toFixed(2)}
            </Text>
          </YStack>
        </YStack>

        {/* Placeholder pour centrer le titre */}
        <YStack width={44} />
      </XStack>

      <ScrollView
        contentContainerStyle={{ paddingBottom: 40 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Case Preview (Avant ouverture) */}
        {!isActive && (
          <YStack alignItems="center" paddingTop={20}>
            {/* Image de la caisse */}
            <YStack width={200} height={160} alignItems="center" justifyContent="center" position="relative">
              <LinearGradient
                colors={[colors.tint_glow, 'transparent']}
                style={{ position: 'absolute', width: 180, height: 180, borderRadius: 90, opacity: 0.6 }}
              />
              <Image
                source={{ uri: caseItem?.image }}
                style={{ width: 160, height: 120 }}
                resizeMode="contain"
              />
            </YStack>

            {/* Contents preview (Liste des skins) */}
            <YStack
              width={width - 32}
              marginTop={24}
              backgroundColor={colors.background_card}
              borderRadius={16}
              padding={16}
              borderWidth={1}
              borderColor={colors.border}
            >
              <XStack alignItems="center" gap={8} marginBottom={16}>
                <Box size={18} color={colors.text_secondary} />
                <Text fontSize={14} fontWeight="600" color={colors.text_secondary}>
                  Contenu de la caisse
                </Text>
              </XStack>

              <ScrollView
                maxHeight={250}
                contentContainerStyle={{ paddingBottom: 10 }}
                showsVerticalScrollIndicator={true}
                nestedScrollEnabled={true}
              >
                <SkinsPreview skins={skins} />
              </ScrollView>
            </YStack>
          </YStack>
        )}

        {/* Roulette (Pendant / Après ouverture) */}
        {isActive && (
          <YStack paddingTop={20} alignItems="center">
            <RouletteContainer
              skins={rouletteSkins}
              onComplete={handleRollComplete}
            />

            {/* Result display */}
            {finalResult && !isRolling && (
              <YStack width={width - 32} marginTop={20}>
                <LinearGradient
                  colors={[colors.background_elevated, colors.background_card]}
                  style={{ borderRadius: 16, padding: 20, alignItems: 'center', borderWidth: 1, borderColor: colors.border }}
                >
                  <Text fontSize={20} fontWeight="700" textAlign="center" color={colorRaritySolid[finalResult.rarity]}>
                    {finalResult.name}
                  </Text>

                  <Text fontSize={14} marginTop={10} color={finalResult.statTrak ? '#e05409' : colors.text_muted}>
                    {finalResult.wear}{finalResult.statTrak && ' | ST'}
                  </Text>

                  <Text fontSize={24} fontWeight="800" color={colors.tint} marginTop={6}>
                    ${finalResult.price.toFixed(2)}
                  </Text>
                </LinearGradient>
              </YStack>
            )}
          </YStack>
        )}

        {/* Open Button */}
        <YStack alignItems="center" marginTop={32} paddingHorizontal={16}>
          <YStack
            width="100%"
            borderRadius={14}
            overflow="hidden"
            shadowColor={colors.tint}
            shadowOffset={{ width: 0, height: 4 }}
            shadowOpacity={isRolling ? 0 : 0.4}
            shadowRadius={12}
            elevation={isRolling ? 0 : 8}
            onPress={handleOpenCase}
            disabled={isRolling}
            pressStyle={{ scale: isRolling ? 1 : 0.97 }} // Pas d'animation si ça roule
          >
            <LinearGradient
              colors={isRolling
                ? [colors.text_muted, colors.text_muted]
                : [colors.tint, '#D4910A']
              }
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', paddingVertical: 18, gap: 10 }}
            >
              <Text fontSize={18} fontWeight="700" color="#000">
                {isRolling ? 'Ouverture...' : 'Ouvrir la caisse'}
              </Text>
            </LinearGradient>
          </YStack>
        </YStack>
      </ScrollView>
    </SafeAreaView>
  );
}