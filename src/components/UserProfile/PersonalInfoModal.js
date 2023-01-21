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
import images from '../../constants/images';
import CountriesModal from './CountriesModal';
import { saveUserInfo, saveUserInfoSaga } from '../../redux/profile/actions';
import GeneralError from '../GeneralError';
import { COUNTRIES_URL_PNG } from '../../constants/api';
import { errorHappenedHere } from '../../utils/appUtils';

export default function PersonalInfoModal() {
  const dispatch = useDispatch();
  const state = useSelector((state) => state);
  const {
    modals: { personalInfoModalVisible },
    profile: { userInfo, countriesConstant },
  } = state;

  const [countryDrop, setCountryDrop] = useState(false);
  const [citizenshipDrop, setCitizenshipDrop] = useState(false);
  const [userInfoVariable, setUserInfoVariable] = useState(null);
  const [error, setError] = useState(false);

  const firstName = userInfo?.firstName;
  const lastName = userInfo?.lastName;
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
    const condition = isVerified
      ? !country || !city?.trim() || !postalCode?.trim() || !address?.trim()
      : !country ||
        !city?.trim() ||
        !postalCode?.trim() ||
        !address?.trim() ||
        !firstName?.trim() ||
        !lastName?.trim() ||
        !citizenship;

    if (error || condition) {
      setError(true);
    } else {
      dispatch(saveUserInfoSaga());
    }
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

  const isVerified = userStatus === 'VERIFIED';

  const children = (
    <WithKeyboard padding flexGrow modal>
      <TouchableOpacity activeOpacity={0.99} style={styles.flex}>
        <GeneralError
          style={styles.error}
          show={errorHappenedHere('PersonalInfoModal')}
        />

        {!isVerified && (
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

        <Pressable
          style={[styles.dropdown, countriesBorder]}
          onPress={() => handleCountries(true)}
        >
          <View style={styles.subtext}>
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
          <Image source={images.Arrow} />
        </Pressable>

        <View style={styles.row}>
          <AppInput
            style={[styles.inputContainer, styles.rowInputs]}
            onChangeText={(city) =>
              dispatch(saveUserInfo({ ...userInfo, city }))
            }
            label="City"
            value={city}
            error={error && !city?.trim()}
          />
          <AppInput
            style={[styles.inputContainer, styles.rowInputs]}
            onChangeText={(postalCode) =>
              dispatch(saveUserInfo({ ...userInfo, postalCode }))
            }
            label="Postal Code"
            value={postalCode}
            error={error && !postalCode?.trim()}
          />
        </View>

        <AppInput
          style={styles.inputContainer}
          onChangeText={(address) =>
            dispatch(saveUserInfo({ ...userInfo, address }))
          }
          label="Address"
          value={address}
          error={error && !address?.trim()}
        />

        {!isVerified && (
          <Pressable
            style={[styles.dropdown, citizenshipBorder]}
            onPress={() => handleCountries(null, true)}
          >
            <View style={styles.subtext}>
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
            <Image source={images.Arrow} />
          </Pressable>
        )}
      </TouchableOpacity>

      <AppButton onPress={handleSave} style={styles.button} text="Save" />

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
    borderRadius: 4,
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
  subtext: {
    transform: [{ scaleX: 0.7 }, { scaleY: 0.7 }],
    position: 'absolute',
    left: -5,
    top: -7,
    backgroundColor: colors.PRIMARY_BACKGROUND,
    paddingHorizontal: 8,
  },
});
