import React from 'react';
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import { useDispatch } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { t } from 'i18next';
import { Trans } from 'react-i18next';

import AppText from '../../AppText';
import PurpleText from '../../PurpleText';
import { ICONS_URL_PNG } from '../../../constants/api';
import colors from '../../../constants/colors';
import images from '../../../constants/images';
import { setDeleteModalInfo } from '../../../redux/modals/actions';

export default function Card({ card }) {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const { provider, cardNumber, network, status, id, expired } = card;

  const toVerify = (purpleText) => (
    <>
      <AppText style={styles.verified}>
        <Trans
          i18nKey={`${purpleText} full`}
          components={{
            purple: (
              <PurpleText
                text={t(purpleText)}
                onPress={() =>
                  navigation.navigate('CardVerificationOne', { id })
                }
              />
            ),
          }}
        />{' '}
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
      return toVerify('card verification purple text');
    }
    if (status === 'FAILED') {
      return toVerify('retry card verification purple text');
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
      <Image
        source={{ uri: `${ICONS_URL_PNG}/${provider}.png` }}
        style={styles.image}
      />

      <View style={styles.block}>
        <AppText medium style={styles.primary}>
          Provider: {provider}
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
