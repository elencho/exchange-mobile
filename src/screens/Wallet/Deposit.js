import React, { useState } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { useDispatch } from 'react-redux';

import ChooseNetworkDropdown from '../../components/Wallet/Deposit/ChooseNetworkDropdown';
import WalletCoinsDropdown from '../../components/Wallet/Deposit/WalletCoinsDropdown';
import WalletQrCode from '../../components/Wallet/Deposit/WalletQrCode';
import XrpMemoWarning from '../../components/Wallet/Deposit/XrpMemoWarning';
import AddressList from '../../components/Wallet/Deposit/AddressList';
import ChooseCurrencyModal from '../../components/TransactionFilter/ChooseCurrencyModal';
import ChooseNetworkModal from '../../components/Wallet/Deposit/ChooseNetworkModal';
import colors from '../../constants/colors';
import BulletsBlock from '../../components/Wallet/Deposit/BulletsBlock';
import AppText from '../../components/AppText';
import GenerateRequestModal from '../../components/Wallet/Deposit/GenerateRequestModal';
import { toggleGenerateRequestModal } from '../../redux/modals/actions';

export default function Deposit() {
  const [hasAddress, setHasAddress] = useState(false);
  const dispatch = useDispatch();

  const generate = () => {
    dispatch(toggleGenerateRequestModal(true));
  };

  return (
    <>
      <AppText
        calendarDay
        style={{ color: 'white', marginBottom: 20 }}
        onPress={() => setHasAddress(!hasAddress)}
      >
        Press to Toggle "hasAddress" (Temporary Solution)
      </AppText>

      <View style={styles.block}>
        <WalletCoinsDropdown />
        <ChooseNetworkDropdown />

        <ChooseCurrencyModal />
        <ChooseNetworkModal />

        {hasAddress && (
          <>
            <WalletQrCode />
            <XrpMemoWarning />
          </>
        )}
      </View>

      {hasAddress && <AddressList />}

      {!hasAddress && (
        <View style={styles.flex}>
          <BulletsBlock />
          <Pressable style={styles.button} onPress={generate}>
            <AppText medium style={styles.buttonText}>
              Generate
            </AppText>
          </Pressable>

          <GenerateRequestModal />
        </View>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  block: {
    backgroundColor: colors.SECONDARY_BACKGROUND,
    paddingVertical: 22,
    paddingHorizontal: 16,
    marginBottom: 12,
  },
  flex: {
    flex: 1,
    justifyContent: 'space-between',
  },
  button: {
    backgroundColor: colors.SECONDARY_PURPLE,
    height: 45,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: colors.PRIMARY_TEXT,
  },
});
