import { getUtilisateurParEmail, inscrireUtilisateur } from "@/lib/api";
import { User } from "@/types";
import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { createContext, useContext, useEffect, useState } from "react";

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, motDePasse: string) => Promise<{ success: boolean; error?: string }>;
  register: (nom: string, email: string, motDePasse: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth doit être dans AuthProvider");
  return ctx;
};

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser]       = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    AsyncStorage.getItem("@user").then((json) => {
      if (json) setUser(JSON.parse(json));
      setLoading(false);
    });
  }, []);

  const login = async (email: string, motDePasse: string) => {
    // ===== MODE DEV : Bypass backend =====
    if (email === "test@test.com" && motDePasse === "test") {
      const fakeUser: User = {
        id: "user-123",
        nom: "Test User",
        email: "test@test.com",
        role: "CLIENT"
      };
      await AsyncStorage.setItem("@user", JSON.stringify(fakeUser));
      setUser(fakeUser);
      return { success: true };
    }
    // ======================================

    try {
      const { data } = await getUtilisateurParEmail(email);
      await AsyncStorage.setItem("@user", JSON.stringify(data));
      setUser(data);
      return { success: true };
    } catch (e: any) {
      const status = e?.response?.status;
      if (status === 404) return { success: false, error: "Email introuvable" };
      return { success: false, error: "Erreur de connexion. Vérifiez vos identifiants." };
    }
  };

  const register = async (nom: string, email: string, motDePasse: string) => {
    try {
      const { data } = await inscrireUtilisateur({ nom, email, motDePasse, role: "CLIENT" });
      await AsyncStorage.setItem("@user", JSON.stringify(data));
      setUser(data);
      return { success: true };
    } catch (e: any) {
      return { success: false, error: "Erreur lors de l'inscription. Email déjà utilisé?" };
    }
  };

  const logout = async () => {
    await AsyncStorage.removeItem("@user");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};