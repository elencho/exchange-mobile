import React, { memo, useCallback, useEffect, useState } from 'react';
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
import Back from '../assets/images/Back';
import Logout from '../assets/images/User_profile/Logout';

import {
  fetchUserInfo,
  switchPersonalSecurity,
} from '../redux/profile/actions';
import { clearFilters } from '../redux/transactions/actions';

import images from '../constants/images';
import colors from '../constants/colors';
import { logout } from '../utils/userProfileUtils';
import CustomRefreshContol from '../components/CustomRefreshContol';

function UserProfile({ navigation, route }) {
  const dispatch = useDispatch();
  const state = useSelector((state) => state);
  const [showRefreshControl, setShowRefreshControl] = useState(false);

  const {
    profile: { Personal_Security, userInfo, userProfileLoading },
  } = state;

  useEffect(() => {
    dispatch(fetchUserInfo(route.params?.fromRegistration));
    const timer = setTimeout(() => {
      setShowRefreshControl(true);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  useFocusEffect(
    useCallback(() => {
      return () => dispatch(switchPersonalSecurity('Personal'));
    }, [])
  );

  const onRefresh = () => dispatch(fetchUserInfo());
  const back = () => {
    clear();
    navigation.navigate('Main', { screen: route.params?.sourceScreenName });
  };

  const clear = () => {
    dispatch(clearFilters());
    dispatch({ type: 'REFRESH_TRANSACTIONS_ACTION' });
  };

  const onScroll = (event) => {
    const { y } = event.nativeEvent.contentOffset;
    if (y > 0) {
      setShowRefreshControl(true);
    }
  };
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
        <TouchableOpacity onPress={back} style={styles.back}>
          <Back style={styles.arrow} />
          <PurpleText text="Back" style={styles.purpleText} />
        </TouchableOpacity>

        <TouchableOpacity onPress={logout}>
          <Logout />
        </TouchableOpacity>
      </View>

      <Headline title="My Profile" />
      <AppText style={styles.secondary}>{userInfo?.email}</AppText>

      <PersonalSecuritySwitcher />
      <FlatList
        data={[0]}
        renderItem={renderItem}
        onScroll={onScroll}
        showsVerticalScrollIndicator={false}
        refreshControl={
          showRefreshControl ? (
            <CustomRefreshContol
              refreshing={userProfileLoading}
              onRefresh={onRefresh}
            />
          ) : null
        }
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
    padding: 5,
    marginLeft: -5,
    marginTop: 5,
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
