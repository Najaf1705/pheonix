// storage.js
import AsyncStorage from '@react-native-async-storage/async-storage';
import Storage from 'react-native-storage';

const storage = new Storage({
  // Max capacity
  size: 1000,

  // Backend
  storageBackend: AsyncStorage,

  // Data expires in 1 day (in ms), set to null for never expire
  defaultExpires: 1000 * 3600 * 24,

  // Enable cache
  enableCache: true,
  
  // Sync methods (optional)
  sync: {
    // Example: if data not found, sync it from server
  }
});

export default storage;
