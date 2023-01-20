import React from 'react';
import { Image, StyleSheet, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import AppText from '../AppText';
import colors from '../../constants/colors';
import images from '../../constants/images';
import {
  toggleEmailAuthModal,
  toggleGoogleOtpModal,
  togglePasswordModal,
  toggleSmsAuthModal,
} from '../../redux/modals/actions';
import PurpleText from '../PurpleText';
import {
  setCurrentSecurityAction,
  setEmailAuth,
  setGoogleAuth,
} from '../../redux/profile/actions';
import { sendOtp } from '../../utils/userProfileUtils';
import AppSwitcher from '../AppSwitcher';

export default function SecurityRow({ text, i = 0, a = [] }) {
  const dispatch = useDispatch();
  const state = useSelector((state) => state.profile);
  const { userInfo, smsAuth, emailAuth, googleAuth } = state;

  const handlePassword = () => {
    dispatch(togglePasswordModal(true));
  };

  const handleChange = () => {
    switch (text) {
      case 'Google_Auth':
        if (emailAuth) dispatch(toggleEmailAuthModal(true));
        if (smsAuth) dispatch(toggleSmsAuthModal(true));
        dispatch(setCurrentSecurityAction('google'));
        dispatch(setGoogleAuth(true));
        sendOtp();
        break;
      case 'E_mail_Auth':
        if (googleAuth) dispatch(toggleGoogleOtpModal(true));
        if (smsAuth) {
          dispatch(toggleSmsAuthModal(true));
          sendOtp();
        }
        dispatch(setCurrentSecurityAction('email'));
        dispatch(setEmailAuth(true));

        break;
      default:
        break;
    }
  };

  const disabledCond = () => {
    switch (text) {
      case 'Google_Auth':
        return googleAuth;
      case 'E_mail_Auth':
        return emailAuth;
      case 'SMS_Auth':
        return smsAuth;
      default:
        break;
    }
  };

  const textCond = () => {
    switch (text) {
      case 'Google_Auth':
        return 'Google Authentication';
      case 'E_mail_Auth':
        return 'E-mail Authentication';
      case 'SMS_Auth':
        return 'SMS Authentication';
      case 'Pin':
        return 'Set a PIN Code';
      case 'Biometric':
        return 'Biometric';
      case 'Strong_Password':
        return 'Set a Strong Password';
      default:
        break;
    }
  };

  const secondaryTextCond = () => {
    switch (text) {
      case 'Google_Auth':
        return 'Google Auth Description';
      case 'E_mail_Auth':
        return userInfo.email;
      case 'SMS_Auth':
        return userInfo.phoneNumber;
      case 'Pin':
        return 'Changing password periodically';
      case 'Biometric':
        return 'Set Face ID, or Fingerprint';
      case 'Strong_Password':
        return 'Change password periodically';
      default:
        break;
    }
  };

  const switchCond = () => {
    switch (text) {
      case 'E_mail_Auth':
        return emailAuth;
      case 'SMS_Auth':
        return smsAuth;
      case 'Google_Auth':
        return googleAuth;
      default:
        break;
    }
  };

  const renderCond = () => {
    if (text === 'SMS_Auth') {
      return smsAuth;
    }
    return true;
  };

  return (
    <>
      {renderCond() && (
        <View style={styles.row} key={text}>
          <View style={styles.imageContainer}>
            <Image source={images[text]} />
          </View>

          <View style={styles.justify}>
            <AppText medium style={styles.white}>
              {textCond()}
            </AppText>
            <AppText subtext style={styles.secondary}>
              {secondaryTextCond()}
            </AppText>
          </View>

          {text === 'Strong_Password' ? (
            <PurpleText text="Edit" onPress={handlePassword} />
          ) : (
            <AppSwitcher
              isOn={switchCond()}
              onToggle={handleChange}
              disabled={disabledCond()}
            />
          )}
        </View>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  imageContainer: {
    width: 35,
    height: 37,
    alignItems: 'center',
    justifyContent: 'center',
  },
  justify: {
    justifyContent: 'space-between',
    flex: 1,
    marginHorizontal: 20,
  },
  secondary: {
    color: colors.SECONDARY_TEXT,
    marginTop: 5,
  },
  row: {
    flexDirection: 'row',
    height: 68,
    alignItems: 'center',
  },
  white: {
    color: colors.PRIMARY_TEXT,
  },
});
