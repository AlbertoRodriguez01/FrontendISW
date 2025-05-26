import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, ActivityIndicator } from 'react-native';
import { DrawerContentScrollView } from '@react-navigation/drawer';
import { Icon } from 'react-native-elements';
import { getCurrentUser } from '../actions';

export default function CustomDrawerContent(props) {
  const [showConfigMenu, setShowConfigMenu] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [loadingUser, setLoadingUser] = useState(true);
  const currentRoute = props.state.routeNames[props.state.index];

  useEffect(() => {
    const fetchUser = async () => {
      const user = await getCurrentUser();
      console.log(user)
      setCurrentUser(user);
      setLoadingUser(false);
    };
    fetchUser();
  }, []);

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

  // Si está cargando el usuario, muestra un loader
  if (loadingUser) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 }}>
        <ActivityIndicator size="large" color="#2196f3" />
      </View>
    );
  }

  // Si no hay usuario logueado (por seguridad), no mostrar drawer
  if (!currentUser) {
    return null;
  }

  return (
    <DrawerContentScrollView {...props}>
      <DrawerItem label="Productos" iconName="collage" route="Productos" />
      <DrawerItem label="Empeños" iconName="hand-coin" route="Empenos" />
      <DrawerItem label="Subastas" iconName="hand-front-right" route="Subastas" />
      <DrawerItem label="Carrito" iconName="cart-variant" route="Carrito" />

      {/* Mostrar solo si es admin */}
      {currentUser.role === 'admin' && (
        <DrawerItem label="Agregar Productos" iconName="file-plus-outline" route="AddProd" />
      )}

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
          {currentUser.role === 'admin' && (
            <DrawerItem label="Agregar Tarjeta" iconName="card-bulleted-outline" route="Cards" />
            )}
          
        </View>
      )}
    </DrawerContentScrollView>
  );
}