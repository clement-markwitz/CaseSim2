import { Session, User, UserMetadata } from '@supabase/supabase-js';
import { create } from 'zustand';
import { supabase } from '../utils/supabase';
import { useDemoStore } from './demoStore';

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

export const useAuthStore = create<AuthStore>((set, get) => ({
  session: null,
  user: null,
  isLoading: false,
  isLoggedIn: false,
  isInitialized: false,

  initialize: async () => {
    if (get().isInitialized) {
      return;
    }

    try {
      set({
        isInitialized: true,
        isLoading: true,
      });

      // 1. On demande à Supabase de lire son propre stockage
      const { data: { session }, error } = await supabase.auth.getSession();

      if (error) throw error;

      set({
        session,
        user: session?.user || null,
        isLoading: false,
        isLoggedIn: !!session,
      });

      // Si le joueur n'a pas de session valide au démarrage, on force le mode Démo
      if (!session) {
        useDemoStore.getState().setMode("demo");
      }

      // 2. On écoute les changements futurs
      supabase.auth.onAuthStateChange((event, newSession) => {
        set({
          session: newSession,
          user: newSession?.user || null,
          isLoggedIn: !!newSession,
        });

        // Si le token expire en cours de jeu ou que le joueur se déconnecte
        if (event === 'SIGNED_OUT') {
          useDemoStore.getState().setMode("demo");
        }
      });

    } catch (error) {
      console.error('Error initializing auth:', error);

      // 🚨 CORRECTION MAJEURE ICI : On vide bien le User et la Session !
      useDemoStore.getState().setMode("demo");
      set({
        session: null,
        user: null,
        isLoading: false,
        isLoggedIn: false,
      });
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

      if (error) throw error;

      set({
        session: data.session,
        user: data.user,
        isLoggedIn: !!data.session,
      });

      return { error: null };
    } catch (error) {
      useDemoStore.getState().setMode("demo");
      console.error('Sign up error:', error);
      return { error: error as Error };
    } finally {
      set({ isLoading: false });
    }
  },

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
        isLoggedIn: !!data.session,
      });

      return { error: null };
    } catch (error) {
      useDemoStore.getState().setMode("demo");
      console.error('Sign in error:', error);
      return { error: error as Error };
    } finally {
      set({ isLoading: false });
    }
  },

  signOut: async () => {
    try {
      set({ isLoading: true });
      await supabase.auth.signOut();

      set({
        user: null,
        session: null,
        isLoggedIn: false,
      });
      useDemoStore.getState().setMode("demo");
    } catch (error) {
      useDemoStore.getState().setMode("demo");
      console.error('Sign out error:', error);
    } finally {
      set({ isLoading: false });
    }
  },

  updateProfile: async (data: UserMetadata) => {
    try {
      const { user } = get();
      if (!user) throw new Error('No user logged in');

      const { error } = await supabase.auth.updateUser({ data });

      if (error) throw error;

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
}));