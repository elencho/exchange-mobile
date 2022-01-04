import React from 'react';
import { Image, StyleSheet, View } from 'react-native';
import { useSelector } from 'react-redux';

import Background from '../components/Background';
import PurpleText from '../components/PurpleText';
import Headline from '../components/TransactionHistory/Headline';
import Personal from '../components/UserProfile/Personal';
import PersonalSecuritySwitcher from '../components/UserProfile/PersonalSecuritySwitcher';
import Security from '../components/UserProfile/Security';
import images from '../constants/images';

export default function UserProfile() {
  const state = useSelector((state) => state.profile);

  const { Personal_Security } = state;

  return (
    <Background>
      <View style={styles.back}>
        <Image source={images.Back} style={styles.arrow} />
        <PurpleText text="Back to Home" style={styles.purpleText} />
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
    marginBottom: 10,
  },
  purpleText: {
    marginHorizontal: 10,
  },
});
