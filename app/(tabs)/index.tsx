// app/(tabs)/index.tsx — ICÔNE PROFIL CLIQUABLE
import ProductsGrid from "@/components/ProductsGrid";
import SafeScreen from "@/components/SafeScreen";
import { useAuth } from "@/context/AuthContext";
import { useCart } from "@/context/CartContext";
import { useProducts } from "@/hooks/useProducts";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useMemo, useState } from "react";
import {
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

const CATEGORIES = [
  { name: "Tous",         icon: "grid-outline" as const },
  { name: "Poterie",      icon: "earth-outline" as const },
  { name: "Tissage",      icon: "color-palette-outline" as const },
  { name: "Bijoux",       icon: "diamond-outline" as const },
  { name: "Maroquinerie", icon: "bag-outline" as const },
  { name: "Bois",         icon: "leaf-outline" as const },
];

export default function ShopScreen() {
  const { user } = useAuth();
  const { itemCount } = useCart();
  const [query, setQuery] = useState("");
  const [categ, setCateg] = useState("Tous");

  const { data: products, isLoading, isError } = useProducts();

  const filtered = useMemo(() => {
    if (!products) return [];
    let result = products;
    if (categ !== "Tous")
      result = result.filter((p) => p.categorie === categ);
    if (query.trim())
      result = result.filter((p) =>
        p.nom.toLowerCase().includes(query.toLowerCase()) ||
        p.description?.toLowerCase().includes(query.toLowerCase())
      );
    return result;
  }, [products, categ, query]);

  return (
    <SafeScreen>
      <ScrollView
        className="flex-1"
        contentContainerStyle={{ paddingBottom: 100 }}
        showsVerticalScrollIndicator={false}
      >
        {/* En-tête */}
        <View className="px-6 pb-4 pt-6">
          <View className="flex-row items-center justify-between mb-6">
            <View>
              <Text className="text-text-primary text-3xl font-bold tracking-tight">
                Boutique
              </Text>
              <Text className="text-text-secondary text-sm mt-1">
                Bonjour, {user?.nom?.split(" ")[0] || "visiteur"} 👋
              </Text>
            </View>
            
            {/* ICÔNES PANIER + PROFIL */}
            <View className="flex-row items-center gap-3">
              {/* Panier */}
              <TouchableOpacity
                onPress={() => router.push("/(tabs)/cart")}
                className="relative"
              >
                <Ionicons name="cart-outline" size={28} color="#fff" />
                {itemCount > 0 && (
                  <View className="absolute -top-2 -right-2 bg-primary rounded-full min-w-[20px] h-5 items-center justify-center px-1">
                    <Text className="text-background text-xs font-bold">
                      {itemCount}
                    </Text>
                  </View>
                )}
              </TouchableOpacity>

              {/* PROFIL CLIQUABLE ← ← ← AJOUTÉ */}
              <TouchableOpacity
                onPress={() => router.push("/(tabs)/profile")}
                className="bg-primary/20 rounded-full w-11 h-11 items-center justify-center"
              >
                <Text className="text-primary font-bold text-lg">
                  {user?.nom?.[0]?.toUpperCase() ?? "?"}
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Barre de recherche */}
          <View className="bg-surface flex-row items-center px-5 py-4 rounded-2xl">
            <Ionicons color="#666" size={20} name="search" />
            <TextInput
              placeholder="Rechercher un produit..."
              placeholderTextColor="#666"
              className="flex-1 ml-3 text-base text-text-primary"
              value={query}
              onChangeText={setQuery}
            />
            {query.length > 0 && (
              <TouchableOpacity onPress={() => setQuery("")}>
                <Ionicons name="close-circle" size={18} color="#666" />
              </TouchableOpacity>
            )}
          </View>
        </View>

        {/* Chips catégories */}
        <View className="mb-6">
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingHorizontal: 20, gap: 10 }}
          >
            {CATEGORIES.map((cat) => {
              const active = categ === cat.name;
              return (
                <TouchableOpacity
                  key={cat.name}
                  onPress={() => setCateg(cat.name)}
                  className={`rounded-2xl h-20 w-20 items-center justify-center ${
                    active ? "bg-primary" : "bg-surface"
                  }`}
                  activeOpacity={0.7}
                >
                  <Ionicons
                    name={cat.icon}
                    size={28}
                    color={active ? "#121212" : "#fff"}
                  />
                  <Text
                    className={`text-xs mt-1 font-semibold ${
                      active ? "text-background" : "text-text-secondary"
                    }`}
                    numberOfLines={1}
                  >
                    {cat.name}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        </View>

        {/* Grille produits */}
        <View className="px-6">
          <View className="flex-row items-center justify-between mb-4">
            <Text className="text-text-primary text-lg font-bold">Produits</Text>
            <Text className="text-text-secondary text-sm">{filtered.length} article(s)</Text>
          </View>
          <ProductsGrid products={filtered} isLoading={isLoading} isError={isError} />
        </View>
      </ScrollView>
    </SafeScreen>
  );
}