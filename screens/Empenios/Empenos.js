import React from 'react'
import { StyleSheet, ScrollView, Image, Text} from 'react-native'

import { Button } from 'react-native-elements'
import { useNavigation } from '@react-navigation/native'

export default function Empenos() {

  const navigation = useNavigation()

    return (
        <ScrollView
                    centerContent
                    style={styles.viewBody}
                  >
                    <Image source={require("../../assets/logo.png")} resizeMode='contain' style={styles.image}/>
                    <Text style={styles.title}>Bienvenido a Empeños!!</Text>
                    <Text style={styles.descripcion}>¿Qué deseas hacer?</Text>
                    <Button
                        buttonStyle={styles.boton}
                        title="Empeñar un articulo"
                        onPress={() => navigation.navigate("Empeno")}
                    />
                    <Button
                        buttonStyle={styles.boton}
                        title="Historial de empeños"
                        onPress={() => navigation.navigate("EmpenoList")}
                    />
      </ScrollView>
    )
}

const styles = StyleSheet.create({
  viewBody:{
      marginHorizontal:30
  },
  image:{
      height:300,
      width:"100%",
      marginBottom:10,
  },
  title:{
      fontWeight:"bold",
      fontSize:19,
      marginVertical: 10,
      textAlign:"center"
  },
  descripcion:{
      textAlign:"center",
      marginBottom:20,
      color:"gray"
  },
  boton:{
      backgroundColor:"#377d07",
      margin: 15
  }
})