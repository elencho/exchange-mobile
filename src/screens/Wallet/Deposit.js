import React, { useEffect, useState } from 'react';
import { ActivityIndicator, ScrollView, StyleSheet, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import ChooseNetworkDropdown from '../../components/Wallet/Deposit/ChooseNetworkDropdown';
import WalletCoinsDropdown from '../../components/Wallet/Deposit/WalletCoinsDropdown';
import colors from '../../constants/colors';
import BulletsBlock from '../../components/Wallet/Deposit/BulletsBlock';
import TransferMethodDropdown from '../../components/Wallet/Deposit/TransferMethodDropdown';
import {
  generateCryptoAddressAction,
  setNetwork,
} from '../../redux/wallet/actions';
import TransferMethodModal from '../../components/Wallet/Deposit/TransferMethodModal';
import AppButton from '../../components/AppButton';
import FiatBlock from '../../components/Wallet/Deposit/FiatBlock';
import FlexBlock from '../../components/Wallet/Deposit/FlexBlock';
import AppWebView from '../../components/AppWebView';
import GeneralError from '../../components/GeneralError';
import AddressBlock from '../../components/Wallet/Deposit/AddressBlock';
import AppInfoBlock from '../../components/AppInfoBlock';
import { infos, warnings } from '../../constants/warningsAndInfos';
import {
  fetchFee,
  setCard,
  setDepositProvider,
} from '../../redux/trade/actions';
import { errorHappenedHere } from '../../utils/appUtils';
import { setStatusModalInfo } from '../../redux/modals/actions';

export default function Deposit() {
  const dispatch = useDispatch();
  const state = useSelector((state) => state);

  const [hasRestriction, setHasRestriction] = useState(false);
  const [hasMethod, setHasMethod] = useState(false);
  const [loading, setLoading] = useState(true);

  const {
    transactions: { code },
    trade: { currentBalanceObj, depositProvider, card },
    wallet: { cryptoAddress, hasMultipleMethods, depositRestriction, network },
    modals: { webViewObj },
  } = state;

  const isFiat = currentBalanceObj.type === 'FIAT';
  const isCrypto = currentBalanceObj.type === 'CRYPTO';
  const isEcommerce = network === 'ECOMMERCE';

  useEffect(() => {
    const m = currentBalanceObj.depositMethods;
    if (m.ECOMMERCE) {
      dispatch(setNetwork('ECOMMERCE'));
    } else {
      if (m.WALLET) dispatch(setNetwork(m.WALLET[0].provider));
      if (m.WIRE) dispatch(setNetwork(m.WIRE[0].provider));
    }

    setHasMethod(!!Object.keys(m).length);
    setLoading(false);

    return () => dispatch({ type: 'SET_DEPOSIT_AMOUNT', depositAmount: 0 });
  }, [code]);

  useEffect(() => {
    dispatch({ type: 'SET_DEPOSIT_AMOUNT', depositAmount: 0 });
    card && dispatch(fetchFee('deposit'));
    dispatch({ type: 'CLEAN_WALLET_INPUTS' });
  }, [network, depositProvider, card]);

  useEffect(() => {
    setHasRestriction(Object.keys(depositRestriction).length);
  }, [depositRestriction]);

  const generate = () => {
    if (currentBalanceObj.depositMethods.WALLET) {
      const provider = currentBalanceObj.depositMethods.WALLET[0].provider;
      dispatch(generateCryptoAddressAction(code, provider));
    }
  };

  const reason = () => {
    if (depositRestriction.reason) return depositRestriction.reason;
    return 'METHOD';
  };

  const clear = () => {
    dispatch({ type: 'RESET_APP_WEBVIEW_OBJ' });
    dispatch(setDepositProvider(null));
    dispatch(setCard(null));
    dispatch({ type: 'SET_DEPOSIT_AMOUNT', depositAmount: 0 });
    dispatch(fetchFee('deposit'));
    dispatch({ type: 'BALANCE_SAGA' });
  };

  const onNavigationStateChange = (state) => {
    const urlArray = state.url.split('=');
    const alternateUrlArray = state.url.split('/');
    const ending = urlArray[urlArray.length - 1];
    const alternateEnding = alternateUrlArray[alternateUrlArray.length - 1];
    if (
      ending === 'false' ||
      ending === 'true' ||
      alternateEnding === 'Cancel'
    ) {
      clear();
      dispatch(setStatusModalInfo({ success: ending, visible: true }));
    }
  };

  const content = () => {
    let infoObj;
    if (hasMethod && currentBalanceObj.infos) {
      infoObj = currentBalanceObj.infos[network];
      let array = [
        `Expected Arrival: ${infoObj?.minConfirmsForDeposit} network confirmations`,
      ];
      if (infoObj?.walletInfo) array.push(infoObj?.walletInfo);
      return array;
    }
  };

  return (
    <>
      {!loading ? (
        <ScrollView
          contentContainerStyle={{ flexGrow: 1 }}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.block}>
            <GeneralError
              style={styles.error}
              show={errorHappenedHere('Deposit')}
            />
            <WalletCoinsDropdown />

            {!isFiat || code === 'EUR' ? (
              <>
                <ChooseNetworkDropdown />
                {cryptoAddress?.address &&
                  !hasRestriction &&
                  hasMethod &&
                  isCrypto && <AddressBlock />}
                {hasMethod && content() && (
                  <AppInfoBlock content={content()} warning />
                )}
              </>
            ) : (
              <>
                {hasMultipleMethods && (
                  <>
                    <TransferMethodDropdown />
                    {isEcommerce && (
                      <AppInfoBlock content={infos.ecommerce.deposit} info />
                    )}
                    {network === 'SWIFT' && (
                      <AppInfoBlock content={warnings.swift.deposit} warning />
                    )}
                    {network === 'SEPA' && (
                      <AppInfoBlock content={warnings.sepa} warning />
                    )}
                    <TransferMethodModal />
                  </>
                )}
              </>
            )}
          </View>

          {!cryptoAddress?.address &&
          !isFiat &&
          !hasRestriction &&
          hasMethod ? (
            <View style={styles.flex}>
              <BulletsBlock />
              <AppButton text="Generate" onPress={generate} />
            </View>
          ) : null}

          {isFiat && !hasRestriction && hasMethod && <FiatBlock />}
          {hasRestriction || !hasMethod ? (
            <FlexBlock
              type="Deposit"
              reason={reason()}
              restrictedUntil={depositRestriction.restrictedUntil}
            />
          ) : null}

          <AppWebView
            onNavigationStateChange={onNavigationStateChange}
            source={{ uri: webViewObj?.actionUrl }}
            deposit
          />
        </ScrollView>
      ) : (
        <ActivityIndicator />
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
  error: {
    marginBottom: 16,
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
