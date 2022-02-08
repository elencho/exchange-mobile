import React from 'react';
import { Image, StyleSheet, View } from 'react-native';
import colors from '../../../constants/colors';

import images from '../../../constants/images';
import AppText from '../../AppText';

export default function WhitelistItem() {
  return (
    <View style={styles.container}>
      <View style={styles.flex}>
        <AppText body style={styles.primary}>
          Address name / Tag: 0987654320
        </AppText>
        <AppText subtext style={styles.secondary}>
          347hNv1vJ7gsdsscxzpbAANyyERx9BLxQNF
        </AppText>
      </View>

      <Image source={images.Download} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 12,
  },
  flex: {
    flex: 1,
  },
  primary: {
    color: colors.PRIMARY_TEXT,
  },
  secondary: {
    color: colors.SECONDARY_TEXT,
    marginTop: 5,
  },
});
