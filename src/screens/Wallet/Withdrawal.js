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
import ChooseAddressModal from '../../components/Wallet/Withdrawal/ChooseAddressModal';
import { getWhitelistAction } from '../../redux/wallet/actions';
import { sendOtp } from '../../utils/userProfileUtils';
import AppButton from '../../components/AppButton';
import WithdrawalAddress from '../../components/Wallet/Withdrawal/WithdrawalAddress';
import WithdrawalInputs from '../../components/Wallet/Withdrawal/WithdrawalInputs';
import FlexBlock from '../../components/Wallet/Deposit/FlexBlock';

export default function Withdrawal() {
  const dispatch = useDispatch();
  const state = useSelector((state) => state);
  const {
    profile: { googleAuth, emailAuth, smsAuth },
    transactions: { code },
    trade: { balance },
  } = state;

  const [restriction, setRestriction] = useState({});
  const [hasRestriction, setHasRestriction] = useState(false);

  useEffect(() => {
    dispatch(getWhitelistAction());

    if (balance.balances[0].restrictions.WITHDRAWAL) {
      setRestriction(balance.balances[0].restrictions.WITHDRAWAL);
    }
  }, [code]);

  useEffect(() => {
    setHasRestriction(Object.keys(restriction).length);
  }, [restriction]);

  const withdraw = () => {
    if (googleAuth) dispatch(toggleGoogleOtpModal(true));
    if (emailAuth) dispatch(toggleEmailAuthModal(true));
    if (smsAuth) dispatch(toggleSmsAuthModal(true));
    sendOtp();
  };

  return (
    <View style={{ flex: 1 }}>
      <View style={{ flex: hasRestriction ? 0 : 1 }}>
        <View style={styles.block}>
          <WalletCoinsDropdown />
          {!hasRestriction && <WithdrawalAddress />}
        </View>

        {!hasRestriction && (
          <View style={styles.block}>
            <WithdrawalInputs />
            <ChooseAddressModal />
            <SmsEmailAuthModal type="SMS" withdrawal />
          </View>
        )}
      </View>

      {!hasRestriction && <AppButton text="Withdrawal" onPress={withdraw} />}

      {hasRestriction ? (
        <FlexBlock
          type="Withdrawal"
          reason={restriction.reason}
          restrictedUntil={restriction.restrictedUntil}
        />
      ) : null}
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
});
