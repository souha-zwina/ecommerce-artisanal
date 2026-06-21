import { useAuth } from "@/context/AuthContext";
import { Ionicons } from "@expo/vector-icons";
import { BlurView } from "expo-blur";
import { Redirect, Tabs } from "expo-router";
import { ActivityIndicator, StyleSheet, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function TabsLayout() {
  const { user, loading } = useAuth();
  const insets = useSafeAreaInsets();

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#121212" }}>
        <ActivityIndicator size="large" color="#1DB954" />
      </View>
    );
  }

  if (!user) return <Redirect href="/(auth)" />;

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "#1DB954",
        tabBarInactiveTintColor: "#B3B3B3",
        tabBarStyle: {
          position: "absolute",
          backgroundColor: "transparent",
          borderTopWidth: 0,
          height: 32 + insets.bottom,
          paddingTop: 4,
          marginHorizontal: 80,
          marginBottom: insets.bottom,
          borderRadius: 24,
          overflow: "hidden",
        },
        tabBarBackground: () => (
          <BlurView intensity={80} tint="dark" style={StyleSheet.absoluteFill} />
        ),
        tabBarLabelStyle: { fontSize: 12, fontWeight: "600" },
        headerShown: false,
      }}
    >
      {/* === ONGLET BOUTIQUE === */}
      <Tabs.Screen
        name="index"
        options={{
          title: "Boutique",
          tabBarIcon: ({ color, size }) => <Ionicons name="grid" size={size} color={color} />,
        }}
      />

      {/* === ONGLET PANIER === */}
      <Tabs.Screen
        name="cart"
        options={{
          title: "Panier",
          tabBarIcon: ({ color, size }) => <Ionicons name="cart-outline" size={size} color={color} />,
        }}
      />

      {/* === ONGLET COMMANDES === */}
      <Tabs.Screen
        name="orders"
        options={{
          title: "Commandes",
          tabBarIcon: ({ color, size }) => <Ionicons name="list-outline" size={size} color={color} />,
        }}
      />

      {/* === ONGLET PROFIL === */}
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profil",
          tabBarIcon: ({ color, size }) => <Ionicons name="person" size={size} color={color} />,
        }}
      />

      {/* === DÉTAIL COMMANDE (caché) === */}
      <Tabs.Screen
        name="order"
        options={{
          href: null,
        }}
      />
    </Tabs>
  );
}