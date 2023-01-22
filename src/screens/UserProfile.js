import React, { memo, useCallback, useEffect } from 'react';
import {
  Image,
  StyleSheet,
  TouchableOpacity,
  View,
  FlatList,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import * as SecureStore from 'expo-secure-store';
import { useFocusEffect } from '@react-navigation/native';

import AppText from '../components/AppText';
import Background from '../components/Background';
import PurpleText from '../components/PurpleText';
import Headline from '../components/TransactionHistory/Headline';
import Personal from '../components/UserProfile/Personal';
import PersonalSecuritySwitcher from '../components/UserProfile/PersonalSecuritySwitcher';
import Security from '../components/UserProfile/Security';

import {
  fetchUserInfo,
  switchPersonalSecurity,
} from '../redux/profile/actions';
import images from '../constants/images';
import colors from '../constants/colors';
import { logoutUtil } from '../utils/userProfileUtils';

function UserProfile({ navigation, route }) {
  const dispatch = useDispatch();
  const state = useSelector((state) => state);

  const {
    profile: { Personal_Security, userInfo, userProfileLoading },
  } = state;

  useEffect(() => {
    dispatch(fetchUserInfo(route.params?.fromRegistration));
  }, []);

  useFocusEffect(
    useCallback(() => {
      return () => dispatch(switchPersonalSecurity('Personal'));
    }, [])
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
  const onRefresh = () => dispatch(fetchUserInfo());
  const back = () => navigation.goBack();

  const renderItem = () => (
    <>
      {Personal_Security === 'Personal' && (
        <Personal loading={userProfileLoading} />
      )}
      {Personal_Security === 'Security' && (
        <Security loading={userProfileLoading} />
      )}
    </>
  );
  return (
    <Background>
      <View style={styles.topRow}>
        <View style={styles.back}>
          <Image source={images.Back} style={styles.arrow} />
          <PurpleText text="Back" onPress={back} style={styles.purpleText} />
        </View>

        <TouchableOpacity onPress={logout}>
          <Image source={images.Logout} />
        </TouchableOpacity>
      </View>

      <Headline title="My Profile" />
      <AppText style={styles.secondary}>{userInfo?.email}</AppText>

      <PersonalSecuritySwitcher />
      <FlatList
        data={[0]}
        renderItem={renderItem}
        refreshing={userProfileLoading}
        onRefresh={onRefresh}
      />
    </Background>
  );
}

export default memo(UserProfile);

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
  secondary: {
    color: colors.SECONDARY_TEXT,
    marginBottom: 22,
    marginTop: -14,
  },
  topRow: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
