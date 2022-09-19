import React from 'react';
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import { useDispatch } from 'react-redux';
import { useNavigation } from '@react-navigation/native';

import { ICONS_URL_PNG } from '../../../constants/api';
import colors from '../../../constants/colors';
import images from '../../../constants/images';
import { setCardDeleteModalInfo } from '../../../redux/modals/actions';
import AppText from '../../AppText';
import PurpleText from '../../PurpleText';

export default function Card({ name, cardNumber, network, status, id }) {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const isVerified = status === 'VERIFIED';

  const openModal = () =>
    dispatch(setCardDeleteModalInfo({ id, visible: true }));

  return (
    <View style={styles.container}>
      <Image
        source={{ uri: `${ICONS_URL_PNG}/${name}.png` }}
        style={styles.image}
      />

      <View style={{ flex: 1, marginLeft: 20, marginTop: -3 }}>
        <AppText medium style={styles.primary}>
          Provider: {name}
        </AppText>
        <AppText subtext style={styles.secondary}>
          {cardNumber} / {network}
        </AppText>
        <View style={styles.verifiedRow}>
          <Image
            source={images[isVerified ? 'Verified' : 'Info']}
            style={styles.icon}
          />

          {isVerified ? (
            <AppText style={styles.verified}>Already Verified</AppText>
          ) : (
            <>
              <AppText style={styles.verified}>Click to </AppText>
              <PurpleText
                text="Verify"
                onPress={() =>
                  navigation.navigate('CardVerificationOne', { id })
                }
              />
            </>
          )}
        </View>
      </View>

      <TouchableOpacity onPress={openModal}>
        <Image source={images.Delete} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginVertical: 15,
  },
  icon: { marginRight: 10 },
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
  verified: { color: '#C0C5E0' },
  verifiedRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
