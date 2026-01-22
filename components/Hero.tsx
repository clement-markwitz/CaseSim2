import Colors from '@/constants/Colors';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
const Hero = () => {
    return (
        <View style={styles.heroContainer}>
            <View style={styles.textContainer}>
                <Text style={styles.text}>simulateur de caisse CS2</Text>
                <View style={styles.imageContainer}>
                    <Text style={styles.description}>Bienvenue sur votre simulateur de caisses CS2. Ici, testez votre chance en illimité et simulez les drops les plus prestigieux du jeu.</Text>

                </View>

            </View>
            <View style={styles.authContainer}>
                <Text style={styles.authText}>Pour toutes les fonctionnalités : </Text>
                <TouchableOpacity style={styles.authButton} onPress={() => { }}>
                    <Text style={styles.buttonText}>Se connecter</Text>
                </TouchableOpacity>
                <Text style={styles.authText}>ou</Text>
                <TouchableOpacity style={styles.authButton} onPress={() => { }}>
                    <Text style={styles.buttonText}>S'inscrire</Text>
                </TouchableOpacity>
            </View>

        </View>
    );
};

const styles = StyleSheet.create({
    heroContainer: {
        width: '90%',
        marginTop: 30,
        alignItems: 'center',

    },
    textContainer: {
        width: '100%',
        marginBottom: 20,
    },

    imageContainer: {
        width: '100%',
        borderRadius: 10,
        overflow: 'hidden',
        paddingTop: 15,
        paddingBottom: 15,
        backgroundColor: Colors.light.tabIconDefault,
        display: 'flex',
        gap: 10,
    },
    buttonText: {
        color: '#000000',
        fontSize: 15,
    },
    text: {
        fontSize: 25,
        textAlign: 'center',
        color: Colors.light.text,

        marginBottom: 20,
    },
    description: {
        fontSize: 20,
        color: Colors.light.text_secondary,
        marginLeft: 20,
        marginRight: 20,
    },
    authContainer: {
        width: '100%',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
    },
    authText: {
        fontSize: 20,
        marginTop: 10,
        marginBottom: 15,
        textAlign: 'center',
        color: Colors.light.text,

    },
    authButton: {
        backgroundColor: Colors.light.tabIconSelected,
        padding: 10,
        borderRadius: 5,
        width: 200,
        alignItems: 'center',
    },
});
export default Hero;
