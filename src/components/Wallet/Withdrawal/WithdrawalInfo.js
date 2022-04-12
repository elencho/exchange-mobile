import React, { useEffect } from 'react';
import { Image, Pressable, StyleSheet, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import colors from '../../../constants/colors';
import images from '../../../constants/images';
import { toggleTemplatesModal } from '../../../redux/modals/actions';
import { withdrawalTemplatesAction } from '../../../redux/wallet/actions';
import AppInput from '../../AppInput';
import AppText from '../../AppText';
import TemplatesModal from './TemplatesModal';

export default function WithdrawalInfo() {
  const dispatch = useDispatch();
  const state = useSelector((state) => state);

  useEffect(() => {
    dispatch(withdrawalTemplatesAction());
  }, []);

  const {
    profile: { userInfo },
    wallet: { currentTemplate },
  } = state;

  const showTemplates = () => dispatch(toggleTemplatesModal(true));
  const title = () => {
    if (!Object.keys(currentTemplate).length) {
      return 'Choose or Add Template';
    }
    return currentTemplate.templateName;
  };

  const titleColor = (t) => {
    if (t === 'template') {
      if (!Object.keys(currentTemplate).length) {
        return { color: colors.SECONDARY_TEXT };
      }
      return { color: colors.PRIMARY_TEXT };
    }

    if (t === 'bank') {
      return { color: colors.SECONDARY_TEXT };
    }
  };

  return (
    <View style={styles.block}>
      <AppText body style={styles.text}>
        Personal Info
      </AppText>

      <AppInput
        label="Name"
        style={styles.name}
        value={`${userInfo.firstName} ${userInfo.lastName}`}
        labelBackgroundColor={colors.SECONDARY_BACKGROUND}
      />

      <AppText body style={[styles.text, { marginBottom: -5 }]}>
        Bank Info
      </AppText>

      <Pressable style={styles.dropdown} onPress={showTemplates}>
        <AppText style={[styles.dropdownText, titleColor('template')]}>
          {title()}
        </AppText>
        <Image source={images.Arrow} />
      </Pressable>

      <Pressable style={styles.dropdown} /* onPress={show} */>
        <AppText style={[styles.dropdownText, titleColor('bank')]}>
          Choose Bank
        </AppText>
        <Image source={images.Arrow} />
      </Pressable>

      <AppInput
        label="Account Number / IBAN"
        style={styles.IBAN}
        labelBackgroundColor={colors.SECONDARY_BACKGROUND}
      />

      <TemplatesModal />
    </View>
  );
}

const styles = StyleSheet.create({
  block: {
    backgroundColor: colors.SECONDARY_BACKGROUND,
    paddingVertical: 22,
    paddingHorizontal: 16,
    marginBottom: 12,
  },
  dropdownText: {
    flex: 1,
  },
  dropdown: {
    borderWidth: 1,
    borderRadius: 4,
    height: 45,
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 22,
    borderColor: '#42475D',
    paddingHorizontal: 15,
  },
  IBAN: {
    marginTop: 22,
  },
  name: {
    marginBottom: 30,
    marginTop: 18,
  },
  text: {
    color: '#B7BFDB',
    marginLeft: 3,
  },
});
