import React from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
} from 'react-native';
import { useKeyboard } from '@react-native-community/hooks';

export default function WithKeyboard({
  children,
  padding,
  flexGrow,
  style = {},
  contentContainerStyle = {},
  refreshControl,
}) {
  const keyboard = useKeyboard();
  const visible = keyboard?.keyboardShown;
  const height = keyboard?.keyboardHeight;
  const android = Platform.OS === 'android';

  const contentStyle = {
    paddingBottom: android && padding && visible ? height : 0,
    flexGrow: flexGrow ? 1 : null,
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.select({ android: undefined, ios: 'padding' })}
      keyboardVerticalOffset={Platform.select({ ios: 50, android: 500 })}
      style={styles.flex}
    >
      <ScrollView
        style={[styles.flex, style]}
        contentContainerStyle={[contentStyle, contentContainerStyle]}
        showsVerticalScrollIndicator={false}
        refreshControl={refreshControl}
      >
        {children}
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
});
