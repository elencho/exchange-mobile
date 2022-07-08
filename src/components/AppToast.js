import React, { useEffect, useRef, useState } from 'react';
import { Animated, Easing, Pressable, StyleSheet, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { toggleAppToast } from '../redux/modals/actions';

import AppAnimatedCircle from './AppAnimatedCircle';
import AppText from './AppText';

const Texts = ({ toastObj }) => (
  <View style={styles.texts}>
    {toastObj?.header ? (
      <AppText medium style={styles.white}>
        {toastObj.header}
      </AppText>
    ) : null}
    {toastObj?.body ? (
      <AppText subtext style={styles.white}>
        {toastObj.body}
      </AppText>
    ) : null}
  </View>
);

export default function AppToast() {
  const dispatch = useDispatch();
  const [pressed, setPressed] = useState(false);

  const animated = useRef(new Animated.Value(0)).current;
  const animatedObj = (toValue, delay) => {
    return {
      delay,
      toValue,
      duration: 500,
      useNativeDriver: true,
      easing: Easing.out(Easing.ease),
    };
  };

  const animationStart = () =>
    Animated.timing(animated, animatedObj(1, 200)).start();
  const animationFinish = () =>
    Animated.timing(animated, animatedObj(0, 200)).start(() =>
      dispatch(toggleAppToast(false))
    );

  const state = useSelector((state) => state);
  const {
    modals: { appToastVisible },
  } = state;

  const toastObj = {
    header: 'Header',
    body: 'Body Body Body Body Body Body Body Body  ',
  };

  useEffect(() => {
    if (appToastVisible) {
      animationStart();

      const timeout = setTimeout(() => {
        animationFinish();
      }, 5000);

      if (pressed) clearTimeout(timeout);
    }

    return () => {
      setPressed(false);
    };
  }, [appToastVisible, pressed]);

  const translateY = animated.interpolate({
    inputRange: [0, 1],
    outputRange: [-200, 35],
  });

  return (
    <>
      {appToastVisible && (
        <Animated.View
          style={[styles.container, { transform: [{ translateY }] }]}
        >
          <Pressable
            style={styles.pressable}
            onPressIn={() => setPressed(true)}
            onPressOut={() => setPressed(false)}
          >
            <AppAnimatedCircle
              duration={6000}
              radius={15}
              strokeWidth={3}
              delay={500}
              pressed={pressed}
            />
            <Texts toastObj={toastObj} />
          </Pressable>
        </Animated.View>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 15,
    paddingHorizontal: 22,
    borderRadius: 35,
    backgroundColor: '#1BBE9E',

    position: 'absolute',
    top: 0,
    left: 20,
    right: 20,
    zIndex: 1,
  },
  pressable: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  texts: {
    marginLeft: 18,
    flex: 1,
  },
  white: {
    color: 'white',
  },
});
