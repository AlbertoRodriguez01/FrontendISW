import React, { useState } from "react";
import { View, Text, Image, StyleSheet, Alert, TouchableOpacity } from "react-native";
import { Button } from "react-native-elements";
import AsyncStorage from '@react-native-async-storage/async-storage';

const Producto = ({ route }) => {
  const { title, desc, price, images, productId } = route.params;
  const [quantity, setQuantity] = useState(1);

  const addToCart = async () => {
    try {
      const user = await AsyncStorage.getItem('user')
      if (!user) {
        Alert.alert("Inicia sesión para agregar al carrito")
        return
      }

      const { _id: clienteId } = JSON.parse(user)

      const product = {
        productId,
        name: title,
        price,
        quantity,
        image: images[0]
      }

      const response = await fetch('http://192.168.0.19:3000/cart', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ clienteId, product })
      })

      const data = await response.json()

      if (response.ok) {
        Alert.alert("Producto agregado al carrito ✅")
      } else {
        Alert.alert("Error al agregar al carrito", data.message)
      }

      console.log('Producto recibido:', product);
    } catch (error) {
      console.error(error)
      Alert.alert("Error de red o servidor")
    }
    
  }

  return (
    <View style={styles.container}>
      <Image source={{ uri: images[0] }} style={styles.image} />
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.desc}>{desc}</Text>
      <Text style={styles.title}>$ {price}</Text>

      <View style={styles.quantityContainer}>
        <TouchableOpacity onPress={() => quantity > 1 && setQuantity(quantity - 1)} style={styles.qtyButton}>
          <Text style={styles.qtyText}>-</Text>
        </TouchableOpacity>
        <Text style={styles.quantity}>{quantity}</Text>
        <TouchableOpacity onPress={() => setQuantity(quantity + 1)} style={styles.qtyButton}>
          <Text style={styles.qtyText}>+</Text>
        </TouchableOpacity>
      </View>

      <Button
        title="Agregar al carrito"
        containerStyle={styles.btnContainer}
        buttonStyle={styles.btn}
        onPress={addToCart}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: "center", justifyContent: "center", padding: 20 },
  image: { width: 200, height: 200, resizeMode: "contain" },
  title: { fontSize: 24, fontWeight: "bold", marginTop: 20 },
  desc: { fontSize: 20, color: "#666", marginTop: 10, textAlign: "center" },
  quantityContainer: { flexDirection: 'row', alignItems: 'center', marginVertical: 20 },
  qtyButton: { padding: 10, backgroundColor: '#ccc', borderRadius: 5 },
  qtyText: { fontSize: 20, fontWeight: 'bold' },
  quantity: { marginHorizontal: 20, fontSize: 20 },
  btnContainer: { marginTop: 20, width: "95%", alignSelf: "center" },
  btn: { backgroundColor: "#377d07" },
});

export default Producto;
