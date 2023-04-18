import React, { memo } from 'react';
import Modal from 'react-native-modal';
import {
  View,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  Modal as RNModal,
  TouchableWithoutFeedback,
} from 'react-native';
import Constants from 'expo-constants';
import GestureRecognizer from 'react-native-swipe-gestures';

import ModalTop from './ModalTop';
import colors from '../constants/colors';
import AppText from './AppText';
import AppToast from './AppToast';
import Background from './Background';
import CloseModalIcon from './InstantTrade/CloseModalIcon';
import Headline from './TransactionHistory/Headline';
import { IS_ANDROID, IS_IOS } from '../constants/system';
import IOSModal from './IOSModal';
import AndroidModal from './AndroidModal';

function AppModal({
  children,
  visible,
  hide,
  bottom,
  title,
  fullScreen,
  custom,
  onModalHide,
  onDismiss,
  position = '120%',
}) {
  // const deviceHeight =
  //   Platform.OS === 'ios'
  //     ? Dimensions.get('window').height
  //     : require('react-native-extra-dimensions-android').get(
  //         'REAL_WINDOW_HEIGHT'
  //       );

  // ERROR DISSAPEARING
  // const modalHide = () => {
  //   dispatch({ type: 'SAVE_GENERAL_ERROR', generalError: null });
  //   hide();
  // };
  const CustomModal = ({ children }) =>
    (IS_IOS && (
      <Modal
        isVisible={visible}
        onBackdropPress={hide}
        onSwipeComplete={hide}
        swipeDirection="down"
        propagateSwipe={true}
        style={styles.modal}
        animationOutTiming={500}
        backdropTransitionInTiming={300}
        onModalHide={onModalHide}
        hideModalContentWhileAnimating
        useNativeDriver
        useNativeDriverForBackdrop
        onDismiss={onDismiss}
      >
        {children}
      </Modal>
    )) || (
      <GestureRecognizer style={{ flex: 1 }} onSwipeDown={hide}>
        <RNModal
          transparent={true}
          visible={visible}
          swipeDirection="down"
          animationType={'slide'}
          propagateSwipe={true}
          style={styles.modal}
          animationOutTiming={500}
          backdropTransitionInTiming={300}
          onModalHide={onModalHide}
          hideModalContentWhileAnimating
          useNativeDriver
          useNativeDriverForBackdrop
          onDismiss={onDismiss}
        >
          <TouchableWithoutFeedback onPress={hide}>
            <View
              style={{
                height: '100%',
                backgroundColor: 'rgba(0, 0, 0, 0.5)',
              }}
            >
              {children}
            </View>
          </TouchableWithoutFeedback>
        </RNModal>
      </GestureRecognizer>
    );

  return IS_IOS ? (
    <IOSModal
      children={children}
      visible={visible}
      hide={hide}
      bottom={bottom}
      title={title}
      fullScreen={fullScreen}
      custom={custom}
      onModalHide={onModalHide}
      onDismiss={onDismiss}
      position={position}
    />
  ) : (
    <AndroidModal
      children={children}
      visible={visible}
      hide={hide}
      bottom={bottom}
      title={title}
      fullScreen={fullScreen}
      custom={custom}
      onModalHide={onModalHide}
      onDismiss={onDismiss}
      position={position}
    />
  );
}
export default memo(AppModal);

const styles = StyleSheet.create({
  bottom: {
    padding: 35,
    backgroundColor: colors.SECONDARY_BACKGROUND,
    marginBottom: -3,
  },
  header: {
    color: colors.PRIMARY_TEXT,
    marginBottom: 25,
  },
  modal: {
    marginHorizontal: 0,
    marginTop: Platform.select({ ios: Constants.statusBarHeight, android: 0 }),
    marginBottom: Platform.select({
      ios: undefined,
      android: 0,
    }),
    justifyContent: 'flex-end',
    flex: 1,
    height: IS_ANDROID && '50%',
  },
});
