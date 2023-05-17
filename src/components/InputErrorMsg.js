import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import colors from '../constants/colors';

const InputErrorMsg = ({ message = '' }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{message}</Text>
    </View>
  );
};

export default InputErrorMsg;

const styles = StyleSheet.create({
  container: {
    marginTop: -15,
  },
  text: {
    color: colors.ERROR_TEXT,
    fontSize: 11,
  },
});
