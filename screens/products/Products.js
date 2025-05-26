import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { View, Text, FlatList, Image, Dimensions, StyleSheet, ScrollView, TouchableOpacity, ActivityIndicator, Alert } from "react-native";

const { width } = Dimensions.get("window");

const Products = ({navigation}) => {

  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(true)

  const fetchProducts = async () => {
  try {
    const response = await fetch("http://192.168.0.19:3000/products")
    const data = await response.json()
    console.log(JSON.stringify(data, null, 2))

    const groupedData = data.reduce((acc, product) => {
      const category = product.category || 'Sin categoría';
      if (!acc[category]) {
        acc[category] = {
          title: category,
          data: []
        };
      }
      acc[category].data.push(product);
      return acc;
    }, {});

    const finalData = Object.values(groupedData);
    console.log(finalData)
    setCategories(finalData);
    setLoading(false);
  } catch (error) {
    console.log(error)
    Alert.alert('Error', 'Error al mostrar los productos')
    setLoading(false)
  }
}

  useEffect(() => {
    fetchProducts()
  }, [])

  const capitalize = (text) => text.charAt(0).toUpperCase() + text.slice(1);

  const renderProduct = ({ item }) => (
    <TouchableOpacity onPress={() => navigation.navigate("Producto", {...item, productId: item._id})}>
      <View style={styles.card}>
        <Image source={{ uri: item.images[0] }} style={styles.image} />
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.desc}>{item.desc}</Text>
      </View>
    </TouchableOpacity>
  )

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#000" />
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      {categories.map((category) => (
        <View key={category.id}>
          <Text style={styles.text}>{capitalize(category.title)}</Text>
          <FlatList
            data={category.data}
            horizontal
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item) => item.id}
            renderItem={renderProduct}
          />
        </View>
      ))}
    </ScrollView>
  )
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