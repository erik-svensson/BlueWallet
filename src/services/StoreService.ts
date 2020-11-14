import AsyncStorage from '@react-native-community/async-storage';

export default class StoreService {
  async getStoreValue(key: string): Promise<string | null> {
    try {
      const value = await AsyncStorage.getItem(key);
      return value;
    } catch (_) {
      return '';
    }
  }

  async setStoreValue(key: string, value: string): Promise<void> {
    await AsyncStorage.setItem(key, JSON.stringify(value));
    return;
  }
}
