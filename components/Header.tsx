import Colors from '@/constants/Colors';
import { Image, StyleSheet, Text, View } from 'react-native';

const Header = () => {
    return (
        <View style={styles.container}>
            <Image style={styles.logo} source={require('@/assets/images/logo.png')} />
            <Text style={styles.text}>Case Simulator</Text>
        </View>
    );
};
const styles = StyleSheet.create({
    container: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: Colors.light.background,
    },
    logo: {
        width: 40,
        height: 40,
        marginRight: 10,
        marginTop: 40,
        marginBottom: 20,

    },
    text: {
        fontSize: 20,
        color: Colors.light.text,
        marginLeft: 10,
        marginTop: 40,
        marginBottom: 20,
    },
});
export default Header;