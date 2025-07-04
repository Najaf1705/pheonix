import { ThemedView } from '@/components/ThemedView'
import { ThemedText } from '@/components/ThemedText'
import { View, Text, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { userStore } from '@/store/store';

export default function DashboardScreen() {
  const { user } = userStore();
  const router = useRouter();
  const userData = {
    patientId: 'P123456',
    currentPlan: 'Monthly Subscription',
    nextDelivery: '2025-07-15',
    remainingMeds: '12 tablets',
    status: 'Active',
    billingStatus: 'OK',
  };

  return (
    <ThemedView className="flex-1 p-4 justify-center">
      <ThemedView className="p-6 rounded-2xl shadow-md shadow-black dark:shadow-white mb-6 bg-card">
        {/* Profile */}
        <View className="flex-row items-center space-x-4 mb-2">
          <ThemedView className="bg-blue-100 dark:bg-blue-900 rounded-full w-16 h-16 items-center justify-center">
            <ThemedText className="text-3xl">👤</ThemedText>
          </ThemedView>
          <ThemedView className="flex-1">
            {user?.name!==" " ? (
              <ThemedText className="text-xl font-bold text-text">{`${user?.name ?? ''}`}</ThemedText>
            ): (
              <TouchableOpacity
                className="self-start"
                onPress={() => router.replace('/(tabs)/settings')}
              >
                <Text className="bg-indigo-300 font-bold px-2 py-1 rounded-md">
                  + Add name
                </Text>
              </TouchableOpacity>
            )}
            <ThemedText className="text-sm text-gray-500 dark:text-gray-400 mt-1">
              Patient ID: <ThemedText className="font-semibold">{userData.patientId}</ThemedText>
            </ThemedText>
          </ThemedView>
        </View>

        {/* Divider */}
        <View className="h-px bg-gray-300 my-4 dark:bg-gray-700" />

        {/* Plan & Delivery */}
        <ThemedText className="text-base text-gray-500 dark:text-gray-400 mb-2">Current Plan</ThemedText>
        <ThemedText className="text-lg font-semibold text-text mb-4">{userData.currentPlan}</ThemedText>
        <ThemedText className="text-base text-gray-500 dark:text-gray-400 mb-1">Next Delivery</ThemedText>
        <ThemedText className="text-lg font-semibold text-text mb-4">{userData.nextDelivery}</ThemedText>
        <ThemedText className="text-base text-gray-500 dark:text-gray-400 mb-1">Remaining Medication</ThemedText>
        <ThemedText className="text-lg font-semibold text-text mb-4">{userData.remainingMeds}</ThemedText>

        {/* Divider */}
        <View className="h-px bg-gray-300 my-4 dark:bg-gray-700" />

        {/* Status Summary */}
        <View className="flex-row items-center justify-between">
          <ThemedView>
            <ThemedText className="text-base text-gray-500 dark:text-gray-400 mb-1">Status</ThemedText>
            <View className={`px-3 py-1 rounded-full ${userData.status === 'Active' ? 'bg-green-100 dark:bg-green-900' : 'bg-red-100 dark:bg-red-900'}`}>
              <Text className={`font-semibold ${userData.status === 'Active' ? 'text-green-700 dark:text-green-400' : 'text-red-700 dark:text-red-400'}`}>
                {userData.status}
              </Text>
            </View>
          </ThemedView>
          <ThemedView>
            <ThemedText className="text-base text-gray-500 dark:text-gray-400 mb-1">Billing</ThemedText>
            <View className={`px-3 py-1 rounded-full ${userData.billingStatus === 'OK' ? 'bg-green-100 dark:bg-green-900' : 'bg-yellow-100 dark:bg-yellow-900'}`}>
              <Text className={`font-semibold ${userData.billingStatus === 'OK' ? 'text-green-700 dark:text-green-400' : 'text-yellow-700 dark:text-yellow-400'}`}>
                {userData.billingStatus}
              </Text>
            </View>
          </ThemedView>
        </View>
      </ThemedView>
    </ThemedView>
  );
}