import React, { memo } from 'react';
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';

import AppText from '../../AppText';
import images from '../../../constants/images';
import QrCode from '../../QrCode';

function WalletQrCode() {
  const Copy = () => (
    <TouchableOpacity>
      <Image source={images.Copy} />
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.qr}>
        <QrCode value="addr1qxad6k9kx099q8sfn0u8vu65asnsys8v022slx72jyadu742wvsvtpkn" />
      </View>

      <AppText subtext style={styles.secondary}>
        addr1qxad6k9kx099q8sfn0u8vu65asnsys8v022slx72jyadu742wvsvtpkn{'   '}
        <Copy />
      </AppText>

      <AppText subtext style={[styles.secondary, styles.memo]}>
        Memo: 0123456789{'   '}
        <Copy />
      </AppText>
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
