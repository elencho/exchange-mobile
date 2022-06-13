import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import WalletCoinsDropdown from '../../components/Wallet/Deposit/WalletCoinsDropdown';
import SmsEmailAuthModal from '../../components/UserProfile/SmsEmailAuthModal';
import colors from '../../constants/colors';
import {
  toggleEmailAuthModal,
  toggleGoogleOtpModal,
  toggleSmsAuthModal,
} from '../../redux/modals/actions';
import WireTransferWarning from '../../components/Wallet/Withdrawal/WireTransferWarning';
import {
  getWhitelistAction,
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

export default function Withdrawal() {
  const dispatch = useDispatch();
  const state = useSelector((state) => state);
  const {
    profile: { googleAuth, emailAuth, smsAuth, generalError },
    trade: { currentBalanceObj },
    transactions: { code },
    wallet: {
      withdrawalRestriction,
      currentTemplate,
      withdrawalBank,
      hasMultipleNetworks,
      hasMultipleMethods,
      network,
    },
  } = state;

  const [hasRestriction, setHasRestriction] = useState(false);
  const [hasMethod, setHasMethod] = useState(false);

  const isFiat = currentBalanceObj.type === 'FIAT';
  const isEcommerce = network === 'ECOMMERCE';

  useEffect(() => {
    dispatch(getWhitelistAction());
    dispatch(setNetwork('SWIFT'));
    if (isFiat) {
      dispatch(withdrawalTemplatesAction());
    }

    setHasMethod(!!Object.keys(currentBalanceObj.depositMethods).length);
  }, [code]);

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
    <View style={{ flex: 1 }}>
      <ScrollView style={{ flex: hasRestriction ? 0 : 1 }}>
        <View style={styles.block}>
          {generalError ? (
            <View style={{ marginBottom: 16 }}>
              <GeneralError />
            </View>
          ) : null}

          <WalletCoinsDropdown />
          {!isFiat && hasMultipleNetworks && <ChooseNetworkDropdown />}
          {isFiat && hasMultipleMethods && (
            <>
              <WireTransferWarning />
              <TransferMethodDropdown />
              <TransferMethodModal />
            </>
          )}
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
      </ScrollView>

      {!hasRestriction && hasMethod && (
        <View style={styles.button}>
          <AppButton text="Withdrawal" onPress={withdraw} />
        </View>
      )}

      {hasRestriction || !hasMethod ? (
        <FlexBlock
          type="Withdrawal"
          reason={reason()}
          restrictedUntil={withdrawalRestriction.restrictedUntil}
        />
      ) : null}

      <SmsEmailAuthModal type="SMS" withdrawal={withdrawalType()} />
      <SmsEmailAuthModal type="Email" withdrawal={withdrawalType()} />
      <GoogleOtpModal withdrawal={withdrawalType()} />
    </View>
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
