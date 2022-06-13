import React, { useEffect, useState } from 'react';
import { Image, ScrollView, StyleSheet, View, Pressable } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import AppText from '../../components/AppText';
import GeneralError from '../../components/GeneralError';
import PurpleText from '../../components/PurpleText';
import Headline from '../../components/TransactionHistory/Headline';
import WalletCoinsDropdown from '../../components/Wallet/Deposit/WalletCoinsDropdown';
import AddCardModal from '../../components/Wallet/ManageCards/AddCardModal';
import Card from '../../components/Wallet/ManageCards/Card';
import colors from '../../constants/colors';
import images from '../../constants/images';
import { toggleAddCardModal } from '../../redux/modals/actions';
import { fetchCards } from '../../utils/fetchTrades';

export default function ManageCards() {
  const dispatch = useDispatch();
  const state = useSelector((state) => state);
  const {
    profile: { generalError },
    transactions: { code },
  } = state;

  const [cards, setCards] = useState(false);

  useEffect(() => {
    fetchCards({ currency: code })
      .then((cards) => setCards(cards))
      .catch((err) => console.log(err));
  }, []);

  const addCardModal = () => {
    dispatch(toggleAddCardModal(true));
  };

  return (
    <View style={{ flex: 1 }}>
      <View style={styles.block}>
        {generalError ? (
          <View style={{ marginBottom: 16 }}>
            <GeneralError />
          </View>
        ) : null}

        <WalletCoinsDropdown />
      </View>

      {cards.length ? (
        <>
          <ScrollView style={styles.scrollView}>
            {cards.map((c) => (
              <Card
                key={c.id}
                name={c.provider}
                cardNumber={c.cardNumber}
                network={c.network}
                status={c.status}
                id={c.id}
                setCards={setCards}
                cards={cards}
              />
            ))}
          </ScrollView>

          <Pressable style={styles.button} onPress={addCardModal}>
            <PurpleText text="+ " />
            <PurpleText text="Add Card" />
          </Pressable>
        </>
      ) : (
        <View style={styles.flex}>
          <Image source={images.Card} />
          <Headline title="Manage Cards" />
          <AppText body style={styles.description}>
            Add address for easy withdrawal description about whitelist
          </AppText>
          <PurpleText text="+ Add Card" onPress={addCardModal} />
        </View>
      )}

      <AddCardModal />
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
    marginBottom: 40,
  },
  flex: {
    flex: 1,
    backgroundColor: colors.SECONDARY_BACKGROUND,
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 50,
  },
  scrollView: {
    backgroundColor: colors.SECONDARY_BACKGROUND,
    paddingHorizontal: 28,
    paddingVertical: 20,
  },
});
