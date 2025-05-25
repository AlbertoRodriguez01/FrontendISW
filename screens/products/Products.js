import React from "react";
import { View, Text, FlatList, Image, Dimensions, StyleSheet, ScrollView, TouchableOpacity } from "react-native";

const { width } = Dimensions.get("window");

const dataJoyeria = [
  { id: "1", title: "Pandora", desc: "Anillo Corona deslumbrante", price: 5000, image: "https://pandoramx.vtexassets.com/arquivos/ids/465502/198289CZ_1.png?v=638482333441330000" },
  { id: "2", title: "Bizzaro", desc: "Broqueles redondos oro amarillo 14K", price: 1500, image: "https://www.joyeriasbizzarro.com/media/catalog/product/b/r/broquel_amarillo_prb-151-a_x1.jpg?quality=80&bg-color=255,255,255&fit=bounds&height=&width=&canvas=:" },
  { id: "3", title: "PDPaola", desc: "Joyas para mujer Collar, Aretes y Anillo", price: 2500, image: "https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcSgWZXTXxjxJ9DypxHnZvVvRiNeUw-4kSE6WUo69s1dwnbFwb74lJqJklAagF-m1ppr-adpQEaLlvkUffc9uc5nXPxk18y4Gsy-zlZY0mBV1Fz5ge-2_lPJRQ" },
  { id: "4", title: "Amelie", desc: "Anillos de matrimonio oro blanco", price: 2700, image: "https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcQLpHhtEagB5Xy3UqeSuBR380RuN5ZoZTrid1d4xjaG6iBg9eRpzrauaKF6ajhNrCkt68zN1Plt9GBnfi8SamxY8S4wQFZfG55ZXyUCOu7eMc7uQMUtWQkDVg&usqp=CAE" },
];

const dataElectrodomesticos = [
  { id: "1", title: "Oster", desc: "Freidora de aire", price: 350, image: "https://m.media-amazon.com/images/I/41NJZdyg0XL.__AC_SX300_SY300_QL70_ML2_.jpg" },
  { id: "2", title: "Panasonic", desc: "Horno de microondas", price: 750, image: "https://cdn1.coppel.com/images/catalog/pm/6546123-4.jpg?iresize=width:400,height:320" },
  { id: "3", title: "Ninja", desc: "Licuadora", price: 200, image: "https://i5.walmartimages.com/asr/009637dd-e954-4a23-8c29-fb46f11e0107.cda507e6c0503b6a800a6fbb5494470e.jpeg" },
  { id: "4", title: "Dyson", desc: "Aspiradora", price: 800, image: "https://m.media-amazon.com/images/I/61h2nZJ4nNL._AC_SX679_.jpg" },
];

const dataElectronicos = [
  { id: "1", title: "Microsoft", desc: "X Box Series X", price: 8000, image: "https://m.media-amazon.com/images/I/51jKdIMGCsL.__AC_SX300_SY300_QL70_ML2_.jpg" },
  { id: "2", title: "Samsung", desc: "Samsung Galaxy S24 SE", price: 7150, image: "https://m.media-amazon.com/images/I/51bLsqhXk+L._AC_SX522_.jpg" },
  { id: "3", title: "HP", desc: "Victus Intel Core i5 1TB SSD", price: 12000, image: "https://m.media-amazon.com/images/I/71DHV9GZSOL._AC_SX522_.jpg" },
  { id: "4", title: "Sony", desc: "Play Station 5", price: 10000, image: "https://m.media-amazon.com/images/I/61+gjRmdMfL._AC_SX342_SY445_.jpg" },
];

const dataHerramienta = [
  { id: "1", title: "Truper", desc: "Juego de 119 piezas", price: 620, image: "https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcTeMSYOf9HPqlxEaE1R0nsosb-j9ao13p4w8rmbuWBgaFDW2vgwOfbF6PHTI_LkdNQ2SIs_Jn9ib_oMPd2HZe3uY6Sp-FKpaz02aWmlVA6RljHoVcmOIW_vXA&usqp=CAE" },
  { id: "2", title: "Truper", desc: "Sierra circular", price: 950, image: "https://m.media-amazon.com/images/I/71WcjfAD8fL._AC_SX679_.jpg" },
  { id: "3", title: "BOSCH", desc: "Rotomartillo inalambrico", price: 1375, image: "https://m.media-amazon.com/images/I/71jmfMWg6qL._AC_SX679_.jpg" },
  { id: "4", title: "MTQ", desc: "Soldador inversor Mini Transportable", price: 1090, image: "https://m.media-amazon.com/images/I/61fO+2S8w0L._AC_SX522_.jpg" },
];

const Products = ({navigation}) => {

  const renderProduct = ({ item }) => (
    <TouchableOpacity onPress={() => navigation.navigate("Producto", item)}>
      <View style={styles.card}>
        <Image source={{ uri: item.image }} style={styles.image} />
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.desc}>{item.desc}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.text}>
        Joyeria
      </Text>
      <FlatList
        data={dataJoyeria}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.id}
        renderItem={renderProduct}
      />
      <Text style={styles.text}>
        Electrodomesticos
      </Text>
      <FlatList
        data={dataElectrodomesticos}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.id}
        renderItem={renderProduct}
      />
      <Text style={styles.text}>
        Electronicos
      </Text>
      <FlatList
        data={dataElectronicos}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.id}
        renderItem={renderProduct}
      />
      <Text style={styles.text}>
        Heramienta
      </Text>
      <FlatList
        data={dataHerramienta}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.id}
        renderItem={renderProduct}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { paddingVertical: 10 },
  card: {
    width: width * 0.4,
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 10,
    marginHorizontal: 10,
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  image: {
    width: "100%",
    height: 100,
    borderRadius: 10,
    resizeMode: 'contain'
  },
  title: { fontSize: 16, fontWeight: "bold", marginTop: 5 },
  desc: { fontSize: 14, color: "#666", marginTop: 5 },
  text: {
    fontSize: 24,
    padding: 5,
    paddingBottom: 15,
    paddingTop: 15
  }
});

export default Products;