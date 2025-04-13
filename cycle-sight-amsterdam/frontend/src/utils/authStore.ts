import { create } from 'zustand';
import { supabase } from './supabase';
import { User, Session } from '@supabase/supabase-js';

interface AuthState {
  user: User | null;
  session: Session | null;
  loading: boolean;
  error: Error | null;
  initialized: boolean;
  
  // Auth actions
  signUp: (email: string, password: string) => Promise<{ error: Error | null }>;
  signIn: (email: string, password: string) => Promise<{ error: Error | null }>;
  signOut: () => Promise<void>;
  resetPassword: (email: string) => Promise<{ error: Error | null }>;
  updateProfile: (data: { username?: string, avatar_url?: string }) => Promise<{ error: Error | null }>;
  
  // Auth state initialization
  initialize: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set, get) => ({
  user: null,
  session: null,
  loading: true,
  error: null,
  initialized: false,
  
  initialize: async () => {
    try {
      // Check active session
      const { data: { session } } = await supabase.auth.getSession();
      
      if (session) {
        const { data: { user } } = await supabase.auth.getUser();
        set({ user, session, loading: false, initialized: true });
      } else {
        set({ loading: false, initialized: true });
      }
      
      // Listen for auth changes
      const { data: { subscription } } = supabase.auth.onAuthStateChange(
        (event, session) => {
          set({ session, user: session?.user ?? null });
        }
      );
      
      return () => {
        subscription.unsubscribe();
      };
    } catch (error) {
      set({ 
        error: error instanceof Error ? error : new Error('Unknown error during initialization'),
        loading: false, 
        initialized: true 
      });
    }
  },
  
  signUp: async (email, password) => {
    set({ loading: true, error: null });
    try {
      const { error } = await supabase.auth.signUp({ email, password });
      set({ loading: false });
      return { error };
    } catch (error) {
      const authError = error instanceof Error ? error : new Error('Unknown error during sign up');
      set({ error: authError, loading: false });
      return { error: authError };
    }
  },
  
  signIn: async (email, password) => {
    set({ loading: true, error: null });
    try {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      set({ loading: false });
      return { error };
    } catch (error) {
      const authError = error instanceof Error ? error : new Error('Unknown error during sign in');
      set({ error: authError, loading: false });
      return { error: authError };
    }
  },
  
  signOut: async () => {
    set({ loading: true, error: null });
    try {
      await supabase.auth.signOut();
      set({ user: null, session: null, loading: false });
    } catch (error) {
      set({ 
        error: error instanceof Error ? error : new Error('Unknown error during sign out'),
        loading: false 
      });
    }
  },
  
  resetPassword: async (email) => {
    set({ loading: true, error: null });
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password`,
      });
      set({ loading: false });
      return { error };
    } catch (error) {
      const authError = error instanceof Error ? error : new Error('Unknown error during password reset');
      set({ error: authError, loading: false });
      return { error: authError };
    }
  },
  
  updateProfile: async (data) => {
    const user = get().user;
    if (!user) {
      const error = new Error('User not authenticated');
      set({ error });
      return { error };
    }
    
    set({ loading: true, error: null });
    try {
      // Update user metadata (uses Supabase's built-in metadata field)
      const { error } = await supabase.auth.updateUser({
        data: data,
      });

      if (!error) {
        // Refresh user data
        const { data: { user: updatedUser } } = await supabase.auth.getUser();
        set({ user: updatedUser, loading: false });
      } else {
        set({ loading: false });
      }

      return { error };
    } catch (error) {
      const profileError = error instanceof Error ? error : new Error('Unknown error during profile update');
      set({ error: profileError, loading: false });
      return { error: profileError };
    }
  },
}));

// Hook to initialize auth when the app loads
export const initializeAuth = async () => {
  const { initialize, initialized } = useAuthStore.getState();
  if (!initialized) {
    await initialize();
  }
};
