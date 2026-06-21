import { getProduitById } from '@/lib/api';
import { Order, Product } from '@/types';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import { ScrollView, Text, View } from 'react-native';

const STATUS_CONFIG: Record<string, { label: string; color: string; bg: string }> = {
  PENDING:   { label: '⏳ En attente', color: 'text-yellow-600', bg: 'bg-yellow-100' },
  CONFIRMED: { label: '✅ Confirmé',   color: 'text-blue-600',   bg: 'bg-blue-100' },
  SHIPPED:   { label: '🚚 Expédié',    color: 'text-orange-600', bg: 'bg-orange-100' },
  DELIVERED: { label: '📦 Livré',      color: 'text-green-600',  bg: 'bg-green-100' },
  CANCELLED: { label: '❌ Annulé',     color: 'text-red-600',    bg: 'bg-red-100' },
};

export default function OrderDetailScreen() {
  const { id } = useLocalSearchParams();
  const [order, setOrder] = useState<Order | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadOrder();
  }, [id]);

  const loadOrder = async () => {
    try {
      const ordersJson = await AsyncStorage.getItem('orders');
      if (ordersJson) {
        const orders: Order[] = JSON.parse(ordersJson);
        const found = orders.find(o => o.id === id);
        if (found) {
          setOrder(found);
          await loadProducts(found.produitIds);
        }
      }
    } catch (e) {
      console.log('Erreur', e);
    } finally {
      setLoading(false);
    }
  };

  const loadProducts = async (ids: string[]) => {
    const loaded: Product[] = [];
    for (const pid of ids) {
      try {
        const res = await getProduitById(pid);
        loaded.push(res.data);
      } catch (e) {
        console.log('Erreur produit', e);
      }
    }
    setProducts(loaded);
  };

  if (loading) {
    return (
      <View className="flex-1 justify-center items-center bg-gray-100">
        <Text className="text-gray-500">Chargement...</Text>
      </View>
    );
  }

  if (!order) {
    return (
      <View className="flex-1 justify-center items-center bg-gray-100">
        <Text className="text-gray-500">Commande non trouvée</Text>
      </View>
    );
  }

  const status = STATUS_CONFIG[order.statut];

  return (
    <ScrollView className="flex-1 bg-gray-100">
      {/* Header */}
      <View className="bg-white p-5 border-b border-gray-200">
        <Text className="text-2xl font-bold mb-3">Commande</Text>
        <View className={`self-start px-4 py-2 rounded-full ${status.bg}`}>
          <Text className={`font-bold ${status.color}`}>{status.label}</Text>
        </View>
        <Text className="text-gray-500 mt-3">
          {new Date(order.dateCommande).toLocaleString('fr-FR')}
        </Text>
      </View>

      {/* Articles */}
      <View className="bg-white mt-3 p-5">
        <Text className="font-bold text-lg mb-4">📦 Articles ({products.length})</Text>
        {products.map((p, i) => (
          <View key={i} className="flex-row items-center mb-4 pb-4 border-b border-gray-100">
            <View className="w-16 h-16 bg-gray-200 rounded-lg mr-4" />
            <View className="flex-1">
              <Text className="font-semibold text-base">{p.nom}</Text>
              <Text className="text-green-600 font-bold">{p.prix} MAD</Text>
            </View>
          </View>
        ))}
      </View>

      {/* Récap */}
      <View className="bg-white mt-3 p-5 mb-5">
        <Text className="font-bold text-lg mb-3">💰 Récapitulatif</Text>
        <View className="flex-row justify-between mb-2">
          <Text className="text-gray-600">Sous-total</Text>
          <Text>{order.total.toFixed(2)} MAD</Text>
        </View>
        <View className="flex-row justify-between mb-2">
          <Text className="text-gray-600">Livraison</Text>
          <Text className="text-green-600">Gratuite</Text>
        </View>
        <View className="border-t border-gray-200 mt-3 pt-3 flex-row justify-between">
          <Text className="font-bold text-lg">Total</Text>
          <Text className="font-bold text-xl text-green-600">{order.total.toFixed(2)} MAD</Text>
        </View>
      </View>
    </ScrollView>
  );
}