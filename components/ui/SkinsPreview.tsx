import Colors, { colorRarityBar } from '@/constants/Colors';
import { Skin } from '@/constants/skin';
import { LinearGradient } from 'expo-linear-gradient';
import { Image, StyleSheet, View } from 'react-native';

const SkinsPreview = ({ skins }: { skins: Skin[] }) => {
  // 1. On sépare les armes normales
  const regularSkins = (skins as Skin[]).filter(skin => skin.rarity !== 'gold');

  // 2. On récupère le TOUT PREMIER item gold trouvé (s'il y en a un)
  const firstGoldSkin = (skins as Skin[]).find(skin => skin.rarity === 'gold');

  // 3. On crée la liste finale à afficher : les normaux + 1 seul gold (si existant)
  const displaySkins = firstGoldSkin ? [...regularSkins, firstGoldSkin] : regularSkins;

  return (
    <View style={styles.skinsGrid}>
      {displaySkins.map((skin) => {
        const rarityColor = colorRarityBar[skin.rarity] || '#4B69FF';
        return (
          <View key={skin.id} style={styles.skinPreview}>
            <LinearGradient
              colors={[`${rarityColor}30`, 'transparent']}
              style={styles.skinGlow}
            />
            <Image
              source={
                skin.rarity === 'gold'
                  ? require('@/assets/images/gold.png') // L'image générique pour le Gold
                  : { uri: skin.image } // La vraie image pour les autres
              }
              style={styles.skinImage}
              resizeMode="contain"
            />
            <View style={[styles.skinRarityDot, { backgroundColor: rarityColor }]} />
          </View>
        );
      })}
    </View>
  );
};

export default SkinsPreview;

const styles = StyleSheet.create({
  skinsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 10,
  },
  skinPreview: {
    width: 75,
    height: 60,
    backgroundColor: Colors.light.background_elevated,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    borderWidth: 1,
    borderColor: Colors.light.border,
  },
  skinGlow: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: '50%',
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
  skinImage: {
    width: 55,
    height: 40,
  },
  skinRarityDot: {
    position: 'absolute',
    bottom: 4,
    right: 4,
    width: 6,
    height: 6,
    borderRadius: 3,
  },
});
