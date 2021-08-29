import React, { PropsWithChildren } from 'react';
import { Dimensions, StyleSheet, View, ViewStyle } from 'react-native';
import { PanGestureHandler, State } from 'react-native-gesture-handler';
import Animated, {
  add,
  clockRunning,
  cond,
  debug,
  divide,
  eq,
  floor,
  not,
  set,
  useCode,
} from 'react-native-reanimated';
import {
  snapPoint,
  timing,
  useClock,
  usePanGestureHandler,
  useValue,
} from 'react-native-redash/lib/module/v1';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'green',
  },
  text: {
    color: 'white',
  }
});

export interface SwiperProps {
  style?: ViewStyle,
}

const Swiper = (props: PropsWithChildren<SwiperProps>) => {
  const { width, height } = Dimensions.get('window');

  const clock = useClock();
  const index = useValue(0);
  const offsetX = useValue(0);
  const translateX = useValue(0);
  const { gestureHandler, state, velocity, translation } = usePanGestureHandler();
  const to = snapPoint(translateX, velocity.x, [0, width, -width]);

  useCode(
    () => [
      cond(eq(state, State.ACTIVE), [
        set(translateX, add(offsetX, translation.x)),
      ]),

      cond(eq(state, State.END), [
        set(translateX, timing({ clock, from: translateX, to })),
        set(offsetX, translateX),
        cond(not(clockRunning(clock)), [
          set(index, floor(divide(translateX, -width))),
        ]),
      ]),

    ], []
  );

  return (
    <View style={styles.container}>
      <PanGestureHandler {...gestureHandler}>
        <Animated.View style={[styles.container, {...props.style}]}>
          <Animated.View style={{ transform: [{ translateX }] }}>
            {props.children}
          </Animated.View>
        </Animated.View>
      </PanGestureHandler>
    </View>
  );
};

export default Swiper;
