import { NavigationContainer } from '@react-navigation/native'
import React from 'react'
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { Icon } from 'react-native-elements'
import AccountStack from './AccountStack'
import ProductsStack from './ProductsStack'
import CartStack from './CartStack'
import CustomDrawerContent from './CustomDrawerContent';
import SubastasStack from './SubastasStack';
import CardStack from './CardStack';
import EmepnosStack from './EmepnosStack';


const Drawer = createDrawerNavigator();


export default function Navigation(){

    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <NavigationContainer>
                <Drawer.Navigator
                    initialRouteName="Productos"
                    drawerContent={(props) => <CustomDrawerContent {...props} />}
                    screenOptions={{ headerShown: false }}
                    >
                    <Drawer.Screen name="Productos" component={ProductsStack} />
                    <Drawer.Screen name="Carrito" component={CartStack} />
                    <Drawer.Screen name="Cuenta" component={AccountStack} />
                    <Drawer.Screen name="Empenos" component={EmepnosStack} />
                    <Drawer.Screen name="Subastas" component={SubastasStack} />
                    <Drawer.Screen name="Cards" component={CardStack} />
                </Drawer.Navigator>
            </NavigationContainer>
        </GestureHandlerRootView>
    )
}