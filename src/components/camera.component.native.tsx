import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ViewStyle } from 'react-native';
import { Camera } from 'expo-camera';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  camera: {
    flex: 1,
  },
  buttonContainer: {},
  button: {

  },
  text: {
    color: 'red',
  },
});

export interface NativeCameraProps {
  style?: ViewStyle;
}

export default function NativeCamera(props: NativeCameraProps) {
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [type, setType] = useState(Camera.Constants.Type.back);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }
  return (
    <Camera style={[StyleSheet.absoluteFillObject, styles.camera, props.style]} type={type}>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            setType(type === Camera.Constants.Type.back ? Camera.Constants.Type.front : Camera.Constants.Type.back);
          }}
        >
          <Text style={styles.text}> Flip </Text>
        </TouchableOpacity>
      </View>
    </Camera>
  );
}
