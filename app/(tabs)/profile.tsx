// app/(tabs)/profile.tsx — VERSION CORRIGÉE AVEC NAVIGATION
import SafeScreen from "@/components/SafeScreen";
import { useAuth } from "@/context/AuthContext";
import { useCart } from "@/context/CartContext";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { Alert, ScrollView, Text, TouchableOpacity, View } from "react-native";

export default function ProfileScreen() {
  const { user, logout } = useAuth();
  const { itemCount } = useCart();

  const handleLogout = () => {
    Alert.alert(
      "Déconnexion",
      "Êtes-vous sûr de vouloir vous déconnecter ?",
      [
        { text: "Annuler", style: "cancel" },
        { 
          text: "Déconnecter", 
          style: "destructive", 
          onPress: async () => {
            await logout();
            router.replace("/(auth)");
          }
        },
      ]
    );
  };

  const MENU = [
    { 
      id: 1, 
      icon: "list-outline" as const, 
      title: "Mes commandes", 
      color: "#10B981", 
      action: () => router.push("/orders") // ← CORRIGÉ : hors des tabs
    },
    { 
      id: 2, 
      icon: "heart-outline" as const, 
      title: "Favoris", 
      color: "#EF4444", 
      action: () => router.push("/(tabs)/favorites") // ← OK : reste dans les tabs
    },
    { 
      id: 3, 
      icon: "notifications-outline" as const, 
      title: "Notifications", 
      color: "#F59E0B", 
      action: () => router.push("/(tabs)/notifications") // ← OK : reste dans les tabs
    },
  ];

  return (
    <SafeScreen>
      <ScrollView
        className="flex-1"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 120 }}
      >
        {/* En-tête profil */}
        <View className="px-6 pt-6 pb-8">
          <View className="bg-surface rounded-3xl p-6">
            <View className="flex-row items-center">
              <View className="w-20 h-20 rounded-full bg-primary items-center justify-center">
                <Text className="text-background text-3xl font-bold">
                  {user?.nom?.[0]?.toUpperCase() ?? "?"}
                </Text>
              </View>
              <View className="flex-1 ml-4">
                <Text className="text-text-primary text-2xl font-bold">
                  {user?.nom ?? "Utilisateur"}
                </Text>
                <Text className="text-text-secondary text-sm mt-1">
                  {user?.email ?? ""}
                </Text>
                {user?.role === "ADMIN" && (
                  <View className="mt-2 bg-primary/20 rounded-full px-3 py-1 self-start">
                    <Text className="text-primary text-xs font-bold">Admin</Text>
                  </View>
                )}
              </View>
            </View>
          </View>
        </View>

        {/* Stats rapides */}
        <View className="flex-row mx-6 mb-6">
          <View className="bg-surface rounded-2xl p-4 flex-1 mr-3 items-center">
            <Text className="text-primary text-2xl font-bold">{itemCount}</Text>
            <Text className="text-text-secondary text-xs">Articles panier</Text>
          </View>
          <View className="bg-surface rounded-2xl p-4 flex-1 items-center">
            <Text className="text-primary text-2xl font-bold">0</Text>
            <Text className="text-text-secondary text-xs">Commandes</Text>
          </View>
        </View>

        {/* Menu items */}
        <View className="flex-row flex-wrap gap-3 mx-6 mb-4">
          {MENU.map((item) => (
            <TouchableOpacity
              key={item.id}
              className="bg-surface rounded-2xl p-5 items-center justify-center"
              style={{ width: "47%" }}
              activeOpacity={0.7}
              onPress={item.action}
            >
              <View
                className="rounded-full w-14 h-14 items-center justify-center mb-3"
                style={{ backgroundColor: item.color + "20" }}
              >
                <Ionicons name={item.icon} size={26} color={item.color} />
              </View>
              <Text className="text-text-primary font-bold text-sm text-center">
                {item.title}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Déconnexion */}
        <TouchableOpacity
          className="mx-6 bg-surface rounded-2xl py-5 flex-row items-center justify-center border-2 border-red-500/20"
          activeOpacity={0.8}
          onPress={handleLogout}
        >
          <Ionicons name="log-out-outline" size={22} color="#EF4444" />
          <Text className="text-red-500 font-bold text-base ml-2">Se déconnecter</Text>
        </TouchableOpacity>

        <Text className="text-center text-text-secondary text-xs mt-4 mb-8">
          Artisan Market v1.0.0 • {user?.role || "CLIENT"}
        </Text>
      </ScrollView>
    </SafeScreen>
  );
}