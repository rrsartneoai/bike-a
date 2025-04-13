import { ReactNode, useEffect } from "react";
import { Toaster } from "sonner";
import { initializeAuth, useAuthStore } from "utils/authStore";

interface Props {
  children: ReactNode;
}

/**
 * A provider wrapping the whole app.
 *
 * You can add multiple providers here by nesting them,
 * and they will all be applied to the app.
 */
export const AppProvider = ({ children }: Props) => {
  const initialized = useAuthStore(state => state.initialized);
  
  // Initialize auth when the app loads
  useEffect(() => {
    initializeAuth();
  }, []);
  
  // Apply dark theme as per the design requirements
  useEffect(() => {
    // Add 'dark' class to html element for dark mode
    document.documentElement.classList.add('dark');
    
    return () => {
      // Cleanup function
      document.documentElement.classList.remove('dark');
    };
  }, []);

  // Show loading state until auth is initialized
  if (!initialized) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <>
      {children}
      <Toaster position="top-right" richColors />
    </>
  );
};
