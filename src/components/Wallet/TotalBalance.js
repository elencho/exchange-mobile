import React from 'react';
import { StyleSheet, View } from 'react-native';
import { useSelector } from 'react-redux';

import AppText from '../AppText';
import TotalBalanceSkeleton from './TotalBalanceSkeleton';
import WalletIcon from '../../assets/images/Wallet/Wallet_Icon.svg';
import colors from '../../constants/colors';

export default function TotalBalance({ balanceLoading }) {
  const filter = useSelector((state) => state.wallet.usdBtcSwitch);
  const balance = useSelector((state) => state.trade.balance);

  const primary = () => {
    if (balance) {
      const { totalValueBTC, totalValueUSD } = balance;
      return filter === 'USD'
        ? `Total: ${totalValueUSD} USD`
        : `Total: ${totalValueBTC} BTC`;
    }
  };

  const secondary = () => {
    if (balance) {
      const { totalValueBTC, totalValueUSD } = balance;
      return filter === 'USD' ? `${totalValueBTC} BTC` : `${totalValueUSD} USD`;
    }
  };

  return !balanceLoading ? (
    <View style={styles.container}>
      <WalletIcon />

      <View style={styles.justify}>
        <AppText calendarDay style={styles.primary}>
          {primary()}
        </AppText>
        <AppText body style={styles.secondary}>
          {secondary()}
        </AppText>
      </View>
    </View>
  ) : (
    <TotalBalanceSkeleton />
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.SECONDARY_BACKGROUND,
    padding: 25,
    flexDirection: 'row',
    borderWidth: 1,
    alignItems: 'center',
  },
  justify: {
    justifyContent: 'space-between',
    height: 40,
    marginLeft: 20,
  },
  primary: {
    color: colors.PRIMARY_TEXT,
  },
  secondary: {
    color: colors.SECONDARY_TEXT,
  },
});
