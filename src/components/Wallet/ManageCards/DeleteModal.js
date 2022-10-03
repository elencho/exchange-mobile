import React from 'react';
import { Image, StyleSheet, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import AppModal from '../../AppModal';
import AppText from '../../AppText';
import AppButton from '../../AppButton';
import PurpleText from '../../PurpleText';
import GeneralError from '../../GeneralError';

import { setDeleteModalInfo } from '../../../redux/modals/actions';
import { deleteCard } from '../../../utils/walletUtils';
import { saveCards } from '../../../redux/trade/actions';
import colors from '../../../constants/colors';
import images from '../../../constants/images';
import { deleteTemplatesAction } from '../../../redux/wallet/actions';

export default function DeleteModal({ type }) {
  const dispatch = useDispatch();
  const state = useSelector((state) => state);
  const {
    modals: { deleteModalInfo },
    trade: { cards },
  } = state;

  const hide = () => dispatch(setDeleteModalInfo({}));

  const id = deleteModalInfo?.id;
  const visible = deleteModalInfo?.visible;

  const handleDelete = async () => {
    if (type === 'card') {
      const status = await deleteCard(id);
      if (status >= 200 || status < 300) {
        const updatedCards = cards.filter((c) => c.id !== id);
        dispatch(saveCards(updatedCards));
        hide();
      }
    }

    if (type === 'template') {
      dispatch(deleteTemplatesAction(id));
    }
  };

  const children = (
    <View style={styles.container}>
      <Image source={images.Delete_Card} style={{ marginVertical: 20 }} />

      <AppText header style={styles.white}>
        Delete {type}
      </AppText>

      <GeneralError style={{ marginTop: 15 }} />

      <AppText style={styles.secondary}>
        Are you sure you want to delete this {type}?
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