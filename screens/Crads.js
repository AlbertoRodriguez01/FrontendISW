import React, { useState } from 'react'
import { StyleSheet, View, ScrollView, Alert, RefreshControl } from 'react-native'
import { Input, Button, Icon, Text } from 'react-native-elements'
import * as Animatable from 'react-native-animatable'
import Loading from '../components/Loading'
import { useEffect } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { getCurrentUser } from '../actions'

export default function CardsScreen() {

  const [refreshing, setRefreshing] = useState(false)
  const [titular, setTitular] = useState('')
  const [cardNum, setCardNum] = useState('')
  const [fechaVencimiento, setFechaVencimiento] = useState('')
  const [cvv, setCvv] = useState('')
  const [cards, setCards] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    fetchCards()
  }, [])

  const fetchCards = async () => {
    const user = await getCurrentUser()
    if (!user) {
      Alert.alert('Error', 'No se encontró usuario logueado')
      return
    }

    setLoading(true)

    try {
      const response = await fetch(`http://192.168.0.19:3000/card/${user._id}`)
      const userCards = await response.json()
      setCards(userCards)
    } catch (error) {
      console.log(error)
      Alert.alert('Error', 'No se pudieron cargar las tarjetas')
    } finally {
      setLoading(false)
    }
  }

  const addCard = async () => {
    if (titular.trim() === '' || cardNum.trim() === '' || fechaVencimiento.trim() === '' ||cvv.trim() === '') {
      Alert.alert('Campos incompletos', 'Completa todos los campos para guardar la tarjeta.')
      return
    }

    if (!/^\d{16}$/.test(cardNum)) {
      Alert.alert('Número inválido', 'El número de tarjeta debe tener exactamente 16 dígitos.')
      return
    }

    if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(fechaVencimiento)) {
      Alert.alert('Fecha inválida', 'La fecha debe tener el formato MM/AA')
      return
    }

    if (!/^\d{3}$/.test(cvv)) {
      Alert.alert('CVV inválido', 'El CVV debe tener exactamente 3 dígitos.')
      return
    }

    const user = await getCurrentUser()
    if(!user) {
      Alert.alert('Error', 'No se encontro usuario logeado')
      return
    }

    const newCard = {
      titular,
      cardNum,
      fechaVencimiento,
      cvv,
      clienteId: user._id
    }

    setLoading(true)

    try {
      const response = await fetch("http://192.168.0.19:3000/card", {
        method: 'POST',
        headers: {
          'Content-Type': "application/json"
        },
        body: JSON.stringify(newCard)
      })
      
      const saveCard = await response.json()
      setCards([...cards, saveCard])
      setTitular('')
      setCardNum('')
      setFechaVencimiento('')
      setCvv('')

    } catch (error) {
      console.log(error)
      Alert.alert('Error', 'Error al guardar la tarjeta')
    } finally {
      setLoading(false)
    }

    
  }

  const removeCard =  (cardId) => {
  Alert.alert(
    'Eliminar tarjeta',
    '¿Seguro que deseas eliminar esta tarjeta?',
    [
      { text: 'Cancelar', style: 'cancel' },
      {
        text: 'Eliminar',
        onPress: async () => {
          try {
            await fetch(`http://192.168.0.19:3000/card/${cardId}`, {
              method: 'DELETE'
            })
            setCards(cards.filter((c) => c._id !== cardId))
          } catch (error) {
            console.log(error)
            Alert.alert('Error', 'Error al eliminar la tarjeta')
          }
        },
        style: 'destructive'
      }
    ]
  )
}

  const maskCardNumber = (number) => {
    return '**** **** **** ' + number.slice(-4)
  }

  const onRefresh = async () => {
    setRefreshing(true)
    await fetchCards()
    setRefreshing(false)
  }


  return (
    <ScrollView style={styles.viewContainer} refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh}/>}>
      <Text h4 style={{ marginVertical: 20, textAlign: 'center' }}>Agregar Tarjeta</Text>

      <View style={styles.viewForm}>
        <Input placeholder='Nombre del titular' value={titular} onChangeText={setTitular} />
        <Input 
          placeholder='Número de tarjeta' 
          value={cardNum} 
          onChangeText={setCardNum} 
          keyboardType="numeric" 
          maxLength={16}
        />
        <Input 
          placeholder='Fecha de Vencimiento (MM/AA)' 
          value={fechaVencimiento} 
          onChangeText={setFechaVencimiento} 
          maxLength={5}
        />
        <Input placeholder='CVV' value={cvv} onChangeText={setCvv} keyboardType="numeric" secureTextEntry={true} maxLength={3} />
      </View>

      <Button title="Guardar Tarjeta" buttonStyle={styles.btnAdd} onPress={addCard} />

      <Text h4 style={{ marginTop: 30, marginLeft: 10 }}>Tarjetas Guardadas</Text>

      {cards.map((card) => (
        <Animatable.View 
          key={card.id} 
          animation="fadeInUp" 
          duration={600} 
          style={styles.cardContainer}
        >
          <Text style={styles.cardTitle}>{card.titular}</Text>
          <Text>Vence: {card.fechaVencimiento}</Text>
          <Text>{maskCardNumber(card.cardNum)}</Text>

          <Button 
            icon={<Icon name="delete" size={25} color="#ff0000" />} 
            type="clear" 
            title="Eliminar" 
            buttonStyle={styles.btnDelete} 
            onPress={() => removeCard(card._id)} 
          />
        </Animatable.View>
      ))}
      <Loading isVisible={loading} text="Agregando tarjeta..."/>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  viewContainer: {
    flex: 1,
    paddingHorizontal: 10
  },
  viewForm: {
    marginHorizontal: 10,
    marginTop: 10
  },
  btnAdd: {
    margin: 20,
    backgroundColor: "#377d07"
  },
  btnDelete: {
    marginTop: 10,
    backgroundColor: "transparent",
    padding: 0
  },
  cardContainer: {
    margin: 10,
    padding: 15,
    backgroundColor: "#f2f2f2",
    borderRadius: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  cardTitle: {
    fontWeight: 'bold',
    fontSize: 16
  }
})