import Colors from "@/constants/Colors";
import { Search } from "lucide-react-native";
import { StyleSheet, TextInput, View } from "react-native";

const SearchBar = () => {
    return (
        <View style={styles.container}>
            <Search size={24} color={Colors.light.tint} style={styles.icon} />
            <TextInput
                placeholder="Rechercher"
                underlineColorAndroid={Colors.light.text}
                placeholderTextColor={Colors.light.text_secondary}
                style={styles.input}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: '70%',
        marginTop: 40,
        height: 50,
        borderRadius: 10,
        backgroundColor: Colors.light.tabIconDefault,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    input: {
        height: 50,
        width: '70%',
        color: Colors.light.text,
        fontSize: 16,


    },
    icon: {
        marginLeft: 20,
        marginRight: 10,
    },
});
export default SearchBar;