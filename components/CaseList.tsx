import { CASES } from "@/constants/case";
import Colors from "@/constants/Colors";
import { StyleSheet, Text, View } from "react-native";
import CaseView from "./Case";
const CaseList = () => {
    const basiqueCases = CASES.filter((c) => c.type === 'basique');
    const souvenirCases = CASES.filter((c) => c.type === 'souvenir');
    const stickerCases = CASES.filter((c) => c.type === 'sticker');
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Caisses Basiques</Text>
            <View style={styles.caseContainer}>
                {basiqueCases.map((c) => (
                    <CaseView key={c.id} caseItem={c} />
                ))}
            </View>
            <Text style={styles.title}>Caisses Souvenirs</Text>
            <View style={styles.caseContainer}>
                {souvenirCases.map((c) => (
                    <CaseView key={c.id} caseItem={c} />
                ))}
            </View>
            <Text style={styles.title}>Caisses de Stickers</Text>
            <View style={styles.caseContainer}>
                {stickerCases.map((c) => (
                    <CaseView key={c.id} caseItem={c} />

                ))}
            </View>

        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: '80%',
        marginTop: 20,

    },
    title: {
        fontSize: 20,
        color: Colors.light.text,
        textDecorationLine: 'underline',
        textDecorationColor: Colors.light.tabIconSelected,
        marginBottom: 10,
    },
    caseContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
    },
});
export default CaseList;