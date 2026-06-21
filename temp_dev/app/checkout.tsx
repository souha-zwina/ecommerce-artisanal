// app/checkout.tsx — VERSION FINALE AVEC SAUVEGARDE
import { useCart } from '@/context/CartContext';
import { creerCommande } from '@/lib/api';
import { OrderStatus } from '@/types';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Alert, Platform, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function CheckoutScreen() {
  const { items, total, clearCart } = useCart();
  const router = useRouter();

  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [phone, setPhone] = useState('');
  const [loading, setLoading] = useState(false);

  const handleOrder = async () => {
    if (!address.trim() || !city.trim() || !phone.trim()) {
      Alert.alert('Champs manquants', 'Remplis tous les champs');
      return;
    }

    const userJson = await AsyncStorage.getItem('@user');
    if (!userJson) {
      Alert.alert('Erreur', 'Vous devez être connecté');
      return;
    }
    const user = JSON.parse(userJson);

    setLoading(true);
    try {
      // Créer la commande
      const newOrder = {
        id: `cmd-${Date.now()}`,
        utilisateurId: user.id,
        produitIds: items.map(i => i.productId),
        total: total,
        statut: 'PENDING' as OrderStatus,
        dateCommande: new Date().toISOString(),
      };

      // Essayer API (optionnel)
      try {
        await creerCommande({
          utilisateurId: user.id,
          produitIds: items.map(i => i.productId),
          total: total,
          statut: 'PENDING',
        });
      } catch (e) {
        console.log("API indisponible, mode hors-ligne");
      }

      // SAUVEGARDER dans AsyncStorage (HISTORIQUE)
      const savedOrders = await AsyncStorage.getItem('orders');
      const orders = savedOrders ? JSON.parse(savedOrders) : [];
      orders.unshift(newOrder);
      await AsyncStorage.setItem('orders', JSON.stringify(orders));

      clearCart();
      router.push(`/order-confirmation?id=${newOrder.id}`);

    } catch (error: any) {
      Alert.alert('Erreur', 'Impossible de passer la commande');
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  if (items.length === 0) {
    return (
      <View className="flex-1 justify-center items-center bg-white">
        <Text className="text-gray-500">Panier vide</Text>
      </View>
    );
  }

  return (
    <ScrollView className="flex-1 bg-white p-5">
      <Text className="text-2xl font-bold mb-6">📦 Livraison</Text>

      <Text className="font-semibold mb-2 mt-4">Adresse complète</Text>
      <TextInput className="border border-gray-300 rounded-lg p-3 text-base bg-gray-50" value={address} onChangeText={setAddress} placeholder="Rue, immeuble, n°..." multiline />

      <Text className="font-semibold mb-2 mt-4">Ville</Text>
      <TextInput className="border border-gray-300 rounded-lg p-3 text-base bg-gray-50" value={city} onChangeText={setCity} placeholder="Casablanca, Rabat..." />

      <Text className="font-semibold mb-2 mt-4">Téléphone</Text>
      <TextInput className="border border-gray-300 rounded-lg p-3 text-base bg-gray-50" value={phone} onChangeText={setPhone} placeholder="06 XX XX XX XX" keyboardType="phone-pad" />

      <View className="bg-gray-100 p-4 rounded-xl mt-6 mb-5">
        <Text className="font-bold text-lg mb-3">📝 Résumé</Text>
        {items.map(item => (
          <View key={item.productId} className="flex-row justify-between mb-2">
            <Text className="text-gray-600">{item.quantity}x {item.nom}</Text>
            <Text>{(item.prix * item.quantity).toFixed(2)} MAD</Text>
          </View>
        ))}
        <View className="flex-row justify-between mt-3 pt-3 border-t border-gray-300">
          <Text className="font-bold text-lg">Total</Text>
          <Text className="font-bold text-lg text-green-600">{total.toFixed(2)} MAD</Text>
        </View>
      </View>

      {Platform.OS === "web" ? (
        <button
          onClick={loading ? undefined : handleOrder}
          disabled={loading}
          style={{
            width: "100%", padding: "16px", borderRadius: "12px", border: "none",
            backgroundColor: loading ? "#9CA3AF" : "#22C55E",
            color: "#fff", fontWeight: "bold", fontSize: "16px",
            cursor: loading ? "not-allowed" : "pointer",
          }}
        >
          {loading ? 'Traitement...' : 'Confirmer la commande'}
        </button>
      ) : (
        <TouchableOpacity className={`p-4 rounded-xl items-center mb-8 ${loading ? 'bg-gray-400' : 'bg-green-500'}`} onPress={handleOrder} disabled={loading}>
          <Text className="text-white font-bold text-base">{loading ? 'Traitement...' : 'Confirmer la commande'}</Text>
        </TouchableOpacity>
      )}
    </ScrollView>
  );
}