import React, { useState } from 'react'
import { ThemedText } from '@/components/ThemedText'
import { ThemedView } from '@/components/ThemedView'
import { TextInput, TouchableOpacity } from 'react-native'
import { userStore } from '@/store/store'
import { useRouter } from 'expo-router'
import storage from '@/storage/storage'

const Settings = () => {
  const { user, setUser } = userStore();
  const [name, setName] = useState(user?.name ?? '');
  const [editing, setEditing] = useState(!user?.name);
  const router=useRouter();

  const handleSave = async () => {
    if (name.trim()) {
      setUser({
        ...user,
        name: name,
        email: user?.email ?? '',
        shipments: user?.shipments ?? []
      }); // Update in Zustand
      setEditing(false);
      try {
        // console.log("updating name");
        const response = await fetch(`${process.env.EXPO_PUBLIC_BACKEND_URL}/addUserName`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name: name,
            email: user?.email ?? '',
          })
        })
        console.log("response", response);
        if (response.ok) {
          storage.save({
            key: 'user',
            data: {
              ...user,
              name: name
            }
          })
          console.log('User name updated successfully');
          router.replace('/(tabs)');
        }
      } catch (error) {
        console.error('Error updating user name:', error);
      }
    }
  };

  return (
    <ThemedView className="flex-1 p-4">
      {user?.name === " " && (
        <>
          <TextInput
            placeholder="Enter your name"
            value={name}
            onChangeText={setName}
            className="border border-gray-400 rounded px-3 py-2 mb-2"
          />
          <TouchableOpacity
            onPress={handleSave}
            className="bg-indigo-500 rounded px-4 py-2"
          >
            <ThemedText className="text-white text-center font-bold">Save</ThemedText>
          </TouchableOpacity>
        </>
      )}
    </ThemedView>
  )
}

export default Settings