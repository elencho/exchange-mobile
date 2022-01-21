import React from 'react';
import {
  Image,
  StyleSheet,
  View,
  Platform,
  TouchableOpacity,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import colors from '../../constants/colors';
import images from '../../constants/images';

import { toggleGoogleAuthModal } from '../../redux/modals/actions';
import AppInput from '../AppInput';
import AppModal from '../AppModal';
import AppText from '../AppText';
import PurpleText from '../PurpleText';

export default function GoogleAuthModal() {
  const dispatch = useDispatch();
  const state = useSelector((state) => state.modals);
  const { googleAuthModalVisible } = state;

  const hide = () => dispatch(toggleGoogleAuthModal(false));

  const right = (
    <View style={styles.row}>
      <View style={styles.smallLine} />
      <PurpleText text="Enable" />
    </View>
  );

  const children = (
    <>
      <View style={styles.row}>
        <View style={[styles.flex, styles.justify]}>
          <AppText header style={styles.header}>
            Authentication
          </AppText>
          <AppText body style={styles.secondary}>
            Download App on:
          </AppText>
        </View>

        <TouchableOpacity style={styles.store}>
          <Image
            source={images[Platform.OS === 'ios' ? 'Appstore' : 'Playstore']}
            style={styles.storeIcon}
          />
        </TouchableOpacity>
      </View>

      <View style={styles.block}>
        <AppText subtext style={styles.subtext}>
          Asdfghjklpasdfghjklqwertyuiopzxcvbmdgfkiu
        </AppText>
        <View style={styles.line} />
        <Image source={images.Copy} />
      </View>

      <AppInput placeholder="Enter Key" right={right} />
    </>
  );

  return (
    <AppModal
      children={children}
      bottom
      hide={hide}
      visible={googleAuthModalVisible}
    />
  );
}

const styles = StyleSheet.create({
  block: {
    backgroundColor: 'rgba(101, 130, 253, 0.06)',
    flexDirection: 'row',
    paddingVertical: 23,
    paddingHorizontal: 30,
    marginVertical: 27,
    alignItems: 'center',
  },
  flex: { flex: 1 },
  justify: { justifyContent: 'space-between' },
  line: {
    backgroundColor: 'rgba(74, 77, 116, 0.4)',
    height: '100%',
    width: 1,
    marginHorizontal: 30,
  },
  smallLine: {
    width: 1,
    backgroundColor: 'rgba(74, 77, 116, 0.4)',
    marginHorizontal: 15,
  },
  row: { flexDirection: 'row' },
  store: {
    height: 45,
    width: 120,
  },
  storeIcon: {
    width: '100%',
    height: '100%',
  },
  header: { color: colors.PRIMARY_TEXT },
  secondary: { color: colors.SECONDARY_TEXT },
  subtext: { color: '#C0C5E0', flex: 1 },
});
