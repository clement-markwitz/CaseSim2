// Header.tsx
import Colors from '@/constants/Colors';
import { useAuth } from '@/hooks/useAuth';
import { LinearGradient } from 'expo-linear-gradient';
import { Menu } from 'lucide-react-native';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const Header = () => {
    const insets = useSafeAreaInsets();
    const { signOut, isAuthenticated } = useAuth();

    return (
        <View style={[styles.wrapper, { paddingTop: insets.top }]}>
            <LinearGradient
                colors={[Colors.light.background_secondary, 'transparent']}
                style={styles.gradient}
            />
            <View style={styles.container}>
                {/* Menu Button */}
                <TouchableOpacity style={styles.iconButton} onPress={() => signOut()} disabled={!isAuthenticated}>
                    <Menu size={22} color={Colors.light.text_secondary} />
                </TouchableOpacity>

                {/* Logo & Title */}
                <View style={styles.logoContainer}>
                    <View style={styles.logoGlow}>
                        <Image
                            style={styles.logo}
                            source={require('@/assets/images/logo.png')}
                        />
                    </View>
                    <View style={styles.titleContainer}>
                        <Text style={styles.title}>CASE</Text>
                        <Text style={styles.titleAccent}>SIMULATOR</Text>
                    </View>
                </View>


            </View>

            {/* Bottom separator */}
            <LinearGradient
                colors={['transparent', Colors.light.tint, 'transparent']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={styles.separator}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    wrapper: {
        backgroundColor: Colors.light.background,
        position: 'relative',
        width: '100%',
        paddingHorizontal: 20,
    },
    gradient: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: 120,
    },
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
        paddingVertical: 12,
    },
    logoContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
    },
    logoGlow: {
        padding: 2,
        borderRadius: 12,
        backgroundColor: Colors.light.tint_glow,
    },
    logo: {
        width: 36,
        height: 36,
        borderRadius: 10,
    },
    titleContainer: {
        flexDirection: 'row',
        alignItems: 'baseline',
        gap: 4,
    },
    title: {
        fontSize: 18,
        fontWeight: '800',
        color: Colors.light.text,
        letterSpacing: 2,
    },
    titleAccent: {
        fontSize: 18,
        fontWeight: '800',
        color: Colors.light.tint,
        letterSpacing: 2,
    },
    iconButton: {
        width: 40,
        height: 40,
        borderRadius: 12,
        backgroundColor: Colors.light.background_elevated,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: Colors.light.border,
    },
    notificationBadge: {
        position: 'absolute',
        top: -4,
        right: -4,
        backgroundColor: Colors.light.error,
        borderRadius: 10,
        minWidth: 18,
        height: 18,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 2,
        borderColor: Colors.light.background,
    },
    badgeText: {
        fontSize: 10,
        fontWeight: 'bold',
        color: '#fff',
    },
    separator: {
        height: 1,
        opacity: 0.3,
    },
});

export default Header;
