import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CodeInput from '../components/CodeInput';
import {
  toggleEmailAuthModal,
  toggleLogin2FaModal,
  toggleSmsAuthModal,
} from '../redux/modals/actions';
import {
  activateEmailOtp,
  credentialsForEmail,
  credentialsForGoogle,
  otpForLoginAction,
} from '../redux/profile/actions';

import {
  addWhitelistAction,
  cryptoWithdrawalAction,
  deleteWhitelistAction,
  wireWithdrawalAction,
} from '../redux/wallet/actions';

export default function TwoFaInput({
  withdrawal,
  whitelist,
  value,
  setValue,
  cellCount,
  login,
}) {
  const dispatch = useDispatch();
  const state = useSelector((state) => state);
  const {
    modals: { smsAuthModalVisible, emailAuthModalVisible },
    profile: { currentSecurityAction },
    wallet: { newWhitelist },
  } = state;

  useEffect(() => {
    if (value.length === cellCount) {
      if (withdrawal === 'crypto') {
        dispatch(cryptoWithdrawalAction(value)); // value = OTP
      }
      if (withdrawal === 'wire') {
        dispatch(wireWithdrawalAction(value)); // value = OTP
      }
      if (whitelist) {
        if (newWhitelist.name && newWhitelist.address) {
          dispatch(addWhitelistAction(value)); // value = OTP
        } else {
          // delete whitelist
          dispatch(deleteWhitelistAction(value)); // value = OTP
        }
      }

      if (currentSecurityAction === 'email') {
        if (smsAuthModalVisible) dispatch(credentialsForEmail(value));
        if (emailAuthModalVisible) dispatch(activateEmailOtp(value));
      }

      if (currentSecurityAction === 'google') {
        dispatch(credentialsForGoogle(value));
      }

      if (login) {
        dispatch(otpForLoginAction(value));
      }

      dispatch(toggleSmsAuthModal(false));
      dispatch(toggleEmailAuthModal(false));
      //   dispatch(toggleLogin2FaModal(false));

      setValue('');
    }
  }, [value]);

  const handleChange = (text) => setValue(text);

  return (
    <CodeInput cellCount={cellCount} value={value} setValue={handleChange} />
  );
}
