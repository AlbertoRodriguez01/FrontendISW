import React, { useState } from "react";
import { View, Text, FlatList, Image, StyleSheet } from "react-native";
import { Button } from "react-native-elements";
import { useNavigation } from "@react-navigation/native";

const cartData = [
  { id: "1", name: "Anillo Pandora", price: 1200, quantity: 1, image: "https://pandoramx.vtexassets.com/arquivos/ids/465502/198289CZ_1.png?v=638482333441330000" },
  { id: "2", name: "Freidora Oster", price: 2500, quantity: 1, image: "https://m.media-amazon.com/images/I/41NJZdyg0XL.__AC_SX300_SY300_QL70_ML2_.jpg" },
  { id: "3", name: "Xbox Series X", price: 10000, quantity: 1, image: "https://m.media-amazon.com/images/I/51jKdIMGCsL.__AC_SX300_SY300_QL70_ML2_.jpg" },
];

const CartScreen = () => {
  const [cart, setCart] = useState(cartData);

  const navigation = useNavigation()

  const totalPrice = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>🛒 Carrito de Compras</Text>

      <FlatList
        data={cart}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.cartItem}>
            <Image source={{ uri: item.image }} style={styles.image} />
            <View style={styles.details}>
              <Text style={styles.name}>{item.name}</Text>
              <Text style={styles.price}>${item.price} MXN</Text>
              <Text style={styles.quantity}>Cantidad: {item.quantity}</Text>
            </View>
          </View>
        )}
      />

      <Text style={styles.total}>Total: ${totalPrice} MXN</Text>
      <Button
        title="Realizar compra"
        containerStyle={styles.btnContainer}
        buttonStyle={styles.btn}
        onPress={() => navigation.navigate("PayCart")}
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
  quantity: { fontSize: 14, color: "#666" },
  total: { fontSize: 18, fontWeight: "bold", textAlign: "center", marginVertical: 20 },
  btnContainer:{
    marginTop: 20,
    width: "95%",
    alignSelf: "center"
},
btn:{
    backgroundColor: "#377d07"
},
});

export default CartScreen;