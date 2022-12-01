import React, { useEffect, useState } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import AppText from '../AppText';
import colors from '../../constants/colors';
import { setNetwork, setWalletTab } from '../../redux/wallet/actions';

export default function WalletSwitcher() {
  const dispatch = useDispatch();
  const state = useSelector((state) => state);
  const {
    wallet: { walletTab },
    trade: { currentBalanceObj },
  } = state;

  const cur = currentBalanceObj;
  const array = ['Deposit', 'Withdrawal'];
  const [switchers, setSwitchers] = useState(array);

  useEffect(() => {
    if (cur.type === 'CRYPTO') {
      setSwitchers([...array, 'Whitelist']);
    } else if (
      cur.type === 'FIAT' &&
      (cur.depositMethods.ECOMMERCE || cur.withdrawalMethods.ECOMMERCE)
    ) {
      setSwitchers([...array, 'Manage Cards']);
    } else {
      setSwitchers(array);
    }
    dispatch({ type: 'METHOD_NETWORK_RESTRICTION' });
  }, [currentBalanceObj, walletTab]);

  const handleWalletTab = (f) => {
    dispatch(setWalletTab(f));

    const m = f === 'Withdrawal' ? 'withdrawalMethods' : 'depositMethods';

    const isFiat = cur.type === 'FIAT';
    if (isFiat) {
      if (cur[m]?.ECOMMERCE) {
        dispatch(setNetwork('ECOMMERCE'));
      } else {
        dispatch(setNetwork('SWIFT'));
      }
    }
  };

  const buttonStyle = (f) => {
    return {
      backgroundColor:
        colors[f === walletTab ? 'SECONDARY_PURPLE' : 'SECONDARY_BACKGROUND'],
      width: switchers.length === 3 ? '32%' : '48%',
    };
  };

  const textStyle = (f) => {
    if (f === walletTab) {
      return { color: colors.PRIMARY_TEXT };
    } else {
      return { color: '#C0C5E0' };
    }
  };

  return (
    <View style={styles.row}>
      {switchers.map((f, i) => (
        <Pressable
          key={f}
          style={[styles.button, buttonStyle(f)]}
          onPress={() => handleWalletTab(f)}
        >
          <AppText body style={textStyle(f)}>
            {f}
          </AppText>
        </Pressable>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    height: 35,
    borderRadius: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 22,
  },
});
