import React, { useCallback } from 'react';
import {
  StyleSheet,
  View,
  Image,
  Pressable,
  TextInput,
  Text,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { t } from 'i18next';

import AppInput from '../AppInput';
import AppText from '../AppText';
import CountriesModal from '../UserProfile/CountriesModal';
import colors from '../../constants/colors';
import { setRegistrationInputs } from '../../redux/profile/actions';
import { toggleCountriesModal } from '../../redux/modals/actions';
import { COUNTRIES_URL_PNG } from '../../constants/api';
import Arrow from '../../assets/images/Arrow';

export default function RegistrationInputs({ validations, error }) {
  const dispatch = useDispatch();
  const state = useSelector((state) => state);

  const {
    profile: { registrationInputs, countriesConstant, Personal_Company },
  } = state;

  const i = registrationInputs;
  const v = validations;
  const set = (obj) => dispatch(setRegistrationInputs({ ...i, ...obj }));

  const red = { color: '#F45E8C' };
  const border = { borderColor: '#F45E8C' };
  const phoneNumberStyle =
    error && (!v.phoneNumberCheck || !i.phoneCountry) && border;
  const placeholderTextColor =
    error && (!v.phoneNumberCheck || !i.phoneCountry)
      ? '#F45E8C'
      : colors.SECONDARY_TEXT;

  const handleInputs = (text, type) => {
    if (type === 'name') set({ firstName: text });
    if (type === 'last name') set({ lastName: text });
    if (type === 'email') set({ email: text });
    if (type === 'pass') set({ passwordNew: text });
    if (type === 'confirm') set({ passwordConfirm: text });
    if (type === 'phone') set({ phoneNumber: text });
    if (type === 'referal') set({ referralCode: text });
    if (type === 'promoCode') set({ promoCode: text });
  };

  const openCountriesModal = () => dispatch(toggleCountriesModal(true));
  const phoneCode = () =>
    countriesConstant?.find((c) => i.phoneCountry === c.code);

  const errorText = (type) => {
    if (error) {
      if (!v.nameCheck && type === 'First Name')
        return i.firstName?.trim() ? 'Enter Valid First Name' : null;
      if (!v.lastNameCheck && type === 'Last Name')
        return i.lastName?.trim() ? 'Enter Valid Last Name' : null;
      if (!v.isEmail && type === 'Email')
        return i.email ? 'Enter Valid Email' : null;
    }
  };

  return (
    <>
      <AppInput
        value={i.email}
        label="Enter E-mail"
        labelBackgroundColor={colors.PRIMARY_BACKGROUND}
        style={styles.input}
        autoCapitalize={'none'}
        onChangeText={(text) => handleInputs(text, 'email')}
        error={error && (!i.email || !v.isEmail)}
        errorText={errorText('Email')}
      />
      <AppInput
        value={i.passwordNew}
        label="Enter Password"
        autoCapitalize={'none'}
        labelBackgroundColor={colors.PRIMARY_BACKGROUND}
        style={styles.input}
        onChangeText={(text) => handleInputs(text, 'pass')}
        secureTextEntry
        error={error && !v.passwordCheck}
      />

      <Text style={styles.validations}>
        <Text style={error && !v.passLength && red}>
          {t('8 or more characters')}
        </Text>
        <Text style={error && !v.hasUpperAndLower && red}>
          {t('Upper & lowercase letters')}
        </Text>
        <Text style={error && !v.hasNumber && red}>
          {t('At least one number')}
        </Text>
      </Text>

      <AppInput
        value={i.passwordConfirm}
        label="Repeat Password"
        autoCapitalize={'none'}
        labelBackgroundColor={colors.PRIMARY_BACKGROUND}
        style={styles.input}
        onChangeText={(text) => handleInputs(text, 'confirm')}
        secureTextEntry
        error={error && !v.similarPasswords}
      />
      <View style={[styles.phoneNumber, phoneNumberStyle]}>
        <Pressable style={styles.number} onPress={openCountriesModal}>
          {i.phoneCountry ? (
            <>
              <Image
                source={{ uri: `${COUNTRIES_URL_PNG}/${i.phoneCountry}.png` }}
                style={styles.flag}
              />
              <AppText medium style={styles.white}>
                {phoneCode()?.phoneCode}
              </AppText>
            </>
          ) : (
            <AppText style={{ color: colors.SECONDARY_TEXT, marginRight: 10 }}>
              Code
            </AppText>
          )}
          <Arrow />
          <View style={styles.line} />
        </Pressable>

        <TextInput
          value={i.phoneNumber}
          placeholder="Phone Number"
          placeholderTextColor={placeholderTextColor}
          style={{ flex: 1, color: 'white' }}
          keyboardType="numeric"
          onChangeText={(text) => handleInputs(text, 'phone')}
        />
      </View>
      <CountriesModal phoneCountry registration />
      {Personal_Company === 'Personal' && (
        <>
          <AppInput
            value={i.referralCode}
            label="Referral Code"
            labelBackgroundColor={colors.PRIMARY_BACKGROUND}
            style={styles.input}
            onChangeText={(text) => handleInputs(text, 'referal')}
          />
          <AppInput
            value={i.promoCode}
            label="Promo Code"
            labelBackgroundColor={colors.PRIMARY_BACKGROUND}
            style={[styles.input, { marginTop: 12 }]}
            onChangeText={(text) => handleInputs(text, 'promoCode')}
          />
        </>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  flag: {
    width: 15,
    height: 15,
    borderRadius: 10,
    resizeMode: 'stretch',
  },
  input: {
    marginTop: 22,
  },
  line: {
    width: 1,
    backgroundColor: '#32344C',
    height: 20,
    marginHorizontal: 10,
  },
  number: {
    flexDirection: 'row',
    alignItems: 'center',
    height: '100%',
  },
  phoneNumber: {
    borderWidth: 1,
    height: 45,
    paddingHorizontal: 15,
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 22,
    marginBottom: -11,
    borderColor: '#42475D',
  },
  subtext: {
    color: colors.SECONDARY_TEXT,
    lineHeight: 18,
    marginTop: 5,
    textAlign: 'justify',
  },
  validations: {
    color: colors.SECONDARY_TEXT,
    fontSize: 11,
    lineHeight: 15,
    textAlign: 'justify',
    lineHeight: 15,
    marginTop: 8,
  },
  white: {
    color: colors.PRIMARY_TEXT,
    marginHorizontal: 10,
  },
});
