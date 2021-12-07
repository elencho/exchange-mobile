import React from 'react';
import { Image, Pressable, StyleSheet, View } from 'react-native';
import { useSelector } from 'react-redux';

import colors from '../../constants/colors';
import images from '../../constants/images';
import AppText from '../AppText';
import PurpleText from '../PurpleText';
import InfoMark from './InfoMark';

export default function CardSection() {
  const state = useSelector((state) => state.trade);
  const { bank, card } = state;
  return (
    <View style={styles.container}>
      <Pressable style={styles.dropdown}>
        {/* <Image source={images[c]} />  BANKIS AN BARATIS LOGO */}
        <AppText
          style={[
            styles.text,
            { color: bank ? colors.PRIMARY_TEXT : colors.SECONDARY_TEXT },
          ]}
          medium={bank}
        >
          {bank ? bank : 'Choose Bank'}
        </AppText>
        <Image source={images['Arrow']} />
      </Pressable>

      <AppText subtext style={styles.subText}>
        0 ₾-100 ₾ Visa / MC Card 5% Amex 7 % <PurpleText text=" More Fees" />
      </AppText>

      <Pressable style={styles.dropdown}>
        {/* <Image source={images[c]} />  BANKIS AN BARATIS LOGO */}
        <AppText
          style={[
            styles.text,
            { color: card ? colors.PRIMARY_TEXT : colors.SECONDARY_TEXT },
          ]}
          medium={card}
        >
          {card ? card : 'Choose Card'}
        </AppText>
        <Image source={images['Arrow']} />
      </Pressable>

      <AppText subtext style={styles.subText}>
        Or you can add <PurpleText text=" New Card" />
      </AppText>

      <View style={styles.info}>
        <InfoMark inner="i" color={colors.SECONDARY_TEXT} />
        <AppText subtext style={styles.infoText}>
          MasterCard 3%; Total amount = 51.55 GEL
        </AppText>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  dropdown: {
    borderColor: '#525A86',
    borderWidth: 1,
    alignItems: 'center',
    flexDirection: 'row',
    height: 45,
    paddingHorizontal: 15,
  },
  container: {
    marginVertical: 20,
  },
  info: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  infoText: {
    color: colors.SECONDARY_TEXT,
    marginHorizontal: 10,
  },
  subText: {
    color: colors.SECONDARY_TEXT,
    marginTop: 10,
    marginBottom: 25,
  },
  text: {
    color: colors.PRIMARY_TEXT,
    flex: 1,
  },
});
