import { Leaderboard, ProfileLeaderboard } from "@/constants/leaderboard";
import { useAppTheme } from "@/hooks/useAppTheme";
import { useAuth } from "@/hooks/useAuth";
import { useLeaderboard } from "@/hooks/useLeaderboard";
import { LinearGradient } from "expo-linear-gradient";
import * as SplashScreen from 'expo-splash-screen';
import { CalendarX2, Gift, Medal, Trophy, Wallet } from "lucide-react-native";
import React, { useEffect, useMemo } from "react";
import { FlatList } from 'react-native';
import { Avatar, Separator, Tabs, Text, View, XStack, YStack } from "tamagui";

// --- 1. Fonction de formatage (Corrigée pour ne pas casser le cache) ---
const convertProfileLeaderboard = (leaderboard: Leaderboard): ProfileLeaderboard[] => {
  // CORRECTION : On utilise [...] pour créer une copie avant de trier !
  const profiles = [...leaderboard.profiles].sort((a, b) => b.score - a.score);
  const rewards = [...leaderboard.rewards].sort((a, b) => a.rank_start - b.rank_start);

  const getReward = (rank: number) => {
    const reward = rewards.find((reward) => reward.rank_start <= rank && reward.rank_end >= rank);
    if (reward) {
      return reward.price + "$";
    }
    return null;
  };

  return profiles.map((player, index) => {
    return {
      ...player,
      rank: index + 1,
      reward: getReward(index + 1),
    };
  });
};

// --- 2. Composant de la ligne d'un joueur ---
const PlayerRow = ({ player, index, isCurrentUser }: { player: any; index: number; isCurrentUser: boolean }) => {
  const colors = useAppTheme();
  const isTop1 = player.rank === 1;
  const isTop2 = player.rank === 2;
  const isTop3 = player.rank === 3;

  // Couleurs selon le rang
  const rankColor = isTop1 ? "#FFD700" : isTop2 ? "#C0C0C0" : isTop3 ? "#CD7F32" : "$text_muted";

  return (
    <XStack
      transition={{ type: "spring", duration: 300, delay: index * 100 }}
      enterStyle={{ opacity: 0, y: 20 }}
      animationDelay={index * 100}
      backgroundColor={isCurrentUser ? colors.background_elevated : colors.background_secondary}
      borderColor={isCurrentUser ? colors.tint : "transparent"}
      borderWidth={1}
      padding="$3"
      borderRadius="$4"
      marginBottom="$2"
      alignItems="center"
      justifyContent="space-between"
    >
      {/* GAUCHE : Rang + Profil */}
      <XStack alignItems="center" gap="$3">
        {/* Affichage du Rang */}
        <View width={30} alignItems="center">
          {isTop1 ? <Trophy color={rankColor} size={24} /> :
            isTop2 || isTop3 ? <Medal color={rankColor} size={24} /> :
              <Text fontSize={18} fontWeight="bold" color={colors.text_muted}>{player.rank}</Text>}
        </View>

        {/* Avatar */}
        <Avatar circular size="$4">
          <Avatar.Image src={player.avatar} />
          <Avatar.Fallback
            backgroundColor={colors.background_elevated}
            alignItems="center"
            justifyContent="center"
            borderRadius={100}
          >
            <Text color={colors.text_muted} fontSize={16} fontWeight="bold">
              {player.username?.charAt(0).toUpperCase() || '?'}
            </Text>
          </Avatar.Fallback>
        </Avatar>

        {/* Pseudo & Solde */}
        <YStack>
          <Text fontWeight="bold" fontSize={16} color={isTop1 ? "$tint" : "$text"}>
            {player.username}
          </Text>
          <XStack alignItems="center" gap="$1" opacity={0.7}>
            <Wallet size={12} color="gray" />
            <Text fontSize={12} color={colors.text_muted}>{player.balance}$</Text>
          </XStack>
        </YStack>
      </XStack>

      {/* DROITE : Score & Récompenses */}
      <YStack alignItems="flex-end">
        <Text fontWeight="900" fontSize={18} color={colors.text}>
          {player.score} <Text fontSize={12} fontWeight="normal" color={colors.text_muted}>pts</Text>
        </Text>

        {/* Pastille de récompense si le joueur en a une */}
        {player.reward && (
          <XStack backgroundColor={colors.background_secondary} paddingHorizontal="$2" paddingVertical="$1" borderRadius="$2" alignItems="center" gap="$1" marginTop="$1">
            <Gift size={12} color={colors.tint} />
            <Text fontSize={10} fontWeight="bold" color={colors.tint}>{player.reward}</Text>
          </XStack>
        )}
      </YStack>
    </XStack>
  );
};

// --- 3. L'écran principal ---
export default function LeaderboardsScreen() {
  const { data: leaderbords } = useLeaderboard();
  const colors = useAppTheme();
  const { user } = useAuth();

  useEffect(() => {
    SplashScreen.hideAsync();
  }, []);

  // 🧠 OPTIMISATION : On calcule le classement trié uniquement quand leaderbords change
  const profiles = useMemo(() => {
    if (!leaderbords || leaderbords.length === 0) return [];
    return convertProfileLeaderboard(leaderbords[0]);
  }, [leaderbords]);

  // Si les données ne sont pas encore chargées, on affiche rien (ou tu pourrais mettre un Spinner ici)
  if (!leaderbords) {
    return null;
  }

  return (
    <YStack flex={1} backgroundColor={colors.background} paddingTop="$8" paddingHorizontal="$4">
      <XStack alignItems="center" justifyContent="center" paddingHorizontal={20} paddingBottom={20}>
        <Text fontSize={20} fontWeight="bold" color={colors.text} letterSpacing={1}>CLASSEMENT</Text>
      </XStack>

      <LinearGradient colors={['transparent', colors.tint, 'transparent']} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} style={{ height: 1, opacity: 0.3, marginBottom: 20 }} />

      {/* Système d'onglets Tamagui */}
      <Tabs defaultValue="weekly" flex={1} orientation="horizontal" flexDirection="column">

        {/* Les boutons des onglets */}
        <Tabs.List backgroundColor={colors.background_secondary} borderRadius="$4" marginBottom="$4">
          <Tabs.Tab flex={1} value="weekly" backgroundColor="transparent">
            <Text fontWeight="bold">Semaine</Text>
          </Tabs.Tab>
          <Tabs.Tab flex={1} value="event" backgroundColor="transparent">
            <Text fontWeight="bold">Événement</Text>
          </Tabs.Tab>
        </Tabs.List>

        <Separator marginBottom="$4" />

        {/* CONTENU : Onglet Semaine */}
        <Tabs.Content value="weekly" flex={1}>
          {/* On remplace la ScrollView par une FlatList */}
          <FlatList
            data={profiles}
            keyExtractor={(player) => player.id}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 32 }} // Remplace le paddingBottom="$8" de la YStack

            // L'en-tête de la liste
            ListHeaderComponent={
              <XStack paddingHorizontal="$3" marginBottom="$2" justifyContent="space-between">
                <Text fontSize={12} color={colors.text_muted} textTransform="uppercase">Joueur</Text>
                <Text fontSize={12} color={colors.text_muted} textTransform="uppercase">Score</Text>
              </XStack>
            }

            // Le rendu de chaque ligne
            renderItem={({ item, index }) => (
              <PlayerRow
                player={item}
                index={index}
                isCurrentUser={user?.id === item.id}
              />
            )}

            // OPTIONNEL MAIS RECOMMANDÉ POUR LES PERFORMANCES :
            initialNumToRender={10}
            maxToRenderPerBatch={10}
          />
        </Tabs.Content>

        {/* CONTENU : Onglet Événement (Vide pour le moment) */}
        <Tabs.Content value="event" flex={1} justifyContent="center" alignItems="center">
          <YStack alignItems="center" gap="$3" opacity={0.5} transition={{ type: "spring", duration: 300 }} enterStyle={{ opacity: 0, scale: 0.9 }}>
            <CalendarX2 size={64} color="gray" />
            <Text fontSize={18} fontWeight="bold" color={colors.text}>
              Aucun événement
            </Text>
            <Text fontSize={14} color={colors.text_muted} textAlign="center" paddingHorizontal="$4">
              Revenez plus tard ! Les événements spéciaux s'afficheront ici avec des récompenses exclusives.
            </Text>
          </YStack>
        </Tabs.Content>

      </Tabs>
    </YStack>
  );
}