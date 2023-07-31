import React from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useSelector } from 'react-redux';

import colors from '../../constants/colors';
import AppText from '../AppText';
import Headline from './Headline';

function TopRow({ clear, headlineLogo }) {
  const navigation = useNavigation();
  const route = useRoute();

  const userInfo = useSelector((state) => state.profile.userInfo);
  const { firstName, lastName } = userInfo;

  const initials = () => {
    if (firstName && lastName) {
      return `${firstName[0]} ${lastName[0]}`;
    } else {
      return '';
    }
  };

  const navigate = () => {
    navigation.navigate('UserProfile', { sourceScreenName: route.name });
    clear && clear();
  };

  const getDisplayText = (routeName) => {
    switch (routeName) {
      case 'Transactions':
        return 'Transaction History';
      case 'Wallet':
        return 'My Wallet';
      case 'Trade':
        return 'Instant Trade';
      case 'Exchange':
        return 'Exchange';
      default:
        return '';
    }
  };

  const title = getDisplayText(route.name);

  return (
    <View style={styles.topRow}>
      <View style={styles.flexRow}>
        <Headline title={title} />
        {headlineLogo ? headlineLogo : null}
      </View>

      <Pressable style={styles.profile} onPress={navigate}>
        <AppText medium style={styles.text}>
          {initials()}
        </AppText>
        <View style={styles.dot} />
      </Pressable>
    </View>
  );
}

export default TopRow;

const styles = StyleSheet.create({
  dot: {
    position: 'absolute',
    right: 0,
    top: 0,
    width: 13,
    height: 13,
    borderWidth: 4,
    borderRadius: 2,
    borderColor: colors.PRIMARY_BACKGROUND,
    backgroundColor: '#21E0A5',
    marginTop: -2,
    marginRight: -2,
  },
  logo: {
    width: 30,
    height: 30,
    resizeMode: 'contain',
  },
  profile: {
    backgroundColor: '#323753',
    borderRadius: 20,
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    zIndex: 99,
    marginBottom: 28,
  },
  text: {
    color: colors.PRIMARY_TEXT,
    fontSize: 15,
    lineHeight: 19,
  },
  flexRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
});
