import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import WalletCoinsDropdown from '../../components/Wallet/Deposit/WalletCoinsDropdown';
import SmsEmailAuthModal from '../../components/UserProfile/SmsEmailAuthModal';
import colors from '../../constants/colors';
import {
  toggleEmailAuthModal,
  toggleGoogleOtpModal,
  toggleSmsAuthModal,
} from '../../redux/modals/actions';
import { setNetwork } from '../../redux/wallet/actions';
import { sendOtp } from '../../utils/userProfileUtils';
import AppButton from '../../components/AppButton';
import WithdrawalInputs from '../../components/Wallet/Withdrawal/WithdrawalInputs';
import FlexBlock from '../../components/Wallet/Deposit/FlexBlock';
import TransferMethodDropdown from '../../components/Wallet/Deposit/TransferMethodDropdown';
import TransferMethodModal from '../../components/Wallet/Deposit/TransferMethodModal';
import WithdrawalInfo from '../../components/Wallet/Withdrawal/WithdrawalInfo';
import SaveAsTemplate from '../../components/Wallet/Withdrawal/SaveAsTemplate';
import ChooseNetworkDropdown from '../../components/Wallet/Deposit/ChooseNetworkDropdown';
import GeneralError from '../../components/GeneralError';
import GoogleOtpModal from '../../components/UserProfile/GoogleOtpModal';
import AppInfoBlock from '../../components/AppInfoBlock';
import { infos, warnings } from '../../constants/warningsAndInfos';
import { fetchFee, setCard, setFee } from '../../redux/trade/actions';
import { MaterialIndicator } from 'react-native-indicators';
import { validateAmount } from '../../utils/appUtils';
import WithKeyboard from '../../components/WithKeyboard';

export default function Withdrawal({ refreshControl }) {
  const dispatch = useDispatch();
  const state = useSelector((state) => state);
  const {
    profile: { googleAuth, emailAuth, smsAuth },
    trade: { currentBalanceObj, card, depositProvider, cardsLoading },
    transactions: { code },
    wallet: {
      withdrawalRestriction,
      currentWhitelistObj,
      currentTemplate,
      withdrawalBank,
      hasMultipleMethods,
      network,
      withdrawalAmount,
    },
  } = state;

  const [hasRestriction, setHasRestriction] = useState(false);
  const [hasMethod, setHasMethod] = useState(false);
  const [error, setError] = useState(false);

  const isFiat = currentBalanceObj.type === 'FIAT';
  const isEcommerce = network === 'ECOMMERCE';
  const walletInfo = () => {
    if (currentBalanceObj?.infos && hasMethod && !hasRestriction) {
      return currentBalanceObj?.infos[network]?.walletInfo;
    }
  };

  useEffect(() => {
    const m = currentBalanceObj.withdrawalMethods;

    if (m.ECOMMERCE) {
      dispatch(setNetwork('ECOMMERCE'));
    } else {
      if (m.WALLET) dispatch(setNetwork(m.WALLET[0].provider));
      if (m.WIRE) dispatch(setNetwork(m.WIRE[0].provider));
    }

    setHasMethod(!!Object.keys(m).length);
  }, [code]);

  useEffect(() => {
    dispatch({ type: 'CLEAN_WALLET_INPUTS' });
    dispatch(setFee(null));
    if ((isEcommerce && card && depositProvider) || (!isEcommerce && network)) {
      dispatch(fetchFee('withdrawal'));
    }
  }, [network, depositProvider, card]);

  useEffect(() => {
    setHasRestriction(Object.keys(withdrawalRestriction).length);
  }, [withdrawalRestriction]);

  useEffect(() => {
    return () => dispatch(setCard(null));
  }, []);

  useEffect(() => {
    error && setError(false);
  }, [depositProvider, card, withdrawalAmount, currentWhitelistObj]);

  const withdraw = () => {
    const length = Object.keys(currentWhitelistObj)?.length;
    const empty = !currentTemplate?.templateName;

    let condition;
    if (isEcommerce) {
      condition =
        !validateAmount(withdrawalAmount) || !card || !depositProvider;
    } else if (isFiat) {
      condition = !validateAmount(withdrawalAmount) || empty;
    } else {
      condition = !validateAmount(withdrawalAmount) || !length;
    }

    if (condition) {
      setError(true);
    } else {
      if (googleAuth) dispatch(toggleGoogleOtpModal(true));
      if (emailAuth) dispatch(toggleEmailAuthModal(true));
      if (smsAuth) dispatch(toggleSmsAuthModal(true));
      if (!googleAuth) sendOtp();
    }
  };

  const saveTemplateCheck = () => {
    return (
      currentTemplate.templateName === 'New Template' &&
      Object.keys(withdrawalBank).length
    );
  };

  const withdrawalType = () => {
    if (isEcommerce) return 'card';
    if (currentBalanceObj?.type === 'CRYPTO') return 'crypto';
    if (currentBalanceObj?.type === 'FIAT') return 'wire';
  };

  const reason = () => {
    if (withdrawalRestriction.reason) {
      return withdrawalRestriction.reason;
    }
    return 'METHOD';
  };

  return (
    <>
      {!cardsLoading ? (
        <WithKeyboard flexGrow padding refreshControl={refreshControl}>
          <View style={styles.block}>
            {/* <GeneralError style={{ marginBottom: 16 }} /> */}
            <WalletCoinsDropdown />
            {(!isFiat || code === 'EUR') && <ChooseNetworkDropdown />}
            {isFiat && hasMultipleMethods && (
              <>
                <TransferMethodDropdown />
                <TransferMethodModal />
                {network === 'SWIFT' && (
                  <AppInfoBlock content={warnings.swift.withdrawal} warning />
                )}
                {network === 'SEPA' && (
                  <AppInfoBlock content={warnings.sepa} warning />
                )}
                {network === 'ECOMMERCE' && (
                  <AppInfoBlock content={infos.ecommerce.withdrawal} info />
                )}
              </>
            )}

            {walletInfo() && <AppInfoBlock content={[walletInfo()]} warning />}
          </View>

          {!hasRestriction && isFiat && hasMethod && !isEcommerce && (
            <WithdrawalInfo />
          )}
          {!hasRestriction && hasMethod && (
            <WithdrawalInputs
              error={error}
              isFiat={isFiat}
              hasRestriction={hasRestriction}
            />
          )}
          {saveTemplateCheck() ? <SaveAsTemplate /> : null}

          {hasRestriction || !hasMethod ? (
            <FlexBlock
              type="Withdrawal"
              reason={reason()}
              restrictedUntil={withdrawalRestriction.restrictedUntil}
            />
          ) : null}
        </WithKeyboard>
      ) : (
        <MaterialIndicator color="#6582FD" animationDuration={3000} />
      )}

      {!hasRestriction &&
        hasMethod && ( // Button
          <View style={styles.button}>
            <AppButton text="Withdrawal" onPress={withdraw} />
          </View>
        )}

      <SmsEmailAuthModal type="SMS" withdrawal={withdrawalType()} />
      <SmsEmailAuthModal type="Email" withdrawal={withdrawalType()} />
      <GoogleOtpModal withdrawal={withdrawalType()} />
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
  button: {
    marginHorizontal: 15,
    marginTop: 40,
  },
});
