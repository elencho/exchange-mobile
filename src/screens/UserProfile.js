import React from 'react';
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import * as SecureStore from 'expo-secure-store';

import Background from '../components/Background';
import PurpleText from '../components/PurpleText';
import Headline from '../components/TransactionHistory/Headline';
import Personal from '../components/UserProfile/Personal';
import PersonalSecuritySwitcher from '../components/UserProfile/PersonalSecuritySwitcher';
import Security from '../components/UserProfile/Security';
import images from '../constants/images';
import { logoutUtil } from '../utils/userProfileUtils';

export default function UserProfile({ navigation }) {
  const dispatch = useDispatch();
  const Personal_Security = useSelector(
    (state) => state.profile.Personal_Security
  );

  const logout = async () => {
    const refresh_token = await SecureStore.getItemAsync('refreshToken');
    const status = await logoutUtil(refresh_token);
    // if (status === 204) {
    await SecureStore.deleteItemAsync('accessToken');
    await SecureStore.deleteItemAsync('refreshToken');
    await SecureStore.deleteItemAsync('language');
    navigation.navigate('Welcome');

    dispatch({ type: 'LOGOUT' });
    // }
  };

  return (
    <Background>
      <View style={styles.topRow}>
        <View style={styles.back}>
          <Image source={images.Back} style={styles.arrow} />
          <PurpleText
            text="Back"
            onPress={() => navigation.goBack()}
            style={styles.purpleText}
          />
        </View>

        <TouchableOpacity onPress={logout}>
          <Image source={images.Logout} />
        </TouchableOpacity>
      </View>

      <Headline title="My Profile" />

      <PersonalSecuritySwitcher />

      {Personal_Security === 'Personal' && <Personal />}
      {Personal_Security === 'Security' && <Security />}
    </Background>
  );
}

const styles = StyleSheet.create({
  arrow: {
    marginTop: 2,
  },
  back: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  purpleText: {
    marginHorizontal: 10,
  },
  topRow: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
