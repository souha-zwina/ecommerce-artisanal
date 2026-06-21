import { useCart } from '@/context/CartContext';
import { useFavorites } from '@/context/FavoritesContext';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { Alert, FlatList, Image, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function FavoritesScreen() {
  const { favorites, removeFavorite, clearFavorites } = useFavorites();
  const { addItem } = useCart();
  const router = useRouter();

  const handleAddToCart = (item: any) => {
    addItem({
      id: item.id,
      nom: item.name,
      imageUrl: item.image,
      prix: item.price,
    });
  };

  const handleClearAll = () => {
    Alert.alert(
      'Vider les favoris',
      'Êtes-vous sûr de vouloir supprimer tous vos favoris ?',
      [
        { text: 'Annuler', style: 'cancel' },
        { text: 'Supprimer', style: 'destructive', onPress: clearFavorites },
      ]
    );
  };

  const renderItem = ({ item }: { item: any }) => (
    <TouchableOpacity
      onPress={() => router.push(`/product/${item.id}`)}
      className="bg-[#2a2a2a] rounded-2xl p-4 mb-3 mx-4 flex-row items-center"
    >
      <Image
        source={{ uri: item.image }}
        className="w-20 h-20 rounded-xl"
        resizeMode="cover"
      />
      <View className="flex-1 ml-4">
        <Text className="text-white font-bold text-base" numberOfLines={1}>{item.name}</Text>
        <Text className="text-[#10b981] font-bold mt-1">{item.price.toFixed(2)} MAD</Text>
        <Text className="text-gray-400 text-xs mt-1">{item.category}</Text>
      </View>
      <View className="gap-2">
        <TouchableOpacity
          onPress={() => handleAddToCart(item)}
          className="bg-[#10b981] w-10 h-10 rounded-full items-center justify-center"
        >
          <Ionicons name="cart-outline" size={18} color="white" />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => removeFavorite(item.id)}
          className="bg-red-500/20 w-10 h-10 rounded-full items-center justify-center"
        >
          <Ionicons name="heart-dislike" size={18} color="#ef4444" />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );

  if (favorites.length === 0) {
    return (
      <SafeAreaView className="flex-1 bg-[#121212] items-center justify-center px-6">
        <View className="w-20 h-20 rounded-full bg-[#2a2a2a] items-center justify-center mb-4">
          <Ionicons name="heart-outline" size={36} color="#ef4444" />
        </View>
        <Text className="text-white text-xl font-bold mb-2">Aucun favori</Text>
        <Text className="text-gray-400 text-center mb-6">
          Explorez le catalogue et ajoutez vos produits préférés ici !
        </Text>
        <TouchableOpacity
          onPress={() => router.push('/(tabs)')}
          className="bg-[#10b981] px-8 py-3 rounded-full"
        >
          <Text className="text-white font-bold">Explorer le catalogue</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-[#121212]">
      <View className="flex-row items-center justify-between px-4 py-4">
        <Text className="text-white text-2xl font-bold">Mes Favoris</Text>
        <TouchableOpacity onPress={handleClearAll}>
          <Text className="text-red-400 text-sm">Tout supprimer</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={favorites}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        contentContainerStyle={{ paddingBottom: 20 }}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
}