import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';

import colors from '../../constants/colors';
import AppText from '../AppText';

export default function QuestionMark() {
  return (
    <TouchableOpacity style={styles.container}>
      <AppText header style={styles.questionMark}>
        ?
      </AppText>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderColor: colors.SECONDARY_PURPLE,
    width: 25,
    height: 25,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 10,
  },
  questionMark: {
    color: colors.SECONDARY_PURPLE,
  },
});
