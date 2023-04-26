import React, { useEffect, useState } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import AppInput from '../../AppInput';
import PurpleText from '../../PurpleText';
import WithdrawalAddress from './WithdrawalAddress';
import CardSection from '../../InstantTrade/CardSection';
import ChooseBankModal from '../../InstantTrade/ChooseBankModal';
import ChooseCardModal from '../../InstantTrade/ChooseCardModal';
import Fee from '../Fee';
import QrScanner from '../../QrScanner';
import QrScannerToggler from './widgets/QrScannerToggler';

import colors from '../../../constants/colors';
import { fetchFee } from '../../../redux/trade/actions';
import {
  setMemoTag,
  setWithdrawalAmount,
  setWithdrawalNote,
  chooseWhitelist,
} from '../../../redux/wallet/actions';
import { validateScale } from '../../../utils/formUtils';
import { validateAmount } from '../../../utils/appUtils';

export default function WithdrawalInputs({
  isFiat,
  hasRestriction,
  error,
  notEmpty,
}) {
  const dispatch = useDispatch();
  const state = useSelector((state) => state);
  const {
    wallet: {
      withdrawalAmount,
      withdrawalNote,
      memoTag,
      network,
      whitelist,
      currentTemplate,
    },
    trade: { card, currentBalanceObj, depositProvider },
  } = state;

  const [maxLength, setMaxLength] = useState(13);

  useEffect(() => {
    if (Object.keys(currentTemplate)?.length) {
      dispatch(setWithdrawalNote(''));
      dispatch(setWithdrawalAmount(0));
    }
  }, [currentTemplate]);

  const cur = currentBalanceObj;

  const editable = network !== 'ECOMMERCE' ? true : depositProvider && card;
  const isEcommerce = network === 'ECOMMERCE';

  const inputValidation = new RegExp(
    `^[0-9]{1,13}(\.|\\.[0-9]{1,${cur?.withdrawalScale}})?$`
  );

  const setAmount = (amount) => {
    const condition =
      depositProvider ||
      cur?.type === 'CRYPTO' ||
      currentTemplate?.templateName;
    dispatch(setWithdrawalAmount(amount ? amount : 0));
    if (condition) dispatch(fetchFee('withdrawal'));
  };

  const getMaxLength = (replacedAmount) => {
    const factoredDigit = Math.trunc(replacedAmount);
    const factoredDigitLengthi = parseFloat(factoredDigit.toString().length);
    const maxLengthDecimal =
      factoredDigitLengthi + parseFloat(cur?.withdrawalScale) + 1;
    setMaxLength(maxLengthDecimal);
  };

  const handleAmount = (text) => {
    const replacedAmount = text?.trim().replace(',', '.');

    if (!inputValidation.test(replacedAmount) && replacedAmount) {
      //return dispatch(setWithdrawalAmount(''));
      return;
    }

    if (!validateScale(replacedAmount, cur?.withdrawalScale)) {
      return;
    }

    const parts = replacedAmount.split('.');
    if (parts.length === 2) {
      getMaxLength(replacedAmount);
      setAmount(replacedAmount ? parts[0].substr(0, 14) + '.' + parts[1] : 0);
    } else {
      setMaxLength(14);
      setAmount(replacedAmount ? parts[0].substr(0, 13) : 0);
    }
  };

  const setNote = (note) => dispatch(setWithdrawalNote(note));
  const handleMemotag = (memo) => dispatch(setMemoTag(memo));
  const handleMax = () => dispatch({ type: 'MAX_WITHDRAWAL_SAGA' });
  const setQrAddress = (address) => dispatch(chooseWhitelist({ address }));

  const disabled = () => {
    let disabled;
    if (isEcommerce) {
      disabled = !card || !depositProvider;
    } else if (isFiat) {
      disabled = !notEmpty();
    }

    return disabled;
  };

  const Max = () => (
    <TouchableOpacity
      onPress={handleMax}
      disabled={disabled()}
      style={styles.row}
    >
      <View style={styles.line} />
      <PurpleText text="Max" />
    </TouchableOpacity>
  );

  const marginTop = network === 'ECOMMERCE' && !depositProvider ? -10 : 20;
  const needsTag = () => {
    if (currentBalanceObj?.infos) {
      return (
        currentBalanceObj?.infos[network]?.transactionRecipientType ===
        'ADDRESS_AND_TAG'
      );
    }
    return false;
  };

  return (
    <>
      <View style={styles.block}>
        {!hasRestriction && !isFiat && (
          <WithdrawalAddress right={<QrScannerToggler />} error={error} />
        )}

        {needsTag() && !whitelist?.length && (
          <AppInput
            label="Address tag"
            onChangeText={handleMemotag}
            value={memoTag}
            labelBackgroundColor={colors.SECONDARY_BACKGROUND}
            style={{ marginBottom: 22 }}
            error={error && !memoTag?.trim()}
          />
        )}

        <QrScanner setAddress={setQrAddress} />
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
          onChangeText={handleAmount}
          value={withdrawalAmount}
          label="Enter Amount"
          style={{ marginTop, marginBottom: 8 }}
          keyboardType="numeric"
          maxLength={maxLength}
          labelBackgroundColor={colors.SECONDARY_BACKGROUND}
          right={<Max />}
          editable={!!editable}
          error={error && !validateAmount(withdrawalAmount)}
        />
      </View>

      <View style={{ marginHorizontal: 16 }}>
        <Fee />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
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
