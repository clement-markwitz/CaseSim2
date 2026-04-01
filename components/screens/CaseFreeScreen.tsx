import RouletteContainer from '@/components/RouletteContainer';
import SkinsPreview from '@/components/ui/SkinsPreview';
import Colors, { colorRaritySolid } from '@/constants/Colors';
import { useCase } from '@/hooks/useCase';
import { useSkins } from '@/hooks/useSkins';
import { useDemoStore } from '@/stores/demoStore';
import { generateRouletteTab, skinDrop, WonItem } from '@/utils/gameLogic';
import { useQueryErrorResetBoundary } from '@tanstack/react-query';
import { LinearGradient } from 'expo-linear-gradient';
import { router, useNavigation } from 'expo-router';
import { ArrowLeft, Box } from 'lucide-react-native';
import { useEffect, useState } from 'react';
import {
  BackHandler,
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const { width } = Dimensions.get('window');

export default function CaseFreeScreen({ caseId }: { caseId: string }) {
  const [rouletteSkins, setRouletteSkins] = useState<WonItem[] | null>(null);

  const [isActive, setIsActive] = useState(false);
  const [isRolling, setIsRolling] = useState(false);
  const [finalResult, setFinalResult] = useState<WonItem | null>(null);
  const { data: caseItem } = useCase(caseId);
  const { data: skins } = useSkins(caseId, caseItem?.skinIds ?? []);
  const navigation = useNavigation();
  const { reset } = useQueryErrorResetBoundary();

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
    <SafeAreaView style={styles.safeArea}>
      {/* Background gradient */}
      <LinearGradient
        colors={[Colors.light.background, Colors.light.background_secondary]}
        style={StyleSheet.absoluteFill}
      />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()} disabled={isRolling}>
          <ArrowLeft size={22} color={Colors.light.text} />
        </TouchableOpacity>
        <View style={styles.headerCenter}>
          <Text style={styles.headerTitle}>{caseItem?.name}</Text>
          <View style={styles.priceBadge}>
            <Text style={styles.priceText}>${caseItem?.price.toFixed(2)}</Text>
          </View>
        </View>
        <View style={styles.placeholder} />
      </View>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Case Preview */}
        {!isActive && (
          <View style={styles.casePreview}>
            <View style={styles.caseImageContainer}>
              <LinearGradient
                colors={[Colors.light.tint_glow, 'transparent']}
                style={styles.caseGlow}
              />
              <Image
                source={{ uri: caseItem?.image }}
                style={styles.caseImage}
                resizeMode="contain"
              />
            </View>

            {/* Contents preview */}
            <View style={styles.contentsSection}>
              <View style={styles.contentsTitleRow}>
                <Box size={18} color={Colors.light.text_secondary} />
                <Text style={styles.contentsTitle}>Contenu de la caisse</Text>
              </View>
              <ScrollView
                style={styles.skinsScrollView}
                contentContainerStyle={styles.skinsScrollContent}
                showsVerticalScrollIndicator={true}
                nestedScrollEnabled={true}
                scrollEnabled={true}
              >


                <SkinsPreview skins={skins} />


              </ScrollView>
            </View>
          </View>
        )}

        {/* Roulette */}
        {isActive && (
          <View style={styles.rouletteSection}>
            <RouletteContainer
              skins={rouletteSkins}
              onComplete={handleRollComplete}
            />

            {/* Result display */}
            {finalResult && !isRolling && (
              <View style={styles.resultContainer}>
                <LinearGradient
                  colors={[
                    Colors.light.background_elevated,
                    Colors.light.background_card
                  ]}
                  style={styles.resultCard}
                >
                  <Text style={[
                    styles.resultName,
                    { color: colorRaritySolid[finalResult.rarity] }
                  ]}>
                    {finalResult.name}
                  </Text>
                  <Text style={finalResult.statTrak ? styles.resultWearStatTrak : styles.resultWear}>
                    {finalResult.wear}{finalResult.statTrak && ' | ST'}
                  </Text>
                  <Text style={styles.resultPrice}>
                    ${finalResult.price.toFixed(2)}
                  </Text>
                </LinearGradient>
              </View>
            )}
          </View>
        )}

        {/* Open Button */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={[
              styles.openButton,
              isRolling && styles.openButtonDisabled
            ]}
            onPress={handleOpenCase}
            disabled={isRolling}
            activeOpacity={0.85}
          >
            <LinearGradient
              colors={isRolling
                ? [Colors.light.text_muted, Colors.light.text_muted]
                : [Colors.light.tint, '#D4910A']
              }
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.buttonGradient}
            >
              <Text style={styles.buttonText}>
                {isRolling ? 'Ouverture...' : 'Ouvrir la caisse'}
              </Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Colors.light.background,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  backButton: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: Colors.light.background_elevated,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: Colors.light.border,
  },
  headerCenter: {
    alignItems: 'center',
    gap: 4,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: Colors.light.text,
  },
  priceBadge: {
    backgroundColor: Colors.light.background_elevated,
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 8,
  },
  priceText: {
    fontSize: 13,
    fontWeight: '600',
    color: Colors.light.success,
  },
  placeholder: {
    width: 44,
  },
  scrollContent: {
    paddingBottom: 40,
  },
  casePreview: {
    alignItems: 'center',
    paddingTop: 20,
  },
  caseImageContainer: {
    width: 200,
    height: 160,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  caseGlow: {
    position: 'absolute',
    width: 180,
    height: 180,
    borderRadius: 90,
    opacity: 0.6,
  },
  caseImage: {
    width: 160,
    height: 120,
  },
  contentsSection: {
    width: width - 32,
    marginTop: 24,
    backgroundColor: Colors.light.background_card,
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: Colors.light.border,
  },
  skinsScrollView: {
    maxHeight: 250,
  },
  skinsScrollContent: {
    paddingBottom: 10,
  },
  contentsTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 16,
  },
  contentsTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.light.text_secondary,
  },
  rouletteSection: {
    paddingTop: 20,
    alignItems: 'center',
  },
  resultContainer: {
    width: width - 32,
    marginTop: 20,
  },
  resultCard: {
    borderRadius: 16,
    padding: 20,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.light.border,
  },
  resultName: {
    fontSize: 20,
    fontWeight: '700',
    textAlign: 'center',
  },
  resultWear: {
    fontSize: 14,
    color: Colors.light.text_muted,
    marginTop: 10,
  },
  resultWearStatTrak: {
    fontSize: 14,
    color: '#e05409',
    marginTop: 10,
  },
  resultPrice: {
    fontSize: 24,
    fontWeight: '800',
    color: Colors.light.tint,
    marginTop: 6,
  },
  buttonContainer: {
    alignItems: 'center',
    marginTop: 32,
    paddingHorizontal: 16,
  },
  openButton: {
    width: '100%',
    borderRadius: 14,
    overflow: 'hidden',
    shadowColor: Colors.light.tint,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 12,
    elevation: 8,
  },
  openButtonDisabled: {
    shadowOpacity: 0,
    elevation: 0,
  },
  buttonGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 18,
    gap: 10,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: '700',
    color: '#000',
  },
  freeText: {
    fontSize: 13,
    color: Colors.light.text_muted,
    marginTop: 12,
  },
});
