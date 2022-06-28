import React from 'react';
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import * as Clipboard from 'expo-clipboard';

import colors from '../../../constants/colors';
import images from '../../../constants/images';
import AppText from '../../AppText';
import { toggleQrAddressModal } from '../../../redux/modals/actions';
import AddressQrModal from './AddressQrModal';

export default function AddressBlock() {
  const dispatch = useDispatch();
  const state = useSelector((state) => state);
  const {
    wallet: { cryptoAddress, network },
    transactions: { code },
    trade: { currentBalanceObj },
  } = state;

  const copyAddress = () => Clipboard.setString(cryptoAddress.address);
  const showQr = () => dispatch(toggleQrAddressModal(true));
  const copyTag = () => Clipboard.setString(cryptoAddress.tag);

  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <AppText style={styles.address}>{cryptoAddress.address}</AppText>

        <TouchableOpacity onPress={showQr} style={{ marginRight: 20 }}>
          <Image source={images.QR} />
        </TouchableOpacity>
        <TouchableOpacity onPress={copyAddress}>
          <Image source={images.Copy} />
        </TouchableOpacity>
      </View>

      {cryptoAddress.tag ? (
        <View style={[styles.row, { marginTop: 12 }]}>
          <AppText style={styles.address}>
            <AppText style={{ textTransform: 'capitalize' }}>Memo :</AppText>
            {cryptoAddress.tag}
          </AppText>

          <TouchableOpacity onPress={copyTag}>
            <Image source={images.Copy} />
          </TouchableOpacity>
        </View>
      ) : null}

      <View style={styles.bullets}>
        <View style={styles.row}>
          <View style={styles.bullet} />
          <AppText style={styles.light} subtext>
            {/* {currentBalanceObj.infos[network].transactionRecipientType} */}
            {' DEPOSIT '}
            <AppText style={styles.light2}>required to deposit </AppText>
            <AppText style={styles.light2}>{code}</AppText>
          </AppText>
        </View>

        <View style={{ marginVertical: 5 }} />

        <View style={styles.row}>
          <View style={styles.bullet} />
          <AppText style={styles.light} subtext>
            Expected arrival :
            <AppText style={styles.light2}>15 network confirmation</AppText>
          </AppText>
        </View>
      </View>

      <AddressQrModal />
    </View>
  );
}

const styles = StyleSheet.create({
  address: {
    textTransform: 'uppercase',
    color: colors.SECONDARY_TEXT,
    flex: 1,
    marginRight: 30,
    lineHeight: 20,
  },
  bullet: {
    backgroundColor: '#FFC65C',
    width: 4,
    height: 4,
    marginRight: 15,
    marginTop: 7,
  },
  bullets: {
    backgroundColor: 'rgba(242, 223, 180, 0.04)',
    paddingHorizontal: 25,
    paddingVertical: 18,
    marginTop: 20,
  },
  container: {
    marginTop: 25,
  },
  light: {
    color: '#FFFBF3',
    flex: 1,
    lineHeight: 16,
  },
  light2: {
    color: '#F2DFB4',
  },
  qr: {
    height: 33,
    width: 33,
  },
  row: {
    flexDirection: 'row',
  },
  secondary: {
    color: colors.SECONDARY_TEXT,
  },
});
