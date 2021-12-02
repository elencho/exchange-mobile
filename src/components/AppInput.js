import React, { useEffect, useRef, useState } from 'react';
import {
  TextInput,
  StyleSheet,
  View,
  Animated,
  Easing,
  TouchableWithoutFeedback,
} from 'react-native';

import AppText from '../components/AppText';
import colors from '../constants/colors';

const AppInput = ({ label = '', left = null, right = null, ...rest }) => {
  const [isFocused, setIsFocused] = useState(false);

  const inputRef = useRef(null);
  const focusAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(focusAnim, {
      toValue: isFocused ? 1 : 0,
      duration: 150,
      easing: Easing.bezier(0.4, 0, 0.2, 1),
      useNativeDriver: true,
    }).start();
  }, [focusAnim, isFocused]);

  let borderColor = isFocused ? '#6582FD' : '#42475D';

  return (
    <>
      <View style={[styles.inputContainer, { borderColor }]}>
        {left}
        <TextInput
          style={styles.input}
          ref={inputRef}
          onBlur={() => setIsFocused(false)}
          onFocus={() => setIsFocused(true)}
          {...rest}
        />
        {right}
      </View>

      {label ? (
        <TouchableWithoutFeedback onPress={() => inputRef.current?.focus()}>
          <Animated.View
            style={[
              styles.labelContainer,
              {
                transform: [
                  {
                    scale: focusAnim.interpolate({
                      inputRange: [0, 1],
                      outputRange: [1, 0.75],
                    }),
                  },
                  {
                    translateY: focusAnim.interpolate({
                      inputRange: [0, 1],
                      outputRange: [28, -12],
                    }),
                  },
                  {
                    translateX: focusAnim.interpolate({
                      inputRange: [0, 1],
                      outputRange: [16, 0],
                    }),
                  },
                ],
              },
            ]}
          >
            <AppText subtext body style={styles.label}>
              {label}
            </AppText>
          </Animated.View>
        </TouchableWithoutFeedback>
      ) : null}
    </>
  );
};

const styles = StyleSheet.create({
  input: {
    fontFamily: 'Ubuntu_Medium',
    fontSize: 14,
    flex: 1,
    color: colors.PRIMARY_TEXT,
    height: '100%',
  },
  inputContainer: {
    borderWidth: 1,
    borderRadius: 4,
    height: 45,
    paddingHorizontal: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  labelContainer: {
    position: 'absolute',
    paddingHorizontal: 8,
    backgroundColor: colors.PRIMARY_BACKGROUND,
  },
  label: {
    color: colors.PRIMARY_PURPLE,
  },
});

export default AppInput;
