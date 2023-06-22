import React from 'react';
import { Pressable, StyleSheet } from 'react-native';
import { MaterialIndicator } from 'react-native-indicators';

import colors from '../constants/colors';
import AppText from './AppText';

export default function AppButton({
  text,
  backgroundColor = colors.SECONDARY_PURPLE,
  left,
  right,
  style,
  disabled,
  loading,
  onPress,
  ...rest
}) {
  return (
    <Pressable
      disabled={disabled}
      style={[
        styles.button,
        { backgroundColor, opacity: disabled ? 0.5 : 1 },
        style,
      ]}
      onPress={loading ? null : onPress}
      {...rest}
    >
      {left}
      {loading ? (
        <MaterialIndicator color="#FFFFFF" animationDuration={3000} size={20} />
      ) : (
        <AppText
          body
          medium
          style={[styles.buttonText, left && { marginLeft: 9 }]}
        >
          {text}
        </AppText>
      )}
      {right}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    height: 45,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  buttonText: {
    color: colors.PRIMARY_TEXT,
  },
});
