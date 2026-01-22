
import { useRouter } from "expo-router";
import { Image, StyleSheet, Text, TouchableOpacity } from "react-native";
import { Case } from "../constants/case";
import Colors from "../constants/Colors";

const CaseView = ({ caseItem }: { caseItem: Case }) => {
    const router = useRouter();
    console.log(caseItem.id);
    return (
        <TouchableOpacity style={styles.container} onPress={() => {
            router.push({
                pathname: '/(public)/case/[id]', // Le chemin vers ton fichier
                params: { id: caseItem.id }      // L'ID à envoyer
            });
        }}>
            <Image source={{ uri: caseItem.image }} style={styles.image} />
            <Text style={styles.name}>{caseItem.name}</Text>
            <Text style={styles.price}>{caseItem.price} $</Text>
        </TouchableOpacity>
    );
};
export default CaseView;
const styles = StyleSheet.create({
    container: {
        width: 148,
        height: 213,
        alignItems: 'center',
        justifyContent: 'flex-start',
        borderTopWidth: 3,
        borderBottomWidth: 3,
        borderTopColor: Colors.light.tabIconDefault,
        borderBottomColor: Colors.light.tabIconDefault,
    },
    image: {
        width: 90,
        height: 60,
        marginTop: 40,
    },
    name: {
        fontSize: 16,
        fontWeight: 'bold',
        color: Colors.light.text,
        marginTop: 15,
    },
    price: {
        marginTop: 15,
        fontSize: 16,
        fontWeight: 'bold',
        color: Colors.light.text,
        backgroundColor: Colors.light.tabIconDefault,
        paddingVertical: 5,
        paddingHorizontal: 20,
        borderRadius: 5,
    },
});