import React, { useRef } from 'react';
import { ScrollView, StyleSheet, View, Pressable } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import AppText from '../../components/AppText';
import AppWebView from '../../components/AppWebView';
import PurpleText from '../../components/PurpleText';
import WalletCoinsDropdown from '../../components/Wallet/Deposit/WalletCoinsDropdown';
import AddCardModal from '../../components/Wallet/ManageCards/AddCardModal';
import Card from '../../components/Wallet/ManageCards/Card';
import StatusModal from '../../components/Wallet/StatusModal';
import DeleteModal from '../../components/Wallet/ManageCards/DeleteModal';
import CardIcon from '../../assets/images/Wallet/CardIcon';

import colors from '../../constants/colors';
import { toggleAddCardModal } from '../../redux/modals/actions';
import { MaterialIndicator } from 'react-native-indicators';

export default function ManageCards({ refreshControl }) {
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
    <View style={{ flex: 1, paddingTop: 18, paddingTop: 10 }}>
      <WalletCoinsDropdown />

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
            refreshControl={refreshControl}
          >
            {cards?.map((c) => (
              <Card key={c.id} card={c} />
            ))}

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
          <CardIcon />
          <AppText body style={styles.description}>
            Manage cards info text
          </AppText>
          <PurpleText text="+ Add Card" onPress={addCardModal} />
        </View>
      )}

      <AddCardModal />
      <StatusModal cards />

      {cardBeingVerified && (
        <AppWebView verifyCards source={{ html: webViewObj }} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  block: {
    marginBottom: 12,
    paddingVertical: 22,
  },
  button: {
    borderWidth: 1,
    borderRadius: 1,
    borderStyle: 'dashed',
    height: 45,
    borderColor: colors.SECONDARY_PURPLE,
    marginTop: 10,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    marginBottom: 30,
  },
  description: {
    color: colors.SECONDARY_TEXT,
    textAlign: 'center',
    lineHeight: 20,
    marginTop: 18,
    marginBottom: 45,
  },
  flex: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
