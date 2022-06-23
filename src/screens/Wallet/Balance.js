import React from 'react';
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  View,
} from 'react-native';
import { useSelector } from 'react-redux';

import Background from '../../components/Background';
import Headline from '../../components/TransactionHistory/Headline';
import PurpleText from '../../components/PurpleText';
import images from '../../constants/images';
import WalletSwitcher from '../../components/Wallet/WalletSwitcher';
import Deposit from './Deposit';
import Withdrawal from './Withdrawal';
import ChooseCurrencyModal from '../../components/TransactionFilter/ChooseCurrencyModal';
import ChooseNetworkModal from '../../components/Wallet/Deposit/ChooseNetworkModal';
import Whitelist from './Whitelist';
import ManageCards from './ManageCards';

export default function Balance({ navigation }) {
  const state = useSelector((state) => state.wallet);
  const { walletTab } = state;

  return (
    <Background>
      <View style={styles.back}>
        <Image source={images.Back} style={styles.arrow} />
        <PurpleText
          text="Back"
          onPress={() => navigation.goBack()}
          style={styles.purpleText}
        />
      </View>

      <Headline title="My Wallet" />

      <WalletSwitcher />

      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.select({ android: undefined, ios: 'padding' })}
        keyboardVerticalOffset={Platform.select({ ios: 50, android: 500 })}
      >
        {walletTab === 'Deposit' && <Deposit />}
        {walletTab === 'Withdrawal' && <Withdrawal />}
        {walletTab === 'Whitelist' && <Whitelist />}
        {walletTab === 'Manage Cards' && <ManageCards />}
      </KeyboardAvoidingView>

      <ChooseCurrencyModal wallet />
      <ChooseNetworkModal />
    </Background>
  );
}

const styles = StyleSheet.create({
  arrow: {
    marginTop: 2,
  },
  back: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  flexGrow: {
    flexGrow: 1,
  },
  flex: {
    flex: 1,
  },
  purpleText: {
    marginHorizontal: 10,
  },
});
