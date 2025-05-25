import React, { useEffect, useState } from 'react';
import { View, Image, StyleSheet, ScrollView, ActivityIndicator } from 'react-native';
import { Text, Card } from 'react-native-elements';
import { useRoute } from '@react-navigation/native';
import axios from 'axios';

export default function EmpenoDetail() {
  const route = useRoute();
  const { id } = route.params;

  const [empeno, setEmpeno] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEmpeno = async () => {
      try {
        const res = await axios.get(`http://192.168.0.19:3000/empenos/${id}`);
        setEmpeno(res.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchEmpeno();
  }, [id]);

  if (loading) {
    return <ActivityIndicator size="large" style={{ flex: 1 }} />;
  }

  if (!empeno) {
    return <Text>Empeno no encontrado.</Text>;
  }

  return (
    <ScrollView style={styles.container}>
      <Card containerStyle={styles.card}>
        <Image source={{ uri: empeno.images[0] }} style={styles.image} />
        <Text style={styles.title}>{empeno.nombre}</Text>
        <Text style={styles.subtitle}>{empeno.descripcion}</Text>
        <Text style={styles.info}>Fecha de registro: {new Date(empeno.createdAt).toLocaleDateString()}</Text>
      </Card>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 10 },
  card: { borderRadius: 10, padding: 15 },
  image: { width: '100%', height: 250, borderRadius: 10, marginBottom: 15 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 10 },
  subtitle: { fontSize: 16, marginBottom: 15, color: '#333' },
  info: { fontSize: 14, marginBottom: 8 },
});
