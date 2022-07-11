import React from 'react';
import { Image, StyleSheet, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import AppModal from '../../AppModal';
import AppText from '../../AppText';
import colors from '../../../constants/colors';
import images from '../../../constants/images';
import { setCardAddStatusModalInfo } from '../../../redux/modals/actions';

export default function CardAddStatusModal() {
  const dispatch = useDispatch();
  const state = useSelector((state) => state);
  const {
    modals: { cardAddStatusModalInfo },
  } = state;

  const hide = () => dispatch(setCardAddStatusModalInfo({}));

  const image =
    cardAddStatusModalInfo?.success === 'true' ? 'Card_Success' : 'Card_Error';
  const text = `card add header ${cardAddStatusModalInfo?.success}`;
  const subtext = `card add subtext ${cardAddStatusModalInfo?.success}`;
  const visible = cardAddStatusModalInfo?.visible;

  const children = (
    <View style={styles.container}>
      <Image source={images[image]} style={{ marginVertical: 30 }} />

      <AppText header style={styles.white}>
        {text}
      </AppText>
      <AppText subtext style={styles.secondary}>
        {subtext}
      </AppText>
    </View>
  );

  return <AppModal children={children} hide={hide} bottom visible={visible} />;
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
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
