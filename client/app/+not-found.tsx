import { Link, Stack } from 'expo-router';
import { StyleSheet, View } from 'react-native';

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

import { useCounterStore } from '@/store/store';

export default function NotFoundScreen() {
  const { count, increment, decrement } = useCounterStore();
  return (
    <>
      <Stack.Screen options={{ title: 'Oops!' }} />
      <ThemedView style={styles.container}>
        <ThemedText type="title">This screen does not exist.</ThemedText>
        <ThemedText type='title'>
          {count}
        </ThemedText>
        <View style={{display: 'flex', flexDirection: 'row',}}>
          <ThemedText type="defaultSemiBold" onPress={increment}>
            {`Increment  `}
          </ThemedText>
          <ThemedText type="defaultSemiBold" onPress={decrement}>
            {`  Decrement`}
          </ThemedText>
        </View>
        <Link href="/" style={styles.link}>
          <ThemedText type="link">Go to home screen!</ThemedText>
        </Link>
      </ThemedView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  link: {
    marginTop: 15,
    paddingVertical: 15,
  },
});
