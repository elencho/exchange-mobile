import React from 'react';
import { StyleSheet, View } from 'react-native';

import ChooseNetworkDropdown from '../../components/Wallet/Deposit/ChooseNetworkDropdown';
import WalletCoinsDropdown from '../../components/Wallet/Deposit/WalletCoinsDropdown';
import WalletQrCode from '../../components/Wallet/Deposit/WalletQrCode';
import XrpMemoWarning from '../../components/Wallet/Deposit/XrpMemoWarning';
import AddressList from '../../components/Wallet/Deposit/AddressList';
import colors from '../../constants/colors';

export default function Deposit() {
  return (
    <>
      <View style={styles.block}>
        <WalletCoinsDropdown />
        <ChooseNetworkDropdown />
        <WalletQrCode />
        <XrpMemoWarning />
      </View>

      <AddressList />
    </>
  );
}

const styles = StyleSheet.create({
  block: {
    backgroundColor: colors.SECONDARY_BACKGROUND,
    paddingVertical: 22,
    paddingHorizontal: 16,
    marginTop: 22,
    marginBottom: 12,
  },
});
