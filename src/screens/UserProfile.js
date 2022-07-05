import React, { useState } from 'react';
import {
  Button,
  Image,
  RefreshControl,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import * as SecureStore from 'expo-secure-store';

import Test from '../screens/Test';
import Background from '../components/Background';
import AppWebView from '../components/AppWebView';
import PurpleText from '../components/PurpleText';
import Headline from '../components/TransactionHistory/Headline';
import Personal from '../components/UserProfile/Personal';
import PersonalSecuritySwitcher from '../components/UserProfile/PersonalSecuritySwitcher';
import Security from '../components/UserProfile/Security';
import images from '../constants/images';
import { cardVerificationToken, logoutUtil } from '../utils/userProfileUtils';
import { fetchUserInfo } from '../redux/profile/actions';
import colors from '../constants/colors';
import sumsubHtmlPattern from '../constants/sumsubHtml.js';

export default function UserProfile({ navigation }) {
  const dispatch = useDispatch();
  const state = useSelector((state) => state);

  const [sumsubWebViewHtml, setSumsubWebViewHtml] = useState(false);

  const {
    profile: { Personal_Security },
    transactions: { loading },
  } = state;

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

  const handlesumsubWebView = async () => {
    const token = await cardVerificationToken();
    if (token) setSumsubWebViewHtml(sumsubHtmlPattern(token));
  };

  const handleUrlChange = (state) => {
    // console.log(state);
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

      <Button title="Open sumsub Webview" onPress={handlesumsubWebView} />

      <ScrollView
        refreshControl={
          <RefreshControl
            tintColor={colors.PRIMARY_PURPLE}
            refreshing={loading}
            onRefresh={onRefresh}
          />
        }
      >
        {Personal_Security === 'Personal' && <Personal />}
        {Personal_Security === 'Security' && <Security />}
      </ScrollView>

      {sumsubWebViewHtml && (
        <AppWebView
          handleUrlChange={handleUrlChange}
          source={{ html: sumsubWebViewHtml }}
        />
      )}
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
