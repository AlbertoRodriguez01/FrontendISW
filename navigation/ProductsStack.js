import { createStackNavigator } from '@react-navigation/stack'
import React from 'react'
import Products from '../screens/products/Products'
import Producto from '../screens/products/Producto'
import { Icon } from 'react-native-elements'
import { DrawerActions, useNavigation } from '@react-navigation/native'


const Stack = createStackNavigator()

export default function ProductsStack() {

  const navigation = useNavigation()

  return(
    <Stack.Navigator
      screenOptions={({ navigation }) => ({
        headerLeft: () => (
          <Icon
            name="menu"
            size={30}
            color="#000"
            onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
          />
        ),
      })}
    >
        <Stack.Screen
            name="Products"
            component={Products}
            options={{title: "Productos"}}
        />
        <Stack.Screen
        name="Producto"
        component={Producto}
        options={({ navigation }) => ({
          title: "Detalle del producto",
          headerLeft: () => (
            <Icon
              type="material-community"
              name="arrow-left-drop-circle-outline"
              size={30}
              color="#000"
              onPress={() => navigation.goBack()}
            />
          ),
        })}
      />
    </Stack.Navigator>
  )
}