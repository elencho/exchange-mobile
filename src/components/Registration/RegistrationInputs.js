import React from 'react';
import {
  StyleSheet,
  View,
  Image,
  Pressable,
  TextInput,
  Text,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import AppInput from '../AppInput';
import AppText from '../AppText';
import CountriesModal from '../UserProfile/CountriesModal';
import colors from '../../constants/colors';
import images from '../../constants/images';
import { setRegistrationInputs } from '../../redux/profile/actions';
import { toggleCountriesModal } from '../../redux/modals/actions';
import { COUNTRIES_URL_PNG } from '../../constants/api';

export default function RegistrationInputs() {
  const dispatch = useDispatch();
  const state = useSelector((state) => state);
  const {
    profile: { registrationInputs, countriesConstant },
  } = state;

  const i = registrationInputs;
  const set = (obj) => dispatch(setRegistrationInputs({ ...i, ...obj }));

  const passLength = i.passwordNew?.length >= 8;
  const hasNumber = /\d/.test(i.passwordNew);
  const hasUpperAndLower = /([A-Z].*[a-z]|[a-z].*[A-Z])/.test(i.passwordNew);

  const passwordCheck = passLength && hasNumber && hasUpperAndLower;

  const red = { color: '#F45E8C' };

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

  return (
    <>
      <AppInput
        value={i.firstName}
        label="Enter Name"
        labelBackgroundColor={colors.SECONDARY_BACKGROUND}
        style={styles.input}
        onChangeText={(text) => handleInputs(text, 'name')}
      />
      <AppInput
        value={i.lastName}
        label="Enter Last Name"
        labelBackgroundColor={colors.SECONDARY_BACKGROUND}
        style={styles.input}
        onChangeText={(text) => handleInputs(text, 'last name')}
      />
      <AppInput
        value={i.email}
        label="Enter E-mail"
        labelBackgroundColor={colors.SECONDARY_BACKGROUND}
        style={styles.input}
        onChangeText={(text) => handleInputs(text, 'email')}
      />
      <AppInput
        value={i.passwordNew}
        label="Enter Password"
        labelBackgroundColor={colors.SECONDARY_BACKGROUND}
        style={styles.input}
        onChangeText={(text) => handleInputs(text, 'pass')}
        secureTextEntry
        error={i.passwordNew && !passwordCheck}
      />

      <Text style={styles.validations}>
        <Text style={i.passwordNew && !passLength && red}>
          8 or more characters,{' '}
        </Text>
        <Text style={i.passwordNew && !hasUpperAndLower && red}>
          Upper & lowercase letters,{' '}
        </Text>
        <Text style={i.passwordNew && !hasNumber && red}>
          At least one number,{' '}
        </Text>
      </Text>

      <AppInput
        value={i.passwordConfirm}
        label="Repeat Password"
        labelBackgroundColor={colors.SECONDARY_BACKGROUND}
        style={styles.input}
        onChangeText={(text) => handleInputs(text, 'confirm')}
        secureTextEntry
        error={i.passwordConfirm && i.passwordNew !== i.passwordConfirm}
      />
      <View style={styles.phoneNumber}>
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

          <Image source={images.Arrow} />
          <View style={styles.line} />
        </Pressable>

        <TextInput
          value={i.phoneNumber}
          placeholder="Phone Number"
          placeholderTextColor={colors.SECONDARY_TEXT}
          style={{ flex: 1, color: 'white' }}
          keyboardType="numeric"
          onChangeText={(text) => handleInputs(text, 'phone')}
        />
      </View>
      <CountriesModal phoneCountry registration />

      <AppInput
        value={i.referralCode}
        label="Referral Code"
        labelBackgroundColor={colors.SECONDARY_BACKGROUND}
        style={styles.input}
        onChangeText={(text) => handleInputs(text, 'referal')}
      />
      <AppInput
        value={i.promoCode}
        label="Promo Code"
        labelBackgroundColor={colors.SECONDARY_BACKGROUND}
        style={[styles.input, { marginTop: 12 }]}
        onChangeText={(text) => handleInputs(text, 'promoCode')}
      />
    </>
  );
}

const styles = StyleSheet.create({
  flag: {
    width: 15,
    height: 15,
    borderRadius: 10,
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
  },
  phoneNumber: {
    borderWidth: 1,
    borderRadius: 4,
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
    textAlign: 'justify',
    marginTop: 8,
  },
  white: {
    color: colors.PRIMARY_TEXT,
    marginHorizontal: 10,
  },
});
