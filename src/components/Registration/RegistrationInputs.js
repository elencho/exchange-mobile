import React from 'react';
import { StyleSheet, View, Image, Pressable, TextInput } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import AppInput from '../AppInput';
import AppText from '../AppText';
import colors from '../../constants/colors';
import images from '../../constants/images';
import { setRegistrationInputs } from '../../redux/profile/actions';

export default function RegistrationInputs() {
  const dispatch = useDispatch();
  const state = useSelector((state) => state);
  const {
    profile: { registrationInputs },
  } = state;

  const i = registrationInputs;
  const set = (obj) => dispatch(setRegistrationInputs({ ...i, ...obj }));

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
      />

      <AppText style={styles.subtext} subtext>
        8 or more characters, Upper & lowercase letters, at least one number,
        one symbol
      </AppText>

      <AppInput
        value={i.passwordConfirm}
        label="Repeat Password"
        labelBackgroundColor={colors.SECONDARY_BACKGROUND}
        style={styles.input}
        onChangeText={(text) => handleInputs(text, 'confirm')}
        secureTextEntry
      />
      <View style={styles.phoneNumber}>
        <Pressable style={styles.number}>
          <Image source={images.GEO} />
          <AppText medium style={styles.white}>
            + 995
          </AppText>
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
  white: {
    color: colors.PRIMARY_TEXT,
    marginHorizontal: 10,
  },
});
