import React, { useState } from 'react'
import { StyleSheet, View } from 'react-native'
import { Input, Button } from 'react-native-elements'
import AsyncStorage from '@react-native-async-storage/async-storage'

export default function ChangeDisplayNameForm({ user, setShowModal, setReloadUser }) {
  const [newName, setNewName] = useState("")
  const [error, setError] = useState(null)

  const updateName = async () => {
    setError(null)

    if (!newName) {
      setError("El nombre no puede estar vacío.")
      return
    }

    try {

      await fetch(`http://192.168.0.19:3000/user/${user._id}/name`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: newName })
      })

      const updatedUser = { ...user, name: newName }
      await AsyncStorage.setItem('user', JSON.stringify(updatedUser))

      setShowModal(false)
      setReloadUser(true)

    } catch (error) {
      console.log(error)
    }
  }

  return (
    <View style={styles.container}>
      <Input
        placeholder="Nuevo nombre"
        value={newName}
        onChangeText={text => setNewName(text)}
        errorMessage={error}
      />
      <Button title="Cambiar nombre" onPress={updateName} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    margin: 20
  }
})
