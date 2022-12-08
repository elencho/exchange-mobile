import { KeyboardAvoidingView } from 'react-native';
import React from 'react';

export const WithKeyboard = ({ offset, chidlren }) => {
  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      keyboardVerticalOffset={1}
      behavior={'padding'}
    >
      {chidlren}
    </KeyboardAvoidingView>
  );
};
