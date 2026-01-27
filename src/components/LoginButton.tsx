import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { supabase } from "@/lib/supabase";
import { Lock } from "lucide-react";

export function LoginButton() {
  const [, setLocation] = useLocation();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        setIsLoggedIn(!!session);
      } catch (error) {
        setIsLoggedIn(false);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setIsLoggedIn(!!session);
    });

    return () => subscription.unsubscribe();
  }, []);

  if (loading || isLoggedIn) {
    return null;
  }

  return (
    <button
      onClick={() => setLocation("/login")}
      className="fixed bottom-6 right-6 z-40 bg-primary/90 hover:bg-primary text-black rounded-full p-3 shadow-lg transition-all duration-300 hover:scale-110 group"
      title="Admin Login"
    >
      <span className="text-xl">🔐</span>
      <span className="absolute right-full mr-2 top-1/2 -translate-y-1/2 bg-black/80 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
        Admin Login
      </span>
    </button>
  );
}
