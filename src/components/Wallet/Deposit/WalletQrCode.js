import React, { memo } from 'react';
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';

import AppText from '../../AppText';
import images from '../../../constants/images';
import QrCode from '../../QrCode';

function WalletQrCode({ address, memoTag }) {
  const Copy = () => (
    <TouchableOpacity>
      <Image source={images.Copy} />
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.qr}>
        <QrCode value={address} />
      </View>

      <AppText subtext style={styles.secondary}>
        {address}
        {'   '}
        <Copy />
      </AppText>

      {memoTag && (
        <AppText subtext style={[styles.secondary, styles.memo]}>
          Memo: {memoTag}
          {'   '}
          <Copy />
        </AppText>
      )}
    </View>
  );
}

export default memo(WalletQrCode);

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginTop: 35,
  },
  qr: {
    width: 110,
    height: 110,
    borderRadius: 10,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 25,
  },
  memo: {
    marginBottom: 27,
    marginTop: 12,
  },
  secondary: {
    color: '#C0C5E0',
    textAlign: 'center',
    marginHorizontal: '20%',
    lineHeight: 25,
  },
});
