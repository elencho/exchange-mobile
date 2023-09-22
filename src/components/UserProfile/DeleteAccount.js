import { Linking, Pressable, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import Deactivate from '../../assets/images/Deactivate.svg';
import colors from '../../constants/colors';
import AppText from '../AppText';
import { Trans } from 'react-i18next';

const DEACTIVATE_LINK =
  'https://support.cryptal.com/hc/en-us/articles/360020438540-How-do-I-delete-my-Cryptal-Account-';

const DeleteAccount = () => {
  const handlePress = () => {
    Linking.openURL(DEACTIVATE_LINK);
  };
  return (
    <View style={styles.container}>
      <Deactivate />
      <AppText medium style={styles.text}>
        <Trans
          i18nKey="deactivateAccount"
          defaults="<t>Contact support to</t>  <b>Deactivate Account</b>"
          components={{
            b: <AppText medium style={styles.textSec} onPress={handlePress} />,
            t: <AppText />,
          }}
        />
      </AppText>
    </View>
  );
};

export default DeleteAccount;

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.PRIMARY_BACKGROUND,
    paddingLeft: 5,
    paddingVertical: 14,
    flexDirection: 'row',
    alignItems: 'center',
  },
  text: {
    color: colors.SECONDARY_TEXT,
    marginLeft: 18,
    flex: 1,
    lineHeight: 20,
  },
  textSec: {
    color: colors.LITE_RED,
  },
});
