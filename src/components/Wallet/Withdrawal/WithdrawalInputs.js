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
import { handleAmountInput } from '../../../utils/formUtils';
import { validateAmount } from '../../../utils/appUtils';
import AppDropdown from '../../AppDropdown';

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
    `^[0-9]{1,13}(\.|\\.[0-9]{0,${cur?.withdrawalScale}})?$`
  );

  const setAmount = (amount) => {
    const condition =
      depositProvider ||
      cur?.type === 'CRYPTO' ||
      cur?.type === 'FIAT' ||
      currentTemplate?.templateName;
    dispatch(setWithdrawalAmount(amount ? amount : 0));
    if (condition) dispatch(fetchFee('withdrawal'));
  };

  const handleAmount = (text) => {
    handleAmountInput(
      text,
      inputValidation,
      cur?.withdrawalScale,
      setMaxLength,
      setAmount
    );
  };

  const setNote = (note) => dispatch(setWithdrawalNote(note));
  const handleMemotag = (memo) => dispatch(setMemoTag(memo));
  const handleMax = () => dispatch({ type: 'MAX_WITHDRAWAL_SAGA' });
  const setQrAddress = (address) => dispatch(chooseWhitelist({ address }));

  const disabled = () => {
    let disabled;
    if (isEcommerce) {
      disabled = !card || !depositProvider;
    }

    return disabled;
  };

  const maxStyle = disabled() ? { opacity: 0.5 } : '';
  const Max = () => (
    <TouchableOpacity
      onPress={handleMax}
      disabled={disabled()}
      style={styles.row}
    >
      <View style={styles.line} />
      <PurpleText text="Max" style={maxStyle} />
    </TouchableOpacity>
  );

  const marginTop = network === 'ECOMMERCE' && !depositProvider ? -10 : 14;
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
        <AppDropdown />

        {!hasRestriction && !isFiat && (
          <WithdrawalAddress right={<QrScannerToggler />} error={error} />
        )}

        {needsTag() && !whitelist?.length && (
          <AppInput
            label="Address tag"
            onChangeText={handleMemotag}
            value={memoTag}
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
          />
        )}
        <AppInput
          onChangeText={handleAmount}
          value={withdrawalAmount}
          label="Enter Amount"
          style={{ marginTop, marginBottom: 8 }}
          keyboardType="numeric"
          maxLength={maxLength}
          editable={!!editable}
          disabled={!editable}
          error={error && !validateAmount(withdrawalAmount)}
          right={<Max />}
        />
      </View>

      <Fee />
    </>
  );
}

const styles = StyleSheet.create({
  block: {
    paddingBottom: 22,
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
