import React, { useCallback, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Dimensions,
} from 'react-native';
import { useKeyboard } from '@react-native-community/hooks';
import { useFocusEffect } from '@react-navigation/native';
import { setShouldRefreshOnScroll } from '../redux/wallet/actions';
import { IS_IOS } from '../constants/system';

const windowHeight = Dimensions.get('window').height;

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
  const dispatch = useDispatch();
  const scrollRef = useRef();
  const keyboard = useKeyboard();
  const visible = keyboard?.keyboardShown;
  const height = keyboard?.keyboardHeight;
  const android = Platform.OS === 'android';

  useFocusEffect(
    useCallback(() => {
      return () => {
        if (scrollUp)
          setTimeout(() => {
            scrollRef?.current?.scrollTo({ x: 0, y: 0, animated: true });
          }, 1000);
      };
    }, [])
  );

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
        ref={scrollRef}
        onScrollEndDrag={(e) => {
          if (IS_IOS && e.nativeEvent?.contentOffset?.y < -90)
            dispatch(setShouldRefreshOnScroll(true));
        }}
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
