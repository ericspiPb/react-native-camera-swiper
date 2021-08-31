import React, { LegacyRef } from 'react';
import { View, Text } from 'react-native';
import { Camera } from 'expo-camera';
import { Audio } from 'expo-av';

import Toolbar from './camera.toolbar';

import styles from './camera.page.styles';

export default class CameraPage extends React.Component {
  camera: Camera | null = null;

  state = {
    hasCameraPermission: null,
  };

  async componentDidMount() {
    const camera = await Camera.requestPermissionsAsync();
    const audio = await Audio.requestPermissionsAsync();
    const hasCameraPermission = camera.status === 'granted' && audio.status === 'granted';

    this.setState({ hasCameraPermission });
  }

  render() {
    const { hasCameraPermission } = this.state;

    if (hasCameraPermission === null) {
      return <View />;
    } else if (hasCameraPermission === false) {
      return <Text>Access to camera has been denied.</Text>;
    }

    return (
      <View>
        <Camera style={styles.preview} ref={(camera) => (this.camera = camera)} />
        <Toolbar />
      </View>
    );
  }
}
