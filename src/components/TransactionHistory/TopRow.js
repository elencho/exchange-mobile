import React from 'react';
import { Image, Pressable, StyleSheet, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';

import colors from '../../constants/colors';
import Logo from '../../assets/images/Logo.svg';
import AppText from '../AppText';

function TopRow() {
  const navigation = useNavigation();

  const userInfo = useSelector((state) => state.profile.userInfo);
  const { firstName, lastName } = userInfo;

  const initials = () => {
    if (userInfo.firstName && userInfo.lastName) {
      return `${firstName[0]} ${lastName[0]}`;
    } else {
      return `ME`;
    }
  };

  return (
    <View style={styles.topRow}>
      <Logo style={styles.logo} />
      <Pressable
        style={styles.profile}
        onPress={() => navigation.navigate('UserProfile')}
      >
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
  },
  text: {
    color: colors.PRIMARY_TEXT,
    fontSize: 15,
  },
});
