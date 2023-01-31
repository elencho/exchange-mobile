import React from 'react';
import { Image, Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { MaterialIndicator } from 'react-native-indicators';

import AppText from '../../components/AppText';
import PurpleText from '../../components/PurpleText';
import WalletCoinsDropdown from '../../components/Wallet/Deposit/WalletCoinsDropdown';
import AddEditWhitelistModal from '../../components/Wallet/Whitelist/AddEditWhitelistModal';
import WhitelistActionsModal from '../../components/Wallet/Whitelist/WhitelistActionsModal';
import WhitelistItem from '../../components/Wallet/Whitelist/WhitelistItem';
import GoogleOtpModal from '../../components/UserProfile/GoogleOtpModal';
import List from '../../assets/images/List.svg';

import colors from '../../constants/colors';
import { toggleAddWhitelistModal } from '../../redux/modals/actions';
import SmsEmailAuthModal from '../../components/UserProfile/SmsEmailAuthModal';

export default function Whitelist({ refreshControl }) {
  const dispatch = useDispatch();
  const state = useSelector((state) => state);
  const {
    wallet: { whitelist, hasWhitelist, whitelistLoading },
    transactions: { loading },
  } = state;

  const showAddModal = () => dispatch(toggleAddWhitelistModal(true));

  return (
    <>
      {loading || whitelistLoading ? (
        <MaterialIndicator color="#6582FD" animationDuration={3000} />
      ) : (
        <View style={{ flex: 1 }}>
          <View style={styles.block}>
            <WalletCoinsDropdown />
            <AppText subtext style={styles.secondary}>
              Add address for easy withdrawal, Some description here about
              whitelist
            </AppText>
          </View>

          {hasWhitelist ? (
            <>
              <ScrollView
                style={styles.scrollView}
                contentContainerStyle={styles.scrollContent}
                refreshControl={refreshControl}
              >
                {whitelist?.map((w) => (
                  <WhitelistItem key={w.id} whitelistItem={w} />
                ))}
              </ScrollView>

              <Pressable style={styles.button} onPress={showAddModal}>
                <PurpleText text="+ " />
                <PurpleText text="Add Address" />
              </Pressable>
            </>
          ) : (
            <View style={styles.flex}>
              <View style={styles.list}>
                <List />
              </View>

              <AppText body style={styles.description}>
                Description here about whitelist
              </AppText>
              <PurpleText text="+ Add Address" onPress={showAddModal} />
            </View>
          )}

          <WhitelistActionsModal />
          <AddEditWhitelistModal add />
          <AddEditWhitelistModal edit />

          <GoogleOtpModal whitelist />
          <SmsEmailAuthModal whitelist />
        </View>
      )}
    </>
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
  list: {
    marginBottom: 18,
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
  },
  scrollContent: {
    paddingHorizontal: 28,
    paddingVertical: 20,
  },
});
