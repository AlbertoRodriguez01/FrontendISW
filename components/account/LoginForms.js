import React, { useState } from 'react';
import { StyleSheet, View, Switch, Text, Alert } from 'react-native';
import { Input, Button, Icon } from 'react-native-elements';
import Loading from '../Loading';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage'

export default function LoginForm() {

  const navigation = useNavigation()

  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(false)

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const API_URL = 'http://192.168.0.19:3000/login'

  const onLogin = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Todos los campos son obligatorios')
      return
    }

    setLoading(true)

    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      })

      const data = await response.json()

      if (response.ok) {
        const selectedRole = isAdmin ? 'admin' : 'user'
        if (data.role !== selectedRole) {
          Alert.alert(
            'Acceso Denegado',
            `Tu cuenta pertenece al rol "${data.role}", no al rol seleccionado "${selectedRole}".`
          )
        } else {
          await AsyncStorage.setItem('user', JSON.stringify({
            _id: data.id,
            email,
            name: data.name,
            role: data.role,
            direction: data.direction,
            telefono: data.telefono
          }))
          Alert.alert('Bienvenido', `Hola ${data.name}`)
          navigation.navigate("Account")
        }

      } else {
        Alert.alert('Error', data.message || 'Error al iniciar sesión')
      }
    } catch (error) {
      Alert.alert('Error', 'No se pudo conectar con el servidor')
    } finally {
      setLoading(false)
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.switchContainer}>
        <Text>{isAdmin ? 'Admin' : 'Usuario'}</Text>
        <Switch
          value={isAdmin}
          onValueChange={(value) => setIsAdmin(value)}
        />
      </View>

      <Input
        containerStyle={styles.input}
        placeholder="Ingresa tu email."
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
        leftIcon={<Icon type="material-community" name="email-outline" iconStyle={styles.icon} />}
      />

      <Input
        containerStyle={styles.input}
        placeholder="Ingresa tu contraseña."
        secureTextEntry={true}
        value={password}
        onChangeText={setPassword}
        leftIcon={<Icon type="material-community" name="lock-outline" iconStyle={styles.icon} />}
      />
      <Button
        title='Iniciar Sesión'
        containerStyle={styles.btnContainer}
        buttonStyle={styles.btn}
        onPress={onLogin}
      />
      <Loading isVisible={loading} text="Iniciando Sesion..."/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 30
  },
  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20
  },
  input: {
    width: '100%'
  },
  btnContainer: {
    marginTop: 20,
    width: '95%',
    alignSelf: 'center'
  },
  btn: {
    backgroundColor: '#377d07'
  },
  icon: {
    color: '#c1c1c1'
  }
});