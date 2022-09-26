import React, { useEffect, useState } from 'react';
import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import AppModal from '../AppModal';
import AppText from '../AppText';
import AppInput from '../AppInput';
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

export default function PersonalInfoModal() {
  const [countryDrop, setCountryDrop] = useState(false);
  const [citizenshipDrop, setCitizenshipDrop] = useState(false);
  const [userInfoVariable, setUserInfoVariable] = useState(null);

  const dispatch = useDispatch();
  const state = useSelector((state) => state);
  const {
    modals: { personalInfoModalVisible },
    profile: { userInfo, countriesConstant, generalError },
  } = state;

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
  const handleSave = () => dispatch(saveUserInfoSaga());

  const handleCountries = (countryDrop, citizenshipDrop) => {
    dispatch(toggleCountriesModal(true));
    if (countryDrop) setCountryDrop(true);
    if (citizenshipDrop) setCitizenshipDrop(true);
  };

  const handleReset = () => {
    setCitizenshipDrop(false), setCountryDrop(false);
  };

  const citizenship = (code) => {
    let country;
    countriesConstant.forEach((c) => {
      if (c.code === code) country = c.name;
    });
    return country;
  };

  const children = (
    <>
      <ScrollView style={styles.flex} showsVerticalScrollIndicator={false}>
        <TouchableOpacity activeOpacity={0.99}>
          {generalError ? (
            <View style={{ marginBottom: 15 }}>
              <GeneralError />
            </View>
          ) : null}

          <AppInput
            style={styles.inputContainer}
            onChangeText={(firstName) =>
              dispatch(saveUserInfo({ ...userInfo, firstName }))
            }
            label="First Name"
            value={userInfo?.firstName}
            editable={userInfo?.userStatus !== 'VERIFIED'}
          />
          <AppInput
            style={styles.inputContainer}
            onChangeText={(lastName) =>
              dispatch(saveUserInfo({ ...userInfo, lastName }))
            }
            label="Last Name"
            value={userInfo?.lastName}
            editable={userInfo?.userStatus !== 'VERIFIED'}
          />

          <Pressable
            style={styles.dropdown}
            onPress={() => handleCountries(true)}
          >
            <View style={styles.subtext}>
              <AppText body style={styles.secondary}>
                Country
              </AppText>
            </View>

            <Image
              source={{
                uri: `${COUNTRIES_URL_PNG}/${userInfo?.countryCode}.png`,
              }}
              style={styles.image}
            />
            <AppText medium style={styles.dropdownText}>
              {userInfo?.country}
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
              value={userInfo?.city}
            />
            <AppInput
              style={[styles.inputContainer, styles.rowInputs]}
              onChangeText={(postalCode) =>
                dispatch(saveUserInfo({ ...userInfo, postalCode }))
              }
              label="Postal Code"
              value={userInfo?.postalCode}
            />
          </View>

          <AppInput
            style={styles.inputContainer}
            onChangeText={(address) =>
              dispatch(saveUserInfo({ ...userInfo, address }))
            }
            label="Address"
            value={userInfo?.address}
          />

          <Pressable
            style={styles.dropdown}
            onPress={() => handleCountries(null, true)}
          >
            <View style={styles.subtext}>
              <AppText body style={styles.secondary}>
                Citizenship
              </AppText>
            </View>

            <Image
              source={{
                uri: `${COUNTRIES_URL_PNG}/${userInfo?.citizenship}.png`,
              }}
              style={styles.image}
            />
            <AppText medium style={styles.dropdownText}>
              {citizenship(userInfo?.citizenship)}
            </AppText>
            <Image source={images.Arrow} />
          </Pressable>
        </TouchableOpacity>
      </ScrollView>

      <Pressable onPress={handleSave} style={styles.button}>
        <AppText medium style={styles.buttonText}>
          Save
        </AppText>
      </Pressable>

      <CountriesModal
        citizenshipDrop={citizenshipDrop}
        countryDrop={countryDrop}
        reset={handleReset}
      />
    </>
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
    // resizeMode: 'contain',
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
