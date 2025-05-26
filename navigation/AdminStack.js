import React, { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import { getCurrentUser } from '../actions';
import { Icon } from 'react-native-elements';
import AddProductForm from '../components/AddProuctForm';
import { createStackNavigator } from '@react-navigation/stack';
import { useNavigation, DrawerActions } from '@react-navigation/native';

const Stack = createStackNavigator();

export default function AdminStack() {
  const [loading, setLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState(null);

  const navigation = useNavigation()

  useEffect(() => {
    const fetchUser = async () => {
      const user = await getCurrentUser();
      setCurrentUser(user);
      setLoading(false);
    };
    fetchUser();
  }, []);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#2196f3" />
      </View>
    );
  }

  if (!currentUser || currentUser.role !== 'admin') {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text style={{ fontSize: 18, color: '#f00' }}>Acceso denegado.</Text>
      </View>
    );
  }

  return (
    <Stack.Navigator
            screenOptions={{
                headerLeft: () => {
                    return(
                        <Icon
                            name="menu"
                            size={30}
                            color="#000"
                            onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
                        />
                    )
                }
            }}
        >
      <Stack.Screen name="AddProd" component={AddProductForm}  options={{title: "Agregar Productos"}}/>
    </Stack.Navigator>
  );
}
