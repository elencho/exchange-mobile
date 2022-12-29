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

  const UpperLine = () => {
    let feeText;
    let totalText = `Total : ${notEmpty() ? fee?.totalAmount : 0} ${currency}`;

    if (fee?.feeData) {
      const {
        feeData: { fixedValue },
      } = fee;

      const feeCond = !notEmpty() || fixedValue || fixedValue === 0;
      feeText = feeCond ? null : `Fee : ${fee?.totalFee ?? '0'} ${currency} | `;
    }
    return (
      <AppText small style={styles.feeText}>
        {feeText}
        {totalText}
      </AppText>
    );
  };

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
          {value() ?? `0 ${currency}`}
        </AppText>
      );
    }
  };

  return (
    <View style={styles.fee}>
      <Image source={images.Fee} />

      <View style={styles.flex}>
        <UpperLine />
        <LowerLine />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  fee: {
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
