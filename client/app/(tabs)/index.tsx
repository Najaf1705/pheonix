import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { ThemedView } from '@/components/ThemedView'
import { ThemedText } from '@/components/ThemedText'
import { useRouter } from 'expo-router'

const index = () => {
  const router=useRouter();
  return (
    <ScrollView>
      <TouchableOpacity onPress={()=>router.replace('/login')}>
        <ThemedText>Log out</ThemedText>
      </TouchableOpacity>
      <ThemedText className=''>hello</ThemedText>
    </ScrollView>
  )
}

export default index

const styles = StyleSheet.create({})