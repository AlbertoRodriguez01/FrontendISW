import React from 'react'
import { ActivityIndicator, Modal, StyleSheet, Text, View } from 'react-native'

export default function Loading({ isVisible, text }) {
  return (
    <Modal
      transparent={true}
      visible={isVisible}
      animationType="fade"
    >
      <View style={styles.overlay}>
        <View style={styles.container}>
          <ActivityIndicator size="large" color="#377d07" />
          {text && <Text style={styles.text}>{text}</Text>}
        </View>
      </View>
    </Modal>
  )
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.85)',
    justifyContent: 'center',
    alignItems: 'center'
  },
  container: {
    alignItems: 'center',
    justifyContent: 'center'
  },
  text: {
    color: '#377d07',
    marginTop: 10,
    fontSize: 16
  }
})