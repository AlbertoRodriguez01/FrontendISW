import React, { useState, useEffect } from 'react';
import Navigation from './navigation/Navigation';
import Loading from './components/Loading';
import { LogBox } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

LogBox.ignoreAllLogs();

export default function App() {
  const [loadingVisible, setLoadingVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoadingVisible(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Navigation />
      <Loading isVisible={loadingVisible} text="Cargando..." />
    </GestureHandlerRootView>
  );
}