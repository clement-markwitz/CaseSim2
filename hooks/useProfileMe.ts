import { fetchProfile } from '@/api/profile.api';
import { Profile } from '@/constants/user';
import { useAuth } from '@/hooks/useAuth';
import { useSuspenseQuery } from '@tanstack/react-query';

export const useProfileMe = () => {
  const { user } = useAuth(); // Récupère le user connecté

  return useSuspenseQuery<Profile | null>({
    queryKey: ['profile', user?.id], // Clé unique pour ce joueur
    queryFn: async () => {
      if (!user) return null;

      return fetchProfile(user.id);
    },
    // Le profil reste frais pendant 5 minutes, pas besoin de le recharger à chaque page !
    staleTime: 1000 * 60 * 5,
  });
};