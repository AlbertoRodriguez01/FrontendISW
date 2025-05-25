import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { DrawerContentScrollView } from '@react-navigation/drawer';
import { Icon } from 'react-native-elements';

export default function CustomDrawerContent(props) {
  const [showConfigMenu, setShowConfigMenu] = useState(false);
  const currentRoute = props.state.routeNames[props.state.index];

  const isActive = (routeName) => currentRoute === routeName;

  const DrawerItem = ({ label, iconName, route }) => (
    <TouchableOpacity onPress={() => props.navigation.navigate(route)}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          paddingVertical: 12,
          paddingHorizontal: 20,
          backgroundColor: isActive(route) ? '#e0e0e0' : 'transparent',
        }}
      >
        <Icon
          name={iconName}
          type="material-community"
          size={22}
          color={isActive(route) ? '#2196f3' : '#555'}
        />
        <Text style={{ marginLeft: 20, fontSize: 16, color: '#333' }}>{label}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <DrawerContentScrollView {...props}>
      <DrawerItem label="Productos" iconName="collage" route="Productos" />
      <DrawerItem label="Empeños" iconName="hand-coin" route="Empenos" />
      <DrawerItem label="Subastas" iconName="hand-front-right" route="Subastas" />
      <DrawerItem label="Carrito" iconName="cart-variant" route="Carrito" />
      

      {/* Menú con subopciones */}
      <TouchableOpacity onPress={() => setShowConfigMenu(!showConfigMenu)}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            paddingVertical: 12,
            paddingHorizontal: 20,
          }}
        >
          <Icon
            name="cog-outline"
            type="material-community"
            size={22}
            color="#555"
          />
          <Text style={{ marginLeft: 20, fontSize: 16, color: '#333' }}>Configuración</Text>
          <Icon
            name={showConfigMenu ? 'chevron-up' : 'chevron-down'}
            type="material-community"
            size={22}
            color="#777"
            style={{ marginLeft: 'auto' }}
          />
        </View>
      </TouchableOpacity>

      {showConfigMenu && (
        <View style={{ paddingLeft: 60 }}>
          <DrawerItem label="Cuenta" iconName="account" route="Cuenta" />
          <DrawerItem label="Agregar Tarjeta" iconName="card-bulleted-outline" route="Cards" />
        </View>
      )}
    </DrawerContentScrollView>
  );
}