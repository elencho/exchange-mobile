import React from 'react';
import { StyleSheet, View, Image, Pressable, TextInput } from 'react-native';

import AppInput from '../AppInput';
import AppText from '../AppText';
import colors from '../../constants/colors';
import images from '../../constants/images';

export default function RegistrationInputs() {
  return (
    <>
      <AppInput
        label="Enter Name"
        labelBackgroundColor={colors.SECONDARY_BACKGROUND}
        style={styles.input}
      />
      <AppInput
        label="Enter Last Name"
        labelBackgroundColor={colors.SECONDARY_BACKGROUND}
        style={styles.input}
      />
      <AppInput
        label="Enter E-mail"
        labelBackgroundColor={colors.SECONDARY_BACKGROUND}
        style={styles.input}
      />
      <AppInput
        label="Enter Password"
        labelBackgroundColor={colors.SECONDARY_BACKGROUND}
        style={styles.input}
        secureTextEntry
      />

      <AppText style={styles.subtext} subtext>
        8 or more characters, Upper & lowercase letters, at least one number,
        one symbol
      </AppText>

      <AppInput
        label="Repeat Password"
        labelBackgroundColor={colors.SECONDARY_BACKGROUND}
        style={styles.input}
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
          placeholder="Phone Number"
          placeholderTextColor={colors.SECONDARY_TEXT}
          style={{ flex: 1, color: 'white' }}
          keyboardType="numeric"
        />
      </View>

      <AppInput
        label="Referral Code"
        labelBackgroundColor={colors.SECONDARY_BACKGROUND}
        style={styles.input}
        secureTextEntry
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
