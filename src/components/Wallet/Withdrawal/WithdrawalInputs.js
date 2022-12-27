import React, { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import AppInput from '../../AppInput';
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
import Fee from '../Fee';
import { validateAmount } from '../../../utils/appUtils';

export default function WithdrawalInputs({ isFiat, hasRestriction, error }) {
  const dispatch = useDispatch();
  const state = useSelector((state) => state);
  const {
    wallet: {
      withdrawalAmount,
      withdrawalNote,
      memoTag,
      cryptoAddress,
      network,
      whitelist,
      currentTemplate,
    },
    trade: { card, currentBalanceObj, depositProvider },
  } = state;

  const cur = currentBalanceObj;

  const editable = network !== 'ECOMMERCE' ? true : depositProvider && card;
  const isEcommerce = network === 'ECOMMERCE';
  const isDecimal = withdrawalAmount % 1 != 0;
  const factoredDigit = Math.trunc(withdrawalAmount);
  const factoredDigitLength = parseFloat(factoredDigit.toString().length);
  const maxLength = isDecimal
    ? factoredDigitLength + 1 + parseFloat(cur?.withdrawalScale)
    : 1000;

  useEffect(() => {
    if (Object.keys(currentTemplate)?.length) {
      dispatch(setWithdrawalNote(''));
      dispatch(setWithdrawalAmount(0));
      dispatch(setFee(null));
    }
  }, [currentTemplate]);

  const setAmount = (text) => {
    const amount = text.replace(',', '.');
    const condition =
      depositProvider ||
      cur?.type === 'CRYPTO' ||
      currentTemplate?.templateName;

    if (validateScale(amount, cur?.withdrawalScale)) {
      dispatch(setWithdrawalAmount(amount ? amount : 0));
      if (condition) dispatch(fetchFee('withdrawal'));
    }
  };

  const setNote = (note) => dispatch(setWithdrawalNote(note));
  const handleMemotag = (memo) => dispatch(setMemoTag(memo));
  const handleMax = () => dispatch({ type: 'MAX_WITHDRAWAL_SAGA' });

  const Max = () => (
    <View style={styles.row}>
      <View style={styles.line} />
      <PurpleText text="Max" onPress={handleMax} />
    </View>
  );

  return (
    <>
      <View style={styles.block}>
        {!hasRestriction && !isFiat && <WithdrawalAddress error={error} />}

        {cryptoAddress?.tag && !whitelist?.length && (
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
              <CardSection error={error} />
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
          keyboardType="numeric"
          maxLength={maxLength}
          labelBackgroundColor={colors.SECONDARY_BACKGROUND}
          right={<Max />}
          editable={!!editable}
          error={error && !validateAmount(withdrawalAmount)}
        />
      </View>

      <Fee />
    </>
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
    marginBottom: 22,
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
