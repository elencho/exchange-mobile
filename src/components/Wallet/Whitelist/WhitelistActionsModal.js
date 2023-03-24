import React from 'react';
import { Image, Pressable, StyleSheet, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import AppModal from '../../AppModal';
import {
  toggleEditWhitelistModal,
  toggleEmailAuthModal,
  toggleGoogleOtpModal,
  toggleSmsAuthModal,
  toggleWhitelistActionsModal,
} from '../../../redux/modals/actions';
import images from '../../../constants/images';
import AppText from '../../AppText';
import colors from '../../../constants/colors';
import { sendOtp } from '../../../utils/userProfileUtils';
import { copyToClipboard } from '../../../utils/copyToClipboard';

export default function WhitelistActionsModal() {
  const dispatch = useDispatch();
  const state = useSelector((state) => state);
  const {
    modals: { whitelistActionsModalVisible },
    wallet: { currentWhitelistObj, whitelist },
    profile: { googleAuth, emailAuth, smsAuth },
  } = state;

  const hide = () => {
    dispatch(toggleWhitelistActionsModal(false));
  };

  const handlePress = (a) => {
    switch (a) {
      case 'Edit Whitelist':
        hide();
        setTimeout(() => {
          dispatch(toggleEditWhitelistModal(true));
        }, 1000);
        break;
      case 'Delete Whitelist':
        hide();
        setTimeout(() => {
          if (googleAuth) dispatch(toggleGoogleOtpModal(true));
          if (emailAuth) dispatch(toggleEmailAuthModal(true));
          if (smsAuth) dispatch(toggleSmsAuthModal(true));
        }, 1000);
        if (!googleAuth) sendOtp();
        break;
      case 'Copy Address':
        copyToClipboard(currentWhitelistObj.address);
        break;
      case 'Copy Tag':
        copyToClipboard(currentWhitelistObj.tag);
        break;
      default:
        break;
    }
  };

  const image = (a) => {
    switch (a) {
      case 'Edit Whitelist':
        return images.Edit;
      case 'Delete Whitelist':
        return images.Delete_White;
      case 'Copy Address':
        return images.White_Copy;
      default:
        break;
    }
  };

  const tag = () => {
    if (whitelist[0]) {
      return whitelist[0].tag;
    }
    return;
  };

  const array = ['Edit Whitelist', 'Delete Whitelist', 'Copy Address'];

  const children = (
    <View style={{ marginBottom: -15 }}>
      {array.map((a) => (
        <Pressable
          style={styles.pressable}
          key={a}
          onPress={() => handlePress(a)}
        >
          <Image source={image(a)} />
          <AppText body style={styles.primary}>
            {a}
          </AppText>
        </Pressable>
      ))}
      {tag() && (
        <Pressable
          style={styles.pressable}
          onPress={() => handlePress('Copy Tag')}
        >
          <Image source={images.White_Copy} />
          <AppText body style={styles.primary}>
            Copy Tag
          </AppText>
        </Pressable>
      )}
    </View>
  );

  return (
    <AppModal
      bottom
      title="Choose Action"
      visible={whitelistActionsModalVisible}
      hide={hide}
      children={children}
    />
  );
}

const styles = StyleSheet.create({
  pressable: {
    flexDirection: 'row',
    paddingVertical: 7,
    alignItems: 'center',
    height: 45,
  },
  primary: {
    color: colors.PRIMARY_TEXT,
    marginLeft: 20,
  },
});
