// app/product/[id].tsx
import { useCart } from "@/context/CartContext";
import { useFavorites } from "@/context/FavoritesContext";
import { useProduct } from "@/hooks/useProduct";
import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useState } from "react";
import {
  Dimensions,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const { width } = Dimensions.get("window");

export default function ProductDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const productId = Array.isArray(id) ? id[0] : id;
  const [quantity, setQuantity] = useState(1);
  const { addItemWithQuantity } = useCart();
  const { isFavorite, toggleFavorite } = useFavorites();
  const router = useRouter();

  const { data: product } = useProduct(productId || "");

  if (!product) {
    return (
      <SafeAreaView className="flex-1 bg-[#121212] items-center justify-center">
        <Text className="text-white">Chargement...</Text>
      </SafeAreaView>
    );
  }

  const handleAdd = () => {
    addItemWithQuantity(
      {
        id: product.id,
        nom: product.nom,
        imageUrl: product.imageUrl,
        prix: product.prix,
      },
      quantity
    );
    alert(`${quantity}x ${product.nom} ajouté !`);
  };

  const increment = () => setQuantity((q) => Math.min(q + 1, product.stock));
  const decrement = () => setQuantity((q) => Math.max(q - 1, 1));

  const fav = isFavorite(product.id);

  const favoriteItem = {
    id: product.id,
    name: product.nom,
    price: product.prix,
    image: product.imageUrl,
    category: product.categorie || "Artisanat",
  };

  return (
    <SafeAreaView className="flex-1 bg-[#121212]">
      {/* Header */}
      <View className="flex-row items-center justify-between px-4 py-3">
        <TouchableOpacity
          onPress={() => router.back()}
          className="w-10 h-10 rounded-full bg-[#2a2a2a] items-center justify-center"
        >
          <Ionicons name="arrow-back" size={22} color="white" />
        </TouchableOpacity>
        <Text className="text-white font-bold text-lg" numberOfLines={1}>
          Détails
        </Text>
        <TouchableOpacity
          onPress={() => router.push("/(tabs)/cart")}
          className="w-10 h-10 rounded-full bg-[#2a2a2a] items-center justify-center"
        >
          <Ionicons name="cart-outline" size={22} color="white" />
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Image */}
        <Image
          source={{ uri: product.imageUrl }}
          className="w-full"
          style={{ height: width * 0.8 }}
          resizeMode="cover"
        />

        {/* Infos */}
        <View className="px-5 pt-5 pb-8">
          <View className="flex-row items-start justify-between">
            <View className="flex-1 mr-4">
              <Text className="text-gray-400 text-sm uppercase tracking-wider mb-1">
                {product.categorie || "Artisanat"}
              </Text>
              <Text className="text-white text-2xl font-bold leading-8">
                {product.nom}
              </Text>
            </View>
            <TouchableOpacity
              onPress={() => toggleFavorite(favoriteItem)}
              className={`w-12 h-12 rounded-full items-center justify-center ${
                fav ? "bg-red-500" : "bg-[#2a2a2a]"
              }`}
            >
              <Ionicons
                name={fav ? "heart" : "heart-outline"}
                size={24}
                color={fav ? "white" : "#ef4444"}
              />
            </TouchableOpacity>
          </View>

          {/* Prix et stock */}
          <View className="flex-row items-center mt-4 gap-3">
            <Text className="text-[#10b981] text-3xl font-bold">
              {product.prix} MAD
            </Text>
            {product.stock <= 5 && product.stock > 0 && (
              <Text className="text-orange-400 text-sm bg-orange-400/10 px-3 py-1 rounded-full">
                Plus que {product.stock} en stock
              </Text>
            )}
            {product.stock === 0 && (
              <Text className="text-red-400 text-sm bg-red-400/10 px-3 py-1 rounded-full">
                Rupture de stock
              </Text>
            )}
          </View>

          {/* Description */}
          {product.description && (
            <View className="mt-6">
              <Text className="text-white font-bold text-lg mb-2">
                Description
              </Text>
              <Text className="text-gray-400 leading-6 text-base">
                {product.description}
              </Text>
            </View>
          )}

          {/* Quantité */}
          <View className="mt-8">
            <Text className="text-white font-bold text-lg mb-3">Quantité</Text>
            <View className="flex-row items-center gap-4">
              <TouchableOpacity
                onPress={decrement}
                disabled={quantity <= 1}
                className={`w-12 h-12 rounded-xl items-center justify-center ${
                  quantity <= 1 ? "bg-[#1a1a1a]" : "bg-[#2a2a2a]"
                }`}
              >
                <Ionicons
                  name="remove"
                  size={22}
                  color={quantity <= 1 ? "#666" : "#fff"}
                />
              </TouchableOpacity>
              <Text className="text-white text-xl font-bold w-12 text-center">
                {quantity}
              </Text>
              <TouchableOpacity
                onPress={increment}
                disabled={quantity >= product.stock}
                className={`w-12 h-12 rounded-xl items-center justify-center ${
                  quantity >= product.stock ? "bg-[#1a1a1a]" : "bg-[#2a2a2a]"
                }`}
              >
                <Ionicons
                  name="add"
                  size={22}
                  color={quantity >= product.stock ? "#666" : "#fff"}
                />
              </TouchableOpacity>
              <Text className="text-gray-500 text-sm ml-2">
                Stock: {product.stock}
              </Text>
            </View>
          </View>

          {/* Avis */}
          <View className="mt-6">
            <Text className="text-white font-bold text-lg mb-2">Avis</Text>
            <View className="flex-row items-center gap-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <Ionicons
                  key={star}
                  name={star <= 4 ? "star" : "star-outline"}
                  size={18}
                  color="#f59e0b"
                />
              ))}
              <Text className="text-gray-400 text-sm ml-2">(4.0 · 12 avis)</Text>
            </View>
          </View>
        </View>
      </ScrollView>

      {/* Bouton fixe */}
      <View className="px-5 pb-6 pt-3 bg-[#121212] border-t border-[#2a2a2a]">
        <TouchableOpacity
          onPress={handleAdd}
          disabled={product.stock === 0}
          className={`py-4 rounded-2xl items-center justify-center flex-row gap-2 ${
            product.stock === 0 ? "bg-gray-600" : "bg-[#10b981]"
          }`}
        >
          <Ionicons name="cart" size={20} color="#121212" />
          <Text className="text-[#121212] font-bold text-lg">
            {product.stock === 0
              ? "Rupture de stock"
              : `AJOUTER AU PANIER · ${(product.prix * quantity).toFixed(2)} MAD`}
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}