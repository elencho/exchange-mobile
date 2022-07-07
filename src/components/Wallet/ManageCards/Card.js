import React from 'react';
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';

import colors from '../../../constants/colors';
import images from '../../../constants/images';
import { deleteCard } from '../../../utils/walletUtils';
import AppText from '../../AppText';
import PurpleText from '../../PurpleText';

export default function Card({
  name,
  cardNumber,
  network,
  status,
  id,
  setCards,
  cards,
  handlesumsubWebView,
}) {
  const isVerified = status === 'VERIFIED';

  const handleDelete = async () => {
    const status = await deleteCard(id);
    if (status >= 200 || status < 300) {
      const updatedCards = cards.filter((c) => c.id !== id);
      setCards(updatedCards);
    }
  };

  return (
    <View style={styles.container}>
      <Image source={images.TBC} />

      <View style={{ flex: 1, marginLeft: 20, marginTop: -3 }}>
        <AppText medium style={styles.primary}>
          Provider: {name}
        </AppText>
        <AppText subtext style={styles.secondary}>
          {cardNumber} / {network}
        </AppText>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
          }}
        >
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
                onPress={() => handlesumsubWebView(id)}
              />
            </>
          )}
        </View>
      </View>

      <TouchableOpacity onPress={handleDelete}>
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
  primary: {
    color: colors.PRIMARY_TEXT,
  },
  secondary: {
    color: colors.SECONDARY_TEXT,
    marginTop: 5,
    marginBottom: 15,
  },
  verified: { color: '#C0C5E0' },
});
