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
import TransferMethodDropdown from '../../components/Wallet/Deposit/TransferMethodDropdown';
import { generateCryptoAddressAction } from '../../redux/wallet/actions';
import TransferMethodModal from '../../components/Wallet/Deposit/TransferMethodModal';
import AppButton from '../../components/AppButton';
import FiatBlock from '../../components/Wallet/Deposit/FiatBlock';
import FlexBlock from '../../components/Wallet/Deposit/FlexBlock';
import AppText from '../../components/AppText';
import WireTransferWarning from '../../components/Wallet/Withdrawal/WireTransferWarning';

export default function Deposit() {
  const dispatch = useDispatch();
  const state = useSelector((state) => state);
  const [address, setAddress] = useState([]);
  const [memoTag, setMemoTag] = useState(null);
  const [hasRestriction, setHasRestriction] = useState(false);
  const [hasMethod, setHasMethod] = useState(false);

  const {
    transactions: { code },
    trade: { currentBalanceObj },
    wallet: {
      cryptoAddresses,
      hasMultipleMethods,
      hasMultipleNetworks,
      depositRestriction,
      network,
    },
  } = state;

  const isFiat = currentBalanceObj.type === 'FIAT';
  const isEthereum = network === 'ERC20' || network === 'BEP20';
  const isEcommerce = network === 'ECOMMERCE';

  useEffect(() => {
    if (cryptoAddresses.length) {
      setAddress(cryptoAddresses[0].address);
      if (cryptoAddresses[0].tag) {
        setMemoTag(cryptoAddresses[0].tag);
      }
    }
    setHasMethod(!!Object.keys(currentBalanceObj.depositMethods).length);
  }, [code]);

  useEffect(() => {
    setHasRestriction(Object.keys(depositRestriction).length);
  }, [depositRestriction]);

  const generate = () => {
    if (isEthereum) {
      dispatch(toggleGenerateRequestModal(true));
    } else {
      if (currentBalanceObj.depositMethods.WALLET) {
        const provider = currentBalanceObj.depositMethods.WALLET[0].provider;
        dispatch(generateCryptoAddressAction(code, provider));
      }
    }
  };

  const hasAddress = () => {
    if (cryptoAddresses) return cryptoAddresses.length > 0;
  };

  const reason = () => {
    if (depositRestriction.reason) {
      return depositRestriction.reason;
    }
    return 'METHOD';
  };

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
                {isEcommerce ? (
                  <AppText subtext style={styles.subtext}>
                    Cryptal processes credit and debit cards issued by TBC Bank
                    directly with TBC. All other cards are processed with Bank
                    of Georgia
                  </AppText>
                ) : (
                  <WireTransferWarning />
                )}
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
          <AppButton
            text="Add New Wallet Address"
            onPress={generate}
            style={{ marginTop: 20 }}
          />
        </>
      )}

      {!hasAddress() && !isFiat && !hasRestriction && hasMethod ? (
        <>
          {isEthereum ? (
            <View style={styles.flex}>
              <BulletsBlock />
              <AppButton text="Generate" onPress={generate} />
              <GenerateRequestModal />
            </View>
          ) : (
            <FlexBlock reason="no address" />
          )}
        </>
      ) : null}

      {isFiat && !hasRestriction && <FiatBlock />}
      {hasRestriction || !hasMethod ? (
        <FlexBlock
          type="Deposit"
          reason={reason()}
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
  subtext: {
    color: colors.SECONDARY_TEXT,
    textAlign: 'justify',
    letterSpacing: -0.1,
    lineHeight: 18,
    marginTop: 10,
  },
});
