import { NotificationType, useNotifications } from '@/context/NotificationsContext';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { Alert, FlatList, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const typeConfig: Record<NotificationType, { icon: any; color: string; bg: string }> = {
  order: { icon: 'cube-outline', color: '#10b981', bg: '#10b98120' },
  promo: { icon: 'pricetag-outline', color: '#f59e0b', bg: '#f59e0b20' },
  system: { icon: 'information-circle-outline', color: '#3b82f6', bg: '#3b82f620' },
};

function formatDate(dateStr: string) {
  const date = new Date(dateStr);
  const now = new Date();
  const diff = now.getTime() - date.getTime();
  const minutes = Math.floor(diff / 60000);
  const hours = Math.floor(diff / 3600000);
  const days = Math.floor(diff / 86400000);

  if (minutes < 1) return 'À l\'instant';
  if (minutes < 60) return `Il y a ${minutes} min`;
  if (hours < 24) return `Il y a ${hours}h`;
  if (days < 7) return `Il y a ${days}j`;
  return date.toLocaleDateString('fr-FR', { day: 'numeric', month: 'short' });
}

export default function NotificationsScreen() {
  const { notifications, unreadCount, markAsRead, markAllAsRead, deleteNotification, clearAll } = useNotifications();
  const router = useRouter();

  const handleClearAll = () => {
    Alert.alert(
      'Tout supprimer',
      'Supprimer toutes les notifications ?',
      [
        { text: 'Annuler', style: 'cancel' },
        { text: 'Supprimer', style: 'destructive', onPress: clearAll },
      ]
    );
  };

  const handlePress = (item: any) => {
    markAsRead(item.id);
    if (item.type === 'order' && item.data?.orderId) {
      router.push(`/order/${item.data.orderId}`);
    }
  };

  const renderItem = ({ item }: { item: any }) => {
    const config = typeConfig[(item.type as NotificationType)] || typeConfig.system;
    return (
      <TouchableOpacity
        onPress={() => handlePress(item)}
        className={`mx-4 mb-3 p-4 rounded-2xl flex-row items-start ${
          item.read ? 'bg-[#1a1a1a]' : 'bg-[#2a2a2a]'
        }`}
      >
        <View
          className="w-10 h-10 rounded-full items-center justify-center mr-3"
          style={{ backgroundColor: config.bg }}
        >
          <Ionicons name={config.icon} size={20} color={config.color} />
        </View>
        <View className="flex-1">
          <Text className="text-white font-bold text-sm mb-1">{item.title}</Text>
          <Text className="text-gray-400 text-xs leading-5 mb-1">{item.body}</Text>
          <Text className="text-gray-500 text-xs">{formatDate(item.createdAt)}</Text>
        </View>
        {!item.read && (
          <View className="w-2.5 h-2.5 rounded-full bg-[#10b981] mt-1" />
        )}
        <TouchableOpacity
          onPress={() => deleteNotification(item.id)}
          className="ml-2 p-1"
        >
          <Ionicons name="close" size={16} color="#666" />
        </TouchableOpacity>
      </TouchableOpacity>
    );
  };

  if (notifications.length === 0) {
    return (
      <SafeAreaView className="flex-1 bg-[#121212] items-center justify-center px-6">
        <View className="w-20 h-20 rounded-full bg-[#2a2a2a] items-center justify-center mb-4">
          <Ionicons name="notifications-outline" size={36} color="#f59e0b" />
        </View>
        <Text className="text-white text-xl font-bold mb-2">Aucune notification</Text>
        <Text className="text-gray-400 text-center">
          Vous recevrez ici les mises à jour de vos commandes et promotions.
        </Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-[#121212]">
      <View className="flex-row items-center justify-between px-4 py-4">
        <View className="flex-row items-center">
          <Text className="text-white text-2xl font-bold mr-2">Notifications</Text>
          {unreadCount > 0 && (
            <View className="bg-[#ef4444] rounded-full px-2.5 py-0.5">
              <Text className="text-white text-xs font-bold">{unreadCount}</Text>
            </View>
          )}
        </View>
        <View className="flex-row gap-4">
          {unreadCount > 0 && (
            <TouchableOpacity onPress={markAllAsRead}>
              <Text className="text-[#10b981] text-sm">Tout lire</Text>
            </TouchableOpacity>
          )}
          <TouchableOpacity onPress={handleClearAll}>
            <Text className="text-red-400 text-sm">Tout supprimer</Text>
          </TouchableOpacity>
        </View>
      </View>
      <FlatList
        data={notifications}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={{ paddingBottom: 20 }}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
}