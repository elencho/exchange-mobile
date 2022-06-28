import React from 'react';
import { Image, Pressable, StyleSheet, View, Switch } from 'react-native';
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

export default function Personal() {
  const dispatch = useDispatch();
  const state = useSelector((state) => state.profile);
  const { userInfo, language } = state;

  const edit = () => dispatch(togglePhoneNumberModal(true));
  const editLanguage = () => dispatch(toggleLanguageModal(true));

  const handleEmailUpdates = (value) => {
    dispatch(toggleEmailSubscription(value));
  };

  const textCond = (r) => {
    switch (r) {
      case 'Identity':
        return (
          <View style={styles.row}>
            <AppText medium style={styles.white}>
              Identity Verification
            </AppText>

            <Pressable style={styles.circle}>
              <AppText medium body style={{ color: '#9EA6D0' }}>
                i
              </AppText>
            </Pressable>
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
            <View style={styles.flex}>
              <Switch
                style={styles.switch}
                onValueChange={(value) => handleEmailUpdates(value)}
                value={userInfo.emailUpdates}
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
    switch (r) {
      case 'Identity':
        return (
          <View style={styles.upload}>
            <View style={styles.check} />
            <AppText subtext style={styles.secondary}>
              Upload documents
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
          <AppText subtext style={styles.secondary}>
            Receive updates & news from us
          </AppText>
        );
      case 'Language':
        return (
          <AppText subtext style={styles.secondary}>
            {language === 'ka'
              ? 'ქართული'
              : language === 'en-US'
              ? 'English'
              : ''}
          </AppText>
        );
      default:
        break;
    }
  };

  return (
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

      <PersonalInfoModal />
      <PhoneNumberModal />
      <ChooseLanguageModal />
    </>
  );
}

const styles = StyleSheet.create({
  check: {
    width: 4,
    height: 4,
    backgroundColor: '#25D8D1',
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
  switch: {
    transform: [{ scaleX: 0.7 }, { scaleY: 0.7 }],
    position: 'absolute',
    right: -10,
    top: 0,
  },
  white: {
    color: colors.PRIMARY_TEXT,
  },
  upload: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
