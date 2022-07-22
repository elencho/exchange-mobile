import React, { useState } from 'react';
import {
  Image,
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';
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
import { saveCardDepositUrl } from '../../../redux/wallet/actions';
import { validateScale } from '../../../utils/formUtils';

export default function FiatBlock() {
  const dispatch = useDispatch();
  const state = useSelector((state) => state);

  const [amount, setAmount] = useState(null);

  const {
    transactions: { code },
    trade: {
      card,
      depositProvider,
      currentBalanceObj: { depositScale },
    },
    wallet: {
      wireDepositInfo: { en },
      network,
    },
  } = state;

  const generatePdf = () => {
    if (amount) {
      generateWirePdf(code, amount, en[0].id);
    }
  };

  const handleAmount = (text) => {
    const amount = text.replace(',', '.');
    if (validateScale(amount, depositScale)) setAmount(amount);
  };

  const deposit = async () => {
    if (card) {
      const params = {
        currency: code,
        cardId: card.id,
        amount,
        redirectUri: 'cryptal.com',
      };
      const data = await cardDeposit(params);
      if (data) dispatch(saveCardDepositUrl(data.actionUrl));
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
            </>
          )}

          <AppInput
            onChangeText={handleAmount}
            value={amount}
            label="Enter Amount"
            labelBackgroundColor={colors.SECONDARY_BACKGROUND}
            right={right}
          />
        </>
      </View>

      {network === 'SWIFT' ? (
        <AppButton
          text="Generate"
          onPress={generatePdf}
          left={<Image source={images.Generate} />}
          style={[styles.button, { opacity: amount ? 1 : 0.5 }]}
          disabled={!amount}
        />
      ) : (
        <AppButton
          text="Deposit"
          onPress={deposit}
          style={[styles.button, { opacity: amount ? 1 : 0.5 }]}
          disabled={!amount && !depositProvider && !card}
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
});
