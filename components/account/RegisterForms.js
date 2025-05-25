import React, { useState } from 'react'
import { Text, StyleSheet, View, Alert } from 'react-native'
import { Button, Icon, Input } from 'react-native-elements'
import { useNavigation } from "@react-navigation/native"
import Loading from "../Loading"

export default function RegisterForm() {

    const navigation = useNavigation()

    const [loading, setLoading] = useState(false)

    const [email, setEmail] = useState('')
    const [name, setName] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')

    const API_URL = 'http://192.168.0.19:3000/register'

    const onRegister = async () => {
      if (!email || !name || !password || !confirmPassword) {
        Alert.alert('Error', 'Todos los campos son obligatorios')
        return
      }

      if (password !== confirmPassword) {
        Alert.alert('Error', 'Las contraseñas no coinciden')
        return
      }

      try {
        const response = await fetch(API_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json'},
          body: JSON.stringify({ email, name, password })
        })
        const data = await response.json()
        if (response.ok) {
          setLoading(true)
          Alert.alert('Exito', 'Usuario registrado correctamente')
          setLoading(false)
          navigation.navigate('Account')
        } else {
          Alert.alert('Error', data.message || 'No se pudo registrar')
        }
      } catch (error) {
        Alert.alert('Error', 'Error al conectar con el servidor')
      }
    }

    return (
        <View style={styles.form}>
          <Input 
            containerStyle={styles.input}
            placeholder='Ingresa tu email...'
            keyboardType='email-address'
            value={email}
            onChangeText={setEmail}
            autoCapitalize='none'
            leftIcon={<Icon type="material-community" name="email-outline" iconStyle={styles.icon} />}
          />
          <Input 
            containerStyle={styles.input}
            placeholder='Nombre...'
            value={name}
            onChangeText={setName}
            leftIcon={<Icon type="material-community" name="account-circle-outline" iconStyle={styles.icon} />}
          />
          <Input 
            containerStyle={styles.input}
            placeholder='Ingresa tu contraseña...'
            secureTextEntry={true}
            leftIcon={<Icon type="material-community" name="lock-outline" iconStyle={styles.icon} />}
            value={password}
            onChangeText={setPassword}
            autoCapitalize='none'
          />
          <Input 
            containerStyle={styles.input}
            placeholder='Confirma tu contraseña...'
            secureTextEntry={true}
            value={confirmPassword}            
            onChangeText={setConfirmPassword}
            leftIcon={<Icon type="material-community" name="lock-outline" iconStyle={styles.icon} />}
            autoCapitalize='none'
          />
          <Button
            title="Registrar Nuevo Usuario"
            containerStyle={styles.btnContainer}
            buttonStyle={styles.btn}
            onPress={onRegister}
          />
          <Loading isVisible={loading} text="Creando usuario..."/>
        </View>
      )
}

const styles = StyleSheet.create({
    form:{
        marginTop: 30,
    },
    input:{
        width:"100%"
    },
    btnContainer:{
        marginTop: 20,
        width: "95%",
        alignSelf: "center"
    },
    btn:{
        backgroundColor: "#377d07"
    },
    icon:{
        color:"#c1c1c1"
    }
})