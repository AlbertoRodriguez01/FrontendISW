import React, { useState } from 'react'
import { StyleSheet, View, TouchableOpacity, Image, ScrollView, Alert } from 'react-native'
import { Input, Icon, Button } from 'react-native-elements'
import * as ImagePicker from 'expo-image-picker'
import Loading from '../../components/Loading'

export default function EmpenoScreen() {
  
  const [images, setImages] = useState([])
  const [loadingVisible, setLoadingVisible] = useState(false);

  const sendImages = async() => {
    setLoadingVisible(true)
    console.log("Imagenes enviadas")
    setLoadingVisible(false)
  }

  const pickImage = async () => {

    if (images.length >= 5) {
      Alert.alert("Límite alcanzado", "Solo puedes subir un máximo de 5 imágenes.")
      return
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1
    })

    if (!result.canceled) {
      const selectedAsset = result.assets[0]
      setImages([...images, selectedAsset.uri])
    }
  }

  const removeImage = (uri) => {
    Alert.alert(
      "Eliminar imagen",
      "¿Seguro que quieres eliminar esta imagen?",
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Eliminar",
          onPress: () => {
            setImages(images.filter((imageUri) => imageUri !== uri))
          },
          style: "destructive"
        }
      ]
    )
  }

  return (
    <ScrollView style={styles.viewContainer}>
      <View style={styles.viewForm}>
        <Input
          placeholder='Nombre del articulo'
        />
        <Input
          placeholder='Descripcion'
          multiline
          containerStyle={styles.textArea}
        />
      </View>

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
        title="Valuar Articulo"
        buttonStyle={styles.btnAddLibro}
        onPress={() => sendImages()}
      />
      <Loading isVisible={loadingVisible} text="Valuando Articulo..." />
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  viewContainer: {
    flex: 1,
    paddingHorizontal: 10
  },
  viewForm: {
    marginHorizontal: 10,
    marginTop: 20
  },
  textArea: {
    height: 100,
    width: "100%"
  },
  btnAddLibro: {
    margin: 20,
    backgroundColor: "#377d07"
  },
  viewImages: {
    flexDirection: "row",
    marginHorizontal: 20,
    marginTop: 30,
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
  }
})