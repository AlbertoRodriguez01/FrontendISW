import React from 'react'
import { Text, StyleSheet, View, Image } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import LoginForms from '../../components/account/LoginForms'

export default function Login() {
    return (
        <KeyboardAwareScrollView>
            <Image source={require("../../assets/logo.png")} resizeMode='contain' style={styles.image}/>
          <LoginForms/>
        </KeyboardAwareScrollView>
      )
}

const styles = StyleSheet.create({
    image:{
        height:150,
        width:"100%",
        marginBottom:20
    }
})