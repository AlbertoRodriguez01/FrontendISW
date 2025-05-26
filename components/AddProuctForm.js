import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity, Alert } from 'react-native';
import { Input, Icon, Button } from 'react-native-elements';
import * as ImagePicker from 'expo-image-picker';
import { Picker } from '@react-native-picker/picker';
import axios from 'axios';
import Loading from './Loading';

export default function AddProductForm() {
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('');
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false)

  const pickImage = async () => {
    if (images.length == 1) {
      Alert.alert("Límite alcanzado", "Solo puedes subir un máximo de una imágen.");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1
    });

    if (!result.canceled) {
      const selectedAsset = result.assets[0];
      setImages([...images, selectedAsset.uri]);
    }
  };

  const removeImage = (uri) => {
    Alert.alert(
      "Eliminar imagen",
      "¿Seguro que quieres eliminar esta imagen?",
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Eliminar",
          onPress: () => {
            setImages(images.filter((imageUri) => imageUri !== uri));
          },
          style: "destructive"
        }
      ]
    );
  };

  const handleAddProduct = async () => {
    if(!title || !desc || !price || !category) {
        Alert.alert('Error', 'Todos los campos son obligatorios')
        return
    }

    const formData = new FormData()
    formData.append("title", title)
    formData.append("desc", desc)
    formData.append("price", price)
    formData.append("category", category)

    images.forEach((uri, index) => {
        formData.append("images", {
            uri,
            type: "image/jpeg",
            name: `image_${index}.jpg`
        })
    })

    setLoading(true)

    try {
        const response = await axios.post("http://192.168.0.19:3000/producto", formData, {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        })

        console.log("Respuesta del servidor", response.data)
        Alert.alert('Exito', 'Producto agregado correctamente')
        resetForm()
    } catch (error) {
        console.log(error)
        Alert.alert('Error', "Ocurrio un problema al enviar el producto")
    } finally {
        setLoading(false)
    }
  };

  const resetForm = () => {
    setTitle('');
    setDesc('');
    setPrice('');
    setCategory('');
    setImages([]);
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Agregar Producto</Text>

      <Input
        placeholder="Nombre del producto"
        value={title}
        onChangeText={setTitle}
      />

      <Input
        placeholder="Descripción"
        value={desc}
        onChangeText={setDesc}
      />

      <Input
        placeholder="Precio"
        value={price}
        onChangeText={setPrice}
        keyboardType="numeric"
      />

      <Text style={styles.label}>Categoría</Text>
      <Picker
        selectedValue={category}
        onValueChange={(itemValue) => setCategory(itemValue)}
        style={styles.picker}
      >
        <Picker.Item label="Selecciona una categoría" value="" />
        <Picker.Item label="Herramientas" value="herramientas" />
        <Picker.Item label="Electrodomésticos" value="electrodomesticos" />
        <Picker.Item label="Jardinería" value="jardineria" />
        <Picker.Item label="Construcción" value="construccion" />
      </Picker>

      <View style={styles.viewImages}>
        <TouchableOpacity onPress={pickImage}>
          <View style={styles.containerIcon}>
            <Icon type="material-community" name="camera" color="#7a7a7a" size={40} />
          </View>
        </TouchableOpacity>

        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {images.map((uri, index) => (
            <TouchableOpacity key={index} onPress={() => removeImage(uri)}>
              <Image source={{ uri }} style={styles.miniatureStyle} />
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      <Button
        title="Agregar Producto"
        buttonStyle={styles.button}
        onPress={handleAddProduct}
      />
      <Loading isVisible={loading} text="Agregando Articulo..." />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20
  },
  label: {
    fontSize: 16,
    marginBottom: 5
  },
  picker: {
    marginBottom: 20
  },
  viewImages: {
    flexDirection: "row",
    marginVertical: 20,
    alignItems: "center"
  },
  containerIcon: {
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10,
    height: 70,
    width: 70,
    backgroundColor: "#e3e3e3",
    borderRadius: 10
  },
  miniatureStyle: {
    width: 70,
    height: 70,
    marginRight: 10,
    borderRadius: 10
  },
  button: {
    backgroundColor: '#377d07'
  }
});
