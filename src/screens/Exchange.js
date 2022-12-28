import { StyleSheet, Text, View, ImageBackground, Linking } from 'react-native';
import React from 'react';
import images from '../constants/images';
import colors from '../constants/colors';
import Logo from '../assets/images/Logo';
import Rocket from '../assets/images/Rocket';
import AppText from '../components/AppText';
import Pressable from 'react-native/Libraries/Components/Pressable/Pressable';

const Exchange = () => {
  const handlePress = () => Linking.openURL('https://cryptal.com/ex');

  return (
    <ImageBackground source={images.Stars} style={styles.background}>
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
    </ImageBackground>
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
