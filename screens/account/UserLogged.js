import AsyncStorage from '@react-native-async-storage/async-storage'
import { useFocusEffect, useNavigation } from '@react-navigation/native'
import React, { useCallback, useState } from 'react'
import { Text, StyleSheet, View } from 'react-native'
import { Button } from 'react-native-elements'
import {closeSession, getCurrentUser } from '../../actions'
import InfoUser from '../../components/account/InfoUser'
import AccountOptions from '../../components/account/AccountOptions'
import Loading from '../../components/Loading'

export default function UserLogged()  {

  const navigation = useNavigation()

  const [user, setUser] = useState(null)
  const [reloadUser, setReloadUser] = useState(false)
  const [loading, setLoading] = useState(false)
  const [loadingText , setLoadingText] = useState("")

  useFocusEffect(
    useCallback(() => {
      const fetchUser = async () => {
        const currentUser = await getCurrentUser()
        setUser(currentUser)
        setReloadUser(false)
      }
      fetchUser()
    }, [reloadUser])
  )

    return (
      <View style={styles.container}>
        { user && (
          <View>
            <InfoUser user={user} setLoading={setLoading} setLoadingText={setLoadingText}/>
            <AccountOptions user={user} setLoading={setLoading} setReloadUser={setReloadUser}/>
          </View>
        )
        }
        <Button
          title="Cerrar sesion"
          buttonStyle={styles.btnCloseSession}
          titleStyle={styles.btnCloseSessionTtile}
          onPress={async() => {
            await closeSession()
            navigation.reset({
              index: 0,
              routes: [{name: "Account" }]
            })
          }}
        />
        <Loading isVisible={loading} text={loadingText}/>
      </View>
    )
  }

  const styles = StyleSheet.create({
  container: {
    minHeight: "100%",
    backgroundColor: "#f9f9f9"
  },
  btnCloseSession: {
    marginTop: 30,
    borderRadius: 5,
    backgroundColor: "#fff",
    borderTopWidth: 1,
    borderTopColor: "#377d07",
    borderBottomWidth: 1,
    borderBottomColor: "#377d07",
    paddingVertical: 10
  },
  btnCloseSessionTtile: {
    color: "#377d07"
  }
})