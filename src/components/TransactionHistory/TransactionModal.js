import React, { useEffect } from 'react';
import { Image, StyleSheet, View, TouchableOpacity } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import * as Clipboard from 'expo-clipboard';

import AppText from '../AppText';
import ModalTop from '../ModalTop';
import TransactionDetails from './TransactionDetails';
import TradeDetails from '../InstantTrade/TradeDetails';
import colors from '../../constants/colors';
import AppModal from '../AppModal';
import { toggleTransactionDetails } from '../../redux/modals/actions';
import images from '../../constants/images';

export default function TransactionModal({ transactions, trades }) {
  const dispatch = useDispatch();
  const state = useSelector((state) => state.transactions);
  const transactionDetailsVisible = useSelector(
    (state) => state.modals.transactionDetailsVisible
  );

  const {
    currentTransaction: { type, transactionInfo },
  } = state;

  const copy = () => {
    Clipboard.setString(transactionInfo);
  };

  const hide = () => {
    dispatch(toggleTransactionDetails(false));
  };

  return (
    <AppModal hide={hide} visible={transactionDetailsVisible}>
      <ModalTop />

      <View style={styles.block}>
        <AppText header style={styles.header}>
          Transaction Details
        </AppText>

        {transactions && (
          <>
            <View style={styles.top}>
              <Image style={styles.deposit} source={images.Deposit} />

              <View style={styles.middle}>
                <AppText medium style={[styles.white, styles.capitalize]}>
                  {type}
                </AppText>
                <AppText style={styles.text}>{transactionInfo}</AppText>
              </View>

              <TouchableOpacity style={styles.copy} onPress={copy}>
                <Image source={images.Copy} />
              </TouchableOpacity>
            </View>

            <View style={styles.line} />

            <TransactionDetails />
          </>
        )}

        {trades && (
          <>
            <View style={[styles.top, { alignItems: 'flex-end' }]}>
              <View style={[styles.top, styles.icons]}>
                <Image source={images.BTC} style={styles.leftIcon} />
                <Image source={images.USD} style={styles.rightIcon} />
              </View>

              <View style={styles.middle}>
                <AppText medium body style={styles.white}>
                  USD - BTC
                </AppText>
                <AppText style={styles.text}>Instant trade</AppText>
              </View>

              <View style={styles.buy_sell}>
                <AppText medium subtext style={styles.red}>
                  Sell
                </AppText>
              </View>
            </View>

            <View style={styles.line} />

            <TradeDetails />
          </>
        )}
      </View>
    </AppModal>
  );
}

const styles = StyleSheet.create({
  block: {
    padding: 40,
    paddingTop: 20,
    backgroundColor: colors.SECONDARY_BACKGROUND,
  },
  buy_sell: {
    backgroundColor: 'rgba(234, 121, 156, 0.08)',
    height: 20,
    width: 45,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 28,
  },
  capitalize: { textTransform: 'capitalize' },
  copy: {
    alignSelf: 'flex-end',
  },
  container: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  deposit: {
    marginRight: 10,
    alignSelf: 'center',
  },
  header: {
    color: colors.PRIMARY_TEXT,
    marginBottom: 20,
  },
  icons: { alignSelf: 'center', marginRight: 15 },
  leftIcon: {
    marginRight: -7,
    zIndex: 10,
    width: 31,
    height: 31,
  },
  rightIcon: {
    width: 31,
    height: 31,
  },
  middle: {
    justifyContent: 'space-between',
    flex: 1,
  },
  line: {
    height: 0.5,
    backgroundColor: colors.SECONDARY_TEXT,
    marginVertical: 15,
  },
  red: { color: '#FA6392' },
  top: { flexDirection: 'row' },
  text: { fontSize: 12, color: colors.SECONDARY_TEXT, marginTop: 5 },
  white: { fontSize: 14, color: colors.PRIMARY_TEXT },
});
