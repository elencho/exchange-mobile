import React from 'react';
import { Image, Pressable, StyleSheet, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';

import colors from '../../constants/colors';
import images from '../../constants/images';
import { setCurrentBalanceObj } from '../../redux/trade/actions';
import {
  cryptoAddressesAction,
  setNetwork,
  wireDepositAction,
} from '../../redux/wallet/actions';
import AppText from '../AppText';

function Currency({ code, name, total, available, valueUSD, valueBTC }) {
  const navigation = useNavigation();

  const dispatch = useDispatch();
  const state = useSelector((state) => state);
  const {
    wallet: { usdBtcSwitch },
    trade: { balance, fiatsArray },
  } = state;

  const handlePress = () => {
    let network;
    const fiats = fiatsArray?.map((f) => f.code);
    balance.balances.forEach((b) => {
      if (code === b.currencyCode) {
        if (b.depositMethods.WALLET)
          network = b.depositMethods.WALLET[0].provider;
        if (b.depositMethods.WIRE) network = b.depositMethods.WIRE[0].provider;
        dispatch(setNetwork(network));
        dispatch(setCurrentBalanceObj(b));
      }
    });

    if (fiats.includes(code)) {
      dispatch(wireDepositAction(name, code, navigation));
    } else {
      dispatch(cryptoAddressesAction(name, code, navigation, network));
    }
  };

  const usdBitcoin = () => {
    if (usdBtcSwitch === 'USD') {
      return valueUSD;
    }
    if (usdBtcSwitch === 'BTC') {
      return valueBTC;
    }
  };

  return (
    <Pressable style={styles.container} onPress={handlePress}>
      <Image source={images.ETH} style={styles.image} />

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
