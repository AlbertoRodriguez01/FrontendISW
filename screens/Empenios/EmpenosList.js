import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { View, FlatList, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { Text, Card } from 'react-native-elements';

export default function EmpenoList() {

  const navigation = useNavigation()

  const empeños = [
    {
      id: '1',
      articulo: 'Reloj Rolex',
      cantidad: 50000,
      fecha: '2025-05-01',
      imagen: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRcK9KpotDyOzLtbUUfwjmrccehCSAwuisPqA&s',
    },
    {
      id: '2',
      articulo: 'Laptop MacBook Pro',
      cantidad: 25000,
      fecha: '2025-04-15',
      imagen: 'https://cdn.pixabay.com/photo/2015/01/21/14/14/apple-606761_1280.jpg',
    },
    {
      id: '3',
      articulo: 'Anillo de Oro',
      cantidad: 15000,
      fecha: '2025-03-20',
      imagen: 'https://ss566.liverpool.com.mx/sm/1150848420.jpg',
    },
  ];

  const renderItem = ({ item }) => (
    
    <TouchableOpacity  onPress={() => navigation.navigate("EmpenoDetail")}>
      <Card containerStyle={styles.card}>
        <Image source={{ uri: item.imagen }} style={styles.image} />
        <Text style={styles.title}>{item.articulo}</Text>
        <Text>Monto prestado: ${item.cantidad}</Text>
        <Text>Fecha: {item.fecha}</Text>
      </Card>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={empeños}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  card: {
    borderRadius: 10,
    padding: 10,
  },
  image: {
    width: '100%',
    height: 150,
    borderRadius: 10,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 18,
    marginVertical: 5,
  },
});