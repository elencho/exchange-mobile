import React from 'react';
import { Pressable, ScrollView, StyleSheet, View } from 'react-native';
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
            {hasWhitelist && (
              <AppText subtext style={styles.secondary}>
                Add address for easy withdrawal, Some description here about
                whitelist
              </AppText>
            )}
          </View>

          {hasWhitelist ? (
            <>
              <ScrollView
                style={styles.scrollView}
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
          <SmsEmailAuthModal whitelist type="E-mail" />
          <SmsEmailAuthModal whitelist type="SMS" />
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
    backgroundColor: colors.PRIMARY_BACKGROUND,
    marginBottom: 12,
    paddingTop: 22,
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
    backgroundColor: colors.PRIMARY_BACKGROUND,
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 50,
  },
  list: {
    marginBottom: 18,
  },
  secondary: {
    color: '#969CBF',
    marginTop: 15,
    lineHeight: 18,
    paddingHorizontal: 26,
    paddingVertical: 14,
    backgroundColor: 'rgba(149, 164, 247, 0.1)',
  },
  secondaryPurple: {
    color: colors.SECONDARY_PURPLE,
  },
  scrollView: {
    backgroundColor: colors.PRIMARY_BACKGROUND,
  },
});
