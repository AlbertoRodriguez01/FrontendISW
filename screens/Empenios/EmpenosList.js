import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { View, FlatList, Image, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
import { Text, Card } from 'react-native-elements';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

export default function EmpenoList() {
  const navigation = useNavigation();
  const [clienteId, setClienteId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [empenos, setEmpenos] = useState([]);

  const fetchEmpenos = async (clienteId) => {
  try {
    const response = await axios.get(`http://192.168.0.19:3000/empenos/cliente/${clienteId}`);
    
    setEmpenos(response.data);

  } catch (error) {
    console.error('Error al obtener los empeños:', error);
  } finally {
    setLoading(false);
  }
};


  useEffect(() => {
    const getUserIdAndFetch = async () => {
      const userData = await AsyncStorage.getItem('user');
      if (userData) {
        const user = JSON.parse(userData);
        const id = user._id;
        setClienteId(id);
        fetchEmpenos(id);
      } else {
        setLoading(false);
      }
    };

    getUserIdAndFetch();
  }, []);

  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => navigation.navigate("EmpenoDetail", { id: item._id })}>
      <Card containerStyle={styles.card}>
        {item.images && item.images.length > 0 ? (
          <Image 
            source={{ uri: `http://192.168.0.19:3000/uploads/${item.images[0]}` }} 
            style={styles.image} 
          />
        ) : (
          <View style={[styles.image, { backgroundColor: '#ccc', justifyContent: 'center', alignItems: 'center' }]}>
            <Text style={{ color: '#666' }}>Sin imagen</Text>
          </View>
        )}
        <Text style={styles.title}>{item.nombre}</Text>
        <Text>{item.descripcion}</Text>
        <Text style={{ fontSize: 12, color: 'gray' }}>Fecha: {new Date(item.createdAt).toLocaleDateString()}</Text>
      </Card>
    </TouchableOpacity>
  );

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#000" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={empenos}
        keyExtractor={(item) => item._id.toString()}
        renderItem={renderItem}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  card: {
    borderRadius: 10,
    padding: 10,
  },
  image: {
    width: '100%',
    height: 150,
    borderRadius: 10,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 18,
    marginVertical: 5,
  },
});