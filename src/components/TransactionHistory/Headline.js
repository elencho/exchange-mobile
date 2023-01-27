import React from 'react';
import { StyleSheet } from 'react-native';

import AppText from '../AppText';
import colors from '../../constants/colors';

export default function Headline({ title }) {
  return (
    <AppText header medium style={styles.text}>
      {title}
    </AppText>
  );
}

const styles = StyleSheet.create({
  text: {
    color: colors.PRIMARY_TEXT,
    marginVertical: 20,
  },
});
