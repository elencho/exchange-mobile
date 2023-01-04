import React, { useRef } from 'react';
import { Image, ScrollView, StyleSheet, View, Pressable } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import AppText from '../../components/AppText';
import AppWebView from '../../components/AppWebView';
import GeneralError from '../../components/GeneralError';
import PurpleText from '../../components/PurpleText';
import WalletCoinsDropdown from '../../components/Wallet/Deposit/WalletCoinsDropdown';
import AddCardModal from '../../components/Wallet/ManageCards/AddCardModal';
import Card from '../../components/Wallet/ManageCards/Card';
import colors from '../../constants/colors';
import images from '../../constants/images';
import { toggleAddCardModal } from '../../redux/modals/actions';
import StatusModal from '../../components/Wallet/StatusModal';
import DeleteModal from '../../components/Wallet/ManageCards/DeleteModal';
import { MaterialIndicator } from 'react-native-indicators';

export default function ManageCards() {
  const dispatch = useDispatch();
  const state = useSelector((state) => state);
  const {
    modals: { webViewObj },
    wallet: { cardBeingVerified },
    trade: { cards, cardsLoading },
  } = state;

  const scrollRef = useRef();

  const addCardModal = () => dispatch(toggleAddCardModal(true));
  const onContentSizeChange = () => {
    scrollRef.current.scrollTo({ x: 0, y: 3, animated: true });
  };

  return (
    <View style={{ flex: 1 }}>
      <View style={styles.block}>
        {/* <GeneralError style={{ marginBottom: 16 }} /> */}
        <WalletCoinsDropdown />
      </View>

      {cardsLoading && (
        <MaterialIndicator color="#6582FD" animationDuration={3000} />
      )}

      {cards?.length && !cardsLoading ? (
        <>
          <ScrollView
            style={styles.scrollView}
            contentContainerStyle={{
              paddingVertical: 20,
            }}
            nestedScrollEnabled
            onContentSizeChange={onContentSizeChange}
            ref={scrollRef}
          >
            {cards?.map((c) => (
              <Card key={c.id} card={c} />
            ))}
            {/* Code below for testing purposes only */}
            {/* {[1, 2, 3, 4, 5, 6, 7].map((c) => (
              <Card key={c} />
            ))} */}
            <DeleteModal type="card" />
          </ScrollView>

          {cards?.length ? (
            <Pressable style={styles.button} onPress={addCardModal}>
              <PurpleText text="+ " />
              <PurpleText text="Add Card" />
            </Pressable>
          ) : null}
        </>
      ) : null}

      {!cards?.length && !cardsLoading && (
        <View style={styles.flex}>
          <Image source={images.Card} />
          <AppText body style={styles.description}>
            Manage cards info text
          </AppText>
          <PurpleText text="+ Add Card" onPress={addCardModal} />
        </View>
      )}

      <AddCardModal />
      <StatusModal cards />

      {cardBeingVerified && <AppWebView cards source={{ html: webViewObj }} />}
    </View>
  );
}

const styles = StyleSheet.create({
  block: {
    backgroundColor: colors.SECONDARY_BACKGROUND,
    marginBottom: 12,
    paddingVertical: 22,
    paddingHorizontal: 16,
  },
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
  description: {
    color: colors.SECONDARY_TEXT,
    textAlign: 'center',
    marginHorizontal: '20%',
    lineHeight: 20,
    marginTop: 18,
    marginBottom: 45,
  },
  flex: {
    backgroundColor: colors.SECONDARY_BACKGROUND,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollView: {
    backgroundColor: colors.SECONDARY_BACKGROUND,
    paddingHorizontal: 28,
    // paddingVertical: 20,
  },
});
