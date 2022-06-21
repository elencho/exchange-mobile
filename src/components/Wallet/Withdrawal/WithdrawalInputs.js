import React from 'react';
import { StyleSheet, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import AppInput from '../../AppInput';
import AppText from '../../AppText';
import PurpleText from '../../PurpleText';
import {
  setMemoTag,
  setWithdrawalAmount,
  setWithdrawalNote,
} from '../../../redux/wallet/actions';
import colors from '../../../constants/colors';
import WithdrawalAddress from './WithdrawalAddress';
import { fetchFee, setFee } from '../../../redux/trade/actions';
import CardSection from '../../InstantTrade/CardSection';
import ChooseBankModal from '../../InstantTrade/ChooseBankModal';
import ChooseCardModal from '../../InstantTrade/ChooseCardModal';
import { validateScale } from '../../../utils/formUtils';

export default function WithdrawalInputs({ isFiat, hasRestriction }) {
  const dispatch = useDispatch();
  const state = useSelector((state) => state);
  const {
    wallet: {
      withdrawalAmount,
      withdrawalNote,
      memoTag,
      cryptoAddress,
      network,
    },
    transactions: { code },
    trade: {
      fee,
      currentBalanceObj: { withdrawalScale },
    },
  } = state;

  const isEcommerce = network === 'ECOMMERCE';

  const setAmount = (text) => {
    const amount = text.replace(',', '.');

    if (validateScale(amount, withdrawalScale)) {
      dispatch(setWithdrawalAmount(amount));

      if (!amount) {
        dispatch(setFee(null));
        return;
      }
      dispatch(fetchFee('withdrawal'));
    }
  };

  const setNote = (note) => dispatch(setWithdrawalNote(note));
  const handleMemotag = (memo) => dispatch(setMemoTag(memo));

  const Max = () => (
    <View style={styles.row}>
      <View style={styles.line} />
      <PurpleText text="Max" />
    </View>
  );

  const WithdrawalFeeInfo = () => {
    if (fee) {
      const { totalAmount, totalFee } = fee;
      return (
        <AppText subtext style={styles.secondary}>
          Fee = {totalFee}; Total amount = {totalAmount} {code}
        </AppText>
      );
    } else return null;
  };

  return (
    <View style={styles.block}>
      {!hasRestriction && !isFiat && <WithdrawalAddress />}

      {cryptoAddress.tag && (
        <AppInput
          label="Address tag"
          onChangeText={handleMemotag}
          value={memoTag}
          labelBackgroundColor={colors.SECONDARY_BACKGROUND}
          style={{ marginBottom: 22 }}
        />
      )}
      {isEcommerce ? (
        <>
          <View style={{ marginTop: -20, marginBottom: -22 }}>
            <CardSection />
            <ChooseBankModal />
            <ChooseCardModal />
          </View>
        </>
      ) : (
        <AppInput
          label="Enter Note"
          onChangeText={setNote}
          value={withdrawalNote}
          labelBackgroundColor={colors.SECONDARY_BACKGROUND}
        />
      )}
      <AppInput
        onChangeText={setAmount}
        value={withdrawalAmount}
        label="Enter Amount"
        style={styles.amount}
        labelBackgroundColor={colors.SECONDARY_BACKGROUND}
        right={<Max />}
      />
      <WithdrawalFeeInfo />
    </View>
  );
}

const styles = StyleSheet.create({
  amount: {
    marginTop: 22,
    marginBottom: 7,
  },
  block: {
    backgroundColor: colors.SECONDARY_BACKGROUND,
    paddingVertical: 22,
    paddingHorizontal: 16,
    marginBottom: 12,
  },
  line: {
    width: 1,
    backgroundColor: '#3B4160',
    marginHorizontal: 16,
  },
  row: {
    flexDirection: 'row',
  },
  secondary: {
    color: colors.SECONDARY_TEXT,
  },
});
