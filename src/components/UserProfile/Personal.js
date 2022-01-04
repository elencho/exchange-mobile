import React from 'react';
import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  View,
  Switch,
} from 'react-native';
import colors from '../../constants/colors';
import images from '../../constants/images';
import AppText from '../AppText';
import PurpleText from '../PurpleText';

export default function Personal() {
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
              <PurpleText text="Edit" style={styles.purple} />
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
              <Switch style={styles.switch} />
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
            +995 98 204060
          </AppText>
        );
      case 'Notifications':
        return (
          <AppText subtext style={styles.secondary}>
            Receive updates & news from us
          </AppText>
        );
      default:
        break;
    }
  };

  return (
    <ScrollView>
      <View style={styles.block}>
        {['Identity', 'Phone', 'Notifications'].map((r, i, a) => (
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

      <View style={styles.block}>
        <View style={styles.row}>
          <AppText medium style={styles.white}>
            Personal Information
          </AppText>
          <View style={styles.flex}>
            <PurpleText text="Edit" style={styles.purple} />
          </View>
        </View>

        <View style={[styles.row, { marginTop: 20 }]}>
          <View style={styles.column}>
            <AppText subtext style={styles.secondary}>
              Your Surname:
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
              Irakli Banetsishvili
            </AppText>
            <AppText subtext style={styles.white}>
              Georgia, Tbilisi
            </AppText>
            <AppText subtext style={styles.white} numberOfLines={1}>
              4200 / Unlnown street, unknown building, unknown flat
            </AppText>
          </View>
        </View>
      </View>
    </ScrollView>
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
