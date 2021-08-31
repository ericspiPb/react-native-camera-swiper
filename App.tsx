import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { SafeAreaView, Dimensions, StyleSheet, Text, View } from 'react-native';
import { Swipeable, GestureEventPayload, PanGestureHandlerEventPayload } from 'react-native-gesture-handler';

import Swiper from 'components/swiper.component';
import NativeCamera from 'components/camera.component.native';

const { width, height } = Dimensions.get('screen');
export default function App() {
  const [openCamera, setOpenCamera] = useState<boolean>(false);

  const handleSwipeLeft = (_: Readonly<GestureEventPayload & PanGestureHandlerEventPayload>) => {
    // 'worklet';

    setOpenCamera(true);
  };

  const handleSwipeRight = (_: Readonly<GestureEventPayload & PanGestureHandlerEventPayload>) => {
    // 'worklet';

    setOpenCamera(false);
  };

  const handleSwipeableLeft = () => {

    setOpenCamera(true);
  }

  return (
    <SafeAreaView style={styles.container}>
      {/* {openCamera && (
        <Swiper onSwipeRight={handleSwipeRight}>
        </Swiper>
      )} */}
      {/* <Camera style={styles.camera} /> */}
      {/* <Swiper style={styles.camera}>
        <NativeCamera />
      </Swiper> */}
      {openCamera && <NativeCamera />}
      <Swipeable onSwipeableLeftOpen={handleSwipeableLeft} containerStyle={styles.swipeable} >
        <Text style={StyleSheet.absoluteFill}>Hello</Text>
      </Swipeable>
      {/* <Swiper style={styles.text} onSwipeLeft={handleSwipeLeft}>
        <Text style={StyleSheet.absoluteFill}>Hello</Text>
      </Swiper> */}
      {/* <Swiper onSwipeLeft={handleSwipeLeft} /> */}
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
  swipeable: {
    flex: 1,
    backgroundColor: 'yellow',
  },
  camera: {
    left: 0,
    right: width,
  },
  text: {
    left: 0,
    right: width,
  }
});
