import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { FlashList } from '@shopify/flash-list';
import { Text, View } from 'react-native';
import { userStore } from '@/store/store';

type ShipmentStatus = 'Delivered' | 'In Transit' | 'Cancelled';

const statusStyles: Record<ShipmentStatus, string> = {
  "Delivered": 'bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-400',
  'In Transit': 'bg-yellow-100 dark:bg-yellow-900 text-yellow-700 dark:text-yellow-400',
  "Cancelled": 'bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-400',
};

export default function ShipmentHistoryScreen() {
  const {user}=userStore();
  return (
    <ThemedView className="flex-1 bg-bg p-4">
      <FlashList
        data={user?.shipments}
        keyExtractor={(item) => item.id}
        estimatedItemSize={80}
        renderItem={({ item }) => (
          <ThemedView className="bg-card p-5 rounded-2xl mb-4 shadow flex-row items-center">
            <View className="mr-4">
              <Text style={{ fontSize: 32 }}>🚚</Text>
            </View>
            <View className="flex-1">
              <ThemedText className="text-base font-semibold text-text mb-1">
                {item.date}
              </ThemedText>
              <View className="flex-row items-center mb-1">
                <View className={`px-3 py-1 rounded-full mr-2 ${statusStyles[item?.status as ShipmentStatus]}`}>
                  <Text className={`text-xs font-bold ${statusStyles[item?.status as ShipmentStatus].split(' ').filter(c => c.startsWith('text-')).join(' ')}`}>
                    {item.status}
                  </Text>
                </View>
                <ThemedText className="text-sm text-gray-500 dark:text-gray-400">
                  {item.quantity > 0 ? `Quantity: ${item.quantity} tablets` : 'No tablets'}
                </ThemedText>
              </View>
            </View>
          </ThemedView>
        )}
      />
    </ThemedView>
  );
}