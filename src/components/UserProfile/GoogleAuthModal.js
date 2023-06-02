import React, { useEffect, useState } from 'react';
import { StyleSheet, View, TouchableOpacity, Linking } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { MaterialIndicator } from 'react-native-indicators';

import AppInput from '../AppInput';
import AppModal from '../AppModal';
import AppText from '../AppText';
import PurpleText from '../PurpleText';
import GeneralError from '../GeneralError';
import Copy from '../../assets/images/Copy.svg';

import colors from '../../constants/colors';
import { toggleGoogleAuthModal } from '../../redux/modals/actions';
import { activateGoogleOtp, setGoogleAuth } from '../../redux/profile/actions';
import { errorHappenedHere } from '../../utils/appUtils';
import { IS_IOS } from '../../constants/system';
import useCopyToClipboard from '../../utils/copyToClipboard';

import AppStoreIcon from '../../assets/images/User_profile/Appstore.svg';
import PlayStoreIcon from '../../assets/images/User_profile/Playstore.svg';

export default function GoogleAuthModal() {
  const { copyToClipboard } = useCopyToClipboard();
  const dispatch = useDispatch();
  const state = useSelector((state) => state);
  const {
    modals: { googleAuthModalVisible },
    profile: { totpSecretObj },
  } = state;

  const [key, setKey] = useState('');
  const [googleAuthLoading, setGoogleAuthLoading] = useState(false);

  useEffect(() => {
    return () => setGoogleAuthLoading(false);
  }, []);

  const enable = () => dispatch(activateGoogleOtp(key, setGoogleAuthLoading));

  const handleStore = () => {
    const androidLink =
      'https://play.google.com/store/apps/details?id=com.google.android.apps.authenticator2&hl=en&gl=US';
    const iosLink =
      'https://apps.apple.com/us/app/google-authenticator/id388497605';
    Linking.openURL(IS_IOS ? iosLink : androidLink)
      .then(() => {})
      .catch((err) => console.log(err));
  };

  const hide = () => {
    dispatch(toggleGoogleAuthModal(false));
    dispatch(setGoogleAuth(false));
  };

  const onModalHide = () => {
    setKey('');
  };

  const handleKey = (key) => {
    if (key && /^[0-9]+$/.test(key)) setKey(key);
    else setKey('');

    dispatch({ type: 'SAVE_GENERAL_ERROR', generalError: null });
  };

  const handleCopy = () => copyToClipboard(totpSecretObj?.totpSecretEncoded);

  const right = (
    <View style={styles.row}>
      <View style={styles.smallLine} />
      {googleAuthLoading ? (
        <MaterialIndicator
          color="#6582FD"
          animationDuration={3000}
          size={16}
          style={{ flex: 0 }}
        />
      ) : (
        <PurpleText text="Enable" onPress={enable} />
      )}
    </View>
  );

  const children = (
    <>
      <View style={styles.row}>
        <View style={[styles.flex, styles.justify]}>
          <AppText header style={styles.header}>
            Authentication
          </AppText>
          <AppText body style={styles.secondary}>
            Download App on:
          </AppText>
        </View>

        <TouchableOpacity style={styles.store} onPress={handleStore}>
          {IS_IOS ? <AppStoreIcon /> : <PlayStoreIcon />}
        </TouchableOpacity>
      </View>

      <GeneralError
        style={styles.error}
        show={errorHappenedHere('GoogleAuthModal')}
      />

      <View style={styles.block}>
        <AppText subtext style={styles.subtext}>
          {totpSecretObj.totpSecretEncoded}
        </AppText>
        <View style={styles.line} />
        <TouchableOpacity onPress={handleCopy}>
          <Copy />
        </TouchableOpacity>
      </View>

      <AppInput
        placeholder="Enter Key"
        right={right}
        onChangeText={handleKey}
        value={key}
        keyboardType="numeric"
      />
    </>
  );

  return (
    <AppModal
      children={children}
      bottom
      hide={hide}
      visible={googleAuthModalVisible}
      onModalHide={onModalHide}
    />
  );
}

const styles = StyleSheet.create({
  block: {
    backgroundColor: 'rgba(101, 130, 253, 0.06)',
    flexDirection: 'row',
    paddingVertical: 23,
    paddingHorizontal: 30,
    marginVertical: 27,
    alignItems: 'center',
  },
  error: { marginTop: 25 },
  flex: { flex: 1 },
  justify: { justifyContent: 'space-between' },
  line: {
    backgroundColor: 'rgba(74, 77, 116, 0.4)',
    height: '100%',
    width: 1,
    marginHorizontal: 30,
  },
  smallLine: {
    width: 1,
    backgroundColor: 'rgba(74, 77, 116, 0.4)',
    marginHorizontal: 15,
  },
  row: { flexDirection: 'row' },
  store: {
    height: 45,
    width: 120,
  },
  storeIcon: {
    width: '100%',
    height: '100%',
  },
  header: { color: colors.PRIMARY_TEXT },
  secondary: { color: colors.SECONDARY_TEXT },
  subtext: { color: '#C0C5E0', flex: 1 },
});
