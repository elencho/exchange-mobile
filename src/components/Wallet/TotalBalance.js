import React from 'react';
import { StyleSheet, View } from 'react-native';
import { useSelector } from 'react-redux';

import AppText from '../AppText';
import TotalBalanceSkeleton from './TotalBalanceSkeleton';
import colors from '../../constants/colors';
import CurrencySwitch from './CurrencySwitch';

export default function TotalBalance({ balanceLoading }) {
  const filter = useSelector((state) => state.wallet.usdBtcSwitch);
  const balance = useSelector((state) => state.trade.balance);

  const primary = () => {
    if (balance) {
      const { totalValueBTC, totalValueUSD } = balance;
      return filter === 'USD'
        ? ` ${totalValueUSD} USD`
        : ` ${totalValueBTC} BTC`;
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
      <View style={styles.balanceContainer}>
        <View style={styles.justify}>
          <View style={styles.row}>
            <AppText body style={styles.secondary}>
              Total :
            </AppText>
            <AppText body style={styles.secondary}>
              {secondary()}
            </AppText>
          </View>

          <View style={styles.row}>
            <AppText header style={styles.primary}>
              {primary()}
            </AppText>
          </View>
        </View>
      </View>
      <CurrencySwitch />
    </View>
  ) : (
    <TotalBalanceSkeleton />
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.SECONDARY_BACKGROUND,
  },
  balanceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 28,
  },

  primary: {
    color: colors.PRIMARY_TEXT,
  },
  secondary: {
    color: colors.SECONDARY_TEXT,
    marginBottom: 5,
  },
  row: {
    flexDirection: 'row',
  },
});
