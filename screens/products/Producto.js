import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import { Button } from "react-native-elements";

const Producto = ({ route }) => {
  const { title, desc, price, image } = route.params;

  return (
    <View style={styles.container}>
      <Image source={{ uri: image }} style={styles.image} />
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.desc}>{desc}</Text>
      <Text style={styles.title}>$ {price}</Text>
      <Button
            title="Agregar al carrito"
            containerStyle={styles.btnContainer}
            buttonStyle={styles.btn}
          />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  image: {
    width: 200,
    height: 200,
    resizeMode: "contain",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginTop: 20,
  },
  desc: {
    fontSize: 20,
    color: "#666",
    marginTop: 10,
    textAlign: "center",
  },
  btnContainer:{
    marginTop: 20,
    width: "95%",
    alignSelf: "center"
},
btn:{
    backgroundColor: "#377d07"
},
});

export default Producto;