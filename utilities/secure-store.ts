import * as SecureStore from 'expo-secure-store';

export const saveToSecureStore = async (key: string, value: string): Promise<void> => {
  try {
    await SecureStore.setItemAsync(key, value);
  } catch (error) {
    console.error(`SecureStore - Error saving value for key "${key}":`, error);
    throw error;
  }
};

export const getFromSecureStore = async (key: string): Promise<string | null> => {
  try {
    const value = await SecureStore.getItemAsync(key);
    return value;
  } catch (error) {
    console.error(`SecureStore - Error retrieving value for key "${key}":`, error);
    throw error;
  }
};

export const deleteFromSecureStore = async (key: string): Promise<void> => {
  try {
    await SecureStore.deleteItemAsync(key);
  } catch (error) {
    console.error(`SecureStore - Error deleting value for key "${key}":`, error);
    throw error;
  }
};
