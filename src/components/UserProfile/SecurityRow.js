import React, { useState, useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';

import AppText from '../AppText';
import AppSwitcher from '../AppSwitcher';
import PurpleText from '../PurpleText';
import Google_Auth from '../../assets/images/User_profile/Totp_Auth';
import E_mail_Auth from '../../assets/images/User_profile/Email_Auth';
import FaceID from '../../assets/images/Face_ID';
import TouchID from '../../assets/images/Touch_ID';
import SMS_Auth from '../../assets/images/User_profile/Sms_Auth';
import Strong_Password from '../../assets/images/User_profile/Strong_Password';
import {
  toggleEmailAuthModal,
  toggleGoogleOtpModal,
  togglePasswordModal,
  toggleSmsAuthModal,
} from '../../redux/modals/actions';
import {
  setCurrentSecurityAction,
  setEmailAuth,
  setGoogleAuth,
} from '../../redux/profile/actions';
import { sendOtp } from '../../utils/userProfileUtils';
import colors from '../../constants/colors';
import {
  isEnrolledAsync,
  authenticateAsync,
  supportedAuthenticationTypesAsync,
} from 'expo-local-authentication';

export default function SecurityRow({ text, i = 0, a = [] }) {
  const dispatch = useDispatch();
  const state = useSelector((state) => state.profile);
  const { userInfo, smsAuth, emailAuth, googleAuth } = state;

  const [bioType, setBioType] = useState(null);
  const [isBioOn, setIsBioOn] = useState(false);

  useEffect(() => {
    handleBiometricIcon();
    getBiometricEnabled(userInfo?.email);
  }, []);

  const handlePassword = () => {
    dispatch(togglePasswordModal(true));
  };

  const handleAuth = async (type, user) => {
    const enabledUsers = await AsyncStorage.getItem('BiometricEnabled');
    const enrolled = await isEnrolledAsync();

    let newUser = JSON.parse(enabledUsers);
    if (!newUser) {
      newUser = [];
    }

    if (isBioOn) {
      const newUsers = newUser.filter((u) => u.user !== user);
      await AsyncStorage.removeItem('BiometricEnabled');
      await AsyncStorage.setItem('BiometricEnabled', JSON.stringify(newUsers));
      return setIsBioOn(false);
    }

    if (enrolled) {
      const result = await authenticateAsync({
        promptMessage: 'Log in with fingerprint or faceid',
        cancelLabel: 'Abort',
      });
      if (result.success) {
        newUser?.push({ user: user, enabled: true, type: type });
        await AsyncStorage.setItem('BiometricEnabled', JSON.stringify(newUser))
          .then(() => {
            setIsBioOn(true);
          })
          .catch(() => {
            console.log('‘There was an error saving the product’');
          });
      }
    }
  };

  const handleBiometricIcon = async () => {
    try {
      await supportedAuthenticationTypesAsync()
        .then((data) => {
          if (data[0] === 2) {
            setBioType('FACEID');
          } else {
            setBioType('TOUCHID');
          }
        })
        .catch((err) => console.log(err));
    } catch (err) {
      console.log(err);
    }
  };

  const getBiometricEnabled = async (user) => {
    const enabledUsers = await AsyncStorage.getItem('BiometricEnabled');
    let parsedUsers = JSON.parse(enabledUsers);
    const userIndex = parsedUsers?.find(
      (u) => u?.user === user && u?.enabled === true
    );
    if (userIndex) {
      setIsBioOn(true);
    }
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
      case 'Biometric':
        handleAuth(bioType, userInfo?.email);
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
      case 'Biometric':
        return isBioOn;
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

  const images = {
    Google_Auth: <Google_Auth />,
    E_mail_Auth: <E_mail_Auth />,
    SMS_Auth: <SMS_Auth />,
    Strong_Password: <Strong_Password />,
    Biometric: bioType === 'FACEID' ? <FaceID /> : <TouchID />,
  };

  return (
    <>
      {renderCond() && (
        <View style={styles.row} key={text}>
          {images[text]}

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
