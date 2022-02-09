import React from 'react';
import { Image, StyleSheet, View } from 'react-native';
import colors from '../../../constants/colors';
import images from '../../../constants/images';
import AppText from '../../AppText';
import InfoMark from '../../InstantTrade/InfoMark';
import PurpleText from '../../PurpleText';

export default function Card() {
  return (
    <View style={styles.container}>
      <Image source={images.TBC} />

      <View style={{ flex: 1, marginLeft: 20, marginTop: -3 }}>
        <AppText medium style={styles.primary}>
          Provider: TBC Bank
        </AppText>
        <AppText subtext style={styles.secondary}>
          1234****2345 / MC Card
        </AppText>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
          }}
        >
          <View style={{ transform: [{ scale: 0.7 }], marginRight: 10 }}>
            <InfoMark inner="i" color={colors.SECONDARY_PURPLE} />
          </View>
          <AppText style={{ color: '#C0C5E0' }}>Click to </AppText>
          <PurpleText text="Verify" />
        </View>
      </View>

      <Image source={images.Delete} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginVertical: 15,
  },
  primary: {
    color: colors.PRIMARY_TEXT,
  },
  secondary: {
    color: colors.SECONDARY_TEXT,
    marginTop: 5,
    marginBottom: 15,
  },
});
