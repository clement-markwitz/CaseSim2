import Colors from "@/constants/Colors";
import { useDemoStore } from "@/stores/demoStore";
import { getSearchSuggestions } from "@/utils/searchUtils";
import { Search, X } from "lucide-react-native";
import { useEffect, useState } from "react";
import { Keyboard, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";

const SearchBar = () => {
    const { searchQuery, setSearchQuery } = useDemoStore();
    const [localSearchText, setLocalSearchText] = useState(searchQuery);
    const [isFocused, setIsFocused] = useState(false);
    const [suggestions, setSuggestions] = useState<string[]>([]);

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
        <View style={styles.wrapper}>
            <View style={[
                styles.container,
                isFocused && styles.containerFocused
            ]}>
                <Search
                    size={20}
                    color={isFocused ? Colors.light.tint : Colors.light.text_secondary}
                    style={styles.searchIcon}
                />

                <TextInput
                    value={localSearchText}
                    onChangeText={setLocalSearchText}
                    placeholder="Rechercher une caisse ou un skin..."
                    placeholderTextColor={Colors.light.text_muted}
                    style={styles.input}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => {
                        // Délai pour permettre le clic sur les suggestions
                        setTimeout(() => setIsFocused(false), 200);
                    }}
                    autoCapitalize="none"
                    autoCorrect={false}
                />

                {localSearchText.length > 0 && (
                    <TouchableOpacity
                        style={styles.clearButton}
                        onPress={handleClear}
                    >
                        <X size={16} color={Colors.light.text_secondary} />
                    </TouchableOpacity>
                )}


            </View>

            {/* Suggestions de recherche */}
            {isFocused && suggestions.length > 0 && (
                <View style={styles.suggestionsContainer}>
                    {suggestions.map((suggestion, index) => (
                        <TouchableOpacity
                            key={index}
                            style={styles.suggestionItem}
                            onPress={() => handleSuggestionPress(suggestion)}
                        >
                            <Search size={16} color={Colors.light.text_muted} />
                            <Text style={styles.suggestionText}>{suggestion}</Text>
                        </TouchableOpacity>
                    ))}
                </View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    wrapper: {
        width: '100%',
        paddingHorizontal: 16,
        marginTop: 24,
        position: 'relative',
        zIndex: 10,
    },
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: Colors.light.background_elevated,
        borderRadius: 14,
        borderWidth: 1.5,
        borderColor: Colors.light.border,
        paddingHorizontal: 16,
        height: 52,
    },
    containerFocused: {
        borderColor: Colors.light.tint,
        backgroundColor: Colors.light.background_card,
    },
    searchIcon: {
        marginRight: 12,
    },
    input: {
        flex: 1,
        fontSize: 15,
        color: Colors.light.text,
    },
    clearButton: {
        padding: 4,
        marginRight: 8,
    },
    divider: {
        width: 1,
        height: 24,
        backgroundColor: Colors.light.border,
        marginHorizontal: 12,
    },
    filterButton: {
        padding: 4,
    },
    // Suggestions
    suggestionsContainer: {
        marginTop: 8,
        backgroundColor: Colors.light.background_card,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: Colors.light.border,
        overflow: 'hidden',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 5,
    },
    suggestionItem: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 16,
        paddingVertical: 12,
        gap: 12,
        borderBottomWidth: 1,
        borderBottomColor: Colors.light.border,
    },
    suggestionText: {
        fontSize: 14,
        color: Colors.light.text,
        flex: 1,
    },
});

export default SearchBar;
