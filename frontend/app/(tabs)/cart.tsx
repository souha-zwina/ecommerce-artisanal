import { useCart } from '@/context/CartContext';
import { useRouter } from 'expo-router';
import { FlatList, Image, Text, TouchableOpacity, View } from 'react-native';

export default function CartScreen() {
  const { items, removeItem, updateQuantity, total, itemCount } = useCart();
  const router = useRouter();

  if (items.length === 0) {
    return (
      <View className="flex-1 justify-center items-center p-5 bg-white">
        <Text className="text-lg text-gray-500 mb-5">🛒 Votre panier est vide</Text>
        <TouchableOpacity
          className="bg-green-500 px-6 py-3 rounded-lg"
          onPress={() => router.push('/(tabs)')}
        >
          <Text className="text-white font-bold">Parcourir le catalogue</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-white">
      <Text className="text-xl font-bold p-4 border-b border-gray-200">
        Panier ({itemCount} articles)
      </Text>

      <FlatList
        data={items}
        keyExtractor={item => item.productId}
        renderItem={({ item }) => (
          <View className="flex-row p-4 border-b border-gray-100 items-center">
            <Image source={{ uri: item.imageUrl }} className="w-16 h-16 rounded-lg bg-gray-100" />
            <View className="flex-1 ml-3">
              <Text className="font-semibold text-base">{item.nom}</Text>
              <Text className="text-green-600 font-medium">{item.prix} MAD</Text>
            </View>
            <View className="flex-row items-center mr-3">
              <TouchableOpacity onPress={() => updateQuantity(item.productId, item.quantity - 1)}
                className="w-8 h-8 bg-gray-100 rounded-full justify-center items-center">
                <Text className="text-lg font-bold">−</Text>
              </TouchableOpacity>
              <Text className="mx-3 min-w-[24px] text-center font-medium">{item.quantity}</Text>
              <TouchableOpacity onPress={() => updateQuantity(item.productId, item.quantity + 1)}
                className="w-8 h-8 bg-gray-100 rounded-full justify-center items-center">
                <Text className="text-lg font-bold">+</Text>
              </TouchableOpacity>
            </View>
            <TouchableOpacity onPress={() => removeItem(item.productId)}>
              <Text className="text-xl">🗑️</Text>
            </TouchableOpacity>
          </View>
        )}
      />

      <View className="border-t-2 border-gray-200 p-4 bg-white">
        <View className="flex-row justify-between mb-4">
          <Text className="text-lg font-semibold">Total :</Text>
          <Text className="text-xl font-bold text-green-600">{total.toFixed(2)} MAD</Text>
        </View>
        <TouchableOpacity
          className="bg-green-500 p-4 rounded-xl items-center"
          onPress={() => router.push('/checkout')}
        >
          <Text className="text-white font-bold text-base">Passer la commande →</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}