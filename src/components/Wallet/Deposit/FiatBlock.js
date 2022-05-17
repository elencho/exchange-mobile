import React, { useState } from 'react';
import { Image, KeyboardAvoidingView, StyleSheet, View } from 'react-native';
import { useSelector } from 'react-redux';

import colors from '../../../constants/colors';
import images from '../../../constants/images';
import { generateWirePdf } from '../../../utils/walletUtils';
import AppButton from '../../AppButton';
import AppInput from '../../AppInput';
import AppText from '../../AppText';
import BankInfo from './BankInfo';

export default function FiatBlock() {
  const [amount, setAmount] = useState(null);
  const state = useSelector((state) => state);

  const {
    transactions: { code },
    wallet: {
      wireDepositInfo: { en },
    },
  } = state;

  const generatePdf = () => {
    if (amount) {
      generateWirePdf(code, amount, en[0].id);
    }
  };

  return (
    <KeyboardAvoidingView>
      <View style={styles.block}>
        <BankInfo />
      </View>
      <View style={styles.block}>
        <AppInput
          onChangeText={setAmount}
          value={amount}
          label="Enter Amount"
          labelBackgroundColor={colors.SECONDARY_BACKGROUND}
          right={
            <View style={styles.row}>
              <View style={styles.line} />
              <AppText subtext style={styles.subtext}>
                {code}
              </AppText>
            </View>
          }
        />
      </View>

      <AppButton
        text="Generate"
        onPress={generatePdf}
        left={<Image source={images.Generate} />}
      />
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  block: {
    backgroundColor: colors.SECONDARY_BACKGROUND,
    paddingVertical: 22,
    paddingHorizontal: 16,
    marginBottom: 12,
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
