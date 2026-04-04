// SearchBar.tsx
import { useDemoStore } from "@/stores/demoStore";
import { getSearchSuggestions } from "@/utils/searchUtils";
import { Search, X } from "lucide-react-native";
import { useEffect, useState } from "react";
import { Keyboard } from "react-native";
// On importe les composants Tamagui
import { useAppTheme } from "@/hooks/useAppTheme";
import { Input, Text, XStack, YStack } from "tamagui";

const SearchBar = () => {
    const { searchQuery, setSearchQuery } = useDemoStore();
    const [localSearchText, setLocalSearchText] = useState(searchQuery);
    const [isFocused, setIsFocused] = useState(false);
    const [suggestions, setSuggestions] = useState<string[]>([]);
    const colors = useAppTheme();

    // Debounce pour optimiser la recherche
    useEffect(() => {
        const timer = setTimeout(() => {
            setSearchQuery(localSearchText);

            // Génère les suggestions
            if (localSearchText.trim().length >= 2) {
                const newSuggestions = getSearchSuggestions(localSearchText);
                setSuggestions(newSuggestions);
            } else {
                setSuggestions([]);
            }
        }, 300);

        return () => clearTimeout(timer);
    }, [localSearchText]);

    const handleClear = () => {
        setLocalSearchText('');
        setSearchQuery('');
        setSuggestions([]);
    };

    const handleSuggestionPress = (suggestion: string) => {
        setLocalSearchText(suggestion);
        setSearchQuery(suggestion);
        setSuggestions([]);
        Keyboard.dismiss();
    };

    return (
        <YStack width="100%" paddingHorizontal={16} marginTop={24} position="relative" zIndex={10}>

            {/* Conteneur principal de la barre de recherche */}
            <XStack
                alignItems="center"
                backgroundColor={isFocused ? colors.background_card : colors.background_elevated}
                borderRadius={14}
                borderWidth={1.5}
                borderColor={isFocused ? colors.tint : colors.border}
                paddingHorizontal={16}
                height={52}
            >
                <Search
                    size={20}
                    color={isFocused ? colors.tint : colors.text_secondary}
                    style={{ marginRight: 12 }}
                />

                <Input
                    flex={1}
                    value={localSearchText}
                    onChangeText={setLocalSearchText}
                    placeholder="Rechercher une caisse ou un skin..."
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => {
                        // Délai pour permettre le clic sur les suggestions
                        setTimeout(() => setIsFocused(false), 200);
                    }}
                    autoCapitalize="none"
                    autoCorrect={false}
                    placeholderTextColor={colors.text_secondary as any}
                    // Styles Tamagui pour écraser l'apparence par défaut de l'Input
                    backgroundColor="transparent"
                    borderWidth={0}
                    color={colors.text}
                    fontSize={15}
                    paddingHorizontal={0}
                    focusStyle={{ borderColor: 'transparent' }}
                />

                {localSearchText.length > 0 && (
                    <YStack
                        padding={4}
                        marginRight={8}
                        onPress={handleClear}
                        pressStyle={{ opacity: 0.5 }}
                    >
                        <X size={16} color={colors.text_secondary} />
                    </YStack>
                )}
            </XStack>

            {/* Suggestions de recherche */}
            {isFocused && suggestions.length > 0 && (
                <YStack
                    marginTop={8}
                    backgroundColor={colors.background_card}
                    borderRadius={12}
                    borderWidth={1}
                    borderColor={colors.border}
                    overflow="hidden"
                    shadowColor="#000"
                    shadowOffset={{ width: 0, height: 4 }}
                    shadowOpacity={0.1}
                    shadowRadius={8}
                    elevation={5}
                >
                    {suggestions.map((suggestion, index) => (
                        <XStack
                            key={index}
                            alignItems="center"
                            paddingHorizontal={16}
                            paddingVertical={12}
                            gap={12}
                            borderBottomWidth={index === suggestions.length - 1 ? 0 : 1} // Pas de bordure sur le dernier
                            borderBottomColor={colors.border}
                            onPress={() => handleSuggestionPress(suggestion)}
                            pressStyle={{ backgroundColor: colors.background_elevated }}
                        >
                            <Search size={16} color={colors.text_muted} />
                            <Text fontSize={14} color={colors.text} flex={1}>
                                {suggestion}
                            </Text>
                        </XStack>
                    ))}
                </YStack>
            )}
        </YStack>
    );
};

export default SearchBar;