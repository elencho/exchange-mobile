import React from 'react';
import { StyleSheet, View } from 'react-native';

import AppText from './AppText';
import colors from '../constants/colors';

const InputErrorMsg = ({ message = '' }) => {
  return (
    <View style={styles.container}>
      <AppText subtext style={styles.text}>
        {message}
      </AppText>
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
