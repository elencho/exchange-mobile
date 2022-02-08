import React from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import AppText from '../AppText';
import colors from '../../constants/colors';
import { setWalletTab } from '../../redux/wallet/actions';

export default function WalletSwitcher() {
  const dispatch = useDispatch();
  const tab = useSelector((state) => state.wallet.walletTab);

  const handleFilter = (f) => {
    dispatch(setWalletTab(f));
  };

  const buttonStyle = (f) => {
    if (f === tab) {
      return { backgroundColor: colors.SECONDARY_PURPLE };
    }
  };

  const textStyle = (f) => {
    if (f === tab) {
      return { color: colors.PRIMARY_TEXT };
    } else {
      return { color: '#C0C5E0' };
    }
  };

  return (
    <View style={styles.row}>
      {['Deposit', 'Withdrawal', 'Whitelist'].map((f, i) => (
        <Pressable
          key={f}
          style={[styles.button, buttonStyle(f)]}
          onPress={() => handleFilter(f)}
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
    width: '30%',
    height: 35,
    borderRadius: 40,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.SECONDARY_BACKGROUND,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 22,
  },
});
