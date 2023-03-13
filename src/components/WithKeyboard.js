import React, { useCallback, useEffect, useRef } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
} from 'react-native';
import { useKeyboard } from '@react-native-community/hooks';
import { useFocusEffect } from '@react-navigation/native';

export default function WithKeyboard({
  children,
  modal,
  scrollUp,
  padding,
  flexGrow,
  style = {},
  contentContainerStyle = {},
  refreshControl,
}) {
  const scrollRef = useRef();
  const keyboard = useKeyboard();
  const visible = keyboard?.keyboardShown;
  const height = keyboard?.keyboardHeight;
  const android = Platform.OS === 'android';

  useFocusEffect(
    useCallback(() => {
      scrollUp && scrollRef.current.scrollTo({ x: 0, y: 0, animated: true });
    }, [])
  );

  const contentStyle = {
    paddingBottom: android && padding && !modal && visible ? height : 0,
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
        ref={scrollRef}
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
