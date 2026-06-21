import { useAuth } from "@/context/AuthContext";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useState } from "react";
import {
  ActivityIndicator,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

type Mode = "login" | "register";

export default function AuthScreen() {
  const { login, register } = useAuth();
  const router = useRouter();
  const [mode,      setMode]      = useState<Mode>("login");
  const [nom,       setNom]       = useState("");
  const [email,     setEmail]     = useState("");
  const [password,  setPassword]  = useState("");
  const [showPwd,   setShowPwd]   = useState(false);
  const [loading,   setLoading]   = useState(false);

  const handleSubmit = async () => {
    if (!email.trim() || !password.trim()) {
      Alert.alert("Champs requis", "Veuillez remplir tous les champs.");
      return;
    }
    if (mode === "register" && !nom.trim()) {
      Alert.alert("Nom requis", "Veuillez entrer votre nom.");
      return;
    }

    setLoading(true);
    const result =
      mode === "login"
        ? await login(email.trim(), password)
        : await register(nom.trim(), email.trim(), password);
    setLoading(false);

    if (result.success) {
      router.replace("/(tabs)");
    } else {
      Alert.alert("Erreur", result.error || "Une erreur est survenue.");
    }
  };

  return (
    <KeyboardAvoidingView
      className="flex-1 bg-background"
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView
        contentContainerStyle={{ flexGrow: 1, justifyContent: "center" }}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <View className="flex-1 justify-center px-8 py-12">
          {/* Logo / Titre */}
          <View className="items-center mb-10">
            <View className="bg-primary rounded-3xl w-20 h-20 items-center justify-center mb-4">
              <Ionicons name="storefront" size={40} color="#121212" />
            </View>
            <Text className="text-text-primary text-3xl font-bold">Artisan Market</Text>
            <Text className="text-text-secondary text-sm mt-1">
              {mode === "login" ? "Bon retour !" : "Créez votre compte"}
            </Text>
          </View>

          {/* Toggle Login / Register */}
          <View className="flex-row bg-surface rounded-2xl p-1 mb-8">
            {(["login", "register"] as Mode[]).map((m) => (
              <TouchableOpacity
                key={m}
                onPress={() => setMode(m)}
                className={`flex-1 py-3 rounded-xl items-center ${
                  mode === m ? "bg-primary" : ""
                }`}
                activeOpacity={0.7}
              >
                <Text
                  className={`font-bold text-sm ${
                    mode === m ? "text-background" : "text-text-secondary"
                  }`}
                >
                  {m === "login" ? "Connexion" : "Inscription"}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* Champ Nom (inscription seulement) */}
          {mode === "register" && (
            <View className="bg-surface rounded-2xl flex-row items-center px-4 mb-4">
              <Ionicons name="person-outline" size={20} color="#666" />
              <TextInput
                className="flex-1 ml-3 py-4 text-text-primary text-base"
                placeholder="Nom complet"
                placeholderTextColor="#666"
                value={nom}
                onChangeText={setNom}
                autoCapitalize="words"
              />
            </View>
          )}

          {/* Champ Email */}
          <View className="bg-surface rounded-2xl flex-row items-center px-4 mb-4">
            <Ionicons name="mail-outline" size={20} color="#666" />
            <TextInput
              className="flex-1 ml-3 py-4 text-text-primary text-base"
              placeholder="Adresse email"
              placeholderTextColor="#666"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
            />
          </View>

          {/* Champ Mot de passe */}
          <View className="bg-surface rounded-2xl flex-row items-center px-4 mb-8">
            <Ionicons name="lock-closed-outline" size={20} color="#666" />
            <TextInput
              className="flex-1 ml-3 py-4 text-text-primary text-base"
              placeholder="Mot de passe"
              placeholderTextColor="#666"
              value={password}
              onChangeText={setPassword}
              secureTextEntry={!showPwd}
            />
            <TouchableOpacity onPress={() => setShowPwd(!showPwd)}>
              <Ionicons
                name={showPwd ? "eye-off-outline" : "eye-outline"}
                size={20}
                color="#666"
              />
            </TouchableOpacity>
          </View>

          {/* Bouton principal */}
          <TouchableOpacity
            className="bg-primary rounded-2xl py-4 items-center"
            onPress={handleSubmit}
            disabled={loading}
            activeOpacity={0.8}
          >
            {loading ? (
              <ActivityIndicator color="#121212" />
            ) : (
              <Text className="text-background font-bold text-base">
                {mode === "login" ? "Se connecter" : "Créer mon compte"}
              </Text>
            )}
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}