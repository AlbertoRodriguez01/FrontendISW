import React, { useEffect, useState } from "react";
import { View, Text, FlatList, Image, StyleSheet, Alert, TouchableOpacity } from "react-native";
import { Button } from "react-native-elements";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const CartScreen = () => {
  const [cart, setCart] = useState([]);
  const navigation = useNavigation();

  const fetchCart = async () => {
    try {
      const user = await AsyncStorage.getItem("user");
      if (!user) {
        Alert.alert("Inicia sesión para ver tu carrito");
        return;
      }

      const { _id: clienteId } = JSON.parse(user);

      const response = await fetch(`http://192.168.0.19:3000/cart/${clienteId}`);
      const data = await response.json();

      if (response.ok) {
        setCart(data.items);
      } else {
        Alert.alert("Error al obtener carrito", data.message);
      }
    } catch (error) {
      console.error(error);
      Alert.alert("Error de red o servidor");
    }
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", fetchCart);
    return unsubscribe;
  }, [navigation]);

  const updateQuantity = async (productId, newQuantity) => {
    try {
      const user = await AsyncStorage.getItem("user");
      const { _id: clienteId } = JSON.parse(user);

      if (newQuantity === 0) {
        await fetch(`http://192.168.0.19:3000/cart/${clienteId}/${productId}`, {
          method: "DELETE"
        });
      } else {
        await fetch(`http://192.168.0.19:3000/cart/update-item`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ clienteId, productId, newQuantity }),
        });
      }

      fetchCart();
    } catch (error) {
      console.error(error);
      Alert.alert("Error al actualizar cantidad");
    }
  };

  const totalPrice = (cart || []).reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>🛒 Carrito de Compras</Text>

      <FlatList
        data={cart}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <View style={styles.cartItem}>
            <Image source={{ uri: item.image }} style={styles.image} />
            <View style={styles.details}>
              <Text style={styles.name}>{item.name}</Text>
              <Text style={styles.price}>${item.price} MXN</Text>
              <View style={styles.quantityContainer}>
                <TouchableOpacity
                  onPress={() => updateQuantity(item.productId, item.quantity - 1)}
                  style={styles.qtyButton}
                >
                  <Text style={styles.qtyText}>-</Text>
                </TouchableOpacity>
                <Text style={styles.quantity}>{item.quantity}</Text>
                <TouchableOpacity
                  onPress={() => updateQuantity(item.productId, item.quantity + 1)}
                  style={styles.qtyButton}
                >
                  <Text style={styles.qtyText}>+</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        )}
      />

      <Text style={styles.total}>Total: ${totalPrice} MXN</Text>
      <Button
        title="Realizar compra"
        containerStyle={styles.btnContainer}
        buttonStyle={styles.btn}
        onPress={() => navigation.navigate("PayCart", {total: totalPrice})}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#f9f9f9" },
  header: { fontSize: 24, fontWeight: "bold", textAlign: "center", marginBottom: 20 },
  cartItem: { flexDirection: "row", backgroundColor: "#fff", padding: 10, borderRadius: 10, marginBottom: 10, alignItems: "center", elevation: 2 },
  image: { width: 70, height: 70, borderRadius: 10, resizeMode: "contain" },
  details: { marginLeft: 10, flex: 1 },
  name: { fontSize: 16, fontWeight: "bold" },
  price: { fontSize: 14, color: "#333" },
  quantityContainer: { flexDirection: 'row', alignItems: 'center', marginTop: 10 },
  qtyButton: { padding: 8, backgroundColor: '#ddd', borderRadius: 5 },
  qtyText: { fontSize: 16, fontWeight: 'bold' },
  quantity: { marginHorizontal: 15, fontSize: 16 },
  total: { fontSize: 18, fontWeight: "bold", textAlign: "center", marginVertical: 20 },
  btnContainer: { marginTop: 20, width: "95%", alignSelf: "center" },
  btn: { backgroundColor: "#377d07" },
});

export default CartScreen;
