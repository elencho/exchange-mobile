import React, { useState } from 'react';
import { Pressable, StyleSheet, View, Image } from 'react-native';
import { useDispatch } from 'react-redux';

import ChooseNetworkDropdown from '../../components/Wallet/Deposit/ChooseNetworkDropdown';
import WalletCoinsDropdown from '../../components/Wallet/Deposit/WalletCoinsDropdown';
import WalletQrCode from '../../components/Wallet/Deposit/WalletQrCode';
import XrpMemoWarning from '../../components/Wallet/Deposit/XrpMemoWarning';
import AddressList from '../../components/Wallet/Deposit/AddressList';
import colors from '../../constants/colors';
import BulletsBlock from '../../components/Wallet/Deposit/BulletsBlock';
import AppText from '../../components/AppText';
import GenerateRequestModal from '../../components/Wallet/Deposit/GenerateRequestModal';
import {
  toggleAddDepositAddressModal,
  toggleGenerateRequestModal,
} from '../../redux/modals/actions';
import images from '../../constants/images';
import Headline from '../../components/TransactionHistory/Headline';
import PurpleText from '../../components/PurpleText';
import AddDepositAddressModal from '../../components/Wallet/Deposit/AddDepositAddressModal';

export default function Deposit() {
  const [hasAddress, setHasAddress] = useState(false);
  const [isEthereum, setIsEthereum] = useState(false);
  const dispatch = useDispatch();

  const generate = () => {
    dispatch(toggleGenerateRequestModal(true));
  };
  const addAddress = () => {
    dispatch(toggleAddDepositAddressModal(true));
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
      <AppText
        calendarDay
        style={{ color: 'white', marginBottom: 20 }}
        onPress={() => setIsEthereum(!isEthereum)}
      >
        Press to Toggle "isEthereum" (Temporary Solution)
      </AppText>

      <View style={styles.block}>
        <WalletCoinsDropdown />
        <ChooseNetworkDropdown />

        {hasAddress && (
          <>
            <WalletQrCode />
            <XrpMemoWarning />
          </>
        )}
      </View>

      {hasAddress && <AddressList />}

      {!hasAddress && (
        <>
          {isEthereum ? (
            <View style={styles.flex}>
              <BulletsBlock />
              <Pressable style={styles.button} onPress={generate}>
                <AppText medium style={styles.buttonText}>
                  Generate
                </AppText>
              </Pressable>

              <GenerateRequestModal />
            </View>
          ) : (
            <View style={styles.flexBlock}>
              <Image source={images.Address_List} />
              <Headline title="Deposit Address" />
              <AppText body style={styles.description}>
                Unused wallet addresses may be deleted after 20 days
              </AppText>
              <PurpleText text="+ Add Address" onPress={addAddress} />
              <AddDepositAddressModal />
            </View>
          )}
        </>
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
  description: {
    color: colors.SECONDARY_TEXT,
    textAlign: 'center',
    marginHorizontal: '20%',
    lineHeight: 20,
    marginBottom: 40,
  },
  flex: {
    flex: 1,
    justifyContent: 'space-between',
  },
  flexBlock: {
    flex: 1,
    backgroundColor: colors.SECONDARY_BACKGROUND,
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 50,
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
