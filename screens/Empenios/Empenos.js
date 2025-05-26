import React, { useEffect, useState } from 'react'
import { StyleSheet, ScrollView, Image, Text, View} from 'react-native'
import { Button, Icon } from 'react-native-elements'
import { useFocusEffect, useNavigation } from '@react-navigation/native'
import AsyncStorage from '@react-native-async-storage/async-storage'

export default function Empenos() {

  const navigation = useNavigation()

  const [userLogged, setUserLogged] = useState(null)

  useFocusEffect(
    React.useCallback(() => {
        const checkUser = async () => {
            const userData = await AsyncStorage.getItem('user')
            if(userData) {
                setUserLogged(JSON.parse(userData))
            } else {
                setUserLogged(null)
            }
        }
        checkUser()
    }, [])
  )


  if(userLogged === null) {
    return <UserNoLogged navigation={navigation}/>
  }

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

function UserNoLogged({ navigation }) {
  return (
    <View style={{ flex: 1, justifyContent: "center", padding: 30 }}>
      <View>
        <Icon type="material-community" name="alert-outline" size={50} />
        <Text style={{ fontSize: 20, fontWeight: "bold", textAlign: 'center' }}>
          Necesitas iniciar sesion para acceder a los empeños
        </Text>
        <Button
          title="Ir al Login"
          containerStyle={{ marginTop: 30, width: "80%", marginVertical: 10, justifyContent: 'center'}}
          buttonStyle={{ backgroundColor: "#377d07" }}
          onPress={() => navigation.navigate("Cuenta")}
        />
      </View>
    </View>
  );
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