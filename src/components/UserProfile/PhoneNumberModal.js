import React, { useEffect, useState } from 'react';
import { Pressable, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import AppInput from '../AppInput';
import AppModal from '../AppModal';
import AppButton from '../AppButton';
import AppText from '../AppText';
import GeneralError from '../GeneralError';
import CountriesModal from './CountriesModal';
import WithKeyboard from '../WithKeyboard';

import colors from '../../constants/colors';
import {
  toggleCountriesModal,
  togglePhoneNumberModal,
} from '../../redux/modals/actions';
import { COUNTRIES_URL_PNG } from '../../constants/api';
import { saveUserInfo, updatePhoneNumber } from '../../redux/profile/actions';
import { errorHappenedHere } from '../../utils/appUtils';
import Arrow from '../../assets/images/Arrow';

export default function PhoneNumberModal() {
  const dispatch = useDispatch();
  const state = useSelector((state) => state);
  const {
    modals: { phoneNumberModalVisible },
    profile: { userInfo, countries, timerVisible, isProfileUpdating },
  } = state;

  const [userInfoVariable, setUserInfoVariable] = useState(null);
  const [error, setError] = useState(false);
  const [seconds, setSeconds] = useState(30);

  useEffect(() => {
    if (!timerVisible) {
      setSeconds(30);
      return;
    }
    if (!seconds) {
      dispatch({ type: 'TOGGLE_TIMER', timerVisible: false });
      setSeconds(30);
    }
    if (seconds && timerVisible) {
      setTimeout(() => {
        setSeconds(seconds - 1);
      }, 1000);
    }
  }, [seconds, timerVisible]);

  useEffect(() => {
    if (error) {
      setError(false);
    }
  }, [userInfo]);

  useEffect(() => {
    if (phoneNumberModalVisible) {
      setUserInfoVariable(userInfo);
      setSeconds(30);
    }
  }, [phoneNumberModalVisible]);

  const number = userInfo?.phoneNumber;
  const country = userInfo?.phoneCountry;
  const borderColor = error && !country ? '#F45E8C' : '#42475D';
  const color = error && !country ? '#F45E8C' : colors.PRIMARY_TEXT;

  const hide = () => {
    dispatch(saveUserInfo(userInfoVariable));
    dispatch(togglePhoneNumberModal(false));
  };

  const onModalHide = () => {
    dispatch({ type: 'TOGGLE_TIMER', timerVisible: false });
  };

  const handlePhoneNumber = (phoneNumber) =>
    dispatch(saveUserInfo({ ...userInfo, phoneNumber }));

  const handleSave = () => {
    if (error || !country || !(number?.trim()?.length > 2)) {
      setError(true);
    } else {
      dispatch(updatePhoneNumber(number, country, setUserInfoVariable));
    }
  };

  const handleCountries = () => dispatch(toggleCountriesModal(true));

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
            <Arrow />
          </Pressable>

          <AppInput
            style={styles.inputContainer}
            label="Phone Number"
            onChangeText={(text) => handlePhoneNumber(text)}
            value={number}
            keyboardType="number-pad"
            error={error && !(number?.trim()?.length > 2)}
          />
        </TouchableOpacity>

        <AppButton
          text="Save"
          onPress={handleSave}
          style={styles.button}
          loading={isProfileUpdating}
        />

        <CountriesModal phoneCountry />
      </WithKeyboard>
    );
  };

  return (
    <AppModal
      visible={phoneNumberModalVisible}
      hide={hide}
      onModalHide={onModalHide}
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
