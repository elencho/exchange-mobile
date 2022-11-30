import React from 'react';
import { Image, Pressable, StyleSheet, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';

import colors from '../../constants/colors';
import { COINS_URL_PNG } from '../../constants/api';
import { setCurrentBalanceObj } from '../../redux/trade/actions';
import {
  cryptoAddressesAction,
  saveCryptoAddress,
  setNetwork,
  setWalletTab,
  wireDepositAction,
} from '../../redux/wallet/actions';
import AppText from '../AppText';

function Currency({ code, name, total, available, valueUSD, valueBTC }) {
  const navigation = useNavigation();

  const dispatch = useDispatch();
  const state = useSelector((state) => state);
  const {
    wallet: { usdBtcSwitch },
    trade: { balance },
  } = state;

  const handlePress = () => {
    dispatch(setNetwork(null));

    let network;
    balance?.balances?.forEach((b) => {
      let hasMethod;
      if (b.depositMethods) hasMethod = Object.keys(b.depositMethods).length;

      if (code === b.currencyCode) {
        dispatch(setCurrentBalanceObj(b));
        ////
        if (b.type === 'CRYPTO') {
          network = hasMethod && b.depositMethods.WALLET[0].provider;
          dispatch(cryptoAddressesAction(name, code, navigation, network));
        }
        if (b.type === 'FIAT') {
          dispatch(saveCryptoAddress({}));
          dispatch(wireDepositAction(name, code, navigation));
        }
      }
    });
    dispatch(setWalletTab('Deposit'));
  };

  const usdBitcoin = () => {
    if (usdBtcSwitch === 'USD') return valueUSD;
    if (usdBtcSwitch === 'BTC') return valueBTC;
  };

  return (
    <Pressable style={styles.container} onPress={handlePress}>
      <Image
        source={{ uri: `${COINS_URL_PNG}/${code.toLowerCase()}.png` }}
        style={styles.image}
      />

      <View style={styles.balance}>
        <AppText calendarDay medium style={styles.primary}>
          {available} {code}
        </AppText>
        <AppText body style={styles.secondary}>
          Total: {total} = {usdBitcoin()} {usdBtcSwitch}
        </AppText>
      </View>
    </Pressable>
  );
}

export default Currency;

const styles = StyleSheet.create({
  balance: {
    justifyContent: 'space-between',
    marginLeft: 20,
  },
  container: {
    flexDirection: 'row',
    height: 42,
    marginBottom: 25,
  },
  image: {
    width: 42,
    height: 42,
  },
  primary: {
    color: colors.PRIMARY_TEXT,
  },
  secondary: {
    color: colors.SECONDARY_TEXT,
  },
});
