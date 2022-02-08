import React from 'react';
import { Image, ScrollView, StyleSheet, View } from 'react-native';
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

export default function Balance({ navigation }) {
  const state = useSelector((state) => state.wallet);
  const { walletTab } = state;

  return (
    <Background>
      <View style={styles.back}>
        <Image source={images.Back} style={styles.arrow} />
        <PurpleText
          text="Back to Wallet"
          onPress={() => navigation.goBack()}
          style={styles.purpleText}
        />
      </View>

      <Headline title="My Wallet" />

      <WalletSwitcher />

      <ScrollView contentContainerStyle={styles.flex}>
        {walletTab === 'Deposit' && <Deposit />}
        {walletTab === 'Withdrawal' && <Withdrawal />}
        {walletTab === 'Whitelist' && <Whitelist />}
      </ScrollView>

      <ChooseCurrencyModal />
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
  flex: {
    flexGrow: 1,
  },
  purpleText: {
    marginHorizontal: 10,
  },
});
