import { useLocalSearchParams, useRouter } from 'expo-router';
import { Text, TouchableOpacity, View } from 'react-native';

export default function OrderConfirmationScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();

  return (
    <View className="flex-1 justify-center items-center p-8 bg-white">
      <Text className="text-6xl mb-5">✅</Text>
      <Text className="text-2xl font-bold mb-4">Commande confirmée !</Text>
      <Text className="text-base text-gray-500 mb-5">N° : #{id}</Text>
      <Text className="text-sm text-gray-500 text-center leading-5 mb-8">
        Votre commande a été enregistrée.{'\n'}
        Livraison estimée : 3 à 5 jours
      </Text>
      <TouchableOpacity
        className="bg-green-500 p-4 rounded-xl w-full items-center mb-3"
        onPress={() => router.push('/(tabs)/orders')}
      >
        <Text className="text-white font-bold text-base">Voir mes commandes</Text>
      </TouchableOpacity>
      <TouchableOpacity
        className="p-4 w-full items-center"
        onPress={() => router.push('/(tabs)')}
      >
        <Text className="text-gray-500">Retour à l'accueil</Text>
      </TouchableOpacity>
    </View>
  );
}