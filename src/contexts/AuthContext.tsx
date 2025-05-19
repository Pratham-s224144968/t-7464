
import { createContext, useState, useContext, useEffect, ReactNode } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Session, User as SupabaseUser } from "@supabase/supabase-js";

// Extended User type to include properties we need
export interface User extends SupabaseUser {
  name?: string;
  avatar?: string;
  email?: string;
  isDeakinUser?: boolean; // Add this property
}

interface AuthContextType {
  session: Session | null;
  user: User | null;
  loading: boolean;
  isAuthenticated: boolean;
  isDeakinUser: boolean; // Add this property
  signOut: () => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // Check if user has a Deakin email
  const isDeakinEmail = (email: string | undefined): boolean => {
    if (!email) return false;
    return email.toLowerCase().endsWith('@deakin.edu.au');
  };

  useEffect(() => {
    // Set up the auth state listener first
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        console.log("Auth state changed:", event);
        setSession(session);
        // Add mock data for demo purposes
        if (session?.user) {
          const isUserDeakin = isDeakinEmail(session.user.email);
          const enhancedUser: User = {
            ...session.user,
            name: session.user.email ? session.user.email.split('@')[0] : 'User',
            avatar: `https://source.unsplash.com/random/100x100?face&u=${session.user.id}`,
            email: session.user.email,
            isDeakinUser: isUserDeakin
          };
          setUser(enhancedUser);
        } else {
          setUser(null);
        }
        setLoading(false);
      }
    );

    // Then check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      // Add mock data for demo purposes
      if (session?.user) {
        const isUserDeakin = isDeakinEmail(session.user.email);
        const enhancedUser: User = {
          ...session.user,
          name: session.user.email ? session.user.email.split('@')[0] : 'User',
          avatar: `https://source.unsplash.com/random/100x100?face&u=${session.user.id}`,
          email: session.user.email,
          isDeakinUser: isUserDeakin
        };
        setUser(enhancedUser);
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const signOut = async () => {
    await supabase.auth.signOut();
    setSession(null);
    setUser(null);
  };

  const value = {
    session,
    user,
    loading,
    isAuthenticated: !!session,
    isDeakinUser: !!user?.isDeakinUser,
    signOut,
    logout: signOut, // Alias for signOut
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
