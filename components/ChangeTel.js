import React, { useState } from 'react'
import { StyleSheet, View } from 'react-native'
import { Input, Button } from 'react-native-elements'

export default function ChangeTel({ user, setShowModal }) {
  const [newTel, setNewTel] = useState("")
  const [error, setError] = useState(null)

  const updateTel = async () => {
    setError(null)

    if (!newTel || newTel.length != 10) {
      setError("El telefono debe tener al menos 10 caracteres.")
      return
    }

    try {

      await fetch(`http://192.168.0.19:3000/user/${user._id}/tel`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ telefono: newTel })
      })

      setShowModal(false)

    } catch (error) {
      console.log(error)
      setError("Error al actualizar el telefono.")
    }
  }

  return (
    <View style={styles.container}>
      <Input
        placeholder="Nuevo telefono"
        keyboardType='numeric'
        maxLength={10}
        value={newTel}
        onChangeText={text => setNewTel(text)}
        errorMessage={error}
      />
      <Button title="Cambiar telefono" onPress={updateTel} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    margin: 20
  }
})
