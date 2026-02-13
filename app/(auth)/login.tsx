import Colors from "@/constants/Colors";
import { useAuth } from "@/hooks/useAuth";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useState } from "react";
import {
    ActivityIndicator,
    KeyboardAvoidingView,
    Platform,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const LoginScreen = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [secureTextEntry, setSecureTextEntry] = useState(true);
    const [error, setError] = useState("");
    const { signIn, isLoading } = useAuth();

    const handleLogin = async () => {
        setError("");

        if (!email || !password) {
            setError("Tous les champs sont requis");
            return;
        }

        const { error: authError } = await signIn(email, password);
        if (authError) {
            setError(authError.message || "Erreur de connexion");
            return;
        }
        console.log("Connexion réussie");
        router.push("/");
    };

    return (
        <SafeAreaView style={styles.container}>
            <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                style={styles.keyboardView}
            >
                {/* Header avec icône */}
                <View style={styles.header}>
                    <View style={styles.iconContainer}>
                        <Ionicons name="cube" size={60} color={Colors.light.tint} />
                    </View>
                    <Text style={styles.title}>Case Simulator</Text>
                    <Text style={styles.subtitle}>Connecte-toi pour continuer</Text>
                </View>

                {/* Formulaire */}
                <View style={styles.form}>
                    {/* Message d'erreur */}
                    {error ? (
                        <View style={styles.errorContainer}>
                            <Ionicons name="alert-circle" size={18} color="#ff4757" />
                            <Text style={styles.errorText}>{error}</Text>
                        </View>
                    ) : null}

                    {/* Email */}
                    <View style={styles.inputContainer}>
                        <Ionicons
                            name="mail-outline"
                            size={20}
                            color={Colors.light.text_secondary}
                            style={styles.inputIcon}
                        />
                        <TextInput
                            style={styles.input}
                            placeholder="Email"
                            placeholderTextColor={Colors.light.text_secondary}
                            value={email}
                            onChangeText={setEmail}
                            keyboardType="email-address"
                            autoCapitalize="none"
                            autoComplete="email"
                        />
                    </View>

                    {/* Mot de passe */}
                    <View style={styles.inputContainer}>
                        <Ionicons
                            name="lock-closed-outline"
                            size={20}
                            color={Colors.light.text_secondary}
                            style={styles.inputIcon}
                        />
                        <TextInput
                            style={styles.input}
                            placeholder="Mot de passe"
                            placeholderTextColor={Colors.light.text_secondary}
                            value={password}
                            onChangeText={setPassword}
                            secureTextEntry={secureTextEntry}
                            autoCapitalize="none"
                        />
                        <TouchableOpacity
                            onPress={() => setSecureTextEntry(!secureTextEntry)}
                            style={styles.eyeButton}
                        >
                            <Ionicons
                                name={secureTextEntry ? "eye-outline" : "eye-off-outline"}
                                size={22}
                                color={Colors.light.text_secondary}
                            />
                        </TouchableOpacity>
                    </View>

                    {/* Mot de passe oublié */}
                    <TouchableOpacity style={styles.forgotButton}>
                        <Text style={styles.forgotText}>Mot de passe oublié ?</Text>
                    </TouchableOpacity>

                    {/* Bouton Connexion */}
                    <TouchableOpacity
                        style={[styles.loginButton, isLoading && styles.loginButtonDisabled]}
                        onPress={handleLogin}
                        disabled={isLoading}
                        activeOpacity={0.8}
                    >
                        {isLoading ? (
                            <ActivityIndicator color="#fff" size="small" />
                        ) : (
                            <>
                                <Text style={styles.loginButtonText}>Se connecter</Text>
                                <Ionicons name="arrow-forward" size={20} color="#fff" />
                            </>
                        )}
                    </TouchableOpacity>
                </View>

                {/* Footer - Inscription */}
                <View style={styles.footer}>
                    <Text style={styles.footerText}>Pas encore de compte ?</Text>
                    <TouchableOpacity>
                        <Text style={styles.signupText}> Créer un compte</Text>
                    </TouchableOpacity>
                </View>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.light.background,
    },
    keyboardView: {
        flex: 1,
        justifyContent: "center",
        paddingHorizontal: 24,
    },

    // Header
    header: {
        alignItems: "center",
        marginBottom: 40,
    },
    iconContainer: {
        width: 100,
        height: 100,
        borderRadius: 30,
        backgroundColor: Colors.light.background_card,
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 20,
        borderWidth: 2,
        borderColor: Colors.light.tint + '40',
    },
    title: {
        fontSize: 32,
        fontWeight: "bold",
        color: Colors.light.text,
        marginBottom: 8,
    },
    subtitle: {
        fontSize: 16,
        color: Colors.light.text_secondary,
    },

    // Form
    form: {
        width: "100%",
    },
    errorContainer: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#ff475720",
        paddingHorizontal: 16,
        paddingVertical: 12,
        borderRadius: 12,
        marginBottom: 16,
        borderWidth: 1,
        borderColor: "#ff475750",
    },
    errorText: {
        color: "#ff4757",
        marginLeft: 8,
        fontSize: 14,
    },
    inputContainer: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: Colors.light.background_card,
        borderRadius: 16,
        marginBottom: 16,
        borderWidth: 1,
        borderColor: Colors.light.background_card,
    },
    inputIcon: {
        paddingLeft: 16,
    },
    input: {
        flex: 1,
        paddingVertical: 16,
        paddingHorizontal: 12,
        fontSize: 16,
        color: Colors.light.text,
    },
    eyeButton: {
        padding: 16,
    },
    forgotButton: {
        alignSelf: "flex-end",
        marginBottom: 24,
    },
    forgotText: {
        color: Colors.light.tint,
        fontSize: 14,
    },

    // Login Button
    loginButton: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: Colors.light.tint,
        paddingVertical: 16,
        borderRadius: 16,
        gap: 8,
    },
    loginButtonDisabled: {
        opacity: 0.7,
    },
    loginButtonText: {
        color: "#fff",
        fontSize: 18,
        fontWeight: "bold",
    },

    // Footer
    footer: {
        flexDirection: "row",
        justifyContent: "center",
        marginTop: 32,
    },
    footerText: {
        color: Colors.light.text_secondary,
        fontSize: 14,
    },
    signupText: {
        color: Colors.light.tint,
        fontSize: 14,
        fontWeight: "600",
    },
});

export default LoginScreen;
