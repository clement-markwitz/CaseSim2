// SkinsPreview.tsx
import { colorRarityBar } from '@/constants/Colors';
import { Skin } from '@/constants/skin';
import { LinearGradient } from 'expo-linear-gradient';
// On importe l'Image native
import { Image } from 'react-native';
// On importe Tamagui
import { useAppTheme } from '@/hooks/useAppTheme';
import { XStack, YStack } from 'tamagui';

const SkinsPreview = ({ skins }: { skins: Skin[] }) => {
  // 1. On sépare les armes normales
  const regularSkins = skins.filter(skin => skin.rarity !== 'gold');

  // 2. On récupère le TOUT PREMIER item gold trouvé (s'il y en a un)
  const firstGoldSkin = skins.find(skin => skin.rarity === 'gold');

  // 3. On crée la liste finale à afficher : les normaux + 1 seul gold (si existant)
  const displaySkins = firstGoldSkin ? [...regularSkins, firstGoldSkin] : regularSkins;
  const colors = useAppTheme();

  return (
    <XStack flexWrap="wrap" justifyContent="center" gap={10}>
      {displaySkins.map((skin) => {
        const rarityColor = colorRarityBar[skin.rarity] || '#4B69FF';

        return (
          <YStack
            key={skin.id}
            width={75}
            height={60}
            backgroundColor={colors.background_elevated}
            borderRadius={10}
            alignItems="center"
            justifyContent="center"
            position="relative"
            borderWidth={1}
            borderColor={colors.border}
          >
            {/* Glow de la couleur de rareté au bas de la carte */}
            <LinearGradient
              colors={[`${rarityColor}30`, 'transparent']}
              style={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                right: 0,
                height: '50%',
                borderBottomLeftRadius: 10,
                borderBottomRightRadius: 10,
              }}
            />

            {/* Image du skin ou Icône Gold */}
            <Image
              source={
                skin.rarity === 'gold'
                  ? require('@/assets/images/gold.png') // L'image générique pour le Gold
                  : { uri: skin.image } // La vraie image pour les autres
              }
              style={{ width: 55, height: 40 }}
              resizeMode="contain"
            />

            {/* Petit point indicateur de rareté */}
            <YStack
              position="absolute"
              bottom={4}
              right={4}
              width={6}
              height={6}
              borderRadius={3}
              backgroundColor={rarityColor}
            />
          </YStack>
        );
      })}
    </XStack>
  );
};

export default SkinsPreview;