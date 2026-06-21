// app/(tabs)/_layout.tsx
import { useNotifications } from "@/context/NotificationsContext";
import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";

export default function TabsLayout() {
  const { unreadCount } = useNotifications();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "#10b981",
        tabBarInactiveTintColor: "#666",
        tabBarStyle: { backgroundColor: "#1a1a1a", borderTopColor: "#2a2a2a" },
        headerShown: false,
      }}
    >
      {/* Onglets visibles */}
      <Tabs.Screen
        name="index"
        options={{
          title: "Accueil",
          tabBarIcon: ({ color, size }) => <Ionicons name="home" size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="cart"
        options={{
          title: "Panier",
          tabBarIcon: ({ color, size }) => <Ionicons name="cart" size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="favorites"
        options={{
          title: "Favoris",
          tabBarIcon: ({ color, size }) => <Ionicons name="heart" size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="notifications"
        options={{
          title: "Notifications",
          tabBarIcon: ({ color, size }) => <Ionicons name="notifications" size={size} color={color} />,
          tabBarBadge: unreadCount > 0 ? unreadCount : undefined,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profil",
          tabBarIcon: ({ color, size }) => <Ionicons name="person" size={size} color={color} />,
        }}
      />

      {/* CACHER orders et order/[id] de la tab bar */}
      <Tabs.Screen
        name="orders"
        options={{
          href: null, // ← CACHER de la tab bar
        }}
      />
      <Tabs.Screen
        name="order/[id]"
        options={{
          href: null, // ← CACHER de la tab bar
        }}
      />
    </Tabs>
  );
}