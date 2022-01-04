import React from 'react';
import {
  Image,
  Pressable,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';

import Background from '../components/Background';
import PurpleText from '../components/PurpleText';
import Headline from '../components/TransactionHistory/Headline';
import Personal from '../components/UserProfile/Personal';
import PersonalSecuritySwitcher from '../components/UserProfile/PersonalSecuritySwitcher';
import images from '../constants/images';

export default function UserProfile() {
  return (
    <Background>
      <View style={styles.back}>
        <Image source={images.Back} style={styles.arrow} />
        <PurpleText text="Back to Home" style={styles.purpleText} />
      </View>

      <Headline title="My Profile" />

      <PersonalSecuritySwitcher />

      <Personal />
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
