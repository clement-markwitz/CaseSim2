import { useAppTheme } from "@/hooks/useAppTheme";
import { useUiStore } from "@/stores/uiStore";
import { Tabs } from "expo-router";
import { Home, User } from "lucide-react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Text } from "tamagui";



export default function TabLayout() {
    const colors = useAppTheme();
    const insets = useSafeAreaInsets();
    const { isTabVisible } = useUiStore();

    return (
        <Tabs
            screenOptions={{
                tabBarStyle: {
                    display: isTabVisible ? 'flex' : 'none',
                    // 1. Bien "collée" en bas
                    position: 'absolute',
                    height: 60 + insets.bottom, // S'adapte à la zone sûre (iPhone)
                    backgroundColor: colors.background,
                    borderTopWidth: 1,
                    borderTopColor: colors.border,

                    // Optionnel : Une légère ombre vers le haut pour la détacher du contenu
                    shadowColor: "#000",
                    shadowOffset: { width: 0, height: -2 },
                    shadowOpacity: 0.1,
                    shadowRadius: 4,
                    elevation: 5,
                },
                tabBarActiveTintColor: colors.tint,
                tabBarInactiveTintColor: colors.text_muted,
                // On centre les éléments verticalement
                tabBarItemStyle: {
                    paddingTop: 8,
                    height: 60,
                },
                animation: 'shift',
            }}
        >
            <Tabs.Screen
                name="index"
                options={{
                    headerShown: false,
                    tabBarIcon: ({ color, focused }) => (
                        // 2. Changement de taille dynamique
                        <Home
                            color={color}
                            size={focused ? 30 : 24} // Agrandissement si sélectionné
                            strokeWidth={focused ? 2.5 : 2} // Épaisseur si sélectionné
                        />
                    ),
                    tabBarLabel: ({ focused, color }) => (
                        focused ? (
                            <Text style={{ color, fontSize: 11, fontWeight: '700', marginTop: 2 }}>
                                Accueil
                            </Text>
                        ) : null
                    ),
                }}
            />

            <Tabs.Screen
                name="profileMe"
                options={{
                    headerShown: false,
                    tabBarIcon: ({ color, focused }) => (
                        <User
                            color={color}
                            size={focused ? 30 : 24} // Agrandissement si sélectionné
                            strokeWidth={focused ? 2.5 : 2}
                        />
                    ),
                    tabBarLabel: ({ focused, color }) => (
                        focused ? (
                            <Text style={{ color, fontSize: 11, fontWeight: '700', marginTop: 2 }}>
                                Profil
                            </Text>
                        ) : null
                    ),
                }}
            />
        </Tabs>
    );
}