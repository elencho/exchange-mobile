import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import ChooseNetworkDropdown from '../../components/Wallet/Deposit/ChooseNetworkDropdown';
import WalletCoinsDropdown from '../../components/Wallet/Deposit/WalletCoinsDropdown';
import WalletQrCode from '../../components/Wallet/Deposit/WalletQrCode';
import XrpMemoWarning from '../../components/Wallet/Deposit/XrpMemoWarning';
import AddressList from '../../components/Wallet/Deposit/AddressList';
import colors from '../../constants/colors';
import BulletsBlock from '../../components/Wallet/Deposit/BulletsBlock';
import GenerateRequestModal from '../../components/Wallet/Deposit/GenerateRequestModal';
import { toggleGenerateRequestModal } from '../../redux/modals/actions';
import AddDepositAddressModal from '../../components/Wallet/Deposit/AddDepositAddressModal';
import TransferMethodDropdown from '../../components/Wallet/Deposit/TransferMethodDropdown';
import { generateCryptoAddressAction } from '../../redux/wallet/actions';
import TransferMethodModal from '../../components/Wallet/Deposit/TransferMethodModal';
import AppButton from '../../components/AppButton';
import FiatBlock from '../../components/Wallet/Deposit/FiatBlock';
import FlexBlock from '../../components/Wallet/Deposit/FlexBlock';

export default function Deposit() {
  const dispatch = useDispatch();
  const state = useSelector((state) => state);
  const [address, setAddress] = useState([]);
  const [memoTag, setMemoTag] = useState(null);
  const [hasRestriction, setHasRestriction] = useState(false);

  const {
    transactions: { code },
    trade: { balance },
    wallet: {
      cryptoAddresses,
      hasMultipleMethods,
      hasMultipleNetworks,
      depositRestriction,
    },
  } = state;

  useEffect(() => {
    if (cryptoAddresses.length) {
      setAddress(cryptoAddresses[0].address);
      if (cryptoAddresses[0].tag) {
        setMemoTag(cryptoAddresses[0].tag);
      }
    }
  }, [code]);

  useEffect(() => {
    setHasRestriction(Object.keys(depositRestriction).length);
  }, [depositRestriction]);

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

  const hasAddress = () => {
    let hasAddress;
    if (cryptoAddresses) {
      hasAddress = cryptoAddresses.length > 1;
    }
    return hasAddress;
  };

  const isFiat = code === 'GEL' || code === 'USD';
  const isEthereum = code === 'ETH';

  return (
    <>
      <View style={styles.block}>
        <WalletCoinsDropdown />
        {!isFiat ? (
          <>{hasMultipleNetworks && <ChooseNetworkDropdown />}</>
        ) : (
          <>
            {hasMultipleMethods && (
              <>
                <TransferMethodDropdown />
                <TransferMethodModal />
              </>
            )}
          </>
        )}

        {hasAddress() && !isFiat && (
          <>
            <WalletQrCode address={address} memoTag={memoTag} />
            {memoTag && <XrpMemoWarning />}
          </>
        )}
      </View>

      {hasAddress() && !isFiat && !hasRestriction && (
        <>
          <AddressList
            cryptoAddresses={cryptoAddresses}
            address={address}
            setAddress={setAddress}
          />
          <AppButton text="Add New Wallet Address" onPress={generate} />
        </>
      )}

      {!hasAddress() && !isFiat && !hasRestriction ? (
        <>
          {isEthereum ? (
            <View style={styles.flex}>
              <BulletsBlock />
              <AppButton text="Generate" onPress={generate} />
              <GenerateRequestModal />
            </View>
          ) : (
            <>
              <FlexBlock reason="no address" />
              <AddDepositAddressModal />
            </>
          )}
        </>
      ) : null}

      {isFiat && !hasRestriction && <FiatBlock />}
      {hasRestriction ? (
        <FlexBlock
          type="Deposit"
          reason={depositRestriction.reason}
          restrictedUntil={depositRestriction.restrictedUntil}
        />
      ) : null}
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
  generate: { marginTop: 40, flexDirection: 'row' },
});
