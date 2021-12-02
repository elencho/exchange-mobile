import React from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { useSafeAreaFrame } from 'react-native-safe-area-context';
import { useSelector } from 'react-redux';

import colors from '../../constants/colors';
import AppModal from '../AppModal';
import AppText from '../AppText';
import AppInput from '../AppInput';
import Background from '../Background';
import Headline from '../TransactionHistory/Headline';
import CloseModalIcon from './CloseModalIcon';
import CurrencyDropdowns from './CurrencyDropdowns';

export default function BuySellModal() {
  const height = useSafeAreaFrame().height;

  const state = useSelector((state) => state.trade);
  const { tradeType } = state;

  return (
    <AppModal>
      <Background style={{ height }}>
        <View style={styles.flex}>
          <CloseModalIcon />

          <Headline title={`${tradeType} BTC`} />

          <AppText subtext body style={styles.balance}>
            My Balance: 2 000.00 GEL
          </AppText>

          <CurrencyDropdowns style={styles.dropdowns} />

          <AppInput
            keyboardType="decimal-pad"
            right={<AppText style={styles.code}>GEL</AppText>}
          />
          <View style={styles.margin} />
          <AppInput
            keyboardType="decimal-pad"
            right={<AppText style={styles.code}>BTC</AppText>}
          />
        </View>

        <Pressable style={styles.button}>
          <AppText medium style={styles.buttonText}>
            Buy
          </AppText>
        </Pressable>
      </Background>
    </AppModal>
  );
}

const styles = StyleSheet.create({
  balance: {
    color: colors.SECONDARY_TEXT,
  },
  button: {
    height: 45,
    backgroundColor: '#0CCBB5',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  buttonText: {
    color: colors.PRIMARY_TEXT,
  },
  code: {
    color: '#42475D',
  },
  container: {
    backgroundColor: colors.PRIMARY_BACKGROUND,
  },
  dropdowns: {
    marginVertical: 20,
  },
  flex: {
    flex: 1,
  },
  margin: {
    marginVertical: 10,
  },
});
