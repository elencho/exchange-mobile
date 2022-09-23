import React, { useReducer } from 'react';
import {
  Pressable,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Image,
  View,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { COUNTRIES_URL_PNG } from '../../constants/api';

import colors from '../../constants/colors';
import images from '../../constants/images';
import {
  toggleCountriesModal,
  togglePhoneNumberModal,
} from '../../redux/modals/actions';
import {
  sendVerificationCode,
  updatePhoneNumber,
} from '../../redux/profile/actions';
import AppInput from '../AppInput';
import AppModal from '../AppModal';
import AppText from '../AppText';
import GeneralError from '../GeneralError';
import PurpleText from '../PurpleText';
import CountriesModal from './CountriesModal';

export default function PhoneNumberModal() {
  const dispatch = useDispatch();
  const state = useSelector((state) => state);
  const {
    modals: { phoneNumberModalVisible },
    profile: { userInfo, countries, generalError },
  } = state;

  const initialState = {
    phoneNumber: '',
    verificationNumber: '',
  };

  const reducer = (state, action) => {
    const { type, verificationNumber, phoneNumber } = action;
    switch (type) {
      case 'phoneNumber':
        return { ...state, phoneNumber };
      case 'verificationNumber':
        return { ...state, verificationNumber };
      case 'hide':
        return initialState;
      default:
        throw new Error();
    }
  };

  const [phoneNumberState, dispatchToReducer] = useReducer(
    reducer,
    initialState
  );

  const hide = () => {
    dispatchToReducer({ type: 'hide' });
    dispatch(togglePhoneNumberModal(false));
  };

  const validate = (number) => /^\d+$/.test(number) || !number;

  const handlePhoneNumber = (phoneNumber) => {
    if (validate(phoneNumber)) {
      dispatchToReducer({ type: 'phoneNumber', phoneNumber });
    }
  };

  const handleVerificationNumber = (verificationNumber) => {
    if (validate(verificationNumber)) {
      dispatchToReducer({ type: 'verificationNumber', verificationNumber });
    }
  };

  const handleSend = () => {
    const { phoneNumber } = phoneNumberState;
    dispatch(sendVerificationCode(phoneNumber, userInfo.phoneCountry));
  };

  const handleSave = () => {
    const { phoneNumber, verificationNumber } = phoneNumberState;
    dispatch(
      updatePhoneNumber(phoneNumber, userInfo.phoneCountry, verificationNumber)
    );
  };

  const handleCountries = () => {
    dispatch(toggleCountriesModal(true));
  };

  const send = <PurpleText text="Send" onPress={handleSend} />;

  const phoneCountry = () => {
    let phoneCountry;
    countries.forEach((c) => {
      if (userInfo.phoneCountry === c.code) {
        phoneCountry = c.phoneCode;
      }
    });
    return phoneCountry;
  };

  const children = () => {
    const { phoneNumber, verificationNumber } = phoneNumberState;
    return (
      <>
        <ScrollView style={styles.flex} showsVerticalScrollIndicator={false}>
          <TouchableOpacity activeOpacity={0.99}>
            {generalError ? (
              <View style={{ marginBottom: 25 }}>
                <GeneralError />
              </View>
            ) : null}

            <Pressable
              style={styles.dropdown}
              onPress={() => handleCountries()}
            >
              <Image
                source={{
                  uri: `${COUNTRIES_URL_PNG}/${userInfo.phoneCountry}.png`,
                }}
                style={styles.image}
              />
              <AppText medium style={styles.dropdownText}>
                {phoneCountry()}
              </AppText>
              <Image source={images.Arrow} />
            </Pressable>

            <AppInput
              style={styles.inputContainer}
              label="Phone Number"
              right={send}
              onChangeText={(text) => handlePhoneNumber(text)}
              value={phoneNumber}
            />
            <AppInput
              style={styles.inputContainer}
              label="Verification Code"
              onChangeText={(text) => handleVerificationNumber(text)}
              value={verificationNumber}
            />
          </TouchableOpacity>
        </ScrollView>

        <Pressable onPress={handleSave} style={styles.button}>
          <AppText medium style={styles.buttonText}>
            Save
          </AppText>
        </Pressable>

        <CountriesModal phoneCountry />
      </>
    );
  };

  return (
    <AppModal
      visible={phoneNumberModalVisible}
      hide={hide}
      fullScreen
      title="My Phone Number"
      children={children()}
    />
  );
}

const styles = StyleSheet.create({
  button: {
    height: 45,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
    backgroundColor: colors.PRIMARY_PURPLE,
  },
  buttonText: {
    color: colors.PRIMARY_TEXT,
  },
  dropdownText: {
    flex: 1,
    color: colors.PRIMARY_TEXT,
    marginLeft: 12,
  },
  dropdown: {
    borderWidth: 1,
    borderRadius: 4,
    height: 45,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    borderColor: '#42475D',
    paddingHorizontal: 15,
  },
  flex: {
    flex: 1,
    paddingTop: 5,
  },
  image: {
    width: 18,
    height: 18,
    borderRadius: 10,
  },
  inputContainer: {
    marginBottom: 20,
  },
});
