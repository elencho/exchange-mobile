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
import WireTransferWarning from '../../components/Wallet/Withdrawal/WireTransferWarning';
import {
  getWhitelistAction,
  withdrawalTemplatesAction,
} from '../../redux/wallet/actions';
import { sendOtp } from '../../utils/userProfileUtils';
import AppButton from '../../components/AppButton';
import WithdrawalAddress from '../../components/Wallet/Withdrawal/WithdrawalAddress';
import WithdrawalInputs from '../../components/Wallet/Withdrawal/WithdrawalInputs';
import FlexBlock from '../../components/Wallet/Deposit/FlexBlock';
import TransferMethodDropdown from '../../components/Wallet/Deposit/TransferMethodDropdown';
import TransferMethodModal from '../../components/Wallet/Deposit/TransferMethodModal';
import WithdrawalInfo from '../../components/Wallet/Withdrawal/WithdrawalInfo';
import SaveAsTemplate from '../../components/Wallet/Withdrawal/SaveAsTemplate';
import WithdrawalFees from '../../components/Wallet/Withdrawal/WithdrawalFees';

export default function Withdrawal() {
  const dispatch = useDispatch();
  const state = useSelector((state) => state);
  const {
    profile: { googleAuth, emailAuth, smsAuth },
    trade: { balance },
    transactions: { code },
    wallet: { withdrawalRestriction, currentTemplate, withdrawalBank },
  } = state;

  const [hasRestriction, setHasRestriction] = useState(false);
  const isFiat = code === 'GEL' || code === 'USD';

  useEffect(() => {
    dispatch(getWhitelistAction());
    dispatch(withdrawalTemplatesAction());
  }, [code]);

  useEffect(() => {
    setHasRestriction(Object.keys(withdrawalRestriction).length);
  }, [withdrawalRestriction]);

  const withdraw = () => {
    if (googleAuth) dispatch(toggleGoogleOtpModal(true));
    if (emailAuth) dispatch(toggleEmailAuthModal(true));
    if (smsAuth) dispatch(toggleSmsAuthModal(true));
    sendOtp();
  };

  const saveTemplateCheck = () => {
    return (
      currentTemplate.templateName === 'New Template' &&
      Object.keys(withdrawalBank).length
    );
  };

  const withdrawalType = () => {
    let type;
    if (balance.balances) {
      balance.balances.forEach((b) => {
        if (b.currencyCode === code) {
          if (b.withdrawalMethods.WALLET) type = 'crypto';
          if (b.withdrawalMethods.WIRE) type = 'wire';
        }
      });
    }
    return type;
  };

  return (
    <View style={{ flex: 1 }}>
      <View style={{ flex: hasRestriction ? 0 : 1 }}>
        <View style={styles.block}>
          <WalletCoinsDropdown />
          {isFiat && (
            <>
              <TransferMethodDropdown />
              <TransferMethodModal />
            </>
          )}
          <WireTransferWarning />

          {!hasRestriction && !isFiat && <WithdrawalAddress />}
        </View>

        {!hasRestriction && isFiat && <WithdrawalInfo />}
        {!hasRestriction && <WithdrawalInputs />}
        {saveTemplateCheck() ? (
          <>
            <WithdrawalFees />
            <SaveAsTemplate />
          </>
        ) : null}
      </View>

      {!hasRestriction && (
        <View style={styles.button}>
          <AppButton text="Withdrawal" onPress={withdraw} />
        </View>
      )}

      {hasRestriction ? (
        <FlexBlock
          type="Withdrawal"
          reason={withdrawalRestriction.reason}
          restrictedUntil={withdrawalRestriction.restrictedUntil}
        />
      ) : null}

      <SmsEmailAuthModal type="SMS" withdrawal={withdrawalType()} />
      <SmsEmailAuthModal type="Email" withdrawal={withdrawalType()} />
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
