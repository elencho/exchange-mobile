import React from 'react';
import { StyleSheet, View } from 'react-native';
import { useSelector } from 'react-redux';
import { t } from 'i18next';

import AppText from '../AppText';
import colors from '../../constants/colors';

import FeeIcon from '../../assets/images/Wallet/Fee';

export default function Fee() {
  const state = useSelector((state) => state);
  const {
    trade: { fee, currentTrade, fiat, currentBalanceObj },
    transactions: { code, tabRoute },
    wallet: {
      depositAmount,
      withdrawalAmount,
      withdrawalBank,
      currentTemplate,
    },
  } = state;

  const notEmpty = () => {
    if (tabRoute === 'Wallet') return depositAmount || withdrawalAmount;
    if (tabRoute === 'Trade') return currentTrade?.price || currentTrade?.size;
  };

  const currency = tabRoute === 'Wallet' ? code : fiat;

  const UpperLine = () => {
    let feeText;
    const total = fee?.totalAmount ?? 0;
    let totalText = `${t('Total')}: ${notEmpty() ? total : 0} ${currency}`;

    if (fee?.feeData) {
      const {
        feeData: { fixedValue },
      } = fee;

      const feeCond = !notEmpty() || fixedValue || fixedValue === 0;
      feeText = feeCond ? null : (
        <>
          <AppText small style={styles.feeText}>
            Fee :
          </AppText>
          <AppText small style={styles.feeText}>
            {` ${fee?.totalFee ?? '0'} ${currency} | `}
          </AppText>
        </>
      );
    }
    return (
      <View style={styles.row}>
        <AppText small style={styles.feeText}>
          {feeText}
          {totalText}
        </AppText>
      </View>
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
        <View style={styles.container}>
          <AppText small style={styles.feeText}>
            {subMethod ? subMethod : 'Fixed :'}
          </AppText>
          <AppText small style={styles.feeText}>
            {value() ? ` ${value()}` : ` 0 ${currency}`}
          </AppText>
        </View>
      );
    }
  };

  return (
    <View style={styles.fee}>
      <FeeIcon width={42} height={32} />
      <View style={styles.flex}>
        <UpperLine />
        <LowerLine />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flexDirection: 'row' },
  fee: {
    marginBottom: 26,
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
  row: {
    flexDirection: 'row',
  },
});
