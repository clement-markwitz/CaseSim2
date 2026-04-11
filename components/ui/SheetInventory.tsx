import { useAppTheme } from '@/hooks/useAppTheme';
import { Archive, Banknote, Rocket, X } from 'lucide-react-native';
import { Button, Sheet, Text, XStack, YStack } from 'tamagui';
interface SheetInventoryProps {
    open: boolean;
    setOpen: (open: boolean) => void;
    id: number;
    toggleSelection: (id: number) => void;
}
export default function SheetInventory({ open, setOpen, id, toggleSelection }: SheetInventoryProps) {

    const colors = useAppTheme();
    const sellItem = () => {
        toggleSelection(id);
        setOpen(false);
    }
    return (
        <>

            <Sheet
                modal
                open={open}
                onOpenChange={setOpen}
                snapPoints={[38]} // Hauteur du tiroir (~38% de l'écran)
                dismissOnSnapToBottom
                transition={{ type: "spring", damping: 20, stiffness: 100 }} // Animation fluide Tamagui
                zIndex={100000}
            >
                {/* Le fond assombri derrière le menu */}
                <Sheet.Overlay
                    transition={{ type: "spring", damping: 20, stiffness: 100 }}
                    enterStyle={{ opacity: 0 }}
                    exitStyle={{ opacity: 0 }}
                    backgroundColor="rgba(0,0,0,0.6)"
                />

                {/* La petite barre pour glisser le doigt */}
                <Sheet.Handle backgroundColor={colors.border} height={5} />

                {/* Le conteneur principal */}
                <Sheet.Frame
                    padding="$4"
                    backgroundColor={colors.background_card}
                    borderTopLeftRadius={24}
                    borderTopRightRadius={24}
                >
                    <YStack gap="$3">

                        {/* --- EN-TÊTE --- */}
                        <XStack justifyContent="space-between" alignItems="center" marginBottom="$2">
                            <Text fontWeight="bold" fontSize={18} color={colors.text}>
                                Actions
                            </Text>
                            <Button
                                size="$3"
                                circular
                                icon={<X size={20} color={colors.text_muted} />}
                                backgroundColor="transparent"
                                onPress={() => setOpen(false)}
                            />
                        </XStack>

                        {/* --- BOUTON 1 : BOOSTER (Premium) --- */}
                        <Button
                            size="$4"
                            backgroundColor={colors.tint}
                            icon={<Rocket size={20} color="black" />}
                            borderRadius={12}
                            pressStyle={{ opacity: 0.8, scale: 0.98 }} // Petit effet de clic
                        >
                            <Text color="black" fontWeight="bold">Activer le Boost (+20%)</Text>
                        </Button>

                        {/* --- BOUTON 2 : COLLECTION (Neutre) --- */}
                        <Button
                            size="$4"
                            backgroundColor={colors.background_elevated}

                            icon={<Archive size={20} color={colors.text} />}
                            borderRadius={12}
                            borderWidth={1}
                            borderColor={colors.border}
                            pressStyle={{ opacity: 0.8, scale: 0.98 }}
                        >
                            <Text color={colors.text} fontWeight="600">Ajouter à la collection</Text>
                        </Button>

                        {/* --- BOUTON 3 : VENDRE (Destructif) --- */}
                        <Button
                            size="$4"
                            backgroundColor="$red8" // Rouge standard de Tamagui
                            icon={<Banknote size={20} color="white" />}
                            borderRadius={12}
                            onPress={sellItem}
                            pressStyle={{ opacity: 0.8, scale: 0.98 }}
                        >
                            <Text color="white" fontWeight="600">Vendre l'arme</Text>
                        </Button>

                    </YStack>
                </Sheet.Frame>
            </Sheet>
        </>
    );
}