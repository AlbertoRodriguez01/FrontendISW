import React, { useState } from 'react';
import { View, StyleSheet, Alert, Keyboard, KeyboardAvoidingView, Platform, TouchableWithoutFeedback } from 'react-native';
import { Text, Button, Card, Input, Icon } from 'react-native-elements';
import RNPickerSelect from 'react-native-picker-select';

export default function PayCart() {
  const [selectedCard, setSelectedCard] = useState(null);
  const [titular, setTitular] = useState('');
  const [cardNum, setCardNum] = useState('');
  const [cvv, setCvv] = useState('');

  const tarjetas = [
    { label: '**** **** **** 1234', value: '1234' },
    { label: '**** **** **** 5678', value: '5678' },
    { label: '**** **** **** 9012', value: '9012' },
    { label: 'Usar nueva tarjeta', value: 'nueva' },
  ];

  const total = 35000;

  const handlePayment = () => {
    if (!selectedCard) {
      Alert.alert('Selecciona una tarjeta', 'Debes elegir una tarjeta para continuar.');
      return;
    }

    if (selectedCard === 'nueva') {
      if (
        titular.trim() === '' ||
        !/^\d{16}$/.test(cardNum) ||
        !/^\d{3}$/.test(cvv)
      ) {
        Alert.alert('Datos incompletos', 'Completa correctamente los datos de la nueva tarjeta.');
        return;
      }
      Alert.alert('Pago exitoso', `Se realizó el pago de $${total} con la nueva tarjeta terminación ${cardNum.slice(-4)}.`);
    } else {
      Alert.alert('Pago exitoso', `Se realizó el pago de $${total} con la tarjeta terminación ${selectedCard}.`);
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
              items={tarjetas}
              placeholder={{ label: 'Selecciona una tarjeta', value: null }}
              style={pickerSelectStyles}
              Icon={() => <Icon name="chevron-down" type="material-community" size={24} color="gray" />}
            />

            {/* Inputs de nueva tarjeta */}
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
                  placeholder="CVV"
                  value={cvv}
                  onChangeText={setCvv}
                  keyboardType="numeric"
                  maxLength={3}
                />
              </View>
            )}

            <Button
              title="Pagar ahora"
              buttonStyle={styles.payButton}
              onPress={handlePayment}
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