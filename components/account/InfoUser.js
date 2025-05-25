import React, { useState } from "react";
import { View, Text, StyleSheet, Alert } from "react-native";
import { Avatar } from "react-native-elements";
import * as ImagePicker from 'expo-image-picker'
import axios from 'axios'

export default function InfoUser({ user, setLoading, setLoadingText }) {

    const [photoURL, setPhotoURL] = useState(null)

    const changePhoto = async () => {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync()
        if(status !== 'granted') {
            Alert.alert('Permiso denegado', 'Necesitas permitir el acceso a tus imagenes.')
            return
        }

        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 4],
            quality: 1
        })

        if(!result.canceled) {
            const imageUri = result.assets[0].uri;
            setPhotoURL(imageUri);
            await uploadImage(imageUri);
        }
    }

    const uploadImage = async (image) => {
        try {
            setLoadingText("Subiendo imagen...")
            setLoading(true)

            console.log("Imagen subida", image)

            const formData = new FormData()
            formData.append('image', {
                uri: image,
                type: 'image/jpeg',
                name: 'photo.jpg'
            })            

            const response = await axios.post(`http://192.168.0.19/user/${user.id}/photo`, formData, {
                    headers: {
                    'Content-Type': 'multipart/form-data',
                }, timeout: 20000
            });
            
            if(response.status === 200) {
                Alert.alert('Exito', 'Foto actualizada correctamente')
            }
        } catch (error) {
            console.log(error)
            Alert.alert('Error', 'No se pudo subir la imagen')
        } finally {
            setLoading(false)
        }
    }

    return(
        <View style={styles.container}>
            <Avatar
                rounded
                size="large"
                source={
                    photoURL ? 
                    {uri: photoURL} :
                    require('../../assets/avatar-default.jpg')
                }
            />
            <View style={styles.infoUser}>
                <Text style={styles.displayName}>
                    {user.name ? user.name : "Anonimo"}
                </Text>
                <Text>
                    {user.email}
                </Text>
                <Text>
                    {user.direction ? user.direction : "Sin dirección registrada"}
                </Text>
                <Text>
                    {user.telefono ? user.telefono : "000-000-0000"}
                </Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    backgroundColor: "#f9f9f9",
    paddingVertical: 30
  },
  infoUser: {
    marginLeft: 20
  },
  displayName: {
    fontWeight: "bold",
    paddingBottom: 5
  }
})