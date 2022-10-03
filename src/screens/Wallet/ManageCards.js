import React, { useEffect } from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  View,
  Pressable,
  ActivityIndicator,
} from 'react-native';
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
import CardAddStatusModal from '../../components/Wallet/ManageCards/CardAddStatusModal';
import DeleteModal from '../../components/Wallet/ManageCards/DeleteModal';
import { cardsSagaAction } from '../../redux/trade/actions';

export default function ManageCards() {
  const dispatch = useDispatch();
  const state = useSelector((state) => state);
  const {
    transactions: { code },
    modals: { webViewObj },
    trade: { cards, cardsLoading },
  } = state;

  useEffect(() => {
    dispatch(cardsSagaAction());
  }, [code]);

  const addCardModal = () => dispatch(toggleAddCardModal(true));

  return (
    <View style={{ flex: 1 }}>
      <View style={styles.block}>
        <GeneralError style={{ marginBottom: 16 }} />
        <WalletCoinsDropdown />
      </View>

      {cardsLoading && (
        <ActivityIndicator size="large" color="white" style={{ flex: 1 }} />
      )}

      {cards?.length && !cardsLoading ? (
        <>
          <ScrollView
            style={styles.scrollView}
            contentContainerStyle={{
              paddingVertical: 20,
            }}
            nestedScrollEnabled
          >
            {cards?.map((c) => (
              <Card
                key={c.id}
                name={c.provider}
                cardNumber={c.cardNumber}
                network={c.network}
                status={c.status}
                id={c.id}
              />
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
          <Image source={images.Card} />
          <AppText body style={styles.description}>
            Manage cards info text
          </AppText>
          <PurpleText text="+ Add Card" onPress={addCardModal} />
        </View>
      )}

      <AddCardModal />
      <CardAddStatusModal />

      <AppWebView refresh source={{ html: webViewObj }} />
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
