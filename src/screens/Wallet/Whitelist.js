import React, { useEffect } from 'react';
import { Image, Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import Headline from '../../components/TransactionHistory/Headline';
import AppText from '../../components/AppText';
import PurpleText from '../../components/PurpleText';
import WalletCoinsDropdown from '../../components/Wallet/Deposit/WalletCoinsDropdown';
import AddWhitelistModal from '../../components/Wallet/Whitelist/AddWhitelistModal';
import WhitelistActionsModal from '../../components/Wallet/Whitelist/WhitelistActionsModal';
import WhitelistItem from '../../components/Wallet/Whitelist/WhitelistItem';
import colors from '../../constants/colors';
import images from '../../constants/images';
import { toggleAddWhitelistModal } from '../../redux/modals/actions';
import { getWhitelistAction } from '../../redux/wallet/actions';
import SmsEmailAuthModal from '../../components/UserProfile/SmsEmailAuthModal';

export default function Whitelist() {
  const dispatch = useDispatch();
  const state = useSelector((state) => state);
  const {
    transactions: { code },
    wallet: { whitelist, hasWhitelist },
  } = state;

  useEffect(() => {
    dispatch(getWhitelistAction());
  }, [code]);

  const showAddModal = () => dispatch(toggleAddWhitelistModal(true));

  return (
    <View style={{ flex: 1 }}>
      <View style={styles.block}>
        <WalletCoinsDropdown />
        <AppText subtext style={styles.secondary}>
          Add address for easy withdrawal, Some description here about whitelist
        </AppText>
      </View>

      {hasWhitelist ? (
        <>
          <ScrollView contentContainerStyle={styles.scrollView}>
            {whitelist.map((w) => (
              <WhitelistItem
                key={w.id}
                id={w.id}
                name={w.name}
                address={w.address}
                tag={w.tag}
              />
            ))}
          </ScrollView>

          <Pressable style={styles.button} onPress={showAddModal}>
            <PurpleText text="+ " />
            <PurpleText text="Add Address" />
          </Pressable>
        </>
      ) : (
        <View style={styles.flex}>
          <Image source={images.List} />
          <Headline title="My Whitelists" />
          <AppText body style={styles.description}>
            Description here about whitelist, here about whitelist
          </AppText>
          <PurpleText text="+ Add Address" onPress={showAddModal} />
        </View>
      )}

      <WhitelistActionsModal />
      <AddWhitelistModal />
      <SmsEmailAuthModal type="SMS" whitelist />
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
    marginTop: 30,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  block: {
    backgroundColor: colors.SECONDARY_BACKGROUND,
    marginBottom: 12,
    paddingVertical: 22,
    paddingHorizontal: 16,
  },
  description: {
    color: colors.SECONDARY_TEXT,
    textAlign: 'center',
    marginHorizontal: '20%',
    lineHeight: 20,
    marginBottom: 40,
  },
  flex: {
    flex: 1,
    backgroundColor: colors.SECONDARY_BACKGROUND,
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 50,
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
