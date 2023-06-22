import React from 'react';
import { Image, Pressable, StyleSheet, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import AppModal from '../AppModal';
import AppText from '../AppText';
import colors from '../../constants/colors';
import images from '../../constants/images';

import { toggleLanguageModal } from '../../redux/modals/actions';
import { fetchUserInfo, setLanguage } from '../../redux/profile/actions';
import { switchLanguage } from '../../utils/i18n';
import { COUNTRIES_URL_PNG } from '../../constants/api';

export default function ChooseLanguageModal() {
  const dispatch = useDispatch();
  const state = useSelector((state) => state);
  const {
    modals: { languageModalVisible },
    profile: { language },
  } = state;

  const hide = () => dispatch(toggleLanguageModal(false));

  const chooseLanguage = (l) => {
    dispatch(setLanguage(l));
    switchLanguage(l);
    hide();
    dispatch(fetchUserInfo());
  };

  const background = (l) => {
    if (l === language) {
      return { backgroundColor: 'rgba(101, 130, 253, 0.1)' };
    }
  };

  const text = (l) => {
    if (l === 'en') return 'English';
    if (l === 'ka') return 'ქართული';
  };
  const uri = (l) => {
    if (l === 'en') return `${COUNTRIES_URL_PNG}/GBR.png`;
    if (l === 'ka') return `${COUNTRIES_URL_PNG}/GEO.png`;
  };

  const children = (
    <>
      {['en', 'ka'].map((l, i, a) => (
        <View key={l}>
          <Pressable
            style={[styles.button, background(l)]}
            onPress={() => chooseLanguage(l)}
          >
            <Image
              source={l === 'en' ? { uri: uri(l) } : images.GEO}
              style={styles.flag}
            />
            <AppText style={styles.text}>{text(l)}</AppText>
          </Pressable>
          {i < a.length - 1 && <View style={styles.margin} />}
        </View>
      ))}
    </>
  );

  return (
    <AppModal
      visible={languageModalVisible}
      hide={hide}
      bottom
      title="Choose Language"
      children={children}
      position="130%"
    />
  );
}

const styles = StyleSheet.create({
  button: {
    height: 45,
    alignItems: 'center',
    marginHorizontal: -13,
    paddingHorizontal: 18,
    flexDirection: 'row',
  },
  flag: {
    height: 24,
    width: 24,
    marginRight: 20,
    borderRadius: 12,
  },
  margin: {
    marginVertical: 5,
  },
  text: {
    color: colors.PRIMARY_TEXT,
  },
});
