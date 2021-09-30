import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';

import CameraScreen from './components/camera/camera.screen';

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <CameraScreen />
      <StatusBar style='auto' />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'black',
  },
});
