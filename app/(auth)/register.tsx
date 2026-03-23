import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useEffect, useState } from "react";
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
import Colors from "../../constants/Colors";
import { useAuth } from "../../hooks/useAuth";

const RegisterScreen = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [username, setUsername] = useState("");
    const [secureTextEntry, setSecureTextEntry] = useState(true);
    const [secureTextEntryComfirm, setSecureTextEntryComfirm] = useState(true);
    const [error, setError] = useState("");
    const [passwordWarning, setPasswordWarning] = useState("");
    const [disabled, setDisabled] = useState(true);
    const { signUp, isLoading } = useAuth();

    const handleRegister = async () => {
        setError("");

        if (!email || !password || !confirmPassword || !username) {
            setError("Tous les champs sont requis");
            return;
        }
        if (password !== confirmPassword) {
            setError("Les mots de passe ne correspondent pas");
            return;
        }

        const { error: authError } = await signUp(email, password, username);
        if (authError) {
            setError(authError.message);
            return;
        }
        console.log("Connexion réussie");
        router.replace("/(auth)/InformationAccount");
    };

    useEffect(() => {
        if (passwordWarning.length > 0 || (confirmPassword !== password) || (!email || !password || !confirmPassword || !username) || isLoading) {
            setDisabled(true);
        } else {
            setDisabled(false);
        }
    }, [passwordWarning, confirmPassword, email, password, username, isLoading]);
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
                    {/* Username */}
                    <View style={styles.inputContainer}>
                        <Ionicons
                            name="person-outline"
                            size={20}
                            color={Colors.light.text_secondary}
                            style={styles.inputIcon}
                        />
                        <TextInput
                            style={styles.input}
                            placeholder="Nom d'utilisateur"
                            placeholderTextColor={Colors.light.text_secondary}
                            value={username}
                            onChangeText={setUsername}
                            autoCapitalize="none"
                            autoComplete="username"
                        />
                    </View>
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
                            onChangeText={(text) => {
                                setPassword(text);
                                if (text.length < 8) {
                                    setPasswordWarning("Le mot de passe doit contenir au moins 8 caractères");
                                } else if (!text.match(/[A-Z]/)) {
                                    setPasswordWarning("Le mot de passe doit contenir au moins une majuscule");
                                } else if (!text.match(/[0-9]/)) {
                                    setPasswordWarning("Le mot de passe doit contenir au moins un chiffre");
                                } else if (!text.match(/[^A-Za-z0-9]/)) {
                                    setPasswordWarning("Le mot de passe doit contenir au moins un caractère spécial");
                                } else {
                                    setPasswordWarning("");
                                    if (confirmPassword.length > 0) {
                                        if (confirmPassword !== text) {
                                            setPasswordWarning("Les mots de passe ne correspondent pas");
                                        } else {
                                            setPasswordWarning("");
                                        }
                                    }
                                }

                            }}
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
                    {passwordWarning ? (
                        <View style={styles.warningContainer}>
                            <Ionicons name="alert-circle" size={18} color={"#eb9f3b"} />
                            <Text style={styles.warningText}>{passwordWarning}</Text>
                        </View>
                    ) : null}
                    {/* Confirm Password */}
                    <View style={styles.inputContainer}>
                        <Ionicons
                            name="lock-closed-outline"
                            size={20}
                            color={Colors.light.text_secondary}
                            style={styles.inputIcon}
                        />
                        <TextInput
                            style={styles.input}
                            placeholder="Confirmer le mot de passe"
                            placeholderTextColor={Colors.light.text_secondary}
                            value={confirmPassword}
                            onChangeText={(text) => {
                                setConfirmPassword(text);
                                if (text.length > 0) {
                                    if (password !== text) {
                                        setPasswordWarning("Les mots de passe ne correspondent pas");
                                    } else {
                                        setPasswordWarning("");
                                    }
                                }
                                else {
                                    setPasswordWarning("");
                                }
                            }}
                            secureTextEntry={secureTextEntryComfirm}
                            autoCapitalize="none"
                        />
                        <TouchableOpacity
                            onPress={() => setSecureTextEntryComfirm(!secureTextEntryComfirm)}
                            style={styles.eyeButton}
                        >
                            <Ionicons
                                name={secureTextEntryComfirm ? "eye-outline" : "eye-off-outline"}
                                size={22}
                                color={Colors.light.text_secondary}
                            />
                        </TouchableOpacity>
                    </View>
                    {/* Bouton Register */}
                    <TouchableOpacity
                        style={disabled ? [styles.registerButton, styles.registerButtonDisabled] : styles.registerButton}
                        onPress={handleRegister}
                        disabled={disabled}
                        activeOpacity={0.8}
                    >
                        {isLoading ? (
                            <ActivityIndicator color="#fff" size="small" />
                        ) : (
                            <>
                                <Text style={styles.registerButtonText}>S'inscrire</Text>
                                <Ionicons name="arrow-forward" size={20} color="black" />
                            </>
                        )}
                    </TouchableOpacity>
                </View>

                {/* Footer - Inscription */}
                <View style={styles.footer}>
                    <Text style={styles.footerText}>Vous avez déjà un compte ?</Text>
                    <TouchableOpacity onPress={() => router.push("/login")}>
                        <Text style={styles.signupText}> Se connecter</Text>
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
    warningContainer: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#4b2a00ff",
        paddingHorizontal: 16,
        paddingVertical: 12,
        borderRadius: 12,
        marginBottom: 16,
        borderWidth: 1,
        borderColor: "#eb9f3b",
    },
    errorText: {
        color: "#ff4757",
        marginLeft: 8,
        fontSize: 14,
    },
    warningText: {
        color: "#eb9f3b",
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

    // register Button
    registerButton: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: Colors.light.tint,
        paddingVertical: 16,
        borderRadius: 16,
        gap: 8,
    },
    registerButtonDisabled: {
        opacity: 0.7,
    },
    registerButtonText: {
        color: "black",
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

export default RegisterScreen;