import React from 'react';
import { Image, StyleSheet, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import AppModal from '../../AppModal';
import AppText from '../../AppText';
import AppButton from '../../AppButton';
import PurpleText from '../../PurpleText';
import GeneralError from '../../GeneralError';

import { setCardDeleteModalInfo } from '../../../redux/modals/actions';
import { deleteCard } from '../../../utils/walletUtils';
import { saveCards } from '../../../redux/trade/actions';
import colors from '../../../constants/colors';
import images from '../../../constants/images';

export default function DeleteCardModal() {
  const dispatch = useDispatch();
  const state = useSelector((state) => state);
  const {
    modals: { cardDeleteModalInfo },
    trade: { cards },
  } = state;

  const hide = () => {
    dispatch(setCardDeleteModalInfo({}));
    dispatch({ type: 'SAVE_GENERAL_ERROR', generalError: null });
  };

  const id = cardDeleteModalInfo?.id;
  const visible = cardDeleteModalInfo?.visible;

  const handleDelete = async () => {
    const status = await deleteCard(id);
    if (status >= 200 || status < 300) {
      const updatedCards = cards.filter((c) => c.id !== id);
      dispatch(saveCards(updatedCards));
      hide();
    }
  };

  const children = (
    <View style={styles.container}>
      <Image source={images.Delete_Card} style={{ marginVertical: 20 }} />

      <AppText header style={styles.white}>
        Delete Card
      </AppText>

      <GeneralError style={{ marginTop: 15 }} />

      <AppText style={styles.secondary}>
        Are you sure you want to delete this card?
      </AppText>

      <AppButton text="Delete" onPress={handleDelete} style={styles.button} />
      <PurpleText text="Cancel" onPress={hide} />
    </View>
  );

  return <AppModal children={children} hide={hide} bottom visible={visible} />;
}

const styles = StyleSheet.create({
  button: {
    marginBottom: 27,
    marginTop: 33,
    width: '100%',
  },
  container: {
    alignItems: 'center',
    paddingHorizontal: '20%',
  },
  secondary: {
    textAlign: 'center',
    color: colors.SECONDARY_TEXT,
    marginTop: 12,
  },
  white: {
    textAlign: 'center',
    color: colors.PRIMARY_TEXT,
  },
});
