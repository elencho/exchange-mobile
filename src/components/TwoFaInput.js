import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';

import CodeInput from '../components/CodeInput';
import {
  activateEmailOtp,
  credentialsForEmail,
  credentialsForGoogle,
  otpForLoginAction,
} from '../redux/profile/actions';

import {
  addWhitelistAction,
  cardWithdrawalAction,
  cryptoWithdrawalAction,
  deleteWhitelistAction,
  wireWithdrawalAction,
} from '../redux/wallet/actions';
import { MaterialIndicator } from 'react-native-indicators';

export default function TwoFaInput({
  withdrawal,
  whitelist,
  value,
  setValue,
  cellCount = 6,
  login,
  registration,
}) {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const state = useSelector((state) => state);

  const {
    modals: {
      smsAuthModalVisible,
      emailAuthModalVisible,
      googleOtpModalVisible,
    },
    profile: { currentSecurityAction, userProfileLoading },
    wallet: { newWhitelist },
  } = state;

  const email = currentSecurityAction === 'email';
  const google = currentSecurityAction === 'google';

  useEffect(() => {
    if (value.length === cellCount) {
      if (registration)
        dispatch({ type: 'VERIFY_ACCOUNT', otp: value, navigation });

      if (withdrawal === 'crypto') dispatch(cryptoWithdrawalAction(value)); // value = OTP
      if (withdrawal === 'wire') dispatch(wireWithdrawalAction(value)); // value = OTP
      if (withdrawal === 'card') dispatch(cardWithdrawalAction(value)); // value = OTP

      if (whitelist) {
        if (newWhitelist.name && newWhitelist.address) {
          dispatch(addWhitelistAction(value)); // value = OTP
        } else {
          // delete whitelist
          dispatch(deleteWhitelistAction(value)); // value = OTP
        }
      }

      if (google) dispatch(credentialsForGoogle(value));
      if (email) {
        if (smsAuthModalVisible || googleOtpModalVisible)
          dispatch(credentialsForEmail(value));
        if (emailAuthModalVisible) dispatch(activateEmailOtp(value));
      }

      if (login) dispatch(otpForLoginAction(value, navigation));

      setTimeout(() => {
        setValue('');
      }, 200);
    }
  }, [value]);

  const handleChange = (text) => setValue(text);
  return userProfileLoading ? (
    <MaterialIndicator
      color="#6582FD"
      animationDuration={3000}
      style={{ position: 'absolute', alignSelf: 'center' }}
    />
  ) : (
    <CodeInput cellCount={cellCount} value={value} setValue={handleChange} />
  );
}
