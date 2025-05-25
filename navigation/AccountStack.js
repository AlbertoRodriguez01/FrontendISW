import { createStackNavigator } from '@react-navigation/stack'
import React from 'react'
import Account from '../screens/account/Account'
import Login from '../screens/account/Login'
import Register from '../screens/account/Register'

import { Icon } from 'react-native-elements'
import { DrawerActions, useNavigation } from '@react-navigation/native'
import UserLogged from '../screens/account/UserLogged'


const Stack = createStackNavigator()

export default function AccountStack() {

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
            name="Account"
            component={Account}
            options={{title: "Cuenta"}}
        />
        <Stack.Screen
        name="Login"
        component={Login}
        options={({ navigation }) => ({
          title: "Iniciar Sesion",
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
      <Stack.Screen
        name="Register"
        component={Register}
        options={({ navigation }) => ({
          title: "Registrarse",
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
      <Stack.Screen
            name="UserLogged"
            component={UserLogged}
            options={{title: "Cuenta"}}
        />
    </Stack.Navigator>
  )
}