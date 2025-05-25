import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { Icon } from 'react-native-elements'
import { DrawerActions, useNavigation } from '@react-navigation/native'
import Cards from '../screens/Crads'

const Stack = createStackNavigator()

export default function CardStack() {

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
              name="Cards"
              component={Cards}
              options={{title: "Tarjetas"}}
          />
          
      </Stack.Navigator>
    )
}