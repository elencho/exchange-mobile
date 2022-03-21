import React, { useEffect, useState } from 'react';
import {
  Pressable,
  StyleSheet,
  View,
  Image,
  KeyboardAvoidingView,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

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
import { generateCryptoAddressAction } from '../../redux/wallet/actions';
import { generateWirePdf } from '../../utils/walletUtils';

export default function Deposit() {
  const dispatch = useDispatch();
  const code = useSelector((state) => state.transactions.code);
  const wallet = useSelector((state) => state.wallet);
  const balance = useSelector((state) => state.trade.balance);
  const [address, setAddress] = useState([]);
  const [memoTag, setMemoTag] = useState(null);
  const [amount, setAmount] = useState(null);

  const {
    cryptoAddresses,
    wireDepositInfo: { en },
  } = wallet;

  useEffect(() => {
    if (cryptoAddresses[0]) {
      setAddress(cryptoAddresses[0].address);
      if (cryptoAddresses[0].tag) {
        setMemoTag(cryptoAddresses[0].tag);
      }
    }
  }, [code]);

  const generate = () => {
    if (code === 'ETH') {
      dispatch(toggleGenerateRequestModal(true));
    } else {
      let network;
      balance.balances.forEach((b) => {
        if (code === b.currencyCode) {
          if (b.depositMethods.WALLET) {
            network = b.depositMethods.WALLET[0].provider;
            dispatch(generateCryptoAddressAction(code, network));
          }
        }
      });
    }
  };

  const generatePdf = () => {
    if (amount) {
      generateWirePdf(code, amount, en[0].id);
    }
  };

  const addAddress = () => {
    dispatch(toggleAddDepositAddressModal(true));
  };

  const isFiat = code === 'GEL' || code === 'USD';
  const isEthereum = code === 'ETH';

  return (
    <>
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

        {cryptoAddresses.length > 0 && (
          <>
            <WalletQrCode address={address} memoTag={memoTag} />
            {memoTag && <XrpMemoWarning />}
          </>
        )}
      </View>

      {cryptoAddresses.length > 0 && (
        <>
          <AddressList
            cryptoAddresses={cryptoAddresses}
            address={address}
            setAddress={setAddress}
          />
          <Pressable
            style={[styles.button, styles.generate]}
            onPress={generate}
          >
            <AppText medium style={styles.buttonText}>
              Add New Wallet Address
            </AppText>
          </Pressable>
        </>
      )}

      {!cryptoAddresses.length > 0 && !isFiat && (
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
              onChangeText={setAmount}
              value={amount}
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

          <Pressable
            style={[styles.button, styles.generate]}
            onPress={generatePdf}
          >
            <Image source={images.Generate} />
            <AppText medium style={styles.buttonText}>
              Generate PDF
            </AppText>
          </Pressable>
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
  generate: { marginTop: 40, flexDirection: 'row' },
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
    marginLeft: 10,
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
