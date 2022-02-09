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

const AppInput = ({
  label = '',
  left = null,
  right = null,
  style,
  value,
  labelBackgroundColor = colors.PRIMARY_BACKGROUND,
  ...rest
}) => {
  const [isFocused, setIsFocused] = useState(false);

  const inputRef = useRef(null);
  const focusAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(focusAnim, {
      toValue: isFocused || value ? 1 : 0,
      duration: 150,
      easing: Easing.bezier(0.4, 0, 0.2, 1),
      useNativeDriver: true,
    }).start();
  }, [focusAnim, isFocused]);

  let borderColor = isFocused ? colors.SECONDARY_PURPLE : '#42475D';

  return (
    <View style={[styles.inputContainer, { borderColor }, style]}>
      {left}
      <TextInput
        style={styles.input}
        ref={inputRef}
        onBlur={() => setIsFocused(false)}
        onFocus={() => setIsFocused(true)}
        value={value}
        placeholderTextColor={colors.SECONDARY_TEXT}
        {...rest}
      />
      {label ? (
        <TouchableWithoutFeedback onPress={() => inputRef.current?.focus()}>
          <Animated.View
            style={[
              styles.labelContainer,
              {
                backgroundColor: labelBackgroundColor,
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
                      outputRange: [0, -26],
                    }),
                  },
                  {
                    translateX: focusAnim.interpolate({
                      inputRange: [0, 1],
                      outputRange: [10, 0],
                    }),
                  },
                ],
              },
            ]}
          >
            <AppText
              body
              style={{
                color: isFocused
                  ? colors.PRIMARY_PURPLE
                  : colors.SECONDARY_TEXT,
              }}
            >
              {label}
            </AppText>
          </Animated.View>
        </TouchableWithoutFeedback>
      ) : null}

      {right}
    </View>
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
    paddingHorizontal: 15,
    flexDirection: 'row',
    alignItems: 'center',
  },
  labelContainer: {
    position: 'absolute',
    paddingHorizontal: 8,
    height: 18,
  },
});

export default AppInput;
