import React from 'react';
import { StyleSheet, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import AppText from '../AppText';
import colors from '../../constants/colors';
import PurpleText from '../PurpleText';
import { openCompanyInfoModal } from '../../redux/modals/actions';

export default function CompanyInformation() {
  const dispatch = useDispatch();
  const userInfo = useSelector((state) => state.profile.userInfo);

  const openModal = () => {
    dispatch({ type: 'SAVE_GENERAL_ERROR', generalError: null });
    dispatch(
      openCompanyInfoModal(
        'go web company header',
        'go web company description',
        'go web company link',
        'go web company button'
      )
    );
  };

  return (
    <View style={styles.block}>
      <View style={[styles.row, { justifyContent: 'space-between' }]}>
        <AppText medium style={styles.white}>
          Company Information
        </AppText>
        <PurpleText
          text="Edit"
          onPress={openModal}
          style={{ transform: [{ scale: 0.9 }, { translateY: 2 }] }}
        />
      </View>

      <View style={[styles.row, { marginTop: 20 }]}>
        <View>
          <AppText subtext style={styles.secondary}>
            Company Name:
          </AppText>
          <View style={{ marginVertical: 5 }} />
          <AppText subtext style={styles.secondary}>
            Company Number:
          </AppText>
        </View>

        <View style={[styles.column, styles.rightColumn]}>
          <AppText subtext style={styles.white}>
            {userInfo?.company}
          </AppText>
          <View style={{ marginVertical: 5 }} />
          <AppText subtext style={styles.white}>
            {userInfo?.companyCode}
          </AppText>
        </View>
      </View>

      {userInfo?.directors?.length ? <View style={styles.line} /> : null}
      {userInfo?.directors?.map((d, i, a) => (
        <View
          style={[styles.director, i === a.length - 1 && { marginBottom: 0 }]}
          key={d.id}
        >
          <AppText subtext style={styles.secondary}>
            Director 0{i + 1}:
          </AppText>
          <AppText subtext style={styles.white}>
            {d.firstName} {d.lastName}
          </AppText>
        </View>
      ))}
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
  director: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 11,
  },
  rightColumn: {
    alignItems: 'flex-end',
    flex: 1,
  },
  block: {
    padding: 25,
    backgroundColor: colors.SECONDARY_BACKGROUND,
    marginBottom: 10,
  },
  flex: {
    flex: 1,
  },
  line: {
    backgroundColor: '#373D5C',
    height: 1,
    marginVertical: 20,
    width: '100%',
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
  },
  upload: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
