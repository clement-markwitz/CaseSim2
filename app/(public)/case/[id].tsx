import Header from '@/components/Header';
import RouletteContainer from '@/components/RouletteContainer';
import { View } from '@/components/Themed';
import { CASES } from '@/constants/case';
import Colors from '@/constants/Colors';
import { SKINS } from '@/constants/skin';
import { generateRouletteTab, skinDrop, WonItem } from '@/utils/gameLogic';
import { useLocalSearchParams } from 'expo-router'; // <--- 1. IMPORT
import { useState } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity } from 'react-native';

export default function CaseFreeScreen() {
  const [rouletteSkins, setRouletteSkins] = useState<WonItem[] | null>(null);
  const { id } = useLocalSearchParams();
  const [isActive, setIsActive] = useState(false);
  const caseId = id as string;
  const [finalResult, setFinalResult] = useState<WonItem | null>(null);
  const caseItem = CASES.find((c) => c.id === caseId);
  const handleOpenCase = () => {
    setIsActive(true);
    const winner = skinDrop(caseId);
    setFinalResult(winner);
    if (!rouletteSkins) {
      const visualTab = generateRouletteTab(caseId, winner);
      setRouletteSkins(visualTab);
    }
    else {
      const visualTab = generateRouletteTab(caseId, winner);
      for (let i = 0; i < 19; i++) {
        visualTab[i] = rouletteSkins[rouletteSkins.length - 19 + i];
      }
      setRouletteSkins(visualTab);
    }


  };
  return (
    <>
      <Header />
      <View style={styles.container}>
        <Text>{caseItem?.name}</Text>
        {!isActive && (
          <View style={styles.weaponContainer}>
            {caseItem?.skinIds.map((skinId) => {
              const skin = SKINS[skinId];
              return (
                <View key={skin.id} style={styles.weapon}>
                  <Image
                    source={{ uri: skin.image }}
                    style={styles.weaponImage}
                  />
                </View>
              );
            })}
          </View>
        )}
        {isActive && (
          <RouletteContainer skins={rouletteSkins} />
        )}

        <TouchableOpacity style={styles.button} onPress={() =>
          handleOpenCase()} >
          <Text>Open case</Text>
        </TouchableOpacity>
      </View>

    </>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 200,
    height: '100%',
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor: Colors.light.background,
  },

  button: {
    backgroundColor: Colors.light.tint,
    color: Colors.light.text,
    padding: 10,
    borderRadius: 5,
  },
  weapon: {
    width: 100,
    height: 80,
    borderRadius: 5,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.light.tabIconDefault,
  },
  weaponContainer: {
    flexWrap: 'wrap',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
    backgroundColor: Colors.light.background,

  },
  weaponImage: {
    width: 70,
    height: 60,
  },
});
