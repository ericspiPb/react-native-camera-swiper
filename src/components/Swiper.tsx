import React, { ReactNode } from 'react';
import { StyleSheet } from 'react-native';
import Animated, {
  useSharedValue,
  withSpring,
  useAnimatedStyle,
  useAnimatedGestureHandler,
} from 'react-native-reanimated';
import { PanGestureHandler, PanGestureHandlerGestureEvent } from 'react-native-gesture-handler';

const styles = StyleSheet.create({
  box: {
    flex: 1,
    backgroundColor: 'green',
  },
});

export interface SwiperProps {
  children?: ReactNode;
}

// manual clone from react-native-reanimtaed.d.ts
export type Context = Record<string, unknown>;

export interface SwiperState extends Context {
  startX: number;
  startY: number;
}

export default function Swiper(props: SwiperProps) {
  const x = useSharedValue(0);

  const gestureHandler = useAnimatedGestureHandler<PanGestureHandlerGestureEvent, SwiperState>({
    onStart: (_, ctx) => {
      ctx.startX = x.value;
    },
    onActive: (event, ctx) => {
      x.value = ctx.startX + event.translationX;
    },
    onEnd: (_) => {
      x.value = withSpring(0);
    },
  }, []);

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
      <Animated.View style={[styles.box, animatedStyle]}>
        {props.children}
      </Animated.View>
    </PanGestureHandler>
  );
}
