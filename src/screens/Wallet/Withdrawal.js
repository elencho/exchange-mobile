import React, { useEffect, useState } from 'react';
import { ActivityIndicator, ScrollView, StyleSheet, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import WalletCoinsDropdown from '../../components/Wallet/Deposit/WalletCoinsDropdown';
import SmsEmailAuthModal from '../../components/UserProfile/SmsEmailAuthModal';
import colors from '../../constants/colors';
import {
  toggleEmailAuthModal,
  toggleGoogleOtpModal,
  toggleSmsAuthModal,
} from '../../redux/modals/actions';
import {
  setNetwork,
  withdrawalTemplatesAction,
} from '../../redux/wallet/actions';
import { sendOtp } from '../../utils/userProfileUtils';
import AppButton from '../../components/AppButton';
import WithdrawalInputs from '../../components/Wallet/Withdrawal/WithdrawalInputs';
import FlexBlock from '../../components/Wallet/Deposit/FlexBlock';
import TransferMethodDropdown from '../../components/Wallet/Deposit/TransferMethodDropdown';
import TransferMethodModal from '../../components/Wallet/Deposit/TransferMethodModal';
import WithdrawalInfo from '../../components/Wallet/Withdrawal/WithdrawalInfo';
import SaveAsTemplate from '../../components/Wallet/Withdrawal/SaveAsTemplate';
import WithdrawalFees from '../../components/Wallet/Withdrawal/WithdrawalFees';
import ChooseNetworkDropdown from '../../components/Wallet/Deposit/ChooseNetworkDropdown';
import GeneralError from '../../components/GeneralError';
import GoogleOtpModal from '../../components/UserProfile/GoogleOtpModal';
import AppInfoBlock from '../../components/AppInfoBlock';
import { infos, warnings } from '../../constants/warningsAndInfos';
import { setFee } from '../../redux/trade/actions';

export default function Withdrawal() {
  const dispatch = useDispatch();
  const state = useSelector((state) => state);
  const {
    profile: { googleAuth, emailAuth, smsAuth },
    trade: { currentBalanceObj, card, depositProvider },
    transactions: { code },
    wallet: {
      withdrawalRestriction,
      currentTemplate,
      withdrawalBank,
      currentWhitelistObj,
      hasMultipleMethods,
      network,

      // Withdrawal Params
      withdrawalAmount,
      withdrawalNote,
      saveTemplate,
      newTemplateName,
      iban,
      receiverBank,
    },
  } = state;

  const [hasRestriction, setHasRestriction] = useState(false);
  const [hasMethod, setHasMethod] = useState(false);
  const [loading, setloading] = useState(true);

  const isFiat = currentBalanceObj.type === 'FIAT';
  const isEcommerce = network === 'ECOMMERCE';
  const walletInfo = () => {
    if (currentBalanceObj?.infos && hasMethod && !hasRestriction) {
      return currentBalanceObj?.infos[network]?.walletInfo;
    }
  };

  const hasParams = withdrawalAmount && withdrawalNote && iban && receiverBank;

  const enabled = () => {
    if (network === 'SWIFT' || network === 'SEPA') {
      if (saveTemplate) return hasParams && newTemplateName;
      return hasParams;
    }

    if (isEcommerce) return card?.id && withdrawalAmount;

    return withdrawalAmount && currentWhitelistObj?.address;
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
    setloading(false);
  }, [code]);

  useEffect(() => {
    dispatch({ type: 'CLEAN_WALLET_INPUTS' });
    dispatch(setFee(null));
  }, [network, depositProvider, card]);

  useEffect(() => {
    setHasRestriction(Object.keys(withdrawalRestriction).length);
  }, [withdrawalRestriction]);

  const withdraw = () => {
    if (googleAuth) dispatch(toggleGoogleOtpModal(true));
    if (emailAuth) dispatch(toggleEmailAuthModal(true));
    if (smsAuth) dispatch(toggleSmsAuthModal(true));
    if (!googleAuth) sendOtp();
  };

  const saveTemplateCheck = () => {
    return (
      currentTemplate.templateName === 'New Template' &&
      Object.keys(withdrawalBank).length
    );
  };

  const withdrawalType = () => {
    if (currentBalanceObj.withdrawalMethods.WALLET) return 'crypto';
    if (network === 'SWIFT') return 'wire';
    if (isEcommerce) return 'card';
  };

  const reason = () => {
    if (withdrawalRestriction.reason) {
      return withdrawalRestriction.reason;
    }
    return 'METHOD';
  };

  return (
    <>
      {!loading ? (
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
          <View style={styles.block}>
            {/* <GeneralError style={{ marginBottom: 16 }} /> */}
            <WalletCoinsDropdown />
            {(!isFiat || code === 'EUR') && <ChooseNetworkDropdown />}
            {isFiat && hasMultipleMethods && (
              <>
                <TransferMethodDropdown />
                <TransferMethodModal />
                {network === 'SWIFT' && (
                  <AppInfoBlock content={warnings.swift.deposit} warning />
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
            <WithdrawalInputs isFiat={isFiat} hasRestriction={hasRestriction} />
          )}
          {saveTemplateCheck() ? (
            <>
              <WithdrawalFees />
              <SaveAsTemplate />
            </>
          ) : null}

          {hasRestriction || !hasMethod ? (
            <FlexBlock
              type="Withdrawal"
              reason={reason()}
              restrictedUntil={withdrawalRestriction.restrictedUntil}
            />
          ) : null}
        </ScrollView>
      ) : (
        <ActivityIndicator />
      )}

      {!hasRestriction && hasMethod && (
        <View style={styles.button}>
          <AppButton
            text="Withdrawal"
            onPress={withdraw}
            disabled={!enabled()}
          />
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
