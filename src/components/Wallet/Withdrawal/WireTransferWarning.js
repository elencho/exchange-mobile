import React from 'react';
import { Image, StyleSheet, View } from 'react-native';

import AppText from '../../AppText';
import colors from '../../../constants/colors';
import images from '../../../constants/images';

export default function WireTransferWarning() {
  return (
    <View style={styles.warning}>
      <Image source={images.Time} />
      <AppText subtext style={styles.subtext}>
        Wire transfers take 1 working day
      </AppText>
    </View>
  );
}

const styles = StyleSheet.create({
  subtext: {
    color: colors.SECONDARY_TEXT,
    marginLeft: 10,
  },
  warning: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 12,
  },
});
