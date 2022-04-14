import React, { useEffect } from 'react';
import { Image, Pressable, StyleSheet, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import colors from '../../../constants/colors';
import images from '../../../constants/images';
import {
  toggleChooseBankModal,
  toggleTemplatesModal,
} from '../../../redux/modals/actions';
import {
  setIban,
  withdrawalTemplatesAction,
} from '../../../redux/wallet/actions';
import AppInput from '../../AppInput';
import AppText from '../../AppText';
import TemplatesModal from './TemplatesModal';
import WithdrawalBanksModal from './WithdrawalBanksModal';

export default function WithdrawalInfo() {
  const dispatch = useDispatch();
  const state = useSelector((state) => state);

  useEffect(() => {
    dispatch(withdrawalTemplatesAction());
  }, []);

  const {
    profile: { userInfo },
    wallet: { currentTemplate, withdrawalBank, iban },
  } = state;

  const showTemplates = () => dispatch(toggleTemplatesModal(true));
  const showBanks = () => dispatch(toggleChooseBankModal(true));
  const title = () => {
    if (!isTemplate()) {
      return 'Choose or Add Template';
    }
    return currentTemplate.templateName;
  };

  const titleColor = (t) => {
    if (t === 'template') {
      if (!isTemplate()) {
        return { color: colors.SECONDARY_TEXT };
      }
      return { color: colors.PRIMARY_TEXT };
    }

    if (t === 'bank') {
      if (!isBank()) {
        return { color: colors.SECONDARY_TEXT };
      }
      return { color: colors.PRIMARY_TEXT };
    }
  };

  const bankTitle = () => {
    if (isBank()) {
      return withdrawalBank.bankName;
    }
    return 'Choose bank';
  };

  const isTemplate = () => Object.keys(currentTemplate).length;
  const isBank = () => Object.keys(withdrawalBank).length;
  const showIban = () => {
    return (
      (currentTemplate.templateName === 'New Template' &&
        Object.keys(withdrawalBank).length) ||
      (isTemplate() && currentTemplate.templateName !== 'New Template')
    );
  };
  const handleIban = (t) => dispatch(setIban(t));

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

      {currentTemplate.templateName === 'New Template' ? (
        <>
          <Pressable style={styles.dropdown} onPress={showBanks}>
            <AppText style={[styles.dropdownText, titleColor('bank')]}>
              {bankTitle()}
            </AppText>
            <Image source={images.Arrow} />
          </Pressable>
          <WithdrawalBanksModal />
        </>
      ) : null}

      {showIban() ? (
        <AppInput
          label="Account Number / IBAN"
          style={styles.IBAN}
          labelBackgroundColor={colors.SECONDARY_BACKGROUND}
          value={iban}
          onChangeText={handleIban}
        />
      ) : null}

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
    textTransform: 'capitalize',
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
