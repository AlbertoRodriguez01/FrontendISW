import React, { useState } from 'react'
import { StyleSheet, View, ScrollView, Alert } from 'react-native'
import { Input, Button, Icon, Text } from 'react-native-elements'
import * as Animatable from 'react-native-animatable'

export default function CardsScreen() {
  const [titular, setTitular] = useState('')
  const [cardNum, setCardNum] = useState('')
  const [cvv, setCvv] = useState('')
  const [cards, setCards] = useState([])

  const addCard = () => {
    if (titular.trim() === '' || cardNum.trim() === '' || cvv.trim() === '') {
      Alert.alert('Campos incompletos', 'Completa todos los campos para guardar la tarjeta.')
      return
    }

    if (!/^\d{16}$/.test(cardNum)) {
      Alert.alert('Número inválido', 'El número de tarjeta debe tener exactamente 16 dígitos.')
      return
    }

    if (!/^\d{3}$/.test(cvv)) {
      Alert.alert('CVV inválido', 'El CVV debe tener exactamente 3 dígitos.')
      return
    }

    const newCard = {
      id: Date.now().toString(),
      titular,
      cardNum,
      cvv
    }

    setCards([...cards, newCard])
    setTitular('')
    setCardNum('')
    setCvv('')
  }

  const removeCard = (cardId) => {
    Alert.alert(
      'Eliminar tarjeta',
      '¿Seguro que deseas eliminar esta tarjeta?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Eliminar',
          onPress: () => {
            setCards(cards.filter((c) => c.id !== cardId))
          },
          style: 'destructive'
        }
      ]
    )
  }

  const maskCardNumber = (number) => {
    return '**** **** **** ' + number.slice(-4)
  }

  return (
    <ScrollView style={styles.viewContainer}>
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
        <Input placeholder='CVV' value={cvv} onChangeText={setCvv} keyboardType="numeric" maxLength={3} />
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
          <Text>{maskCardNumber(card.cardNum)}</Text>

          <Button 
            icon={<Icon name="delete" size={25} color="#ff0000" />} 
            type="clear" 
            title="Eliminar" 
            buttonStyle={styles.btnDelete} 
            onPress={() => removeCard(card.id)} 
          />
        </Animatable.View>
      ))}
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