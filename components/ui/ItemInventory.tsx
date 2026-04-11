import { colorRarityBar } from '@/constants/Colors';
import { InventorySkin } from '@/constants/skin';
import { useAppTheme } from '@/hooks/useAppTheme';
import { LinearGradient } from 'expo-linear-gradient';
import { useState } from 'react';
import { Image } from 'react-native';
import { Text, XStack, YStack } from 'tamagui';
import SheetInventory from './SheetInventory';

interface ItemInventoryProps {
    item: InventorySkin;
    toggleSelection: (id: number) => void;
    idsDelete: number[];
}

export default function ItemInventory({ item, toggleSelection, idsDelete }: ItemInventoryProps) {
    const colors = useAppTheme();
    const skin = item.skins;
    const [open, setOpen] = useState(false);
    const itemActive = idsDelete.includes(item.id);

    const handlePress = () => {
        if (idsDelete.length > 0) {
            toggleSelection(item.id);
        } else {
            console.log("Clic normal sur", skinPattern);
        }
    };
    // Protection anti-crash si le skin est introuvable en base de données
    if (!skin) return null;

    // Fonction pour récupérer la couleur CS2 selon la rareté
    const getRarityColor = (rarity: string) => {
        switch (rarity) {
            case 'Covert': return '#eb4b4b'; // Rouge
            case 'Classified': return '#d32ce6'; // Rose
            case 'Restricted': return '#8847ff'; // Violet
            case 'Mil-Spec Grade': return '#4b69ff'; // Bleu
            case 'Industrial Grade': return '#5e98d9'; // Bleu clair
            default: return '#b0c3d9'; // Gris (Consumer)
        }
    };

    const rarityColor = colorRarityBar[skin.rarity]

    // Astuce UI : Séparer "AK-47 | Redline" en deux parties
    const nameParts = skin.name?.split('|') || [];
    const weaponType = nameParts[0]?.trim() || item.type;
    const skinPattern = nameParts[1]?.trim() || skin.name;

    return (
        <>
            <YStack
                width="48%" // Permet d'en mettre 2 par ligne avec un petit espace
                backgroundColor={colors.background_elevated}
                borderRadius={12}
                borderWidth={1}
                onLongPress={() => setOpen(true)}
                onPress={() => handlePress()}
                pressStyle={{ scale: 0.98 }}
                borderColor={itemActive ? '#ffffffff' : colors.border}
                opacity={idsDelete.length > 0 && !itemActive ? 0.5 : 1}
                overflow="hidden"
                marginBottom={15}
            >
                {/* Ligne de couleur pour la rareté tout en haut de la carte */}
                <YStack height={4} backgroundColor={rarityColor} />
                <LinearGradient
                    colors={[`${rarityColor}20`, 'transparent']}
                    style={{ position: 'absolute', top: 0, bottom: 0, left: 0, right: 0 }}
                />
                <YStack padding={10} gap={8}>
                    {/* Ligne 1 : Badges (Usure et StatTrak/Souvenir) */}
                    <XStack justifyContent="space-between" alignItems="center">
                        <Text fontSize={10} color={colors.text_muted} fontWeight="bold">
                            {item.wear}
                        </Text>
                        {item.isStatTrak && (
                            <Text fontSize={10} color="#cf6a32" fontWeight="900">
                                ST™
                            </Text>
                        )}
                        {item.isSouvenir && (
                            <Text fontSize={10} color="#ffd700" fontWeight="900">
                                SO
                            </Text>
                        )}
                    </XStack>

                    {/* Ligne 2 : L'image de l'arme */}
                    <YStack alignItems="center" justifyContent="center" height={80}>
                        <Image
                            source={{ uri: skin.image }}
                            style={{ width: '90%', height: '90%', resizeMode: 'contain' }}
                        />
                    </YStack>

                    {/* Ligne 3 : Nom de l'arme */}
                    <YStack gap={2}>
                        <Text fontSize={10} color={colors.text_muted} numberOfLines={1}>
                            {weaponType}
                        </Text>
                        <Text fontSize={13} color={colors.text} fontWeight="bold" numberOfLines={1}>
                            {skinPattern}
                        </Text>
                    </YStack>

                    {/* Ligne 4 : Prix et Float */}
                    <XStack justifyContent="space-between" alignItems="center" marginTop={4}>
                        <Text fontSize={14} color={colors.success} fontWeight="900">
                            {item.price?.toFixed(2)} $
                        </Text>
                        <Text fontSize={10} color={colors.text_muted}>
                            {item.float_value?.toFixed(3)}
                        </Text>
                    </XStack>
                </YStack>
            </YStack>
            <SheetInventory open={open} setOpen={setOpen} toggleSelection={toggleSelection} id={item.id} />
        </>
    );
}