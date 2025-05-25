import React, { useState } from 'react'
import { StyleSheet, View } from 'react-native'
import { Input, Button } from 'react-native-elements'

export default function ChangePasswordForm({ user, setShowModal }) {
  const [newPassword, setNewPassword] = useState("")
  const [error, setError] = useState(null)

  const updatePassword = async () => {
    setError(null)

    if (!newPassword || newPassword.length < 6) {
      setError("La contraseña debe tener al menos 6 caracteres.")
      return
    }

    try {

      await fetch(`http://192.168.0.19:3000/user/${user._id}/password`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password: newPassword })
      })

      setShowModal(false)

    } catch (error) {
      console.log(error)
      setError("Error al actualizar contraseña.")
    }
  }

  return (
    <View style={styles.container}>
      <Input
        placeholder="Nueva contraseña"
        secureTextEntry
        value={newPassword}
        onChangeText={text => setNewPassword(text)}
        errorMessage={error}
      />
      <Button title="Cambiar contraseña" onPress={updatePassword} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    margin: 20
  }
})
