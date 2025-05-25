import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { Icon } from "react-native-elements";
import { DrawerActions, useNavigation } from "@react-navigation/native";
import SubastasScreen from "../screens/SubastasScreen";

const Stack = createStackNavigator()

export default function SubastasStack () {

    const navigation = useNavigation()

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
        <Stack.Screen
            name="Subastas"
            component={SubastasScreen}
            options={{title: "Subastas"}}
        />
        </Stack.Navigator>
    )
}