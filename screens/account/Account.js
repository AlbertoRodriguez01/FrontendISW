import React, { useCallback, useState } from 'react'
import { StyleSheet, ScrollView, Image, Text} from 'react-native'

import UserGuest from './UserGuest'
import UserLogged from './UserLogged'
import { useFocusEffect, useNavigation } from '@react-navigation/native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import Loading from '../../components/Loading'
import { getCurrentUser } from '../../actions'

export default function Account() {

  const [login, setLogin] = useState(null)
  const [user, setUser] = useState(null)

  useFocusEffect(
    useCallback(() => {
        const checkSession = async () => {
            const currentUser = await getCurrentUser()
            setUser(currentUser)
            setLogin(!!currentUser)
        }
        checkSession()
    }, [])
  )

  if (login === null) {
    return <Loading isVisible={true} text="Cargando..." />
  }

  return login ? <UserLogged/> : <UserGuest/>
}

const styles = StyleSheet.create({})