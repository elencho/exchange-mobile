import React from 'react';
import { StyleSheet, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import AppInput from '../../AppInput';
import AppText from '../../AppText';
import PurpleText from '../../PurpleText';
import {
  setWithdrawalAmount,
  setWithdrawalNote,
} from '../../../redux/wallet/actions';
import colors from '../../../constants/colors';

export default function WithdrawalInputs() {
  const dispatch = useDispatch();
  const state = useSelector((state) => state);
  const {
    wallet: { withdrawalAmount, withdrawalNote },
  } = state;

  const setAmount = (amount) => dispatch(setWithdrawalAmount(amount));
  const setNote = (note) => dispatch(setWithdrawalNote(note));

  const Max = () => (
    <View style={styles.row}>
      <View style={styles.line} />
      <PurpleText text="Max" />
    </View>
  );

  return (
    <>
      <AppInput
        onChangeText={setAmount}
        value={withdrawalAmount}
        placeholder="Amount"
        style={styles.amount}
        right={<Max />}
      />
      <AppText subtext style={styles.secondary}>
        Fee = 0; Total amount = 0 GEL
      </AppText>
      <AppInput
        style={styles.note}
        placeholder="Enter Note"
        onChangeText={setNote}
        value={withdrawalNote}
      />
    </>
  );
}

const styles = StyleSheet.create({
  amount: {
    marginBottom: 7,
  },
  line: {
    width: 1,
    backgroundColor: '#3B4160',
    marginHorizontal: 16,
  },
  note: {
    marginTop: 22,
  },
  row: {
    flexDirection: 'row',
  },
  secondary: {
    color: colors.SECONDARY_TEXT,
  },
});
