import React, { memo, useEffect, useRef, useState } from 'react';
import {
  TextInput,
  StyleSheet,
  View,
  Animated,
  Easing,
  TouchableWithoutFeedback,
} from 'react-native';
import { IS_ANDROID } from '../constants/system';
import AppText from '../components/AppText';
import colors from '../constants/colors';

const AppInput = ({
  label = '',
  left = null,
  activeRight = null,
  right = null,
  style,
  value,
  error = false,
  errorText = null,
  isForModal,
  labelBackgroundColor = colors.PRIMARY_BACKGROUND,
  disabled,
  onChangeText = () => {},
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
      useNativeDriver: false,
    }).start();
  }, [focusAnim, isFocused, value]);

  let borderColor = error
    ? colors.ERROR_TEXT
    : isFocused
    ? colors.SECONDARY_PURPLE
    : '#42475D';

  const rightComponent = isFocused && activeRight ? activeRight : right;
  const isPlaceholder = !isFocused && !value && !right;

  return (
    <View style={style}>
      <View style={[styles.inputContainer, { borderColor }]}>
        {left}

        <TextInput
          style={[styles.input, disabled && styles.disabledInput]}
          ref={inputRef}
          onBlur={() => setIsFocused(false)}
          onFocus={() => setIsFocused(true)}
          value={value}
          placeholderTextColor={colors.SECONDARY_TEXT}
          onChangeText={(text) => onChangeText(text)}
          editable={!disabled}
          {...rest}
        />

        {label ? (
          <TouchableWithoutFeedback onPress={() => inputRef.current?.focus()}>
            <Animated.View
              style={[
                styles.labelContainer,
                {
                  width: isPlaceholder ? '100%' : null,
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
                        outputRange: [0, -31],
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
                  color:
                    isFocused && error
                      ? colors.ERROR_TEXT
                      : isFocused
                      ? colors.PRIMARY_PURPLE
                      : error
                      ? colors.ERROR_TEXT
                      : colors.SECONDARY_TEXT,
                  opacity: disabled ? 0.5 : 1,
                }}
              >
                {label}
              </AppText>
            </Animated.View>
          </TouchableWithoutFeedback>
        ) : null}
        {rightComponent && <View style={styles.icon}>{rightComponent}</View>}
      </View>
      {errorText && (
        <AppText small style={styles.errorText}>
          {errorText}
        </AppText>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  errorText: {
    color: '#F45E8C',
    marginTop: 8,
  },
  input: {
    fontFamily: 'Ubuntu_Medium',
    fontSize: 14,
    lineHeight: IS_ANDROID ? 18 : null,
    flex: 1,
    color: colors.PRIMARY_TEXT,
    height: '100%',
    marginRight: 10,
  },
  disabledInput: { color: colors.SECONDARY_TEXT },
  Gesinput: {
    fontFamily: 'Ubuntu_Medium',
    fontSize: 14,
    lineHeight: 18,
    flex: 1,
    paddingLeft: 22,
    color: colors.PRIMARY_TEXT,
    height: '100%',
    marginRight: 10,
    position: 'absolute',
    width: 250,
  },
  inputContainer: {
    borderWidth: 1,
    height: 44,
    paddingHorizontal: 15,
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 11,
  },
  labelContainer: {
    position: 'absolute',
    paddingHorizontal: 8,
    height: 25,
    justifyContent: 'center',
  },
  icon: {
    alignItems: 'flex-end',
    zIndex: -1,
  },
});

export default memo(AppInput);
