import React, { useState } from 'react';
import {
  Pressable,
  StyleSheet,
  View,
  Image,
  KeyboardAvoidingView,
} from 'react-native';
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
import BankInfo from '../../components/Wallet/Deposit/BankInfo';
import TransferMethodDropdown from '../../components/Wallet/Deposit/TransferMethodDropdown';
import AppInput from '../../components/AppInput';

export default function Deposit() {
  const [hasAddress, setHasAddress] = useState(false);
  const [isEthereum, setIsEthereum] = useState(false);
  const [isFiat, setIsFiat] = useState(false);
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
        style={{ color: 'white', marginBottom: 20 }}
        onPress={() => setHasAddress(!hasAddress)}
      >
        Toggle "hasAddress"{' '}
        <AppText
          style={{ color: 'white', marginBottom: 20 }}
          onPress={() => setIsEthereum(!isEthereum)}
        >
          Toggle "isEthereum"{' '}
          <AppText
            style={{ color: 'white', marginBottom: 20 }}
            onPress={() => setIsFiat(!isFiat)}
          >
            Toggle "isFiat"
          </AppText>
        </AppText>
      </AppText>

      <View style={styles.block}>
        <WalletCoinsDropdown />
        {!isFiat ? (
          <ChooseNetworkDropdown />
        ) : (
          <>
            <TransferMethodDropdown />
            <View style={styles.warning}>
              <Image source={images.Time} />
              <AppText subtext style={styles.subtext}>
                Wire transfers take 1 working day
              </AppText>
            </View>
          </>
        )}

        {hasAddress && (
          <>
            <WalletQrCode />
            <XrpMemoWarning />
          </>
        )}
      </View>

      {hasAddress && <AddressList />}

      {!hasAddress && !isFiat && (
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

      {isFiat && (
        <KeyboardAvoidingView>
          <View style={styles.block}>
            <BankInfo />
          </View>
          <View style={styles.block}>
            <AppInput
              label="Enter Amount"
              labelBackgroundColor={colors.SECONDARY_BACKGROUND}
              right={
                <View style={styles.row}>
                  <View style={styles.line} />
                  <AppText subtext style={styles.subtext}>
                    USD
                  </AppText>
                </View>
              }
            />
          </View>
        </KeyboardAvoidingView>
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
  line: {
    width: 1,
    height: 20,
    backgroundColor: '#3B4160',
    marginLeft: 10,
    marginRight: 5,
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
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  subtext: {
    color: colors.SECONDARY_TEXT,
    marginLeft: 10,
  },
  warning: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 12,
  },
});
