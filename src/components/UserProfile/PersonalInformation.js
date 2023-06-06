import React from 'react';
import { StyleSheet, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import AppText from '../AppText';
import PurpleText from '../PurpleText';
import colors from '../../constants/colors';
import { togglePersonalInfoModal } from '../../redux/modals/actions';

export default function PersonalInformation() {
  const dispatch = useDispatch();
  const state = useSelector((state) => state.profile);
  const { userInfo } = state;

  const edit = () => {
    dispatch({ type: 'SAVE_GENERAL_ERROR', generalError: null });
    dispatch(togglePersonalInfoModal(true));
  };

  return (
    <View style={styles.block}>
      <View style={styles.row}>
        <AppText medium style={styles.white}>
          Personal Information
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

      <View style={[styles.row, { marginTop: 20 }]}>
        <View style={styles.column}>
          <AppText subtext style={styles.secondary}>
            Your Name:
          </AppText>
          <AppText subtext style={styles.secondary}>
            Country / City:
          </AppText>
          <AppText subtext style={styles.secondary}>
            Postal Code / Address :
          </AppText>
        </View>

        <View style={[styles.column, styles.rightColumn]}>
          <AppText subtext style={styles.white}>
            {userInfo.firstName} {userInfo.lastName}
          </AppText>
          <AppText subtext style={styles.white}>
            {userInfo.country}, {userInfo.city}
          </AppText>
          <AppText subtext style={styles.white} numberOfLines={1}>
            {userInfo.postalCode} / {userInfo.address}
          </AppText>
        </View>
      </View>
    </View>
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
    marginLeft: 7,
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
    padding: 5,
    backgroundColor: colors.PRIMARY_BACKGROUND,
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
    right: -7,
    top: 0,
  },
  white: {
    color: colors.PRIMARY_TEXT,
    textTransform: 'capitalize',
  },
  upload: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
