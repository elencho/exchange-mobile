import React from 'react';
import { Pressable, StyleSheet } from 'react-native';

import colors from '../constants/colors';
import AppText from './AppText';

export default function AppButton({
  onPress,
  text,
  backgroundColor = colors.SECONDARY_PURPLE,
  left,
  right,
  style,
}) {
  return (
    <Pressable
      style={[styles.button, { backgroundColor }, style]}
      onPress={onPress}
    >
      {left}
      <AppText medium style={styles.buttonText}>
        {text}
      </AppText>
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
    marginLeft: 10,
  },
});
