import React from 'react';
import { StyleSheet, View } from 'react-native';
import { useSelector } from 'react-redux';
import colors from '../../constants/colors';

import AppText from '../AppText';

export default function CompanyInformation() {
  const userInfo = useSelector((state) => state.profile.userInfo);

  return (
    <View style={styles.block}>
      <View style={styles.row}>
        <AppText medium style={styles.white}>
          Company Information
        </AppText>
      </View>

      <View style={[styles.row, { marginTop: 20 }]}>
        <View style={styles.column}>
          <AppText subtext style={styles.secondary}>
            Company Name:
          </AppText>
          <AppText subtext style={styles.secondary}>
            Company Number:
          </AppText>

          {/* <View style={styles.line} />

          <AppText subtext style={styles.secondary}>
            Director 01:
          </AppText>
          <AppText subtext style={styles.secondary}>
            Director 02:
          </AppText> */}
        </View>

        <View style={[styles.column, styles.rightColumn]}>
          <AppText subtext style={styles.white}>
            {userInfo?.company}
          </AppText>
          <AppText subtext style={styles.white}>
            {userInfo?.companyCode}
          </AppText>

          {/* <View style={styles.line} />

          <AppText subtext style={styles.white}>
            Nana Tsiklauri
          </AppText>
          <AppText subtext style={styles.white}>
            Alina Gelenava
          </AppText> */}
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
    height: 115,
    justifyContent: 'space-between',
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
    marginVertical: 10,
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
