import React from 'react';
import { StyleSheet, View, Linking, Pressable } from 'react-native';
import * as SecureStore from 'expo-secure-store';

import Rocket from '../assets/images/Rocket';
import AppText from '../components/AppText';

import colors from '../constants/colors';
import TopRow from '../components/TransactionHistory/TopRow';
import Background from '../components/Background';
import { exchangeUtil } from '../utils/userProfileUtils';

const Exchange = () => {
  const handlePress = async () => {
    const refresh_token = await SecureStore.getItemAsync('refreshToken');
    const data = await exchangeUtil(refresh_token);
    Linking.openURL(data?.redirectUri);
  };

  return (
    <Background>
      <TopRow />
      <View style={styles.wrapper}>
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
    </Background>
  );
};

export default Exchange;

const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: colors.PRIMARY_BACKGROUND,
    paddingHorizontal: 16,
  },
  mainText: {
    color: colors.PRIMARY_TEXT,
    marginTop: 12,
  },
  secText: {
    color: '#838BB2',
    marginTop: 10,
  },

  btn: {
    marginTop: 40,
  },
  web: {
    color: colors.SECONDARY_PURPLE,
  },
  headRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  wrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
});
