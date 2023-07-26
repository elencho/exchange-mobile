import React from 'react';
import { StyleSheet, View, Linking, Pressable } from 'react-native';
import * as SecureStore from 'expo-secure-store';

import Logo from '../assets/images/Logo';
import Rocket from '../assets/images/Rocket';
import AppText from '../components/AppText';

import colors from '../constants/colors';
import { exchangeUtil } from '../utils/userProfileUtils';

const Exchange = () => {
  const handlePress = async () => {
    const refresh_token = await SecureStore.getItemAsync('refreshToken');
    const data = await exchangeUtil(refresh_token);
    Linking.openURL(data?.redirectUri);
  };

  return (
    <View style={styles.background}>
      <Logo />
      <Rocket style={styles.rocket} />
      <AppText header style={styles.mainText}>
        Coming Soon...
      </AppText>
      <AppText body style={styles.secText}>
        Exchange page coming soon
      </AppText>
      <Pressable style={styles.btn} onPress={handlePress}>
        <AppText medium style={styles.web}>
          Exchange on WEB
        </AppText>
      </Pressable>
    </View>
  );
};

export default Exchange;

const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: colors.PRIMARY_BACKGROUND,
    alignItems: 'center',
    paddingTop: 30,
  },
  mainText: {
    color: colors.PRIMARY_TEXT,
    marginTop: 12,
  },
  secText: {
    color: '#838BB2',
    marginTop: 10,
  },
  rocket: {
    marginTop: 130,
  },
  btn: {
    marginTop: 40,
  },
  web: {
    color: colors.SECONDARY_PURPLE,
  },
});
