import { useEffect } from "react";
import { useAuthStore } from "../stores/authStore";

export const useAuth = () => {
    const store = useAuthStore();
    useEffect(() => {
        if (!store.isInitialized) {
            store.initialize();
        }
    }, []);
    return {
        user: store.user,
        session: store.session,
        isLoading: store.isLoading,
        isAuthenticated: !!store.user,
        signUp: store.signUp,
        signIn: store.signIn,
        signOut: store.signOut,
        updateProfile: store.updateProfile,
    };
}