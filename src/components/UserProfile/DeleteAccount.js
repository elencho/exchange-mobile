import { Linking, Pressable, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import Deactivate from '../../assets/images/Deactivate.svg';
import colors from '../../constants/colors';
import AppText from '../AppText';

const DEACTIVATE_LINK = 'https://support.cryptal.com/hc/en-us/requests/new';

const DeleteAccount = () => {
  const handlePress = () => {
    Linking.openURL(DEACTIVATE_LINK);
  };
  return (
    <View style={styles.container}>
      <Deactivate />
      <AppText medium style={styles.text}>
        Contact Support to
      </AppText>
      <Pressable onPress={handlePress}>
        <AppText medium style={styles.textSec}>
          {' '}
          Deactivate Account
        </AppText>
      </Pressable>
    </View>
  );
};

export default DeleteAccount;

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.SECONDARY_BACKGROUND,
    paddingLeft: 24,
    paddingVertical: 14,
    flexDirection: 'row',
  },
  text: {
    color: colors.SECONDARY_TEXT,
    marginLeft: 18,
  },
  textSec: {
    color: colors.LITE_RED,
  },
});
