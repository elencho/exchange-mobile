import React from 'react';
import { Pressable, StyleSheet, View, Image } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import colors from '../../../constants/colors';
import {
  toggleChooseBankModal,
  toggleTemplatesModal,
  toggleCountriesModal,
} from '../../../redux/modals/actions';
import { saveUserInfo } from '../../../redux/profile/actions';
import { setIban, setReceiverBank } from '../../../redux/wallet/actions';
import AppInput from '../../AppInput';
import AppText from '../../AppText';
import TemplatesModal from './TemplatesModal';
import WithdrawalBanksModal from './WithdrawalBanksModal';
import Arrow from '../../../assets/images/Arrow';
import CountriesModal from '../../UserProfile/CountriesModal';

import { COUNTRIES_URL_PNG } from '../../../constants/api';

export default function WithdrawalInfo({ error }) {
  const dispatch = useDispatch();
  const state = useSelector((state) => state);

  const {
    profile: { userInfo },
    wallet: { currentTemplate, withdrawalBank, iban, receiverBank },
  } = state;

  console.log('country', userInfo?.country);
  console.log('countryCode', userInfo?.countryCode);

  const showTemplates = () => dispatch(toggleTemplatesModal(true));
  const showBanks = () => dispatch(toggleChooseBankModal(true));
  const openCountriesModal = () => dispatch(toggleCountriesModal(true));
  const isBank = !!Object.keys(withdrawalBank).length;
  const bankTitle = isBank ? withdrawalBank.bankName : 'Choose bank';
  const isTemplate = !!Object.keys(currentTemplate).length;
  const isBankOther = withdrawalBank.bankName === 'Other';

  const title = !isTemplate
    ? 'Choose or Add Template'
    : currentTemplate.templateName;

  const bankColor = error && !isBank && { borderColor: '#F45E8C' };
  const templateRed = error && !isTemplate && { borderColor: '#F45E8C' };

  const titleColor = (t) => {
    if (t === 'template') {
      if (!isTemplate) {
        return { color: error ? '#F45E8C' : colors.SECONDARY_TEXT };
      }
      return { color: colors.PRIMARY_TEXT };
    }

    if (error && !isBank) {
      return { color: '#F45E8C' };
    }

    if (t === 'bank') {
      if (!isBank) {
        return { color: colors.SECONDARY_TEXT };
      }
      return { color: colors.PRIMARY_TEXT };
    }
  };

  const showIban = () => {
    return (
      (currentTemplate.templateName === 'New Template' &&
        Object.keys(withdrawalBank).length) ||
      (isTemplate && currentTemplate.templateName !== 'New Template')
    );
  };
  const handleIban = (t) => dispatch(setIban(t));

  const handleUserInfo = (t, infoType) => {
    let updatedInfo;
    switch (infoType) {
      case 'address':
        updatedInfo = { ...userInfo, address: t };
        break;
      case 'city':
        updatedInfo = { ...userInfo, city: t };
        break;
      case 'postal code':
        updatedInfo = { ...userInfo, postalCode: t };
        break;
      default:
        break;
    }
    dispatch(saveUserInfo(updatedInfo));
  };

  const handleBankInfo = (t, infoType) => {
    let updatedInfo;
    switch (infoType) {
      case 'bank name':
        updatedInfo = { ...receiverBank, bankName: t };
        break;
      case 'bank city':
        updatedInfo = { ...receiverBank, bankPostalCity: t };
        break;
      case 'bank postal code':
        updatedInfo = { ...receiverBank, bankPostalCode: t };
        break;
      case 'bank address':
        updatedInfo = { ...receiverBank, bankAddress: t };
        break;
      case 'bank swift code':
        updatedInfo = { ...receiverBank, swift: t };
        break;
      default:
        break;
    }
    dispatch(setReceiverBank(updatedInfo));
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

      {isBankOther && (
        <>
          <AppInput
            label="Address"
            onChangeText={(t) => handleUserInfo(t, 'address')}
            style={styles.address}
            value={userInfo.address}
            labelBackgroundColor={colors.SECONDARY_BACKGROUND}
            error={error && !userInfo?.address?.trim()}
          />
          <View style={styles.row}>
            <AppInput
              style={[styles.inputContainer, styles.rowInputs]}
              onChangeText={(t) => handleUserInfo(t, 'city')}
              label="City"
              value={userInfo.city}
              labelBackgroundColor={colors.SECONDARY_BACKGROUND}
              error={error && !userInfo?.city?.trim()}
            />
            <AppInput
              style={[styles.inputContainer, styles.rowInputs]}
              onChangeText={(t) => handleUserInfo(t, 'postal code')}
              label="Postal Code"
              value={userInfo.postalCode}
              labelBackgroundColor={colors.SECONDARY_BACKGROUND}
              error={error && !userInfo?.postalCode?.trim()}
            />
          </View>

          <Pressable
            style={styles.languageSelector}
            onPress={openCountriesModal}
          >
            <View style={styles.countryInfo}>
              <Image
                source={{
                  uri: `${COUNTRIES_URL_PNG}/${userInfo.countryCode}.png`,
                }}
                style={styles.flag}
              />
              <AppText style={styles.countryText} medium>
                {userInfo.country}
              </AppText>
            </View>
            <Arrow />
          </Pressable>
        </>
      )}
      <CountriesModal title="Select Country" countryDrop />

      <AppText body style={[styles.text, { marginBottom: -5 }]}>
        Bank Info
      </AppText>

      <Pressable style={[styles.dropdown, templateRed]} onPress={showTemplates}>
        <AppText style={[styles.dropdownText, titleColor('template')]}>
          {title}
        </AppText>
        <Arrow />
      </Pressable>

      {currentTemplate.templateName === 'New Template' ? (
        <>
          <Pressable style={[styles.dropdown, bankColor]} onPress={showBanks}>
            <AppText style={[styles.dropdownText, titleColor('bank')]}>
              {bankTitle}
            </AppText>
            <Arrow />
          </Pressable>
          <WithdrawalBanksModal />
        </>
      ) : null}

      {isBankOther && (
        <AppInput
          label="Enter Bank Name"
          labelBackgroundColor={colors.SECONDARY_BACKGROUND}
          value={receiverBank.bankName}
          onChangeText={(t) => handleBankInfo(t, 'bank name')}
          style={styles.marginTop}
          error={error && !receiverBank?.bankName?.trim()}
        />
      )}

      {showIban() ? (
        <AppInput
          label="Account Number / IBAN"
          style={styles.IBAN}
          labelBackgroundColor={colors.SECONDARY_BACKGROUND}
          value={iban}
          onChangeText={handleIban}
          error={error && !iban?.trim()}
        />
      ) : null}

      {isBankOther && (
        <>
          <View style={[styles.row, styles.marginTop]}>
            <AppInput
              style={styles.rowInputs}
              onChangeText={(t) => handleBankInfo(t, 'bank city')}
              label="City"
              value={receiverBank.bankPostalCity}
              labelBackgroundColor={colors.SECONDARY_BACKGROUND}
              error={error && !receiverBank?.bankPostalCity?.trim()}
            />
            <AppInput
              style={styles.rowInputs}
              onChangeText={(t) => handleBankInfo(t, 'bank postal code')}
              label="Postal Code"
              value={receiverBank.bankPostalCode}
              labelBackgroundColor={colors.SECONDARY_BACKGROUND}
              error={error && !receiverBank?.bankPostalCode?.trim()}
            />
          </View>

          <AppInput
            label="Bank Address"
            labelBackgroundColor={colors.SECONDARY_BACKGROUND}
            value={receiverBank.bankAddress}
            onChangeText={(t) => handleBankInfo(t, 'bank address')}
            style={styles.marginTop}
            error={error && !receiverBank?.bankAddress?.trim()}
          />

          <AppInput
            label="SWIFT / BIC / Routing number"
            labelBackgroundColor={colors.SECONDARY_BACKGROUND}
            value={receiverBank.swift}
            onChangeText={(t) => handleBankInfo(t, 'bank swift code')}
            style={styles.marginTop}
            error={error && !receiverBank?.swift?.trim()}
          />
        </>
      )}

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
  inputContainer: {
    marginBottom: 20,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  rowInputs: {
    width: '47%',
  },
  marginTop: {
    marginTop: 22,
  },
  name: {
    marginBottom: 30,
    marginTop: 18,
  },
  address: {
    marginBottom: 30,
  },
  text: {
    color: '#B7BFDB',
    marginLeft: 3,
  },
  languageSelector: {
    borderWidth: 1,
    paddingHorizontal: 15,
    paddingVertical: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderColor: colors.BORDER,
    marginBottom: 30,
    height: 45,
  },
  countryInfo: {
    flexDirection: 'row',
  },
  countryText: {
    color: colors.PRIMARY_TEXT,
  },
  flag: {
    height: 20,
    width: 20,
    borderRadius: 8,
    marginRight: 20,
    resizeMode: 'stretch',
  },
});
