import { createStackNavigator } from '@react-navigation/stack'
import React from 'react'
import Cart from '../screens/cart/Cart'

import { Icon } from 'react-native-elements'
import { DrawerActions, useNavigation } from '@react-navigation/native'
import PayCart from '../screens/cart/PayCart'


const Stack = createStackNavigator()

export default function CartStack() {

  const navigation = useNavigation()

  return(
    <Stack.Navigator
          screenOptions={{
            headerLeft: () => {
              return(
                <Icon
                  name='menu'
                  size={30}
                  color='#000'
                  onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
                />
              )
            }
          }}
        >
        <Stack.Screen
            name="Cart"
            component={Cart}
            options={{title: "Carrito"}}
        />
        <Stack.Screen
            name="PayCart"
            component={PayCart}
            options={({ navigation }) => ({
              title: "Pago del Carrito",
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