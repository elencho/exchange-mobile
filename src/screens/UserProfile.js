import React, { useEffect } from 'react';
import { Image, StyleSheet, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import Background from '../components/Background';
import PurpleText from '../components/PurpleText';
import Headline from '../components/TransactionHistory/Headline';
import Personal from '../components/UserProfile/Personal';
import PersonalSecuritySwitcher from '../components/UserProfile/PersonalSecuritySwitcher';
import Security from '../components/UserProfile/Security';
import images from '../constants/images';
import { fetchUserInfo } from '../redux/profile/actions';

export default function UserProfile() {
  const dispatch = useDispatch();
  const state = useSelector((state) => state.profile);

  const { Personal_Security, userInfo } = state;

  useEffect(() => {
    dispatch(fetchUserInfo());
    console.log(userInfo);
  }, []);

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
