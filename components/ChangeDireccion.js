import React, { useState } from 'react'
import { StyleSheet, View } from 'react-native'
import { Input, Button } from 'react-native-elements'

export default function ChangeDireccion({ user, setShowModal }) {
  const [newDirection, setNewDirection] = useState("")
  const [error, setError] = useState(null)

  const updateDirection = async () => {
    setError(null)

    if (!newDirection) {
      setError("La direccion no puede estar vacia")
      return
    }

    try {

      await fetch(`http://192.168.0.19:3000/user/${user._id}/direction`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ direccion: newDirection })
      })

      setShowModal(false)

    } catch (error) {
      console.log(error)
      setError("Error al actualizar la direccion.")
    }
  }

  return (
    <View style={styles.container}>
      <Input
        placeholder="Nueva direccion"
        secureTextEntry
        value={newDirection}
        onChangeText={text => setNewDirection(text)}
        errorMessage={error}
      />
      <Button title="Cambiar direccion" onPress={updateDirection} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    margin: 20
  }
})
