import React from 'react';
import { Pressable, ScrollView, StyleSheet, View } from 'react-native';
import AppText from '../../components/AppText';
import PurpleText from '../../components/PurpleText';

import WalletCoinsDropdown from '../../components/Wallet/Deposit/WalletCoinsDropdown';
import WhitelistItem from '../../components/Wallet/Whitelist/WhitelistItem';
import colors from '../../constants/colors';

export default function Whitelist() {
  return (
    <View style={{ flex: 1 }}>
      <View style={styles.block}>
        <WalletCoinsDropdown />
        <AppText subtext style={styles.secondary}>
          Add address for easy withdrawal, Some description here about whitelist
        </AppText>
      </View>

      <ScrollView contentContainerStyle={styles.scrollView}>
        <WhitelistItem />
        <WhitelistItem />
        <WhitelistItem />
        <WhitelistItem />
      </ScrollView>

      <Pressable style={styles.button}>
        <PurpleText text="+ " />
        <PurpleText text="Add Address" />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    borderWidth: 1,
    borderRadius: 1,
    borderStyle: 'dashed',
    height: 45,
    borderColor: colors.SECONDARY_PURPLE,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  block: {
    backgroundColor: colors.SECONDARY_BACKGROUND,
    paddingVertical: 22,
    paddingHorizontal: 16,
    marginBottom: 12,
  },
  secondary: {
    color: colors.SECONDARY_TEXT,
    marginTop: 15,
    lineHeight: 20,
  },
  secondaryPurple: {
    color: colors.SECONDARY_PURPLE,
  },
  scrollView: {
    backgroundColor: colors.SECONDARY_BACKGROUND,
    paddingHorizontal: 28,
    paddingVertical: 20,
  },
});
