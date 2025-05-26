import React, { useState, useEffect } from 'react'
import { StyleSheet, View, TouchableOpacity, Image, ScrollView, Alert } from 'react-native'
import { Input, Icon, Button, normalize } from 'react-native-elements'
import * as ImagePicker from 'expo-image-picker'
import Loading from '../../components/Loading'
import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { random } from 'lodash'

export default function EmpenoScreen() {
  
  const [nombre, setNombre] = useState('')
  const [descripcion, setDescripcion] = useState('')
  const [monto, setMonto] = useState('')
  const [clienteId, setClienteId] = useState(null)
  const [images, setImages] = useState([])
  const [loadingVisible, setLoadingVisible] = useState(false);

  useEffect(() => {
    const getUserId = async () => {
      const userData = await AsyncStorage.getItem('user')
      if (userData) {
        const user = JSON.parse(userData)
        console.log("ClienteId recuperado en EmpenoScreen:", user._id)
        setClienteId(user._id)
      }
    }

    getUserId()
  }, [])

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

 const sendData = async () => {
  if (!nombre || !descripcion) {
    Alert.alert('Error', 'Todos los campos son obligatorios')
    return
  }

  const montoGenerado = random(700, 2000)

  Alert.alert(
    "Confirmar empeño",
    `El monto prestado será de $${montoGenerado}. Tienes un plazo de 30 días para pagar.\n¿Aceptas las condiciones?`,
    [
      {
        text: "Cancelar",
        style: "cancel"
      },
      {
        text: "Aceptar",
        onPress: async () => {
          setLoadingVisible(true)

          try {
            const formData = new FormData()

            formData.append("nombre", nombre)
            formData.append("descripcion", descripcion)
            formData.append("monto", montoGenerado)
            formData.append("clienteId", clienteId)

            images.forEach((uri, index) => {
              formData.append("images", {
                uri: uri,
                type: "image/jpeg",
                name: `image_${index}.jpg`
              })
            })

            const response = await axios.post("http://192.168.0.19:3000/empeno", formData, {
              headers: {
                "Content-Type": "multipart/form-data"
              }
            })

            Alert.alert("Éxito", "Artículo enviado correctamente")
            resetForm()
          } catch (error) {
            console.log(error)
            Alert.alert("Error", "Hubo un problema al enviar el artículo")
          } finally {
            setLoadingVisible(false)
          }
        }
      }
    ],
    { cancelable: false }
  )
}


  const resetForm = () => {
    setNombre('')
    setDescripcion('')
    setMonto('')
    setImages([])
  }

  return (
    <ScrollView style={styles.viewContainer}>
      <View style={styles.viewForm}>
        <Input
          placeholder='Nombre del articulo'
          value={nombre}
          onChangeText={setNombre}
        />
        <Input
          placeholder='Descripcion'
          multiline
          containerStyle={styles.textArea}
          value={descripcion}
          onChangeText={setDescripcion}
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
        onPress={() => sendData()}
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