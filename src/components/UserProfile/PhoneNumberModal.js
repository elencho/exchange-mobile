import React, { useEffect, useState } from 'react';
import {
  Pressable,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Image,
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
  saveUserInfo,
  sendVerificationCode,
  updatePhoneNumber,
} from '../../redux/profile/actions';
import AppInput from '../AppInput';
import AppModal from '../AppModal';
import AppButton from '../AppButton';
import AppText from '../AppText';
import GeneralError from '../GeneralError';
import PurpleText from '../PurpleText';
import CountriesModal from './CountriesModal';
import { errorHappenedHere } from '../../utils/appUtils';
import WithKeyboard from '../WithKeyboard';

export default function PhoneNumberModal() {
  const dispatch = useDispatch();
  const state = useSelector((state) => state);
  const {
    modals: { phoneNumberModalVisible },
    profile: { userInfo, countries },
  } = state;

  const [userInfoVariable, setUserInfoVariable] = useState(null);
  const [code, setCode] = useState(null);
  const [error, setError] = useState(false);
  const [sendError, setSendError] = useState(false);

  useEffect(() => {
    if (error || sendError) {
      setSendError(false);
      setError(false);
    }
  }, [userInfo, code]);

  useEffect(() => {
    if (phoneNumberModalVisible) setUserInfoVariable(userInfo);
  }, [phoneNumberModalVisible]);

  const number = userInfo?.phoneNumber;
  const country = userInfo?.phoneCountry;
  const borderColor = (error || sendError) && !country ? '#F45E8C' : '#42475D';
  const color =
    (error || sendError) && !country ? '#F45E8C' : colors.PRIMARY_TEXT;

  const hide = () => {
    setCode(null);
    dispatch(saveUserInfo(userInfoVariable));
    dispatch(togglePhoneNumberModal(false));
  };

  const handlePhoneNumber = (phoneNumber) =>
    dispatch(saveUserInfo({ ...userInfo, phoneNumber }));

  const handleVerificationCode = (code) => setCode(code);

  const handleSend = () => {
    if (!country || !number?.trim()) {
      setSendError(true);
    } else {
      dispatch(sendVerificationCode(number, country));
    }
  };

  const handleSave = () => {
    if (error || !code?.trim() || !country || !number?.trim()) {
      setError(true);
    } else {
      dispatch(
        updatePhoneNumber(number, country, code, setCode, setUserInfoVariable)
      );
    }
  };

  const handleCountries = () => dispatch(toggleCountriesModal(true));

  const send = <PurpleText text="Send" onPress={handleSend} />;

  const phoneCountry = () => {
    let phoneCountry;
    countries?.forEach((c) => {
      if (country === c.code) {
        phoneCountry = c.phoneCode;
      }
    });
    return phoneCountry;
  };

  const children = () => {
    return (
      <WithKeyboard padding flexGrow modal>
        <TouchableOpacity activeOpacity={0.99} style={styles.flex}>
          <GeneralError
            style={styles.error}
            show={errorHappenedHere('PhoneNumberModal')}
          />

          <Pressable
            style={[styles.dropdown, { borderColor }]}
            onPress={() => handleCountries()}
          >
            <Image
              source={{
                uri: `${COUNTRIES_URL_PNG}/${country}.png`,
              }}
              style={styles.image}
            />
            <AppText medium style={[styles.dropdownText, { color }]}>
              {phoneCountry()}
            </AppText>
            <Image source={images.Arrow} />
          </Pressable>

          <AppInput
            style={styles.inputContainer}
            label="Phone Number"
            right={send}
            onChangeText={(text) => handlePhoneNumber(text)}
            value={number}
            keyboardType="number-pad"
            error={(error || sendError) && !number?.trim()}
          />
          <AppInput
            style={styles.inputContainer}
            label="Verification Code"
            onChangeText={handleVerificationCode}
            value={code}
            keyboardType="number-pad"
            error={error && !code?.trim()}
          />
        </TouchableOpacity>

        <AppButton text="Save" onPress={handleSave} style={styles.button} />

        <CountriesModal phoneCountry />
      </WithKeyboard>
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
    marginVertical: 20,
  },
  dropdownText: {
    flex: 1,
    marginLeft: 12,
  },
  dropdown: {
    borderWidth: 1,
    borderRadius: 4,
    height: 45,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    paddingHorizontal: 15,
  },
  error: {
    marginBottom: 25,
  },
  flex: {
    flex: 1,
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
