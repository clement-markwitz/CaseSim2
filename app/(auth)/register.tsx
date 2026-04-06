// RegisterScreen.tsx
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import { KeyboardAvoidingView, Platform } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAppTheme } from "../../hooks/useAppTheme";
import { useAuth } from "../../hooks/useAuth";

// Importation de Tamagui
import { Input, Spinner, Text, XStack, YStack } from "tamagui";

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
    const colors = useAppTheme();
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
        <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
            <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                style={{ flex: 1, justifyContent: "center", paddingHorizontal: 24 }}
            >
                {/* Header avec icône */}
                <YStack alignItems="center" marginBottom={40}>
                    <YStack
                        width={100}
                        height={100}
                        borderRadius={30}
                        backgroundColor={colors.background_card}
                        justifyContent="center"
                        alignItems="center"
                        marginBottom={20}
                        borderWidth={2}
                        borderColor={colors.tint + '40'}
                    >
                        <Ionicons name="cube" size={60} color={colors.tint} />
                    </YStack>
                    <Text fontSize={32} fontWeight="bold" color={colors.text} marginBottom={8}>
                        Case Simulator
                    </Text>
                    <Text fontSize={16} color={colors.text_secondary}>
                        Crée ton compte pour commencer
                    </Text>
                </YStack>

                {/* Formulaire (YStack avec gap=16 gère l'espacement) */}
                <YStack width="100%" gap={16}>

                    {/* Message d'erreur */}
                    {error ? (
                        <XStack
                            alignItems="center"
                            backgroundColor="#ff475720"
                            paddingHorizontal={16}
                            paddingVertical={12}
                            borderRadius={12}
                            borderWidth={1}
                            borderColor="#ff475750"
                        >
                            <Ionicons name="alert-circle" size={18} color="#ff4757" />
                            <Text color="#ff4757" marginLeft={8} fontSize={14}>
                                {error}
                            </Text>
                        </XStack>
                    ) : null}

                    {/* Username */}
                    <XStack
                        alignItems="center"
                        backgroundColor={colors.background_card}
                        borderRadius={16}
                        borderWidth={1}
                        borderColor={colors.background_card}
                        paddingLeft={16}
                    >
                        <Ionicons name="person-outline" size={20} color={colors.text_secondary} />
                        <Input
                            flex={1}
                            backgroundColor="transparent"
                            borderWidth={0}
                            color={colors.text}
                            fontSize={16}
                            height={55}
                            paddingVertical={10}
                            paddingHorizontal={12}
                            placeholder="Nom d'utilisateur"
                            placeholderTextColor={colors.text_secondary as any}
                            value={username}
                            onChangeText={setUsername}
                            autoCapitalize="none"
                            autoComplete="username"
                            focusStyle={{ borderColor: 'transparent' }}
                        />
                    </XStack>

                    {/* Email */}
                    <XStack
                        alignItems="center"
                        backgroundColor={colors.background_card}
                        borderRadius={16}
                        borderWidth={1}
                        borderColor={colors.background_card}
                        paddingLeft={16}
                    >
                        <Ionicons name="mail-outline" size={20} color={colors.text_secondary} />
                        <Input
                            flex={1}
                            backgroundColor="transparent"
                            borderWidth={0}
                            color={colors.text}
                            fontSize={16}
                            height={55}
                            paddingVertical={10}
                            paddingHorizontal={12}
                            placeholder="Email"
                            placeholderTextColor={colors.text_secondary as any}
                            value={email}
                            onChangeText={setEmail}
                            keyboardType="email-address"
                            autoCapitalize="none"
                            autoComplete="email"
                            focusStyle={{ borderColor: 'transparent' }}
                        />
                    </XStack>

                    {/* Mot de passe */}
                    <XStack
                        alignItems="center"
                        backgroundColor={colors.background_card}
                        borderRadius={16}
                        borderWidth={1}
                        borderColor={colors.background_card}
                        paddingLeft={16}
                    >
                        <Ionicons name="lock-closed-outline" size={20} color={colors.text_secondary} />
                        <Input
                            flex={1}
                            backgroundColor="transparent"
                            borderWidth={0}
                            color={colors.text}
                            fontSize={16}
                            height={55}
                            paddingVertical={10}
                            paddingHorizontal={12}
                            placeholder="Mot de passe"
                            placeholderTextColor={colors.text_secondary as any}
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
                            focusStyle={{ borderColor: 'transparent' }}
                        />
                        <YStack padding={16} onPress={() => setSecureTextEntry(!secureTextEntry)}>
                            <Ionicons
                                name={secureTextEntry ? "eye-outline" : "eye-off-outline"}
                                size={22}
                                color={colors.text_secondary}
                            />
                        </YStack>
                    </XStack>

                    {/* Warning Mot de passe */}
                    {passwordWarning ? (
                        <XStack
                            alignItems="center"
                            backgroundColor="#4b2a00ff"
                            paddingHorizontal={16}
                            paddingVertical={12}
                            borderRadius={12}
                            borderWidth={1}
                            borderColor="#eb9f3b"
                        >
                            <Ionicons name="alert-circle" size={18} color="#eb9f3b" />
                            <Text color="#eb9f3b" marginLeft={8} fontSize={14}>
                                {passwordWarning}
                            </Text>
                        </XStack>
                    ) : null}

                    {/* Confirm Password */}
                    <XStack
                        alignItems="center"
                        backgroundColor={colors.background_card}
                        borderRadius={16}
                        borderWidth={1}
                        borderColor={colors.background_card}
                        paddingLeft={16}
                    >
                        <Ionicons name="lock-closed-outline" size={20} color={colors.text_secondary} />
                        <Input
                            flex={1}
                            backgroundColor="transparent"
                            borderWidth={0}
                            color={colors.text}
                            fontSize={16}
                            paddingVertical={10}
                            paddingHorizontal={12}
                            placeholder="Confirmer le mot de passe"
                            placeholderTextColor={colors.text_secondary as any}
                            value={confirmPassword}
                            onChangeText={(text) => {
                                setConfirmPassword(text);
                                if (text.length > 0) {
                                    if (password !== text) {
                                        setPasswordWarning("Les mots de passe ne correspondent pas");
                                    } else {
                                        setPasswordWarning("");
                                    }
                                } else {
                                    setPasswordWarning("");
                                }
                            }}
                            secureTextEntry={secureTextEntryComfirm}
                            autoCapitalize="none"
                            focusStyle={{ borderColor: 'transparent' }}
                        />
                        <YStack padding={16} onPress={() => setSecureTextEntryComfirm(!secureTextEntryComfirm)}>
                            <Ionicons
                                name={secureTextEntryComfirm ? "eye-outline" : "eye-off-outline"}
                                size={22}
                                color={colors.text_secondary}
                            />
                        </YStack>
                    </XStack>

                    {/* Bouton S'inscrire */}
                    <XStack
                        alignItems="center"
                        justifyContent="center"
                        backgroundColor={colors.tint}
                        paddingVertical={16}
                        borderRadius={16}
                        gap={8}
                        opacity={disabled ? 0.7 : 1}
                        disabled={disabled}
                        onPress={handleRegister}
                        pressStyle={{ scale: disabled ? 1 : 0.97, opacity: disabled ? 0.7 : 0.8 }}
                    >
                        {isLoading ? (
                            <Spinner color="#fff" />
                        ) : (
                            <>
                                <Text color="black" fontSize={18} fontWeight="bold">
                                    S'inscrire
                                </Text>
                                <Ionicons name="arrow-forward" size={20} color="black" />
                            </>
                        )}
                    </XStack>
                </YStack>

                {/* Footer - Connexion */}
                <XStack justifyContent="center" marginTop={32} gap={4}>
                    <Text color={colors.text_secondary} fontSize={14}>
                        Vous avez déjà un compte ?
                    </Text>
                    <Text
                        color={colors.tint}
                        fontSize={14}
                        fontWeight="600"
                        onPress={() => router.push("/login")}
                        pressStyle={{ opacity: 0.5 }}
                    >
                        Se connecter
                    </Text>
                </XStack>

            </KeyboardAvoidingView>
        </SafeAreaView>
    );
};

export default RegisterScreen;