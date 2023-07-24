import React from 'react';
import { StyleSheet, View, Linking, Pressable } from 'react-native';

import Logo from '../assets/images/Logo';
import Rocket from '../assets/images/Rocket';
import AppText from '../components/AppText';

import colors from '../constants/colors';
import TopRow from '../components/TransactionHistory/TopRow';
import Headline from '../components/TransactionHistory/Headline';
import Background from '../components/Background';

const Exchange = () => {
  const handlePress = () => Linking.openURL('https://cryptal.com/ex');

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
  rocket: {
    marginTop: 130,
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
  },
});
