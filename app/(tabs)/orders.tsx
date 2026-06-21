// app/(tabs)/orders.tsx — VERSION CORRIGÉE
import { getCommandesUtilisateur } from '@/lib/api';
import { Order, OrderStatus } from '@/types';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect, useRouter } from 'expo-router';
import { useCallback, useState } from 'react';
import { FlatList, RefreshControl, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const STATUS_CONFIG: Record<OrderStatus, { color: string; bg: string; label: string; icon: string }> = {
  PENDING:    { color: 'text-yellow-600', bg: 'bg-yellow-100', label: 'En attente', icon: '⏳' },
  CONFIRMED:  { color: 'text-blue-600',    bg: 'bg-blue-100',    label: 'Confirmé',  icon: '✅' },
  SHIPPED:    { color: 'text-orange-600',  bg: 'bg-orange-100',  label: 'Expédié',   icon: '🚚' },
  DELIVERED:  { color: 'text-green-600',   bg: 'bg-green-100',   label: 'Livré',     icon: '📦' },
  CANCELLED:  { color: 'text-red-600',     bg: 'bg-red-100',     label: 'Annulé',    icon: '❌' },
};

const MOCK_ORDERS: Order[] = [
  {
    id: "cmd-1",
    utilisateurId: "user-123",
    produitIds: ["prod-1", "prod-2"],
    total: 1450,
    statut: "DELIVERED",
    dateCommande: "2024-01-15T10:00:00Z",
  },
  {
    id: "cmd-2",
    utilisateurId: "user-123",
    produitIds: ["prod-5"],
    total: 450,
    statut: "SHIPPED",
    dateCommande: "2024-01-20T14:30:00Z",
  },
  {
    id: "cmd-3",
    utilisateurId: "user-123",
    produitIds: ["prod-6"],
    total: 320,
    statut: "PENDING",
    dateCommande: "2024-01-25T09:15:00Z",
  },
];

const USE_MOCK = true;

export default function OrdersScreen() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const loadOrders = async () => {
    setLoading(true);
    try {
      if (USE_MOCK) {
        const localOrders = await AsyncStorage.getItem('orders');
        if (localOrders) {
          const parsed = JSON.parse(localOrders);
          const merged = [...parsed, ...MOCK_ORDERS].filter((o, i, a) => 
            a.findIndex(t => t.id === o.id) === i
          );
          setOrders(merged);
        } else {
          setOrders(MOCK_ORDERS);
        }
        await new Promise(resolve => setTimeout(resolve, 500));
        setLoading(false);
        return;
      }

      const userJson = await AsyncStorage.getItem('@user');
      if (!userJson) {
        setOrders([]);
        setLoading(false);
        return;
      }
      const user = JSON.parse(userJson);
      
      const response = await getCommandesUtilisateur(user.id);
      setOrders(response.data);
      
      await AsyncStorage.setItem('orders', JSON.stringify(response.data));
    } catch (error) {
      console.log('Erreur chargement commandes', error);
      const localOrders = await AsyncStorage.getItem('orders');
      if (localOrders) {
        setOrders(JSON.parse(localOrders));
      } else {
        setOrders(MOCK_ORDERS);
      }
    } finally {
      setLoading(false);
    }
  };

  useFocusEffect(useCallback(() => { loadOrders(); }, []));

  return (
    <SafeAreaView className="flex-1 bg-gray-100">
      {/* Header avec retour */}
      <View className="flex-row items-center px-4 py-3 bg-white">
        <TouchableOpacity onPress={() => router.back()} className="mr-3">
          <Ionicons name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>
        <Text className="text-xl font-bold text-gray-900">📋 Mes commandes</Text>
      </View>

      <FlatList
        data={orders}
        renderItem={({ item }) => {
          const status = STATUS_CONFIG[item.statut];
          return (
            <TouchableOpacity
              className="bg-white mx-4 mt-3 p-5 rounded-xl shadow-sm"
              onPress={() => router.push(`/(tabs)/order/${item.id}`)} // ← CORRIGÉ : navigation dans les tabs
            >
              <View className="flex-row justify-between items-center mb-2">
                <Text className="font-bold text-base text-gray-900">Commande #{item.id.slice(0, 8)}</Text>
                <View className={`px-3 py-1 rounded-full ${status.bg}`}>
                  <Text className={`text-xs font-bold ${status.color}`}>
                    {status.icon} {status.label}
                  </Text>
                </View>
              </View>
              <Text className="text-gray-500 text-sm mb-1">
                {new Date(item.dateCommande).toLocaleDateString('fr-FR')}
              </Text>
              <Text className="text-green-600 font-bold text-lg">{item.total.toFixed(2)} MAD</Text>
              <Text className="text-gray-400 text-xs mt-1">{item.produitIds.length} article(s)</Text>
            </TouchableOpacity>
          );
        }}
        keyExtractor={item => item.id}
        refreshControl={<RefreshControl refreshing={loading} onRefresh={loadOrders} />}
        ListEmptyComponent={
          <View className="items-center p-10">
            <Text className="text-gray-400 mb-5">Aucune commande</Text>
            <TouchableOpacity
              className="bg-green-500 px-5 py-3 rounded-lg"
              onPress={() => router.push('/(tabs)')}
            >
              <Text className="text-white font-bold">Faire des achats</Text>
            </TouchableOpacity>
          </View>
        }
      />
    </SafeAreaView>
  );
}