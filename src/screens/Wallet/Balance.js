import React, { useState } from 'react';
import { Image, ScrollView, StyleSheet, View } from 'react-native';

import Background from '../../components/Background';
import Headline from '../../components/TransactionHistory/Headline';
import PurpleText from '../../components/PurpleText';
import images from '../../constants/images';
import WalletSwitcher from '../../components/Wallet/WalletSwitcher';
import Deposit from './Deposit';

export default function Balance({ navigation }) {
  const [filter, setFilter] = useState('Deposit');

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

      <WalletSwitcher filter={filter} setFilter={setFilter} />

      <ScrollView>
        <Deposit />
      </ScrollView>
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
  purpleText: {
    marginHorizontal: 10,
  },
});
