import React from 'react';
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import * as Clipboard from 'expo-clipboard';

import AppModal from '../../AppModal';
import QrCode from '../../QrCode';
import { toggleQrAddressModal } from '../../../redux/modals/actions';
import AppText from '../../AppText';
import images from '../../../constants/images';

export default function AddressQrModal() {
  const dispatch = useDispatch();
  const state = useSelector((state) => state);
  const {
    modals: { qrAddressModalVisible },
    wallet: { cryptoAddress },
  } = state;

  const hide = () => dispatch(toggleQrAddressModal(false));
  const copy = () => Clipboard.setString(cryptoAddress.address);

  const children = (
    <View style={styles.container}>
      <View style={styles.qr}>
        <QrCode value={cryptoAddress.address} size={125} />
      </View>

      <AppText subtext style={styles.secondary}>
        Scan QR Code
      </AppText>
      <AppText subtext style={styles.address}>
        {cryptoAddress.address}
      </AppText>

      <TouchableOpacity style={styles.copy} onPress={copy}>
        <Image source={images.Copy} />
      </TouchableOpacity>
    </View>
  );

  return (
    <AppModal
      visible={qrAddressModalVisible}
      hide={hide}
      children={children}
      bottom
    />
  );
}

const styles = StyleSheet.create({
  address: {
    color: '#C0C5E0',
    textAlign: 'center',
    lineHeight: 18,
    marginBottom: 18,
    textTransform: 'uppercase',
  },
  container: {
    alignItems: 'center',
  },
  copy: {
    width: 35,
    height: 35,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: -5,
  },
  qr: {
    backgroundColor: 'white',
    width: 140,
    height: 140,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
  },
  secondary: {
    color: '#C0C5E0',
    marginVertical: 14,
  },
});
