import React, { useEffect } from 'react';
import { Image, Pressable, StyleSheet, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import colors from '../../constants/colors';
import images from '../../constants/images';
import {
  toggleLanguageModal,
  togglePhoneNumberModal,
} from '../../redux/modals/actions';
import { toggleEmailSubscription } from '../../redux/profile/actions';
import AppText from '../AppText';
import PurpleText from '../PurpleText';
import ChooseLanguageModal from './ChooseLanguageModal';
import CompanyInformation from './CompanyInformation';
import PersonalInfoModal from './PersonalInfoModal';
import PersonalInformation from './PersonalInformation';
import PhoneNumberModal from './PhoneNumberModal';
import launchSumsubSdk from '../../utils/sumsubMobileSdk';
import EditCompanyModal from './EditCompanyModal';
import IdentityModal from './IdentityModal';
import { errorHappenedHere } from '../../utils/appUtils';
import AppSwitcher from '../AppSwitcher';
import PersonalProfileSkeleton from './PersonalProfileSkeleton';
import DeleteAccount from './DeleteAccount';

export default function Personal({ loading }) {
  const dispatch = useDispatch();
  const state = useSelector((state) => state);
  const {
    profile: { userInfo, language },
    errors: { generalError },
  } = state;
  const isVerified = userInfo?.userStatus === 'VERIFIED';

  const hideError = () =>
    dispatch({ type: 'SAVE_GENERAL_ERROR', generalError: null });

  useEffect(() => {
    return () => hideError();
  }, []);

  const edit = () => {
    hideError();
    dispatch(togglePhoneNumberModal(true));
  };

  const editLanguage = () => {
    hideError();
    dispatch(toggleLanguageModal(true));
  };

  const openModal = () => {
    hideError();
    dispatch({ type: 'TOGGLE_IDENTITY_MODAL' });
  };

  const handleEmailUpdates = (value) =>
    dispatch(toggleEmailSubscription(value));

  const textCond = (r) => {
    const isOn = !!userInfo?.emailUpdates;
    switch (r) {
      case 'Identity':
        return (
          <View style={styles.row}>
            <View style={[styles.row, styles.flex]}>
              <AppText medium style={styles.white}>
                Identification
              </AppText>

              <Pressable style={styles.circle} onPress={openModal}>
                <AppText medium body style={{ color: '#9EA6D0' }}>
                  i
                </AppText>
              </Pressable>
            </View>

            {!isVerified && (
              <PurpleText text="Verify" subtext onPress={launchSumsubSdk} />
            )}
          </View>
        );
      case 'Phone':
        return (
          <View style={styles.row}>
            <AppText medium style={styles.white}>
              My Phone Number
            </AppText>
            <View style={styles.flex}>
              <PurpleText
                text="Edit"
                style={styles.purple}
                onPress={edit}
                subtext
              />
            </View>
          </View>
        );
      case 'Notifications':
        return (
          <View style={styles.row}>
            <AppText medium style={styles.white}>
              Receive Notifications
            </AppText>
            <View style={[styles.flex, { alignItems: 'flex-end' }]}>
              <AppSwitcher
                onToggle={(value) => handleEmailUpdates(value)}
                isOn={isOn}
              />
            </View>
          </View>
        );
      case 'Language':
        return (
          <View style={styles.row}>
            <AppText medium style={styles.white}>
              Choose Language
            </AppText>
            <View style={styles.flex}>
              <PurpleText
                text="Edit"
                style={styles.purple}
                onPress={editLanguage}
                subtext
              />
            </View>
          </View>
        );
      default:
        break;
    }
  };

  const secondaryTextCond = (r) => {
    const error = generalError && errorHappenedHere('NotificationSwitcher');
    switch (r) {
      case 'Identity':
        return (
          <View style={styles.upload}>
            <View
              style={[
                styles.check,
                { backgroundColor: isVerified ? '#25D8D1' : '#FFC65C' },
              ]}
            />
            <AppText subtext style={styles.secondary}>
              {isVerified ? 'Upload documents' : 'Not verified'}
            </AppText>
          </View>
        );
      case 'Phone':
        return (
          <AppText subtext style={styles.secondary}>
            {userInfo.phoneNumber}
          </AppText>
        );
      case 'Notifications':
        return (
          <AppText
            subtext
            style={[styles.secondary, error && { color: '#F45E8C' }]}
          >
            {error
              ? 'Sorry.. Something went wrong'
              : 'Receive updates & news from us'}
          </AppText>
        );
      case 'Language':
        return (
          <AppText subtext style={styles.secondary}>
            {language === 'ka' ? 'ქართული' : language === 'en' ? 'English' : ''}
          </AppText>
        );
      default:
        break;
    }
  };

  return !loading ? (
    <>
      <View style={styles.block}>
        {['Identity', 'Phone', 'Notifications', 'Language'].map((r, i, a) => (
          <View
            style={[styles.row, i < a.length - 1 && { marginBottom: 30 }]}
            key={r}
          >
            <View style={styles.imageContainer}>
              <Image source={images[r]} />
            </View>

            <View style={styles.justify}>
              {textCond(r)}
              {secondaryTextCond(r)}
            </View>
          </View>
        ))}
      </View>

      <PersonalInformation />
      {userInfo.company && <CompanyInformation />}
      <DeleteAccount />
      <PersonalInfoModal />
      <PhoneNumberModal />
      <ChooseLanguageModal />
      <EditCompanyModal />
      <IdentityModal />
    </>
  ) : (
    <PersonalProfileSkeleton />
  );
}

const styles = StyleSheet.create({
  check: {
    width: 4,
    height: 4,
    marginRight: 8,
  },
  circle: {
    borderWidth: 1,
    borderColor: '#9EA6D0',
    width: 22,
    height: 22,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: -2,
    marginLeft: 10,
  },
  column: {
    height: 60,
    justifyContent: 'space-between',
  },
  rightColumn: {
    alignItems: 'flex-end',
    flex: 1,
    marginLeft: 15,
  },
  block: {
    padding: 25,
    backgroundColor: colors.SECONDARY_BACKGROUND,
    marginBottom: 10,
  },
  flex: {
    flex: 1,
  },
  imageContainer: {
    width: 35,
    height: 37,
    alignItems: 'center',
    justifyContent: 'center',
  },
  justify: {
    justifyContent: 'space-between',
    flex: 1,
    height: 37,
    marginLeft: 25,
  },
  row: {
    flexDirection: 'row',
  },
  purple: {
    alignSelf: 'flex-end',
  },
  secondary: {
    color: colors.SECONDARY_TEXT,
  },
  // switch: {
  //   transform: [{ scaleX: 0.7 }, { scaleY: 0.7 }],
  //   position: 'absolute',
  //   right: -10,
  //   top: 0,
  // },
  white: {
    color: colors.PRIMARY_TEXT,
  },
  upload: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
