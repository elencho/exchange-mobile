import React from 'react';
import { Image, StyleSheet, View, TouchableOpacity } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import * as Clipboard from 'expo-clipboard';

import AppText from '../AppText';
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
    currentTransaction: {
      transactionInfo,
      baseCurrency,
      quoteCurrency,
      action,
    },
  } = state;

  const copy = () => {
    Clipboard.setString(transactionInfo);
  };

  const hide = () => {
    dispatch(toggleTransactionDetails(false));
  };

  const children = () => {
    if (transactions) {
      return (
        <>
          <View style={styles.top}>
            <Image source={images.Deposit} />

            <View style={styles.middle}>
              <AppText style={styles.address} subtext>
                {transactionInfo}
              </AppText>
            </View>

            <View style={styles.vertical} />

            <TouchableOpacity onPress={copy}>
              <Image source={images.Copy} />
            </TouchableOpacity>
          </View>

          <View style={styles.line} />

          <TransactionDetails />
        </>
      );
    }
    if (trades) {
      return (
        <>
          <View style={[styles.top, { alignItems: 'flex-end' }]}>
            <View style={[styles.top, styles.icons]}>
              <Image source={images.BTC} style={styles.leftIcon} />
              <Image source={images.USD} style={styles.rightIcon} />
            </View>

            <View style={styles.middle}>
              <AppText medium body style={styles.white}>
                {quoteCurrency} - {baseCurrency}
              </AppText>
              <AppText style={styles.instantTrade}>Instant trade</AppText>
            </View>

            <View style={styles.buy_sell}>
              <AppText medium subtext style={styles.red}>
                {action === 'BID' ? 'Buy' : 'Sell'}
              </AppText>
            </View>
          </View>

          <View style={styles.line} />

          <TradeDetails />
        </>
      );
    }
  };

  return (
    <AppModal
      title="Transaction Details"
      hide={hide}
      visible={transactionDetailsVisible}
      children={children()}
      bottom
    />
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
    flex: 1,
    marginHorizontal: 15,
  },
  line: {
    height: 0.5,
    backgroundColor: '#32344C',
    marginVertical: 15,
  },
  vertical: {
    width: 0.5,
    height: '100%',
    backgroundColor: '#32344C',
    marginRight: 15,
  },
  red: { color: '#FA6392' },
  top: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  address: { color: '#C0C5E0' },
  instantTrade: { color: colors.SECONDARY_TEXT, marginTop: 3 },
  white: { fontSize: 14, color: colors.PRIMARY_TEXT },
});
