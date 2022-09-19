import React, { useEffect, useState } from 'react';
import { Image, Pressable, StyleSheet, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { ICONS_URL_PNG } from '../../constants/api';

import colors from '../../constants/colors';
import { toggleChooseCardModal } from '../../redux/modals/actions';
import { setCard } from '../../redux/trade/actions';
import AppModal from '../AppModal';
import AppText from '../AppText';

export default function ChooseCardModal() {
  const dispatch = useDispatch();
  const chooseCardModalVisible = useSelector(
    (state) => state.modals.chooseCardModalVisible
  );
  const state = useSelector((state) => state.trade);

  const { card, cards, depositProvider, cardsToDisplayInModal } = state;

  useEffect(() => {
    let cardsToDisplayInModal = [];
    cards?.forEach((c) => {
      if (c.provider === depositProvider && c.status === 'VERIFIED') {
        cardsToDisplayInModal.push(c);
      }
    });
    dispatch({ type: 'SET_CARDS_TO_DISPLAY_IN_MODAL', cardsToDisplayInModal });

    return () =>
      dispatch({
        type: 'SET_CARDS_TO_DISPLAY_IN_MODAL',
        cardsToDisplayInModal: [],
      });
  }, [depositProvider]);

  const hide = () => {
    dispatch(toggleChooseCardModal(false));
  };

  const choose = (c) => {
    dispatch(setCard(c));
    hide();
  };

  const background = (c) => {
    if (card && c.id === card.id) {
      return { backgroundColor: 'rgba(101, 130, 253, 0.16)' };
    }
  };

  const children = cardsToDisplayInModal.map((c) => (
    <Pressable
      style={[styles.row, background(c)]}
      key={c.cardNumber}
      onPress={() => choose(c)}
    >
      <View style={styles.iconContainer}>
        <Image
          source={{ uri: `${ICONS_URL_PNG}/${c.network}.png` }}
          style={{ width: '100%', height: '100%' }}
        />
      </View>
      <AppText body style={styles.text}>
        {c.cardNumber}
      </AppText>
    </Pressable>
  ));

  return (
    <AppModal
      visible={chooseCardModalVisible}
      hide={hide}
      title="Choose Card"
      bottom
      children={children}
    />
  );
}

const styles = StyleSheet.create({
  iconContainer: {
    width: 35,
    height: 25,
    backgroundColor: 'rgba(146, 142, 186, 0.16)',
    borderRadius: 3,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 20,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 5,
    marginLeft: -15,
  },
  text: {
    color: colors.PRIMARY_TEXT,
  },
});
