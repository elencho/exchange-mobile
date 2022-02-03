import React, { memo } from 'react';
import { Image, StyleSheet, View } from 'react-native';

import images from '../../../constants/images';
import AppText from '../../AppText';

function XrpMemoWarning() {
  return (
    <View style={styles.container}>
      <Image source={images.Warning} />
      <AppText subtext style={styles.subtext}>
        Enter both Tag & Address data, which are required to deposit XRP
      </AppText>
    </View>
  );
}

export default memo(XrpMemoWarning);

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingVertical: 13,
    borderRadius: 5,
    backgroundColor: 'rgba(232, 196, 155, 0.06)',
    flexDirection: 'row',
    alignItems: 'center',
  },
  subtext: {
    color: '#EDE4D0',
    marginLeft: 12,
    lineHeight: 15,
  },
});
