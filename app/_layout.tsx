// app/_layout.tsx
import { AuthProvider, useAuth } from "@/context/AuthContext";
import { CartProvider } from "@/context/CartContext";
import { FavoritesProvider } from "@/context/FavoritesContext";
import { NotificationsProvider } from "@/context/NotificationsContext";
import "@/global.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Stack, useRouter, useSegments } from "expo-router";
import { useEffect } from "react";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      staleTime: 1000 * 60 * 5,
    },
  },
});

// ===== AUTHGUARD =====
function AuthGuard({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();
  const segments = useSegments();
  const router = useRouter();

  useEffect(() => {
    if (loading) return;

    const inAuthGroup = segments[0] === "(auth)";
    
    if (!user && !inAuthGroup) {
      router.replace("/(auth)");
    } else if (user && inAuthGroup) {
      router.replace("/(tabs)");
    }
  }, [user, loading, segments]);

  return <>{children}</>;
}

export default function RootLayout() {
  return (
    <QueryClientProvider client={queryClient}>
      <NotificationsProvider>
        <FavoritesProvider>
          <AuthProvider>
            <CartProvider>
              <AuthGuard>
                <Stack screenOptions={{ headerShown: false }}>
                  <Stack.Screen name="(auth)" options={{ headerShown: false }} />
                  <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
                  <Stack.Screen name="product/[id]" options={{ title: "Produit", headerShown: true }} />
                  <Stack.Screen name="checkout" options={{ title: "📦 Livraison", headerShown: true }} />
                  <Stack.Screen name="order-confirmation" options={{ title: "✅ Confirmation", headerShown: true, headerLeft: () => null }} />
                </Stack>
              </AuthGuard>
            </CartProvider>
          </AuthProvider>
        </FavoritesProvider>
      </NotificationsProvider>
    </QueryClientProvider>
  );
}