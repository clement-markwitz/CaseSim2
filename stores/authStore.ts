import { getErrorMessage } from '@/lib/errorMessages';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Session, User, UserMetadata } from '@supabase/supabase-js';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import { supabase } from '../utils/supabase';
interface AuthStore {
  session?: Session | null;
  user?: User | null;
  isLoading: boolean;
  isLoggedIn: boolean;
  isInitialized: boolean;
  initialize: () => Promise<void>;
  signUp: (email: string, password: string, username?: string) => Promise<{ error: Error | null }>;
  signIn: (email: string, password: string) => Promise<{ error: Error | null }>;
  signOut: () => Promise<void>;
  updateProfile: (data: UserMetadata) => Promise<{ error: Error | null }>;


}
export const useAuthStore = create<AuthStore>()(
  persist(
    (set, get) => ({
      session: null,
      user: null,
      isLoading: false,
      isLoggedIn: false,
      isInitialized: false,

      initialize: async () => {
        if (get().isInitialized) {
          console.log('⚠️ [AUTH] Already initializing or initialized');
          return;
        }
        try {
          set({
            isInitialized: true,
            isLoading: true,
          })
          const { data: { session }, error } = await supabase.auth.getSession();
          if (error) {
            throw error;
          }
          set({
            session,
            user: session?.user,
            isLoading: false,
            isLoggedIn: !!session,
          })
        } catch (error) {
          console.error('Error initializing auth:', error);
          set({
            isLoading: false,
            isLoggedIn: false,
            isInitialized: true,
          })
        }
      },
      signUp: async (email: string, password: string, username?: string) => {
        try {
          set({ isLoading: true });

          const { data, error } = await supabase.auth.signUp({
            email,
            password,
            options: {
              data: {
                username: username || email.split('@')[0],
              },
            },
          });

          throw new Error(getErrorMessage(error));

        } catch (error) {
          console.error('Sign up error:', error);
          return { error: error as Error };
        } finally {
          set({ isLoading: false });
        }
      },

      // 🔑 Connexion
      signIn: async (email: string, password: string) => {
        try {
          set({ isLoading: true });

          const { data, error } = await supabase.auth.signInWithPassword({
            email,
            password,
          });

          if (error) throw error;

          set({
            session: data.session,
            user: data.user,
          });

          return { error: null };
        } catch (error) {
          console.error('Sign in error:', error);
          return { error: error as Error };
        } finally {
          set({ isLoading: false });
        }
      },

      // 🚪 Déconnexion
      signOut: async () => {
        try {
          set({ isLoading: true });
          await supabase.auth.signOut();

          set({
            user: null,
            session: null,
          });
        } catch (error) {
          console.error('Sign out error:', error);
        } finally {
          set({ isLoading: false });
        }
      },

      // ✏️ Mise à jour du profil
      updateProfile: async (data: UserMetadata) => {
        try {
          const { user } = get();
          if (!user) throw new Error('No user logged in');

          const { error } = await supabase.auth.updateUser({
            data,
          });

          if (error) throw error;

          // Met à jour le user local
          set({
            user: {
              ...user,
              user_metadata: {
                ...user.user_metadata,
                ...data,
              },
            },
          });

          return { error: null };
        } catch (error) {
          console.error('Update profile error:', error);
          return { error: error as Error };
        }
      },
    }),
    {
      name: 'auth-storage',
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (state) => ({
        user: state.user,
        session: state.session,
      }),
    }
  )
);