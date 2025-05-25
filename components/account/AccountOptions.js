import React, { useState } from 'react'
import { StyleSheet, View } from 'react-native'
import { Icon, ListItem } from 'react-native-elements'
import { map } from 'lodash'
import Modal from '../Modal'
import ChangeDisplayNameForm from '../ChangeDisplayNameForm'
import ChangePasswordForm from '../ChangePasswordForm'
import ChangeDireccion from '../ChangeDireccion'
import ChangeTel from '../ChangeTel'

export default function AccountOptions({ user, setReloadUser }) {
  const [showModal, setShowModal] = useState(false)
  const [renderComponent, setRenderComponent] = useState(null)

  const generateOptions = () => [
    {
      id: 1,
      title: 'Cambiar nombre y apellido',
      iconNameLeft: 'account-circle',
      iconColorLeft: '#377d07',
      iconNameRight: 'chevron-right',
      iconColorRight: '#377d07',
      onPress: () => selectedComponent('displayName')
    },
    {
      id: 2,
      title: 'Cambiar contraseña',
      iconNameLeft: 'lock-reset',
      iconColorLeft: '#377d07',
      iconNameRight: 'chevron-right',
      iconColorRight: '#377d07',
      onPress: () => selectedComponent('password')
    },
    {
      id: 3,
      title: 'Cambiar direccion',
      iconNameLeft: 'sign-direction',
      iconColorLeft: '#377d07',
      iconNameRight: 'chevron-right',
      iconColorRight: '#377d07',
      onPress: () => selectedComponent('direccion')
    },
    {
      id: 4,
      title: 'Cambiar telefono',
      iconNameLeft: 'phone',
      iconColorLeft: '#377d07',
      iconNameRight: 'chevron-right',
      iconColorRight: '#377d07',
      onPress: () => selectedComponent('telefono')
    }
  ]

  const selectedComponent = (key) => {
    switch (key) {
      case 'displayName':
        setRenderComponent(
          <ChangeDisplayNameForm 
            user={user}
            setShowModal={setShowModal}
            setReloadUser={setReloadUser}
          />
        )
        break
      case 'password':
        setRenderComponent(
          <ChangePasswordForm 
            user={user}
            setShowModal={setShowModal}
          />
        )
        break
      case 'direccion':
        setRenderComponent(
          <ChangeDireccion
            user={user}
            setShowModal={setShowModal}
          />
        )
        break
      case 'telefono':
        setRenderComponent(
          <ChangeTel
            user={user}
            setShowModal={setShowModal}
          />
        )
        break
    }
    setShowModal(true)
  }

  const menuOptions = generateOptions()

  return (
    <View>
      {map(menuOptions, (menu, index) => (
  <ListItem key={menu.id} onPress={menu.onPress} style={styles.menuItem}>
    <Icon 
      type='material-community' 
      name={menu.iconNameLeft}
      color={menu.iconColorLeft}
    />
    <ListItem.Content>
      <ListItem.Title>{menu.title}</ListItem.Title>
    </ListItem.Content>
    <Icon 
      type='material-community' 
      name={menu.iconNameRight}
      color={menu.iconColorRight}
    />
  </ListItem>
))}

      <Modal isVisible={showModal} setVisible={setShowModal}>
        {renderComponent}
      </Modal>
    </View>
  )
}

const styles = StyleSheet.create({
  menuItem: {
    borderBottomWidth: 1,
    borderBottomColor: '#377d07'
  }
})
