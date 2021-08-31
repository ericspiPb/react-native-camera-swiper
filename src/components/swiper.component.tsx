import React, { ReactNode } from 'react';
import { Dimensions, StyleSheet, ViewStyle } from 'react-native';
import Animated, { useSharedValue, withSpring, useAnimatedStyle, useAnimatedGestureHandler, runOnUI } from 'react-native-reanimated';
import { GestureEventPayload, PanGestureHandler, PanGestureHandlerEventPayload, PanGestureHandlerGestureEvent } from 'react-native-gesture-handler';

import NativeCamera from 'components/camera.component.native';

const styles = StyleSheet.create({
  box: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'green',
  },
});

// manual clone from react-native-reanimtaed.d.ts
export type Context = Record<string, unknown>;

export interface SwiperState extends Context {
  startX: number;
  startY: number;
}

export interface SwiperProps {
  children?: ReactNode;
  style?: ViewStyle;
  onSwipeLeft?: (_: Readonly<GestureEventPayload & PanGestureHandlerEventPayload>) => void;
  onSwipeRight?: (_: Readonly<GestureEventPayload & PanGestureHandlerEventPayload>) => void;
}

export default function Swiper(props: SwiperProps) {
  const { width, height } = Dimensions.get('screen');
  const x = useSharedValue(0);

  const gestureHandler = useAnimatedGestureHandler<PanGestureHandlerGestureEvent, SwiperState>(
    {
      onStart: (_, ctx) => {
        ctx.startX = x.value;
      },
      onActive: (event, ctx) => {
        x.value = ctx.startX + event.translationX;
      },
      onEnd: (_) => {
        // if (_.translationX > 0) {
        //   props.onSwipeLeft?.(_);
        // } else if (_.translationY < 0) {
        //   props.onSwipeRight?.(_);
        // }
        x.value = withSpring(0);
      },
    },
    []
  );

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: x.value,
        },
      ],
    };
  });

  return (
    <PanGestureHandler onGestureEvent={gestureHandler}>
      <Animated.View style={[styles.box, animatedStyle, props.style]}>
        {props.children}
      </Animated.View>
    </PanGestureHandler>
  );
}
