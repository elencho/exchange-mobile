import React from 'react';
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import { useDispatch } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { t } from 'i18next';

import AppText from '../../AppText';
import PurpleText from '../../PurpleText';
import colors from '../../../constants/colors';
import images from '../../../constants/images';
import { ICONS_URL_PNG } from '../../../constants/api';
import { setDeleteModalInfo } from '../../../redux/modals/actions';
import FastImage from 'react-native-fast-image';

export default function Card({ card }) {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const { provider, cardNumber, network, status, id, expired } = card;

  const toVerify = (text, purple) => (
    <>
      <AppText style={styles.verified}>
        {t(text)}{' '}
        <PurpleText
          text={t(purple)}
          onPress={() => navigation.navigate('CardVerificationOne', { id })}
        />
      </AppText>
    </>
  );

  const notToVerify = (text) => (
    <AppText style={styles.verified}>{text}</AppText>
  );

  const textCond = () => {
    if (expired) {
      return notToVerify('Card Expired');
    }
    if (status === 'VERIFIED' || status === 'BANNED') {
      return notToVerify(`Card ${status}`);
    }
    if (status === 'UNVERIFIED') {
      return toVerify('Not Verified', 'Verify');
    }
    if (status === 'FAILED') {
      return toVerify('Failed', 'Retry');
    }
  };

  const imageCond = () => {
    if (expired) return images.Card_Expired;
    if (status === 'VERIFIED') return images.Verified;
    if (status === 'UNVERIFIED') return images.Info;
    if (status === 'BANNED' || status === 'FAILED') return images.Card_Error;
  };

  const openModal = () => dispatch(setDeleteModalInfo({ id, visible: true }));

  return (
    <View style={styles.container}>
      <FastImage
        source={{ uri: `${ICONS_URL_PNG}/${provider}.png` }}
        style={styles.image}
      />

      <View style={styles.block}>
        <AppText medium style={styles.primary}>
          {t('Provider:')} {provider}
        </AppText>
        <AppText subtext style={styles.secondary}>
          {cardNumber} / {network}
        </AppText>
        <View style={styles.verifiedRow}>
          <Image source={imageCond()} style={styles.icon} />
          {textCond()}
        </View>
      </View>

      <TouchableOpacity onPress={openModal}>
        <Image source={images.Delete} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  block: {
    flex: 1,
    marginLeft: 20,
    marginTop: -3,
  },
  container: {
    flexDirection: 'row',
    marginVertical: 15,
  },
  icon: { marginRight: 10, width: 16, height: 16 },
  image: {
    width: 30,
    height: 25,
    resizeMode: 'contain',
  },
  primary: {
    color: colors.PRIMARY_TEXT,
  },
  secondary: {
    color: colors.SECONDARY_TEXT,
    marginTop: 5,
    marginBottom: 15,
  },
  verified: { color: '#C0C5E0', marginTop: -1 },
  verifiedRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
