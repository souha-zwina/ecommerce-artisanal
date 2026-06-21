import { Product } from "@/types";
import { formatPrice } from "@/lib/utils";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import {
  View, Text, FlatList, TouchableOpacity, Image, ActivityIndicator,
} from "react-native";

const PLACEHOLDER = "https://via.placeholder.com/300x300/282828/1DB954?text=Artisan";

interface Props {
  isLoading: boolean;
  isError: boolean;
  products: Product[];
}

const ProductsGrid = ({ products, isLoading, isError }: Props) => {
  if (isLoading) {
    return (
      <View className="py-20 items-center justify-center">
        <ActivityIndicator size="large" color="#1DB954" />
        <Text className="text-text-secondary mt-4">Chargement des produits...</Text>
      </View>
    );
  }

  if (isError) {
    return (
      <View className="py-20 items-center justify-center">
        <Ionicons name="alert-circle-outline" size={48} color="#FF6B6B" />
        <Text className="text-text-primary font-semibold mt-4">Impossible de charger</Text>
        <Text className="text-text-secondary text-sm mt-2">
          Vérifiez que le backend Spring Boot est démarré
        </Text>
      </View>
    );
  }

  const renderItem = ({ item }: { item: Product }) => {
    const imgUri = item.imageUrl?.startsWith("http") ? item.imageUrl : PLACEHOLDER;
    const inStock = item.stock > 0;

    return (
      <TouchableOpacity
        className="bg-surface rounded-3xl overflow-hidden mb-3"
        style={{ width: "48%" }}
        activeOpacity={0.85}
        onPress={() => router.push(`/product/${item.id}`)}
      >
        {/* Image */}
        <View className="relative">
          <Image
            source={{ uri: imgUri }}
            className="w-full h-44 bg-background-lighter"
            resizeMode="cover"
          />
          {!inStock && (
            <View className="absolute top-0 left-0 right-0 bottom-0 bg-black/50 items-center justify-center">
              <Text className="text-white font-bold text-xs">Rupture</Text>
            </View>
          )}
        </View>

        {/* Infos */}
        <View className="p-3">
          {item.categorie ? (
            <Text className="text-text-secondary text-xs mb-1">{item.categorie}</Text>
          ) : null}
          <Text className="text-text-primary font-bold text-sm mb-2" numberOfLines={2}>
            {item.nom}
          </Text>
          <View className="flex-row items-center justify-between">
            <Text className="text-primary font-bold text-base">{formatPrice(item.prix)}</Text>
            <TouchableOpacity
              className="bg-primary rounded-full w-8 h-8 items-center justify-center"
              activeOpacity={0.7}
              disabled={!inStock}
              onPress={() => router.push(`/product/${item.id}`)}
            >
              <Ionicons name="add" size={18} color="#121212" />
            </TouchableOpacity>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <FlatList
      data={products}
      renderItem={renderItem}
      keyExtractor={(item) => item.id}
      numColumns={2}
      columnWrapperStyle={{ justifyContent: "space-between" }}
      showsVerticalScrollIndicator={false}
      scrollEnabled={false}
      ListEmptyComponent={
        <View className="py-20 items-center justify-center">
          <Ionicons name="search-outline" size={48} color="#666" />
          <Text className="text-text-primary font-semibold mt-4">Aucun produit trouvé</Text>
          <Text className="text-text-secondary text-sm mt-2">Ajustez vos filtres</Text>
        </View>
      }
    />
  );
};

export default ProductsGrid;
