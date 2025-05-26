import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Alert, Keyboard, KeyboardAvoidingView, Platform, TouchableWithoutFeedback, ActivityIndicator } from 'react-native';
import { Text, Button, Card, Input, Icon } from 'react-native-elements';
import RNPickerSelect from 'react-native-picker-select';
import { getCurrentUser } from '../../actions';
import { useNavigation } from '@react-navigation/native';

export default function PayCart({ route }) {
  const [cards, setCards] = useState([]);
  const [loadingCards, setLoadingCards] = useState(true);
  const [selectedCard, setSelectedCard] = useState(null);
  const [titular, setTitular] = useState('');
  const [cardNum, setCardNum] = useState('');
  const [fechaVencimiento, setFechaVencimiento] = useState('');
  const [cvv, setCvv] = useState('');
  const [loadingPay, setLoadingPay] = useState(false);
  const [total, setTotal] = useState(0)

  const navigation = useNavigation()

  useEffect(() => {
    if (route?.params?.total) {
      setTotal(route.params.total)
    }
    fetchCards()
  }, [])

  const fetchCards = async () => {
    const user = await getCurrentUser()
    if (!user) {
      Alert.alert('Error', 'No se encontró usuario logueado')
      return
    }

  setLoadingCards(true)

  try {
    const response = await fetch(`http://192.168.0.19:3000/card/${user._id}`)
    const userCards = await response.json()

    const tarjetasBackend = userCards.map(card => ({
      label: `**** **** **** ${card.cardNum.slice(-4)}`,
      value: card._id, // este debe ser _id, porque así lo tienes en tu log
    }))

    setCards([...tarjetasBackend, { label: 'Usar nueva tarjeta', value: 'nueva' }])
  } catch (error) {
    console.log(error)
    Alert.alert('Error', 'No se pudieron cargar las tarjetas.')
  } finally {
    setLoadingCards(false)
  }
}

  const handlePayment = () => {
    if (!selectedCard) {
      Alert.alert('Selecciona una tarjeta', 'Debes elegir una tarjeta para continuar.');
      return;
    }

    if (selectedCard === 'nueva') {
      if (
        titular.trim() === '' ||
        !/^\d{16}$/.test(cardNum) ||
        !/^\d{2}\/\d{2}$/.test(fechaVencimiento) ||
        !/^\d{3}$/.test(cvv)
      ) {
        Alert.alert('Datos incompletos', 'Completa correctamente los datos de la nueva tarjeta.');
        return;
      }
    }

    setLoadingPay(true);

    const payload = selectedCard === 'nueva' ? {
      newCard: {
        titular,
        cardNum,
        expiry: fechaVencimiento,
        cvv,
      },
      amount: total,
    } : {
      cardId: selectedCard,
      amount: total,
    };

    fetch('http://192.168.0.19:3000/api/pay', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })
      .then(res => res.json())
      .then(async (data) => {
        setLoadingPay(false);
        if (data.success) {
          Alert.alert('Pago exitoso', `Se realizó el pago de $${total}.`);
          
          await clearCart()

          setSelectedCard(null);
          setTitular('');
          setCardNum('');
          setFechaVencimiento('');
          setCvv('');

          navigation.navigate('Productos')
        } else {
          Alert.alert('Error', data.message || 'Error al procesar el pago.');
        }
      })
      .catch(() => {
        setLoadingPay(false);
        Alert.alert('Error', 'Error al conectarse con el servidor.');
      });
  };

  if (loadingCards) {
    return (
      <View style={[styles.container, { justifyContent: 'center', alignItems: 'center' }]}>
        <ActivityIndicator size="large" color="#377d07" />
      </View>
    );
  }

  const clearCart = async () => {
  const user = await getCurrentUser();
  if (!user) return;

  try {
    await fetch(`http://192.168.0.19:3000/cart/${user._id}`, {
      method: 'DELETE',
    });
  } catch (error) {
    console.log('Error al eliminar el carrito:', error);
  }
};


  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
          <Card containerStyle={styles.card}>
            <Text h4 style={{ textAlign: 'center', marginBottom: 20 }}>Resumen de Pago</Text>

            <Text style={styles.label}>Total a pagar:</Text>
            <Text style={styles.amount}>${total}</Text>

            <Text style={[styles.label, { marginTop: 20 }]}>Seleccionar tarjeta:</Text>
            <RNPickerSelect
              onValueChange={(value) => setSelectedCard(value)}
              items={cards}
              placeholder={{ label: 'Selecciona una tarjeta', value: null }}
              style={pickerSelectStyles}
              Icon={() => <Icon name="chevron-down" type="material-community" size={24} color="gray" />}
              value={selectedCard}
            />

            {selectedCard === 'nueva' && (
              <View style={{ marginTop: 10 }}>
                <Input
                  placeholder="Nombre del titular"
                  value={titular}
                  onChangeText={setTitular}
                />
                <Input
                  placeholder="Número de tarjeta"
                  value={cardNum}
                  onChangeText={setCardNum}
                  keyboardType="numeric"
                  maxLength={16}
                />
                <Input
                  placeholder="Fecha de vencimiento (MM/AA)"
                  value={fechaVencimiento}
                  onChangeText={setFechaVencimiento}
                  keyboardType="numeric"
                  maxLength={5}
                />
                <Input
                  placeholder="CVV"
                  value={cvv}
                  onChangeText={setCvv}
                  keyboardType="numeric"
                  maxLength={3}
                />
              </View>
            )}

            <Button
              title={loadingPay ? "Procesando..." : "Pagar ahora"}
              buttonStyle={styles.payButton}
              onPress={handlePayment}
              disabled={loadingPay}
              loading={loadingPay}
            />
          </Card>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  card: {
    borderRadius: 10,
    padding: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
  },
  amount: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2d3436',
  },
  payButton: {
    marginTop: 30,
    backgroundColor: '#377d07',
  },
});

const pickerSelectStyles = {
  inputIOS: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    color: 'black',
    paddingRight: 30,
    marginBottom: 10,
  },
  inputAndroid: {
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    color: 'black',
    paddingRight: 30,
    marginBottom: 10,
  },
};
