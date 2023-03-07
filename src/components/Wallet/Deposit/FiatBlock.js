import React, { useEffect, useState } from 'react';
import { Image, StyleSheet, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import colors from '../../../constants/colors';
import images from '../../../constants/images';
import { generateWirePdf, cardDeposit } from '../../../utils/walletUtils';
import AppButton from '../../AppButton';
import AppInput from '../../AppInput';
import AppText from '../../AppText';
import CardSection from '../../InstantTrade/CardSection';
import ChooseBankModal from '../../InstantTrade/ChooseBankModal';
import ChooseCardModal from '../../InstantTrade/ChooseCardModal';
import BankInfo from './BankInfo';
import { validateScale } from '../../../utils/formUtils';
import { fetchFee } from '../../../redux/trade/actions';
import StatusModal from '../StatusModal';
import Fee from '../Fee';
import { validateAmount } from '../../../utils/appUtils';

export default function FiatBlock() {
  const dispatch = useDispatch();
  const state = useSelector((state) => state);

  const {
    transactions: { code },
    trade: {
      card,
      depositProvider,
      currentBalanceObj: { depositScale },
    },
    wallet: {
      wireDepositInfo: { en },
      wireDepositProvider,
      network,
      depositAmount,
    },
  } = state;

  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [maxLength, setMaxLength] = useState(13);

  useEffect(() => {
    error && setError(false);
  }, [card, depositAmount, depositProvider, network]);

  const editable = network !== 'ECOMMERCE' ? true : depositProvider && card;
  const inputValidation = new RegExp(
    `^[0-9]{1,13}(\.|\\.[0-9]{1,${depositScale}})?$`
  );
  const providerBankId = en.find((x) =>
    x.iconName.includes(wireDepositProvider)
  )?.id;

  const generatePdf = () => {
    if (!validateAmount(depositAmount)) {
      setError(true);
    } else {
      generateWirePdf(code, depositAmount, providerBankId, setLoading);
    }
  };

  const setAmount = (amount) => {
    dispatch({
      type: 'SET_DEPOSIT_AMOUNT',
      depositAmount: amount,
    });
    if (
      (depositProvider && card) ||
      network === 'SWIFT' ||
      network === 'SEPA'
    ) {
      dispatch(fetchFee('deposit'));
    }
  };

  const getMaxLength = (replacedAmount) => {
    const factoredDigit = Math.trunc(replacedAmount);
    const factoredDigitLength = parseFloat(factoredDigit.toString().length);
    setMaxLength(factoredDigitLength + parseFloat(depositScale) + 1);
  };

  const handleAmount = (text) => {
    const replacedAmount = text?.trim().replace(',', '.');
    if (!inputValidation.test(replacedAmount) && replacedAmount) {
      // return dispatch({
      //   type: 'SET_DEPOSIT_AMOUNT',
      //   depositAmount: '',
      // });
      return;
    }

    if (!validateScale(replacedAmount, depositScale)) {
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

  const deposit = async () => {
    if (!card || !depositProvider || !validateAmount(depositAmount)) {
      setError(true);
    } else {
      const params = {
        currency: code,
        cardId: card.id,
        amount: depositAmount,
        redirectUri: 'cryptal.com',
      };
      const data = await cardDeposit(params);
      data && dispatch({ type: 'SET_APP_WEBVIEW_OBJ', webViewObj: data });
    }
  };

  const right = (
    <View style={styles.row}>
      <View style={styles.line} />
      <AppText subtext style={styles.subtext}>
        {code}
      </AppText>
    </View>
  );

  const marginTop = () => {
    if (network === 'ECOMMERCE') {
      return !depositProvider ? -35 : 0;
    } else {
      return -10;
    }
  };

  return (
    <View>
      {network !== 'ECOMMERCE' && (
        <View style={styles.block}>
          <BankInfo />
        </View>
      )}

      <View style={styles.block}>
        <>
          {network === 'ECOMMERCE' && (
            <>
              <View style={{ marginTop: -20 }}>
                <CardSection error={error} />
              </View>
              <ChooseBankModal />
              <ChooseCardModal />
              <StatusModal deposit />
            </>
          )}

          <AppInput
            onChangeText={handleAmount}
            value={depositAmount}
            style={{ marginTop: marginTop() }}
            keyboardType="numeric"
            maxLength={maxLength}
            label="Enter Amount"
            labelBackgroundColor={colors.SECONDARY_BACKGROUND}
            right={right}
            editable={!!editable}
            error={error && !validateAmount(depositAmount)}
          />
        </>
      </View>

      <View style={{ marginHorizontal: 16 }}>
        <Fee />
      </View>

      {network === 'SWIFT' || network === 'SEPA' ? (
        <AppButton
          text="Generate PDF"
          onPress={generatePdf}
          left={loading ? null : <Image source={images.Generate} />}
          style={styles.button}
          loading={loading}
        />
      ) : (
        <AppButton text="Deposit" onPress={deposit} style={styles.button} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  block: {
    backgroundColor: colors.SECONDARY_BACKGROUND,
    paddingVertical: 22,
    paddingHorizontal: 16,
    marginBottom: 22,
  },
  button: {
    width: '90%',
    alignSelf: 'center',
  },
  dropdown: {
    borderColor: '#525A86',
    borderWidth: 1,
    alignItems: 'center',
    flexDirection: 'row',
    height: 45,
    paddingHorizontal: 15,
  },
  line: {
    width: 1,
    height: 20,
    backgroundColor: '#3B4160',
    marginLeft: 10,
    marginRight: 5,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  subtext: {
    color: colors.SECONDARY_TEXT,
    marginLeft: 10,
  },
});
