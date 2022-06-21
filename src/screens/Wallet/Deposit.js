import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import ChooseNetworkDropdown from '../../components/Wallet/Deposit/ChooseNetworkDropdown';
import WalletCoinsDropdown from '../../components/Wallet/Deposit/WalletCoinsDropdown';
import colors from '../../constants/colors';
import BulletsBlock from '../../components/Wallet/Deposit/BulletsBlock';
import GenerateRequestModal from '../../components/Wallet/Deposit/GenerateRequestModal';
import { toggleGenerateRequestModal } from '../../redux/modals/actions';
import TransferMethodDropdown from '../../components/Wallet/Deposit/TransferMethodDropdown';
import {
  generateCryptoAddressAction,
  saveCardDepositUrl,
  setNetwork,
} from '../../redux/wallet/actions';
import TransferMethodModal from '../../components/Wallet/Deposit/TransferMethodModal';
import AppButton from '../../components/AppButton';
import FiatBlock from '../../components/Wallet/Deposit/FiatBlock';
import FlexBlock from '../../components/Wallet/Deposit/FlexBlock';
import AppText from '../../components/AppText';
import AppWebView from '../../components/AppWebView';
import WireTransferWarning from '../../components/Wallet/Withdrawal/WireTransferWarning';
import GeneralError from '../../components/GeneralError';
import AddressBlock from '../../components/Wallet/Deposit/AddressBlock';
import { saveGeneralError } from '../../redux/profile/actions';

export default function Deposit() {
  const dispatch = useDispatch();
  const state = useSelector((state) => state);
  const [hasRestriction, setHasRestriction] = useState(false);
  const [hasMethod, setHasMethod] = useState(false);

  const {
    transactions: { code },
    trade: { currentBalanceObj },
    wallet: {
      cryptoAddress,
      hasMultipleMethods,
      depositRestriction,
      network,
      cardDepositUrl,
    },
    profile: { generalError },
  } = state;

  const isFiat = currentBalanceObj.type === 'FIAT';
  const isEthereum = network === 'ERC20' || network === 'BEP20';
  const isEcommerce = network === 'ECOMMERCE';

  useEffect(() => {
    const { depositMethods } = currentBalanceObj;
    if (depositMethods.WALLET)
      dispatch(setNetwork(depositMethods.WALLET[0].provider));
    if (depositMethods.WIRE)
      dispatch(setNetwork(depositMethods.WIRE[0].provider));

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

  const reason = () => {
    if (depositRestriction.reason) {
      return depositRestriction.reason;
    }
    return 'METHOD';
  };

  const handleUrlChange = (state) => {
    const urlArray = state.url.split('=');
    const ending = urlArray[urlArray.length - 1];
    if (ending === 'false' || ending === 'true') {
      dispatch(saveCardDepositUrl(null));
      dispatch(saveGeneralError(ending));
    }
  };

  return (
    <ScrollView contentContainerStyle={{ flex: 1 }}>
      <View style={styles.block}>
        {generalError ? (
          <View style={{ marginBottom: 16 }}>
            <GeneralError />
          </View>
        ) : null}

        <WalletCoinsDropdown />

        {!isFiat ? (
          <>
            <ChooseNetworkDropdown />
            {cryptoAddress.address && <AddressBlock />}
          </>
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
      </View>

      {!cryptoAddress.address && !isFiat && !hasRestriction && hasMethod ? (
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

      {isFiat && !hasRestriction && (
        <>
          <FiatBlock />
        </>
      )}
      {hasRestriction || !hasMethod ? (
        <FlexBlock
          type="Deposit"
          reason={reason()}
          restrictedUntil={depositRestriction.restrictedUntil}
        />
      ) : null}

      {cardDepositUrl && (
        <AppWebView
          handleUrlChange={handleUrlChange}
          source={{ uri: cardDepositUrl }}
        />
      )}
    </ScrollView>
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
