import React from 'react';
import { StyleSheet } from 'react-native';

import AppText from '../AppText';

export default function Headline({ title }) {
  return (
    <AppText medium style={styles.text}>
      {title}
    </AppText>
  );
}

const styles = StyleSheet.create({
  text: { color: 'white', fontSize: 20, marginVertical: 20 },
});
