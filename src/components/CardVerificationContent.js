import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useDispatch } from 'react-redux';

import AppButton from './AppButton';
import AppText from './AppText';
import Background from './Background';
import PurpleText from './PurpleText';
import CloseModalIcon from './InstantTrade/CloseModalIcon';
import images from '../constants/images';
import sumsubHtmlPattern from '../constants/sumsubHtml.js';
import { cardVerificationToken } from '../utils/userProfileUtils';

export default function CardVerificationContent({ step = 0, cardId }) {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const image = step === 1 ? images.Card_Name : images.Card_Digits;

  const goToStepOne = () => navigation.goBack();
  const goToStepTwo = () =>
    navigation.navigate('CardVerificationTwo', { id: cardId });

  const handlesumsubWebView = async () => {
    const token = await cardVerificationToken(cardId);
    close();
    if (token)
      dispatch({
        type: 'SET_APP_WEBVIEW_OBJ',
        webViewObj: sumsubHtmlPattern(token),
      });
  };

  const bullets =
    step === 1 ? (
      <>
        <View style={[styles.row, { marginBottom: 14 }]}>
          <View style={styles.bullet} />
          <AppText style={styles.bulletText}>
            Bank card should have holder{' '}
            <AppText medium>name & last name</AppText>
          </AppText>
        </View>

        <View style={styles.row}>
          <View style={styles.bullet} />
          <AppText style={styles.bulletText}>
            Card holder must match <AppText medium>account holder</AppText>
          </AppText>
        </View>
      </>
    ) : (
      <>
        <View style={[styles.row, { marginBottom: 14 }]}>
          <View style={styles.bullet} />
          <AppText style={styles.bulletText}>
            Only <AppText medium>first 6 & last 4 digits</AppText>are required
            for a verification
          </AppText>
        </View>

        <View style={styles.row}>
          <View style={styles.bullet} />
          <AppText style={styles.bulletText}>
            Recommended to <AppText medium>hide other digits</AppText> using a
            sticky note or a piece of paper
          </AppText>
        </View>
      </>
    );

  const buttons =
    step === 1 ? (
      <AppButton text="Next" style={styles.button} onPress={goToStepTwo} />
    ) : (
      <View style={styles.buttons}>
        <AppButton
          text="Next"
          style={{ width: '100%' }}
          onPress={handlesumsubWebView}
        />
        <PurpleText text="Back" style={styles.back} onPress={goToStepOne} />
      </View>
    );

  const close = () => navigation.navigate('Balance');

  return (
    <Background>
      <CloseModalIcon onPress={close} />

      <Image source={image} style={styles.image} />

      <Text style={styles.title}>Let's Get You Verified</Text>
      <AppText subtext style={styles.secondary}>
        Bank card should suit following demands
      </AppText>

      <View style={styles.bulletsBlock}>{bullets}</View>

      {buttons}
    </Background>
  );
}

const styles = StyleSheet.create({
  back: {
    marginVertical: 35,
    alignSelf: 'center',
  },
  bulletsBlock: {
    marginTop: 30,
    marginHorizontal: '16%',
  },
  bullet: {
    width: 4,
    height: 4,
    borderRadius: 4,
    backgroundColor: '#FDF8FC',
    marginRight: 13,
    marginTop: 6,
  },
  bulletText: {
    flex: 1,
    color: '#CCD9DD',
    lineHeight: 16,
  },
  button: {
    position: 'absolute',
    bottom: 50,
    left: 30,
    right: 30,
  },
  buttons: {
    position: 'absolute',
    bottom: 0,
    left: 30,
    right: 30,
  },
  image: {
    width: '55%',
    height: '16%',
    resizeMode: 'contain',
    alignSelf: 'center',
    marginLeft: '7%',
    marginTop: '12%',
  },
  row: {
    flexDirection: 'row',
  },
  secondary: {
    color: '#8F9EB5',
    textAlign: 'center',
    opacity: 0.6,
  },
  title: {
    color: '#CCD9DD',
    fontSize: 18,
    fontFamily: 'Ubuntu_Medium',
    marginTop: 42,
    marginBottom: 8,
    textAlign: 'center',
  },
});