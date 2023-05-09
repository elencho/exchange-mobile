import React, { useEffect, useState } from 'react';
import {
  Image,
  Pressable,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import AppModal from '../AppModal';
import AppText from '../AppText';
import AppInput from '../AppInput';
import AppButton from '../AppButton';
import WithKeyboard from '../WithKeyboard';
import {
  toggleCountriesModal,
  togglePersonalInfoModal,
} from '../../redux/modals/actions';
import colors from '../../constants/colors';
import CountriesModal from './CountriesModal';
import { saveUserInfo, saveUserInfoSaga } from '../../redux/profile/actions';
import GeneralError from '../GeneralError';
import { COUNTRIES_URL_PNG } from '../../constants/api';
import { errorHappenedHere } from '../../utils/appUtils';
import Arrow from '../../assets/images/Arrow';

export default function PersonalInfoModal() {
  const dispatch = useDispatch();
  const state = useSelector((state) => state);
  const {
    modals: { personalInfoModalVisible },
    profile: { userInfo, countriesConstant, isProfileUpdating },
  } = state;

  const [countryDrop, setCountryDrop] = useState(false);
  const [citizenshipDrop, setCitizenshipDrop] = useState(false);
  const [userInfoVariable, setUserInfoVariable] = useState(null);
  const [error, setError] = useState(false);

  const firstName = userInfo?.firstName;
  const lastName = userInfo?.lastName;
  const email = userInfo?.email;
  const country = userInfo?.country;
  const countryCode = userInfo?.countryCode;
  const city = userInfo?.city;
  const postalCode = userInfo?.postalCode;
  const address = userInfo?.address;
  const citizenship = userInfo?.citizenship;
  const userStatus = userInfo?.userStatus;
  const countriesBorder = {
    borderColor: error && !country ? '#F45E8C' : '#42475D',
  };
  const citizenshipBorder = {
    borderColor: error && !citizenship ? '#F45E8C' : '#42475D',
  };
  const cityRegex = /^([A-Za-z\s]*)$/.test(city?.trim());

  useEffect(() => {
    error && setError(false);
  }, [userInfo, personalInfoModalVisible]);

  useEffect(() => {
    if (personalInfoModalVisible && !userInfoVariable) {
      setUserInfoVariable(userInfo);
    }
    if (!personalInfoModalVisible && userInfoVariable) {
      setUserInfoVariable(null);
    }
  });
  const hide = () => {
    dispatch(saveUserInfo(userInfoVariable));
    dispatch(togglePersonalInfoModal(false));
  };
  const handleSave = () => {
    const condition = canEditInfo
      ? !country ||
        !city?.trim() ||
        !cityRegex ||
        !postalCode?.trim() ||
        !address?.trim()
      : !country ||
        !city?.trim() ||
        !cityRegex ||
        !postalCode?.trim() ||
        !address?.trim() ||
        !firstName?.trim() ||
        !lastName?.trim() ||
        !citizenship;

    if (error || condition) {
      setError(true);
    } else dispatch(saveUserInfoSaga());
  };

  const handleCountries = (countryDrop, citizenshipDrop) => {
    dispatch(toggleCountriesModal(true));
    if (countryDrop) setCountryDrop(true);
    if (citizenshipDrop) setCitizenshipDrop(true);
  };

  const handleReset = () => {
    setCitizenshipDrop(false), setCountryDrop(false);
  };

  const citizenshipText = (code) => {
    let country;
    countriesConstant?.forEach((c) => {
      if (c.code === code) country = c.name;
    });
    return country;
  };

  const canEditInfo = userStatus === 'VERIFIED' || userStatus === 'PENDING';

  const subtext = {
    transform: [{ scaleX: 0.7 }, { scaleY: 0.7 }],
    position: 'absolute',
    left: -5,
    top: -7,
    backgroundColor: colors.PRIMARY_BACKGROUND,
    paddingHorizontal: 8,
  };

  const countryLabel = country ? subtext : {};
  const citizenshipLabel = citizenship ? subtext : {};

  const children = (
    <WithKeyboard padding flexGrow modal style={{ marginTop: -14 }}>
      <TouchableOpacity activeOpacity={0.99} style={styles.flex}>
        <AppText style={styles.email}>{email}</AppText>
        <GeneralError
          style={styles.error}
          show={errorHappenedHere('PersonalInfoModal')}
        />

        {!canEditInfo && (
          <>
            <AppInput
              style={styles.inputContainer}
              onChangeText={(firstName) =>
                dispatch(saveUserInfo({ ...userInfo, firstName }))
              }
              label="First Name"
              value={firstName}
              error={error && !firstName?.trim()}
            />
            <AppInput
              style={styles.inputContainer}
              onChangeText={(lastName) =>
                dispatch(saveUserInfo({ ...userInfo, lastName }))
              }
              label="Last Name"
              value={lastName}
              error={error && !lastName?.trim()}
            />
          </>
        )}

        {!canEditInfo && (
          <Pressable
            style={[styles.dropdown, citizenshipBorder]}
            onPress={() => handleCountries(null, true)}
          >
            <View style={citizenshipLabel}>
              <AppText body style={styles.secondary}>
                Citizenship
              </AppText>
            </View>

            <Image
              source={{
                uri: `${COUNTRIES_URL_PNG}/${citizenship}.png`,
              }}
              style={styles.image}
            />
            <AppText medium style={styles.dropdownText}>
              {citizenshipText(citizenship)}
            </AppText>
            <Arrow />
          </Pressable>
        )}

        <Pressable
          style={[styles.dropdown, countriesBorder]}
          onPress={() => handleCountries(true)}
        >
          <View style={countryLabel}>
            <AppText body style={styles.secondary}>
              Country
            </AppText>
          </View>
          <Image
            source={{
              uri: `${COUNTRIES_URL_PNG}/${countryCode}.png`,
            }}
            style={styles.image}
          />
          <AppText medium style={styles.dropdownText}>
            {country}
          </AppText>
          <Arrow />
        </Pressable>

        <AppInput
          style={styles.inputContainer}
          onChangeText={(city) => dispatch(saveUserInfo({ ...userInfo, city }))}
          label="City"
          value={city}
          error={(error && !city?.trim()) || !cityRegex}
        />
        <AppInput
          style={styles.inputContainer}
          onChangeText={(postalCode) =>
            dispatch(saveUserInfo({ ...userInfo, postalCode }))
          }
          label="Postal Code"
          value={postalCode}
          error={error && !postalCode?.trim()}
        />

        <AppInput
          style={styles.inputContainer}
          onChangeText={(address) =>
            dispatch(saveUserInfo({ ...userInfo, address }))
          }
          label="Address"
          value={address}
          error={error && !address?.trim()}
        />
      </TouchableOpacity>

      <AppButton
        onPress={handleSave}
        loading={isProfileUpdating}
        style={styles.button}
        text="Save"
      />

      <CountriesModal
        citizenshipDrop={citizenshipDrop}
        countryDrop={countryDrop}
        reset={handleReset}
      />
    </WithKeyboard>
  );

  return (
    <AppModal
      visible={personalInfoModalVisible}
      hide={hide}
      fullScreen
      title="Personal Information"
      children={children}
    />
  );
}

const styles = StyleSheet.create({
  button: {
    marginVertical: 20,
  },
  dropdownText: {
    flex: 1,
    marginHorizontal: 12,
    color: colors.PRIMARY_TEXT,
  },
  dropdown: {
    borderWidth: 1,
    height: 45,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    marginTop: 10,
    paddingHorizontal: 15,
  },
  error: {
    marginBottom: 15,
  },
  flex: {
    flex: 1,
  },
  image: {
    width: 18,
    height: 18,
    borderRadius: 20,
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
  secondary: {
    color: colors.SECONDARY_TEXT,
  },
  email: {
    color: colors.SECONDARY_TEXT,
    marginBottom: 22,
  },
});
