import React, { memo } from 'react';
import { Image, StyleSheet, View, TouchableOpacity } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import * as Linking from 'expo-linking';

import AppText from '../AppText';
import AppModal from '../AppModal';
import Copy from '../../assets/images/Copy.svg';
import Link from '../../assets/images/Link.svg';
import TransactionDetails from './TransactionDetails';
import TradeDetails from '../InstantTrade/TradeDetails';

import { toggleTransactionDetails } from '../../redux/modals/actions';
import colors from '../../constants/colors';
import { COINS_URL_PNG } from '../../constants/api';
import { copyToClipboard } from '../../utils/copyToClipboard';

function TransactionModal({ transactions, trades }) {
  const dispatch = useDispatch();
  const state = useSelector((state) => state);

  const {
    transactions: {
      currentTransaction: {
        currency,
        provider,
        method,
        transactionInfo,
        baseCurrency,
        quoteCurrency,
        action,
        recipient,
      },
      currencies,
    },
    modals: { transactionDetailsVisible },
  } = state;

  const handleTransactionUrl = () => {
    let pattern;
    currencies.forEach((c) => {
      if (c.code === currency) {
        pattern =
          c.providerToUrlPattern[provider].transactionUrlPattern.split('{')[0];
      }
    });
    Linking.openURL(pattern + transactionInfo);
  };

  const handleAddressUrl = () => {
    let pattern;
    currencies.forEach((c) => {
      if (c.code === currency) {
        pattern =
          c.providerToUrlPattern[provider].addressUrlPattern.split('{')[0];
      }
    });
    Linking.openURL(pattern + recipient);
  };

  const copyId = () => copyToClipboard(transactionInfo);
  const copyDestination = () => copyToClipboard(recipient);

  const hide = () => {
    dispatch(toggleTransactionDetails(false));
  };

  const buySell = action === 'BID' ? 'Buy' : 'Sell';
  const backgroundColor =
    action === 'BID' ? 'rgba(12, 203, 181, 0.08)' : 'rgba(234, 121, 156, 0.08)';

  const children = () => {
    if (transactions) {
      return (
        <>
          <View style={styles.top}>
            <View style={styles.middle}>
              <AppText medium style={styles.white}>
                identifier (TXID):
              </AppText>
              <AppText style={[styles.address]} subtext>
                {transactionInfo}
              </AppText>
            </View>

            <View style={styles.vertical} />

            <View style={styles.row}>
              <TouchableOpacity onPress={copyId}>
                <Copy />
              </TouchableOpacity>
              {method === 'WALLET' && (
                <TouchableOpacity
                  onPress={handleTransactionUrl}
                  style={{ marginLeft: 25 }}
                >
                  <Link />
                </TouchableOpacity>
              )}
            </View>
          </View>

          <View style={styles.line} />

          <TransactionDetails />

          {/* DESTINATION  */}
          {(method === 'WALLET' || method === 'WALLET_INTERNAL') && (
            <>
              <View style={styles.line} />
              <View style={styles.row}>
                <View style={{ flex: 1, marginRight: 15 }}>
                  <AppText medium style={[styles.white, {}]}>
                    Destination
                  </AppText>
                  <AppText subtext style={styles.address}>
                    {recipient}
                  </AppText>
                </View>

                <View style={styles.vertical} />
                <View style={styles.row}>
                  <TouchableOpacity onPress={copyDestination}>
                    <Copy />
                  </TouchableOpacity>
                  {(method === 'WALLET' || method === 'WALLET_INTERNAL') && (
                    <TouchableOpacity
                      onPress={handleAddressUrl}
                      style={{ marginLeft: 25 }}
                    >
                      <Link />
                    </TouchableOpacity>
                  )}
                </View>
              </View>
            </>
          )}
        </>
      );
    }
    if (trades) {
      return (
        <>
          <View style={[styles.top, { alignItems: 'flex-end' }]}>
            <View style={[styles.top, styles.icons]}>
              <Image
                source={{
                  uri: `${COINS_URL_PNG}/${quoteCurrency?.toLowerCase()}.png`,
                }}
                style={styles.leftIcon}
              />
              <Image
                source={{
                  uri: `${COINS_URL_PNG}/${baseCurrency?.toLowerCase()}.png`,
                }}
                style={styles.rightIcon}
              />
            </View>

            <View style={styles.middle}>
              <AppText medium body style={styles.white}>
                {quoteCurrency} - {baseCurrency}
              </AppText>
              <AppText style={styles.instantTrade}>Instant trade</AppText>
            </View>

            <View style={[styles.buy_sell, { backgroundColor }]}>
              <AppText
                medium
                subtext
                style={styles[action === 'BID' ? 'grey' : 'red']}
              >
                {buySell}
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

export default memo(TransactionModal);

const styles = StyleSheet.create({
  block: {
    padding: 40,
    paddingTop: 20,
    backgroundColor: colors.SECONDARY_BACKGROUND,
  },
  buy_sell: {
    height: 20,
    paddingHorizontal: 5,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 28,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
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
    marginRight: 15,
    justifyContent: 'space-between',
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
  grey: { color: '#0CCBB5' },
  top: {
    flexDirection: 'row',
    alignItems: 'center',
    // height: 37,
  },
  address: { color: '#C0C5E0', marginTop: 5 },
  instantTrade: { color: colors.SECONDARY_TEXT, marginTop: 3 },
  white: { color: colors.PRIMARY_TEXT },
});
