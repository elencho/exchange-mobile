import React from 'react';
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
import { fetchFee, setFee } from '../../../redux/trade/actions';
import StatusModal from '../StatusModal';

export default function FiatBlock() {
  const dispatch = useDispatch();
  const state = useSelector((state) => state);

  const {
    transactions: { code },
    trade: {
      card,
      fee,
      depositProvider,
      currentBalanceObj: { depositScale },
    },
    wallet: {
      wireDepositInfo: { en },
      network,
      depositAmount,
    },
  } = state;

  const generatePdf = () => {
    if (depositAmount) {
      generateWirePdf(code, depositAmount, en[0].id);
    }
  };

  const handleAmount = (text) => {
    const depositAmount = text.replace(',', '.');

    if (validateScale(depositAmount, depositScale)) {
      dispatch({ type: 'SET_DEPOSIT_AMOUNT', depositAmount });

      if (!depositAmount) dispatch(setFee(null));
      if (text.trim() && depositAmount && depositProvider) {
        dispatch(fetchFee('deposit'));
      }
    }
  };

  const deposit = async () => {
    if (card) {
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

  const DepositFeeInfo = () => {
    if (fee) {
      const { totalAmount, totalFee } = fee;
      return (
        <AppText subtext style={styles.fee}>
          Fee = {totalFee}; Total amount = {totalAmount} {code}
        </AppText>
      );
    } else return null;
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
                <CardSection />
              </View>
              <ChooseBankModal />
              <ChooseCardModal />
              <StatusModal deposit />
            </>
          )}

          <AppInput
            onChangeText={handleAmount}
            value={depositAmount}
            label="Enter Amount"
            labelBackgroundColor={colors.SECONDARY_BACKGROUND}
            right={right}
          />

          {parseFloat(fee?.totalFee) ? <DepositFeeInfo /> : null}
        </>
      </View>

      {network === 'SWIFT' || network === 'SEPA' ? (
        <AppButton
          text="Generate"
          onPress={generatePdf}
          left={<Image source={images.Generate} />}
          style={[styles.button, { opacity: depositAmount ? 1 : 0.5 }]}
          disabled={!depositAmount}
        />
      ) : (
        <AppButton
          text="Deposit"
          onPress={deposit}
          style={[styles.button, { opacity: depositAmount ? 1 : 0.5 }]}
          disabled={!depositAmount && !depositProvider && !card}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  block: {
    backgroundColor: colors.SECONDARY_BACKGROUND,
    paddingVertical: 22,
    paddingHorizontal: 16,
    marginBottom: 12,
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
  fee: {
    color: colors.SECONDARY_TEXT,
    marginTop: 8,
  },
});
