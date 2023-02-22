import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { Trans, useTranslation } from 'react-i18next';
import { MaterialIndicator } from 'react-native-indicators';

import ChooseNetworkDropdown from '../../components/Wallet/Deposit/ChooseNetworkDropdown';
import WalletCoinsDropdown from '../../components/Wallet/Deposit/WalletCoinsDropdown';
import BulletsBlock from '../../components/Wallet/Deposit/BulletsBlock';
import TransferMethodDropdown from '../../components/Wallet/Deposit/TransferMethodDropdown';
import TransferMethodModal from '../../components/Wallet/Deposit/TransferMethodModal';
import AppButton from '../../components/AppButton';
import FiatBlock from '../../components/Wallet/Deposit/FiatBlock';
import FlexBlock from '../../components/Wallet/Deposit/FlexBlock';
import AppWebView from '../../components/AppWebView';
import GeneralError from '../../components/GeneralError';
import AddressBlock from '../../components/Wallet/Deposit/AddressBlock';
import AppInfoBlock from '../../components/AppInfoBlock';
import WithKeyboard from '../../components/WithKeyboard';
import AppText from '../../components/AppText';

import { infos, warnings } from '../../constants/warningsAndInfos';
import colors from '../../constants/colors';
import {
  fetchFee,
  setCard,
  setDepositProvider,
  setFee,
} from '../../redux/trade/actions';
import {
  generateCryptoAddressAction,
  setNetwork,
} from '../../redux/wallet/actions';
import { setStatusModalInfo } from '../../redux/modals/actions';
import { errorHappenedHere } from '../../utils/appUtils';

export default function Deposit({ refreshControl }) {
  const dispatch = useDispatch();
  const state = useSelector((state) => state);

  const { t } = useTranslation();

  const [hasRestriction, setHasRestriction] = useState(false);
  const [hasMethod, setHasMethod] = useState(false);

  const {
    transactions: { code, loading },
    trade: { currentBalanceObj, depositProvider, card, cardsLoading },
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

    return () => {
      dispatch({ type: 'SET_DEPOSIT_AMOUNT', depositAmount: 0 });
      dispatch(setCard(null));
    };
  }, [code]);

  useEffect(() => {
    dispatch({ type: 'SET_DEPOSIT_AMOUNT', depositAmount: 0 });
    dispatch({ type: 'CLEAN_WALLET_INPUTS' });
    dispatch(setFee(null));
    card && depositProvider && dispatch(fetchFee('deposit'));
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
    dispatch({ type: 'BALANCE_SAGA' });
  };

  const onNavigationStateChange = (state) => {
    const urlArray = state.url.split('=');
    const alternateUrlArray = state.url.split('/');
    const ending = urlArray[urlArray.length - 1];
    const alternateEnding = alternateUrlArray[alternateUrlArray.length - 1];
    if (ending === 'false' || ending === 'true') {
      clear();
      dispatch(setStatusModalInfo({ success: ending, visible: true }));
    }
  };

  const content = () => {
    let infoObj;
    if (hasMethod && currentBalanceObj.infos) {
      infoObj = currentBalanceObj.infos[network];
      const minConfirmsForDeposit = infoObj?.minConfirmsForDeposit;
      const walletInfo = infoObj?.walletInfo;
      const needsTag = infoObj?.transactionRecipientType === 'ADDRESS_AND_TAG';

      const transComponent = (
        <Trans
          i18nKey="needs tag for deposit {{currency}} params[currency]"
          values={{ currency: code }}
          components={{
            light: <AppText style={{ color: '#FFFBF3' }} />,
            gold: <AppText style={{ color: '#F2DFB4' }} />,
          }}
        />
      );

      let array = [
        t(`{{minConfirmsForDeposit}} params[minConfirmsForDeposit]`, {
          minConfirmsForDeposit,
        }),
      ];
      if (walletInfo) array.push(t(walletInfo));
      if (needsTag) array.push(transComponent);
      return array;
    }
  };

  return cardsLoading || loading ? (
    <MaterialIndicator color="#6582FD" animationDuration={3000} />
  ) : (
    <WithKeyboard flexGrow padding refreshControl={refreshControl}>
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

      {!cryptoAddress?.address && !isFiat && !hasRestriction && hasMethod ? (
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
    </WithKeyboard>
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
