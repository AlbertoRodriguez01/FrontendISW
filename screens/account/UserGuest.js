import React from 'react'
import { StyleSheet, ScrollView, Image, Text} from 'react-native'

import { Button } from 'react-native-elements'
import { useNavigation } from '@react-navigation/native'

export default function UserGuest() {

  const navigation = useNavigation()

    return (
        <ScrollView
                    centerContent
                    style={styles.viewBody}
                  >
                    <Image source={require("../../assets/logo.png")} resizeMode='contain' style={styles.image}/>
                    <Text style={styles.title}>Consulta tu perfil</Text>
                    <Text style={styles.descripcion}>Ven y consigue dinero por tus productos!</Text>
                    <Button
                        buttonStyle={styles.boton}
                        title="Iniciar Sesion"
                        onPress={() => navigation.navigate("Login")}
                    />
                    <Button
                        buttonStyle={styles.boton}
                        title="Registrarse"
                        onPress={() => navigation.navigate("Register")}
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