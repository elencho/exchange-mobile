import React from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import AppModal from '../AppModal';
import AppText from '../AppText';
import colors from '../../constants/colors';
import { toggleLanguageModal } from '../../redux/modals/actions';
import { setLanguage } from '../../redux/profile/actions';
import { switchLanguage } from '../../utils/i18n';

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
    hide();
  };

  const handleHide = () => switchLanguage(language);

  const background = (l) => {
    if (l === language) {
      return { backgroundColor: 'rgba(101, 130, 253, 0.1)' };
    }
  };

  const text = (l) => {
    if (l === 'en') return 'English';
    if (l === 'ka') return 'ქართული';
  };

  const children = (
    <>
      {['en', 'ka'].map((l, i, a) => (
        <View key={l}>
          <Pressable
            style={[styles.button, background(l)]}
            onPress={() => chooseLanguage(l)}
          >
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
      onModalHide={handleHide}
    />
  );
}

const styles = StyleSheet.create({
  button: {
    height: 45,
    justifyContent: 'center',
    marginHorizontal: -13,
    paddingHorizontal: 18,
  },
  margin: {
    marginVertical: 5,
  },
  text: {
    color: colors.PRIMARY_TEXT,
  },
});
