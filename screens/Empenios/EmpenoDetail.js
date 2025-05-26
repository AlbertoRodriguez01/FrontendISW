import React, { useEffect, useState } from 'react';
import { View, Image, StyleSheet, ScrollView, ActivityIndicator, Alert, TextInput } from 'react-native';
import { Text, Card, Button } from 'react-native-elements';
import { useRoute } from '@react-navigation/native';
import axios from 'axios';

export default function EmpenoDetail() {
  const route = useRoute();
  const { id } = route.params;

  const [empeno, setEmpeno] = useState(null);
  const [cliente, setCliente] = useState(null);
  const [loading, setLoading] = useState(true);

  const [abono, setAbono] = useState('');
  const [abonoLoading, setAbonoLoading] = useState(false);

  useEffect(() => {
  const fetchEmpeno = async () => {
    try {
      const res = await axios.get(`http://192.168.0.19:3000/empenos/${id}`);
      setEmpeno(res.data);

      if (res.data.clienteId) {
        const clienteRes = await axios.get(`http://192.168.0.19:3000/clientes/${res.data.clienteId}`);
        setCliente(clienteRes.data);
      }
    } catch (error) {
      console.error('Error fetching empeño o cliente:', error);
      Alert.alert('Error', 'No se pudo cargar el empeño o cliente');
    } finally {
      setLoading(false);
    }
  };

  fetchEmpeno();
}, [id]);

  const handleAbonar = async () => {
    const montoAbono = parseFloat(abono);
    if (isNaN(montoAbono) || montoAbono <= 0) {
      Alert.alert('Error', 'Ingresa un monto válido para abonar');
      return;
    }

    if (montoAbono > (empeno.restante || empeno.monto)) {
      Alert.alert('Error', 'El abono no puede ser mayor al monto restante');
      return;
    }

    setAbonoLoading(true);
    try {
      await axios.post(`http://192.168.0.19:3000/empenos/${id}/abono`, { monto: montoAbono });
      
      Alert.alert('Éxito', 'Abono registrado correctamente');

      const res = await axios.get(`http://192.168.0.19:3000/empenos/${id}`);
      setEmpeno(res.data);
      setAbono('');
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'No se pudo registrar el abono');
    } finally {
      setAbonoLoading(false);
    }
  };

  if (loading) {
    return <ActivityIndicator size="large" style={{ flex: 1 }} />;
  }

  if (!empeno) {
    return <Text>Empeño no encontrado.</Text>;
  }

  console.log(cliente)

  return (
    <ScrollView style={styles.container}>
      <Card containerStyle={styles.card}>
        <Image source={{ uri: empeno.images[0] }} style={styles.image} />
        <Text style={styles.title}>{empeno.nombre}</Text>
        <Text style={styles.subtitle}>{empeno.descripcion}</Text>

        <Text style={styles.info}>Fecha de registro: {new Date(empeno.createdAt).toLocaleDateString()}</Text>

        {cliente && (
          <>
            <Text style={styles.infoTitle}>Datos del Cliente:</Text>
            <Text>Nombre: {cliente.name || 'No disponible'}</Text>
            <Text>Email: {cliente.email || 'No disponible'}</Text>
            <Text>Teléfono: {cliente.telefono || 'No disponible'}</Text>
          </>
        )}

        <Text style={styles.infoTitle}>Monto prestado: ${empeno.monto}</Text>
        <Text style={styles.infoTitle}>
          Restante por pagar: ${empeno.restante !== undefined ? empeno.restante : empeno.monto}
        </Text>

        <Text style={[styles.infoTitle, { marginTop: 20 }]}>Registrar abono:</Text>
        <TextInput
          style={styles.input}
          placeholder="Monto del abono"
          keyboardType="numeric"
          value={abono}
          onChangeText={setAbono}
        />
        <Button
          title={abonoLoading ? 'Procesando...' : 'Dar Abono'}
          onPress={handleAbonar}
          disabled={abonoLoading}
          buttonStyle={{ backgroundColor: '#377d07', marginTop: 10 }}
        />
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
  infoTitle: { fontWeight: 'bold', marginTop: 10, fontSize: 16 },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginTop: 10,
  },
});
