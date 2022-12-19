import React from 'react';
import { Image, StyleSheet, View } from 'react-native';
import { useSelector } from 'react-redux';

import AppText from '../AppText';
import images from '../../constants/images';
import colors from '../../constants/colors';

export default function Fee() {
  const state = useSelector((state) => state);
  const {
    trade: { fee, currentTrade, fiat },
    transactions: { code, tabRoute },
    wallet: { depositAmount, withdrawalAmount },
  } = state;

  const notEmpty = () => {
    if (tabRoute === 'Wallet') return depositAmount || withdrawalAmount;
    if (tabRoute === 'Trade') return currentTrade?.price || currentTrade?.size;
  };

  const currency = tabRoute === 'Wallet' ? code : fiat;

  const LowerLine = () => {
    if (fee?.feeData) {
      const {
        feeData: {
          subMethod,
          percentageValue,
          fixedValue,
          rangeStart,
          rangeEnd,
        },
      } = fee;

      // if (fixedValue) return null;

      const value = () => {
        if (fixedValue && percentageValue)
          return `${percentageValue * 100}% + ${fixedValue} ${currency}`;
        if (fixedValue) return ` ${fixedValue} ${currency}`;
        if (percentageValue) return ` ${percentageValue * 100}%`;
      };

      if (rangeStart || rangeEnd) {
        const start = rangeStart ?? 0;
        const end = rangeEnd ?? 'Other Fees';

        return (
          <AppText small style={styles.feeText}>
            {currency} {start}-{end} {subMethod} {value()}
          </AppText>
        );
      }

      return (
        <AppText small style={styles.feeText}>
          {subMethod ? subMethod : 'Fixed : '}
          {value()}
        </AppText>
      );
    }
  };

  return (
    <View style={styles.fee}>
      <Image source={images.Fee} />

      <View style={styles.flex}>
        <AppText small style={styles.feeText}>
          {notEmpty() ? `Fee : ${fee?.totalFee ?? '0'} ${currency} | ` : null}
          Total : {notEmpty() ? fee?.totalAmount : 0} {currency}
        </AppText>
        <LowerLine />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  fee: {
    marginHorizontal: 16,
    marginBottom: 50,
    alignItems: 'center',
    flexDirection: 'row',
  },
  feeText: {
    color: colors.SECONDARY_TEXT,
    fontSize: 11,
    lineHeight: 16,
  },
  flex: {
    flex: 1,
    justifyContent: 'space-between',
    marginLeft: 12,
  },
});
