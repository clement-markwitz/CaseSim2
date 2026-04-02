// LoginScreen.tsx

import { useAuth } from "@/hooks/useAuth";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useState } from "react";
import { KeyboardAvoidingView, Platform } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
// Importation de tous les composants UI depuis Tamagui
import { useAppTheme } from "@/hooks/useAppTheme";
import { Input, Spinner, Text, XStack, YStack } from "tamagui";
const LoginScreen = () => {
    const colors = useAppTheme();
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
        router.replace("/");
    };

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
                        Connecte-toi pour continuer
                    </Text>
                </YStack>

                {/* Formulaire (YStack avec gap gère l'espacement entre chaque champ !) */}
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
                            height={55}
                            borderColor="#ff475750"
                        >
                            <Ionicons name="alert-circle" size={18} color="#ff4757" />
                            <Text color="#ff4757" marginLeft={8} fontSize={14}>
                                {error}
                            </Text>
                        </XStack>
                    ) : null}

                    {/* Email */}
                    <XStack
                        alignItems="center"
                        backgroundColor={colors.background_card}
                        height={55}
                        borderRadius={16}
                        borderWidth={1}
                        borderColor={colors.background_card}
                        paddingLeft={16}
                    >
                        <Ionicons name="mail-outline" size={20} color={colors.text_secondary} />
                        <Input
                            flex={1}
                            backgroundColor="transparent"
                            borderWidth={0} // On enlève la bordure par défaut de Tamagui
                            color={colors.text}
                            fontSize={16}
                            paddingVertical={10}
                            paddingHorizontal={12}
                            placeholder="Email"
                            placeholderTextColor={colors.text_secondary as any}
                            value={email}
                            onChangeText={setEmail}
                            keyboardType="email-address"
                            autoCapitalize="none"
                            focusStyle={{ borderColor: 'transparent' }} // Évite l'effet focus web
                        />
                    </XStack>

                    {/* Mot de passe */}
                    <XStack
                        alignItems="center"
                        backgroundColor={colors.background_card}
                        borderRadius={16}
                        borderWidth={1}
                        height={55}
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
                            placeholder="Mot de passe"
                            placeholderTextColor={colors.text_secondary as any}
                            value={password}
                            onChangeText={setPassword}
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

                    {/* Mot de passe oublié (Texte cliquable) */}
                    <Text
                        color={colors.tint}
                        fontSize={14}
                        alignSelf="flex-end"
                        marginBottom={8}
                        onPress={() => console.log('Mot de passe oublié')}
                        pressStyle={{ opacity: 0.5 }}
                    >
                        Mot de passe oublié ?
                    </Text>

                    {/* Bouton Connexion */}
                    <XStack
                        alignItems="center"
                        justifyContent="center"
                        backgroundColor={colors.tint}
                        paddingVertical={16}
                        borderRadius={16}
                        gap={8}
                        height={55}
                        opacity={isLoading ? 0.7 : 1}
                        disabled={isLoading}
                        onPress={handleLogin}
                        pressStyle={{ scale: 0.97, opacity: 0.8 }}
                    >
                        {isLoading ? (
                            <Spinner color="#fff" />
                        ) : (
                            <>
                                <Text color="black" fontSize={18} fontWeight="bold">
                                    Se connecter
                                </Text>
                                <Ionicons name="arrow-forward" size={20} color="black" />
                            </>
                        )}
                    </XStack>
                </YStack>

                {/* Footer - Inscription */}
                <XStack justifyContent="center" marginTop={32} gap={4}>
                    <Text color={colors.text_secondary} fontSize={14}>
                        Pas encore de compte ?
                    </Text>
                    <Text
                        color={colors.tint}
                        fontSize={14}
                        fontWeight="600"
                        onPress={() => router.push("/register")}
                        pressStyle={{ opacity: 0.5 }}
                    >
                        Créer un compte
                    </Text>
                </XStack>

            </KeyboardAvoidingView>
        </SafeAreaView>
    );
};

export default LoginScreen;