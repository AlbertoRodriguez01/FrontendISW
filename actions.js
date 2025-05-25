import AsyncStorage from '@react-native-async-storage/async-storage'

export const getCurrentUser = async () => {
  const user = await AsyncStorage.getItem('user')
  return user ? JSON.parse(user) : null
}

export const closeSession = async () => {
  await AsyncStorage.removeItem('user')
}